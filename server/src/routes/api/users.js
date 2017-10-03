import { check, validationResult } from 'express-validator/check';
import matchedData from 'express-validator/filter';
import { user as usersController } from '../controllers/users';

export default (app) => {
  app.post('/v1/users/signup', [
    check('name')
  ]);
};

// usersController.create;
