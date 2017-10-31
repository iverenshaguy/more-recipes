import express from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import validation from '../../validations/validation';
import { authenticate } from '../../validations/authentication';
import * as recipesController from '../../controllers/recipes';

const recipeRoutes = express.Router();


recipeRoutes.post('/', authenticate, validation.addRecipe, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.create(req, recipeData, res);
});

recipeRoutes.put('/:recipeId', authenticate, validation.updateRecipe, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const recipeData = matchedData(req);

  return recipesController.update(req, recipeData, res);
});

recipeRoutes.delete('/:recipeId', authenticate, validation.deleteRecipe, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  return recipesController.delete(req, res);
});

recipeRoutes.post('/:recipeId/reviews', authenticate, validation.reviewRecipe, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const reviewData = matchedData(req);

  return recipesController.reviewRecipe(req, reviewData, res);
});

recipeRoutes.get('/', authenticate, (req, res) => {
  if (req.query.sort === 'upvotes') {
    return recipesController.getUpvoted(req, res);
  }

  return recipesController.list(req, res);
});

export default recipeRoutes;
