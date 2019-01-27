/**
 * Create Recipe Response Object for Newly Added Recipe
 * @function createRecipeResponseObj
 * @param {object} recipe - recipe
 * @returns {object} new recipe response object
 */

const createRecipeResponseObj = recipe => ({
  isReviewed: false,
  isFavorited: false,
  vote: null,
  recipeItem: Object.assign({}, recipe)
});

export default createRecipeResponseObj;
