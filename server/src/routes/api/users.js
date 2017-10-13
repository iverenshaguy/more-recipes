import express from 'express';
// import multer from 'multer';
// import crypto from 'crypto';
// import path from 'path';
import { check, validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';
import * as usersController from '../../controllers/users';
import { User } from '../../models';

const apiUsersRoutes = express.Router();

apiUsersRoutes.get('/', usersController.list);

apiUsersRoutes.post('/signup', [
  check('firstname')
    .isAlphanumeric().withMessage('First name must be alphanumeric!')
    .exists()
    .withMessage('First name must be specified!')
    .trim()
    .escape(),
  check('lastname')
    .isAlpha().withMessage('Last name must be alphanumeric text!')
    .trim()
    .escape(),
  check('username')
    .exists().withMessage('Username must be specified!')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric!')
    .isLength({ min: 3 })
    .withMessage('Username must be more than 2 characters!')
    .custom(value => User.findOne({ where: { username: value } }).then((user) => {
      if (user !== null) {
        throw new Error('Username unavailable!');
      }

      return true;
    }))
    .trim()
    .escape(),
  check('email')
    .exists().withMessage('Email must be specified!')
    .isEmail()
    .withMessage('This email is invalid!')
    .custom(value => User.findOne({ where: { email: value } }).then((user) => {
      if (user !== null) {
        throw new Error('This email is already in use!');
      }

      return true;
    }))
    .trim()
    .normalizeEmail(),
  check('password')
    .exists().withMessage('Password must be specified!')
    .isLength({ min: 8 })
    .withMessage('Password must be more than 8 characters!'),
  check('passwordConfirm', 'Passwords don\'t match!')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  check('aboutMe')
    .isLength({ max: 255 }).withMessage('Text must not be more than 255 characters!')
    .trim()
    .escape(),
  check('occupation')
    .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Occupation must be alphanumeric!')
    .isLength({ max: 144 })
    .withMessage('Text must not be more than 144 characters!')
    .trim()
    .escape(),
  check('profilePic')
    .trim()
    .escape(),
  check('coverPhoto')
    .trim()
    .escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const user = matchedData(req);

  return usersController.create(user, res);
});

apiUsersRoutes.get('/login', [
  check('email')
    .exists().withMessage('Email must be specified!')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom(value => User.findOne({ where: { email: value } }).then((user) => {
      if (user === null) {
        throw new Error('This account doesn\'t exist! Please Sign Up Instead');
      }

      return true;
    }))
    .trim()
    .normalizeEmail(),
  check('password')
    .exists().withMessage('Password must be specified!')
    .isLength({ min: 3 })
    .withMessage('Please enter a valid password.'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const user = matchedData(req);
  User.findOne({ where: { email: user.email } }).then((result) => {
    user.passwordHash = (result.get('passwordHash')).toString();

    return usersController.retrieve(user, res);
  });
});

export default apiUsersRoutes;
