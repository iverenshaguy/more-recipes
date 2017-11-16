import express from 'express';
import { users as userValidation, recipes as recipeValidation } from '../../validations';
import { validationHandler, authentication } from '../../middlewares';
import { users, favorites } from '../../controllers';
import { profilePicUpload } from '../../helpers/imageUpload';

const userRoutes = express.Router();

userRoutes.post('/signup', userValidation.register, (req, res, next) => validationHandler(req, res, users.create, next));

userRoutes.post('/signin', userValidation.login, (req, res, next) => validationHandler(req, res, users.signin, next));

userRoutes.get('/profile', authentication.authenticate, (req, res, next) => users.retrieve(req, res, next));

userRoutes.get('/:userId/recipes', authentication.authenticate, recipeValidation.favoriteRecipes, (req, res, next) => validationHandler(req, res, favorites.getFavorites, next));

userRoutes.post('/uploads', authentication.authenticate, profilePicUpload, (req, res, next) => validationHandler(req, res, users.upload, next));

export default userRoutes;
