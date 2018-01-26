import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

const validationHandler = (req, res, controllerMethod, next) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  return controllerMethod(req, data, res, next);
};

export default validationHandler;
