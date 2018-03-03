import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';
import Pagination from '../Pagination';
import getNoResultText from '../../../helpers/getNoResultText';
import { multiRecipePropTypes } from '../../../helpers/proptypes';
import './RecipeItems.scss';

/**
 * @exports
 * @function RecipeItems
 * @param {object} props
 * @returns {component} RecipeItems
 */
const RecipeItems = props => (
  <div className="container-fluid pb-5 background-grey page-margin" id="search-result-wrapper">
    <div className="heading pt-4 text-center" id="search-result-heading">
      <div className="col-xs-12 col-md-12 pt-3" id="title">
        <h5>{props.title}</h5>
      </div>
    </div>
    <hr />
    <div className="row pt-2 px-5" id="search-result">
      {props.recipes.length === 0 &&
        <div className="col">
          {props.recipes.length === 0 && <div className="text-center pt-4">{getNoResultText(props.title)}</div>}
        </div>}
      {props.recipes.length !== 0 &&
        props.recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe} />))}
    </div>
    {props.recipes.length !== 0 && <Pagination
      items={props.recipes}
      onPageChange={props.handlePageChange}
      metadata={props.metadata}
    />}
  </div>);

RecipeItems.propTypes = {
  title: PropTypes.string.isRequired,
  ...multiRecipePropTypes,
  handlePageChange: PropTypes.func.isRequired
};

export default RecipeItems;
