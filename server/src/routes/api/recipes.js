import express from 'express';
import del from 'del';
import path from 'path';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { recipes as recipeValidation } from '../../validations';
import { validationHandler, authentication } from '../../middlewares';
import { recipes, reviews, votes, favorites } from '../../controllers';
import { recipeImageUpload } from '../../helpers/imageUpload';

const recipeRoutes = express.Router();


recipeRoutes.post('/', authentication.authenticate, recipeValidation.addRecipe, validationHandler, (req, res, next) => {
  const recipeData = matchedData(req);
  return recipes.create(req, recipeData, res, next);
});

recipeRoutes.post('/:recipeId/uploads', authentication.authenticate, recipeValidation.getSingleRecipe, recipeImageUpload, (req, res, next) => {
  const errors = validationResult(req);
  if (!req.file) {
    return res.status(422).send({ error: 'File is Empty!' });
  }

  if (!errors.isEmpty()) {
    const uploadPath = path.resolve(__dirname, '../../../../public/images');
    const createdImage = `${uploadPath}/recipes/${req.file.filename}`;

    del.sync([createdImage]);

    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);
  return recipes.upload(req, recipeData, res, next);
});

recipeRoutes.get('/:recipeId', authentication.authenticate, recipeValidation.getSingleRecipe, validationHandler, (req, res, next) => {
  const recipeData = matchedData(req);
  return recipes.viewRecipe(req, recipeData, res, next);
});

recipeRoutes.put('/:recipeId', authentication.authenticate, recipeValidation.updateRecipe, validationHandler, (req, res, next) => {
  const recipeData = matchedData(req);
  return recipes.update(req, recipeData, res, next);
});

recipeRoutes.delete('/:recipeId', authentication.authenticate, recipeValidation.getSingleRecipe, validationHandler, (req, res, next) => {
  const recipeData = matchedData(req);
  return recipes.delete(req, recipeData, res, next);
});

recipeRoutes.post('/:recipeId/reviews', authentication.authenticate, recipeValidation.reviewRecipe, validationHandler, (req, res, next) => {
  const reviewData = matchedData(req);
  return reviews.reviewRecipe(req, reviewData, res, next);
});

recipeRoutes.post('/:recipeId/upvotes', authentication.authenticate, recipeValidation.getSingleRecipe, validationHandler, (req, res, next) => {
  const upvoteData = matchedData(req);
  return votes.upvoteRecipe(req, upvoteData, res, next);
});

recipeRoutes.post('/:recipeId/downvotes', authentication.authenticate, recipeValidation.getSingleRecipe, validationHandler, (req, res, next) => {
  const downvoteData = matchedData(req);
  return votes.downvoteRecipe(req, downvoteData, res, next);
});

recipeRoutes.post('/:recipeId/favorites', authentication.authenticate, recipeValidation.getSingleRecipe, validationHandler, (req, res, next) => {
  const favoriteData = matchedData(req);
  return favorites.addFavoriteRecipe(req, favoriteData, res, next);
});

recipeRoutes.get('/', authentication.authenticate, (req, res, next) => {
  if (req.query.sort === 'upvotes') {
    return votes.getUpvoted(req, res, next);
  }

  return recipes.list(req, res, next);
});

export default recipeRoutes;
