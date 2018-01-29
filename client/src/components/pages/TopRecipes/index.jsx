import React from 'react';
import PropTypes from 'prop-types';
import RecipeItems from '../../shared/RecipeCard';

/**
 * @function TopRecipes
 * @param {array} recipes
 * @returns {Component} TopRecipes
 */
const TopRecipes = ({ recipes, metaData, handlePageChange }) => (
  <RecipeItems
    title="TOP RECIPES"
    recipes={recipes}
    handlePageChange={handlePageChange}
    metaData={metaData}
  />);

TopRecipes.propTypes = {
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

export default TopRecipes;
