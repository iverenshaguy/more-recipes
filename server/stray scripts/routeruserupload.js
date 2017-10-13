import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import { check, validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';
import * as usersController from '../../controllers/users';
import { User } from '../../models';

const apiUsersRoutes = express.Router();
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../../public/images'),
  filename: (req, file, callback) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return callback(err);

      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});
const imageFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({
  storage,
  limits: { fileSize: 2097152 }, // 2MB
  fileFilter: imageFilter
});
const userSignupUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]);


apiUsersRoutes.get('/', usersController.list);

apiUsersRoutes.post('/signup', userSignupUpload, [
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
], (req, res, err) => {
  // if (!req.files) {
  //   req.headers['content-type'] = 'application/x-www-form-urlencoded';
  // }
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  // matchedData returns only the subset of data validated by the middleware
  const user = matchedData(req);
  if (req.files) {
    if (err) return res.status(422).json({ error: 'Invalid File! Please Upload an Image File' });

    if (req.files.profilePic) {
      user.profilePic = req.files.profilePic[0].filename || null;
    }

    if (req.files.coverPhoto) {
      user.coverPhoto = req.files.coverPhoto[0].filename || null;
    }

    // const host = req.host;
    // user.coverPhoto = `${req.protocol}://${host}/${req.files.coverPhoto[0].path}` || '';

    return usersController.create(user, res);
  }

  return usersController.create(user, res);
});

export default apiUsersRoutes;
