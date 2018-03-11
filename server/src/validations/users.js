import { check } from 'express-validator/check';
import { User } from '../models';

export default {
  id: [
    check('userId')
      .exists()
      .withMessage('User must be specified')
      .isInt()
      .withMessage('User Not Found'),
  ],
  register: [
    check('firstname')
      .exists()
      .withMessage('First name must be specified')
      .isLength({ min: 1 })
      .withMessage('First name cannot be empty')
      .isLength({ max: 144 })
      .withMessage('First name must not be more than 144 characters')
      .matches(/^[a-z ,.'-\s]+$/i)
      .withMessage('First name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('lastname')
      .optional({ checkFalsy: true })
      .isLength({ max: 144 })
      .withMessage('Last name must not be more than 144 characters')
      .matches(/^[a-z ,.'-]+$/i)
      .withMessage('Last name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('username')
      .exists().withMessage('Username must be specified')
      .isLength({ min: 3, max: 144 })
      .withMessage('Username must be between 2 to 144 charcters')
      .matches(/^[a-z0-9]*$/i)
      .withMessage('Username can only contain letters and numbers without space')
      .custom(value => User.findOne({ where: { username: value } }).then((user) => {
        if (user !== null) {
          throw new Error('Username unavailable');
        }

        return true;
      }))
      .trim(),
    check('email')
      .exists().withMessage('Email must be specified')
      .isEmail()
      .withMessage('This email is invalid')
      .custom(value => User.findOne({ where: { email: value } }).then((user) => {
        if (user !== null) {
          throw new Error('This email is already in use');
        }

        return true;
      }))
      .trim()
      .normalizeEmail(),
    check('password')
      .exists().withMessage('Password must be specified')
      .isLength({ min: 10 })
      .withMessage('Password must be at least 10 characters'),
    check('passwordConfirm', 'Passwords don\'t match')
      .exists().withMessage('Password Confirm field must be specified')
      .custom((value, { req }) => value === req.body.password),
    check('aboutMe')
      .optional({ checkFalsy: true })
      .isLength({ max: 255 }).withMessage('Text must not be more than 255 characters')
      .trim(),
    check('occupation')
      .optional({ checkFalsy: true })
      .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Occupation must be alphanumeric')
      .isLength({ max: 144 })
      .withMessage('Text must not be more than 144 characters')
      .trim()

  ],
  login: [
    check('email')
      .exists().withMessage('Email must be specified')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .custom(value => User.findOne({ where: { email: value } }).then((user) => {
        if (user === null) {
          throw new Error('This account doesn\'t exist, please Sign Up Instead');
        }

        return true;
      }))
      .trim()
      .normalizeEmail(),
    check('password')
      .exists().withMessage('Password must be specified')
      .isLength({ min: 3 })
      .withMessage('Please enter a valid password.'),
  ],
  update: [
    check('userId')
      .exists()
      .withMessage('User must be specified')
      .isInt()
      .withMessage('User Not Found'),
    check('firstname')
      .optional({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('First name cannot be empty')
      .isLength({ max: 144 })
      .withMessage('First name must not be more than 144 characters')
      .matches(/^[a-z ,.'-\s]+$/i)
      .withMessage('First name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('lastname')
      .optional({ checkFalsy: true })
      .isLength({ max: 144 })
      .withMessage('Last name must not be more than 144 characters')
      .matches(/^[a-z ,.'-]+$/i)
      .withMessage('Last name can only contain letters and the characters (,.\'-)')
      .trim(),
    check('username')
      .custom((value, { req }) => {
        if (req.body.username || value) {
          throw new Error('Username cannot be changed');
        }

        return true;
      }),
    check('email')
      .custom((value, { req }) => {
        if (req.body.email || value) {
          throw new Error('Email cannot be changed');
        }

        return true;
      }),
    check('password')
      .optional({ checkFalsy: true })
      .isLength({ min: 10 })
      .withMessage('Password must be at least 10 characters'),
    check('passwordConfirm')
      .custom((value, { req }) => {
        if (req.body.password && !req.body.passwordConfirm) {
          throw new Error('Password Confirm field must be specified');
        }

        if (req.body.password && req.body.passwordConfirm && value !== req.body.password) {
          throw new Error('Passwords don\'t match');
        }

        return true;
      }),
    check('profilePic')
      .trim(),
    check('aboutMe')
      .optional({ checkFalsy: true })
      .isLength({ max: 255 }).withMessage('Text must not be more than 255 characters')
      .trim(),
    check('occupation')
      .optional({ checkFalsy: true })
      .matches(/^[a-zA-Z0-9\s]*$/).withMessage('Occupation must be alphanumeric')
      .isLength({ max: 144 })
      .withMessage('Text must not be more than 144 characters')
      .trim()
  ],
};
