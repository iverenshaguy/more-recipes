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
  // matchedData returns only the subset of data validated by the middleware
  const recipeData = matchedData(req);

  return recipesController.create(req, recipeData, res);
});

recipeRoutes.put('/:id', authenticate, validation.updateRecipe, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const recipeData = matchedData(req);

  return recipesController.update(req, recipeData, res);
});

export default recipeRoutes;
