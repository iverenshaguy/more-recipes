import express from 'express';
import { recipes as recipeValidation } from '../../validations';
import { validationHandler, authorization, searchHandler } from '../../middlewares';
import { recipes, reviews, votes, favorites } from '../../controllers';

const recipeRoutes = express.Router();

recipeRoutes.post('/', authorization.authorize, recipeValidation.addRecipe, (req, res, next) => validationHandler(req, res, recipes.create, next));

recipeRoutes.get('/:recipeId', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, recipes.viewRecipe, next));

recipeRoutes.put('/:recipeId', authorization.authorize, recipeValidation.updateRecipe, (req, res, next) => validationHandler(req, res, recipes.update, next));

recipeRoutes.delete('/:recipeId', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, recipes.delete, next));

recipeRoutes.get('/:recipeId/reviews', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, reviews.getRecipeReviews, next));

recipeRoutes.post('/:recipeId/reviews', authorization.authorize, recipeValidation.reviewRecipe, (req, res, next) => validationHandler(req, res, reviews.reviewRecipe, next));

recipeRoutes.post('/:recipeId/upvotes', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, votes.upvoteRecipe, next));

recipeRoutes.post('/:recipeId/downvotes', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, votes.downvoteRecipe, next));

recipeRoutes.post('/:recipeId/favorites', authorization.authorize, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, favorites.addFavoriteRecipe, next));

recipeRoutes.get('/', authorization.authorize, (req, res, next) => searchHandler(req, res, next));

export default recipeRoutes;
