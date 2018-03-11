import express from 'express';
import { users as userValidation } from '../../validations';
import { validationHandler, authorization } from '../../middlewares';
import { users, favorites } from '../../controllers';

const userRoutes = express.Router();

userRoutes.post('/signup', userValidation.register, (req, res, next) =>
  validationHandler(req, res, users.create, next));

userRoutes.post('/signin', userValidation.login, (req, res, next) =>
  validationHandler(req, res, users.signin, next));

userRoutes.get('/token', authorization.authorize, (req, res) =>
  users.refreshToken(req, res));

userRoutes.get('/:userId', authorization.authorize, userValidation.id, (req, res, next) =>
  validationHandler(req, res, users.retrieve, next));

userRoutes.put(
  '/:userId', authorization.authorize, userValidation.update,
  (req, res, next) => validationHandler(req, res, users.update, next)
);

userRoutes.get(
  '/:userId/recipes/user',
  authorization.authorize,
  userValidation.id,
  (req, res, next) => validationHandler(req, res, users.getUserRecipes, next)
);

userRoutes.get(
  '/:userId/recipes',
  authorization.authorize,
  userValidation.id,
  (req, res, next) => validationHandler(req, res, favorites.getFavorites, next)
);

export default userRoutes;
