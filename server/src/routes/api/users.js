import express from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import validation from '../../validations/validation';
import { authenticate } from '../../validations/authentication';
import * as usersController from '../../controllers/users';
import { profilePicUpload } from '../../helpers/imageUpload';

const userRoutes = express.Router();

userRoutes.post('/signup', validation.register, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const userData = matchedData(req);

  return usersController.create(req, userData, res, next);
});

userRoutes.post('/uploads', authenticate, profilePicUpload, (req, res, next) => {
  if (!req.file) {
    return res.status(422).send({ error: 'File is Empty!' });
  }

  usersController.upload(req, res, next);
});

userRoutes.post('/signin', validation.login, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const userData = matchedData(req);

  return usersController.signin(req, userData, res, next);
});

userRoutes.get('/profile', authenticate, (req, res, next) => usersController.retrieve(req, res, next));

userRoutes.get('/:userId/recipes', authenticate, validation.favoriteRecipes, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const favoriteRecipeData = matchedData(req);

  usersController.getFavorites(req, favoriteRecipeData, res, next);
});

export default userRoutes;
