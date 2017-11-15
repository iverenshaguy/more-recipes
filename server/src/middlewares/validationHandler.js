import { validationResult } from 'express-validator/check';

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  next();
};

export default validationHandler;
