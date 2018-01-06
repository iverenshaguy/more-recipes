import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models';

config();

export default {
  // middleware function to check for authorised users
  authorize: (req, res, next) => {
    // token could provided via body, as a query string or in the header
    const token = req.body.token || req.query.token || req.headers.token;

    if (!token) {
      return res.status(401).send({
        error: 'You are not authorized to access this page, please signin'
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // unauthorized token

      if (err) {
        // check for outdated token
        if (err.name === 'TokenExpiredError') {
          return res.status(403).send({ error: 'User authorization token is expired' });
        }

        return res.status(500).send({ error: 'Failed to authenticate token' });
      }

      // {
      //   id: decoded.id,
      //   firstname: decoded.firstname,
      //   lastname: decoded.lastname,
      //   username: decoded.username,
      //   email: decoded.email.toLowerCase(),
      //   aboutMe: decoded.aboutMe,
      //   occupation: decoded.occupation
      // };

      // check user existence
      User.findById(decoded.id).then((userData) => {
        if (!userData) {
          return res.status(403).send({ error: 'Invalid user authorization token' });
        }

        req = Object.assign(req, userData.dataValues);
        delete req.passwordHash;

        return next();
      });
    });
  }
};
