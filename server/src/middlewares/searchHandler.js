import { recipes, searchRecipes } from '../controllers';

const searchHandler = (req, res, next) => {
  const { sort, search } = req.query;

  if (sort === 'upvotes') {
    return searchRecipes.getUpvoted(req, res, next);
  } else if (search) {
    return searchRecipes.search(req, res, next);
  }

  return recipes.list(req, res, next);
};

export default searchHandler;
