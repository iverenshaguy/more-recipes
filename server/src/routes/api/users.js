import express from 'express';
import { users as userValidation, recipes as recipeValidation } from '../../validations';
import { validationHandler, authorization } from '../../middlewares';
import { users, favorites } from '../../controllers';

const userRoutes = express.Router();

userRoutes.post('/signup', userValidation.register, (req, res, next) =>
  validationHandler(req, res, users.create, next));

userRoutes.post('/signin', userValidation.login, (req, res, next) =>
  validationHandler(req, res, users.signin, next));

userRoutes.get('/profile', authorization.authorize, (req, res, next) =>
  users.retrieve(req, res, next));

userRoutes.get('/token', authorization.authorize, (req, res) =>
  users.refreshToken(req, res));

userRoutes.get(
  '/:userId/recipes',
  authorization.authorize,
  recipeValidation.favoriteRecipes,
  (req, res, next) => validationHandler(req, res, favorites.getFavorites, next)
);

export default userRoutes;
