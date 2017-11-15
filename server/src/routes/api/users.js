import express from 'express';
import { matchedData } from 'express-validator/filter';
import { users as userValidation, recipes as recipeValidation } from '../../validations';
import { authentication, validationHandler } from '../../middlewares';
import { users, favorites } from '../../controllers';
import { profilePicUpload } from '../../helpers/imageUpload';

const userRoutes = express.Router();

userRoutes.post('/signup', userValidation.register, validationHandler, (req, res, next) => {
  const userData = matchedData(req);
  return users.create(req, userData, res, next);
});

userRoutes.post('/uploads', authentication.authenticate, profilePicUpload, (req, res, next) => {
  if (!req.file) {
    return res.status(422).send({ error: 'File is Empty!' });
  }

  users.upload(req, res, next);
});

userRoutes.post('/signin', userValidation.login, validationHandler, (req, res, next) => {
  const userData = matchedData(req);
  users.signin(req, userData, res, next);
});

userRoutes.get('/profile', authentication.authenticate, (req, res, next) => users.retrieve(req, res, next));

userRoutes.get('/:userId/recipes', authentication.authenticate, recipeValidation.favoriteRecipes, validationHandler, (req, res, next) => {
  const favoriteRecipeData = matchedData(req);
  favorites.getFavorites(req, favoriteRecipeData, res, next);
});

export default userRoutes;
