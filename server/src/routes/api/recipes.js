import express from 'express';
import del from 'del';
import path from 'path';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import validation from '../../validations/validation';
import { authenticate } from '../../validations/authentication';
import * as recipesController from '../../controllers/recipes';
import { recipeImageUpload } from '../../helpers/imageUpload';

const recipeRoutes = express.Router();


recipeRoutes.post('/', authenticate, validation.addRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.create(req, recipeData, res, next);
});

recipeRoutes.post('/:recipeId/uploads', authenticate, validation.getSingleRecipe, recipeImageUpload, (req, res, next) => {
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

  return recipesController.upload(req, recipeData, res, next);
});

recipeRoutes.get('/:recipeId', authenticate, validation.getSingleRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.viewRecipe(req, recipeData, res, next);
});

recipeRoutes.put('/:recipeId', authenticate, validation.updateRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.update(req, recipeData, res, next);
});

recipeRoutes.delete('/:recipeId', authenticate, validation.getSingleRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.delete(req, recipeData, res, next);
});

recipeRoutes.post('/:recipeId/reviews', authenticate, validation.reviewRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const reviewData = matchedData(req);

  return recipesController.reviewRecipe(req, reviewData, res, next);
});

recipeRoutes.post('/:recipeId/upvotes', authenticate, validation.getSingleRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const upvoteData = matchedData(req);

  return recipesController.upvoteRecipe(req, upvoteData, res, next);
});

recipeRoutes.post('/:recipeId/downvotes', authenticate, validation.getSingleRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const downvoteData = matchedData(req);

  return recipesController.downvoteRecipe(req, downvoteData, res, next);
});

recipeRoutes.post('/:recipeId/favorites', authenticate, validation.getSingleRecipe, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const favoriteData = matchedData(req);

  return recipesController.addFavoriteRecipe(req, favoriteData, res, next);
});

recipeRoutes.get('/', authenticate, (req, res, next) => {
  if (req.query.sort === 'upvotes') {
    return recipesController.getUpvoted(req, res, next);
  }

  return recipesController.list(req, res, next);
});

export default recipeRoutes;
