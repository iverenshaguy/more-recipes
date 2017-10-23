import express from 'express';
// import multer from 'multer';
// import crypto from 'crypto';
// import path from 'path';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import validation from '../../validations/validation';
import * as usersController from '../../controllers/users';
import { User } from '../../models';

const userRoutes = express.Router();

userRoutes.get('/', usersController.list);

userRoutes.post('/signup', validation.register, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const userData = matchedData(req);

  return usersController.create(req, userData, res);
});

userRoutes.post('/signin', validation.login, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const userData = matchedData(req);
  User.findOne({ where: { email: userData.email } }).then((result) => {
    userData.passwordHash = (result.get('passwordHash')).toString();

    return usersController.retrieve(req, userData, res);
  });
});

export default userRoutes;
