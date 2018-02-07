import Pagination from '../helpers/pagination';

const paginateRecipes = (res, recipes, limit, page) => {
  const limitNum = typeof limit !== 'undefined' ? parseInt(limit, 10) : undefined;
  const pageNum = typeof limit !== 'undefined' ? parseInt(page, 10) : undefined;

  const paginate = new Pagination(recipes, limitNum);

  const { recipesByPage, metaData } = paginate.getRecipesForPage(pageNum);

  return res.status(200).send({ recipes: recipesByPage, metaData });
};

export default paginateRecipes;
