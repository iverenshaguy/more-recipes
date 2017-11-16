import del from 'del';
import path from 'path';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

const validationHandler = (req, res, controllerMethod, next) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (((req.url).endsWith('/uploads')) && !req.file) {
    return res.status(422).send({ error: 'File is Empty!' });
  }

  if (!errors.isEmpty()) {
    if (req.file) {
      const uploadPath = path.resolve(__dirname, '../../../public/images/profile');
      const createdImage = `${uploadPath}/${req.file.filename}`;

      del.sync([createdImage]);
    }

    return res.status(422).json({ errors: errors.mapped() });
  }

  return controllerMethod(req, data, res, next);
};

export default validationHandler;
