import React from 'react';
// import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';
import './RecipeItems.scss';

const RecipeItems = () => (
  // const Recipes = props.recipes.map(recipe => <RecipeCard recipe={recipe} />);

  <div className="container-fluid pb-5 background-grey page-margin" id="search-result-wrapper">
    <div className="heading pt-4 text-center" id="search-result-heading">
      <div className="col-xs-12 col-md-12 pt-3" id="title">
        <h5>TOP RECIPES</h5>
      </div>
    </div>
    <hr />
    <div className="row pt-2 px-5" id="search-result">
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </div>
  </div>
);

// RecipeItems.propTypes = {
//   recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default RecipeItems;
