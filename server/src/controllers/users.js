import path from 'path';
import del from 'del';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User, Recipe } from '../models';
import { verifyPassword } from '../helpers/passwordHash';

config();

export default {
  create(req, userData, res, next) {
    return User.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password,
      aboutMe: userData.aboutMe,
      occupation: userData.occupation
    })
      .then((user) => {
        const token = jwt.sign(
          {
            id: user.id
          },
          process.env.SECRET,
          {
            expiresIn: 86400 // expires in 24 hours
          }
        );
        res.status(201).send({ success: true, token });
      })
      .catch(next);
  },

  upload(req, userData, res, next) {
    return User.findOne({ where: { id: req.id } })
      .then((user) => {
        const uploadPath = path.resolve(__dirname, '../../../client/public/images/profile');
        const savedImage = `${uploadPath}/${user.profilePic}`;

        del.sync([savedImage]);

        return user
          .update({ profilePic: req.file.filename })
          .then(() => res.status(201).send(user))
          .catch(next);
      })
      .catch(next);
  },

  signin(req, userData, res, next) {
    return User.findOne({ where: { email: userData.email } })
      .then((user) => {
        verifyPassword(userData.password, user.passwordHash).then((verify) => {
          if (!verify) {
            return res
              .status(401)
              .send({ success: false, error: 'Username/Password do not match' });
          }

          const token = jwt.sign(
            {
              id: user.id
            },
            process.env.SECRET,
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          res.status(200).send({ success: true, token });
        });
      })
      .catch(next);
  },

  retrieve(req, res, next) {
    return User.findOne({
      where: { id: req.id },
      include: [
        {
          model: Recipe,
          as: 'recipes'
        }
      ]
    })
      .then(user => res.status(200).send(user))
      .catch(next);
  }
};
