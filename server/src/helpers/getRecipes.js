import paginateRecipes from '../helpers/paginateRecipes';

const getRecipes = (req, res, recipes) => {
  const { limit, page, search } = req.query;

  if (limit && page) {
    return paginateRecipes(res, recipes, limit, page);
  }

  if (!limit && !page && search) {
    return paginateRecipes(res, recipes);
  }

  return res.status(200).send(recipes);
};

export default getRecipes;
