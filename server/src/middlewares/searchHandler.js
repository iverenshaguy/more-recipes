import { recipes, searchRecipes } from '../controllers';

const searchHandler = (req, res, next) => {
  if (req.query.sort === 'upvotes') {
    return searchRecipes.getUpvoted(req, res, next);
  }

  return recipes.list(req, res, next);
};

export default searchHandler;
