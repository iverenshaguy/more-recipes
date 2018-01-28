import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';
import Pagination from '../Pagination';
import './RecipeItems.scss';

/**
 * @exports
 * @class RecipeItems
 * @extends Component
 * @returns {component} RecipeItems
 */
class RecipeItems extends Component {
  /**
   * @memberof RecipeItems
   * @returns {component} RecipeItems
   */
  render() {
    const { recipes, title, metaData } = this.props;

    return (
      <div className="container-fluid pb-5 background-grey page-margin" id="search-result-wrapper">
        <div className="heading pt-4 text-center" id="search-result-heading">
          <div className="col-xs-12 col-md-12 pt-3" id="title">
            <h5>{title}</h5>
          </div>
        </div>
        <hr />
        <div className="row pt-2 px-5" id="search-result">
          {recipes.length === 0 &&
            <div className="col">
              {recipes.length === 0 && title === 'TOP RECIPES' &&
                <div className="text-center pt-4">There are no top recipes at the moment.</div>}
              {recipes.length === 0 && title === 'SEARCH RESULTS' &&
                <div className="text-center pt-4">Your search returned no results</div>}
            </div>}
          {recipes.length !== 0 &&
            recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe} />))}
        </div>
        <Pagination
          items={recipes}
          onPageChange={this.props.handlePageChange}
          metaData={metaData}
        />
      </div>
    );
  }
}

RecipeItems.propTypes = {
  title: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    recipeImage: PropTypes.string,
    prepTime: PropTypes.string,
    cookTime: PropTypes.string,
    totalTime: PropTypes.string,
    difficulty: PropTypes.string,
    extraInfo: PropTypes.string,
    vegetarian: PropTypes.bool,
    ingredients: PropTypes.array,
    preparations: PropTypes.array,
    directions: PropTypes.array,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    views: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.number,
    rating: PropTypes.string
  })).isRequired,
  metaData: PropTypes.shape({
    firstPage: PropTypes.number,
    lastPage: PropTypes.number,
    page: PropTypes.number,
    pageRecipeCount: PropTypes.number,
    pages: PropTypes.arrayOf(PropTypes.number),
    totalRecipeCount: PropTypes.number,
  }).isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default RecipeItems;
