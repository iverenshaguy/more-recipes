import express from 'express';
import { recipes as recipeValidation } from '../../validations';
import { validationHandler, authentication, searchHandler } from '../../middlewares';
import { recipes, reviews, votes, favorites } from '../../controllers';
import { recipeImageUpload } from '../../helpers/imageUpload';

const recipeRoutes = express.Router();

recipeRoutes.post('/', authentication.authenticate, recipeValidation.addRecipe, (req, res, next) => validationHandler(req, res, recipes.create, next));

recipeRoutes.post('/:recipeId/uploads', authentication.authenticate, recipeValidation.getSingleRecipe, recipeImageUpload, (req, res, next) => validationHandler(req, res, recipes.upload, next));

recipeRoutes.get('/:recipeId', authentication.authenticate, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, recipes.viewRecipe, next));

recipeRoutes.put('/:recipeId', authentication.authenticate, recipeValidation.updateRecipe, (req, res, next) => validationHandler(req, res, recipes.update, next));

recipeRoutes.delete('/:recipeId', authentication.authenticate, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, recipes.delete, next));

recipeRoutes.post('/:recipeId/reviews', authentication.authenticate, recipeValidation.reviewRecipe, (req, res, next) => validationHandler(req, res, reviews.reviewRecipe, next));

recipeRoutes.post('/:recipeId/upvotes', authentication.authenticate, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, votes.upvoteRecipe, next));

recipeRoutes.post('/:recipeId/downvotes', authentication.authenticate, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, votes.downvoteRecipe, next));

recipeRoutes.post('/:recipeId/favorites', authentication.authenticate, recipeValidation.getSingleRecipe, (req, res, next) => validationHandler(req, res, favorites.addFavoriteRecipe, next));

recipeRoutes.get('/', authentication.authenticate, (req, res, next) => searchHandler(req, res, next));

export default recipeRoutes;
