import express from 'express';
// import multer from 'multer';
// import crypto from 'crypto';
// import path from 'path';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import validation from '../../validations/validation';
import * as usersController from '../../controllers/users';
import { User } from '../../models';

const apiUsersRoutes = express.Router();

apiUsersRoutes.get('/', usersController.list);

apiUsersRoutes.post('/signup', validation.registration, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const userData = matchedData(req);

  return usersController.create(req, userData, res);
});

apiUsersRoutes.get('/login', validation.authentication, (req, res) => {
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

export default apiUsersRoutes;
