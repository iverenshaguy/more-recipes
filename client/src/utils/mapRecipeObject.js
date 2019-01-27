/**
 * Map Recipe Object to normalize recipeImage and preparations values
 * @function mapRecipeObject
 * @param {object} recipe - recipe
 * @returns {object} mapped recipe
 */

const mapRecipeObject = (recipe) => {
  const { preparations, recipeImage } = recipe;
  const newRecipeObject = Object.assign({}, recipe);

  if (preparations.length === 1 && preparations[0] === '') {
    newRecipeObject.preparations = '';
  }

  if (recipeImage === '') {
    newRecipeObject.recipeImage = null;
  }

  return newRecipeObject;
};

export default mapRecipeObject;
