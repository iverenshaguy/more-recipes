import path from 'path';
import del from 'del';
import { config } from 'dotenv';
import { User, Recipe } from '../models';
import { verifyPassword } from '../helpers/passwordHash';
import { generateToken, getCleanUser } from '../helpers';

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
        const token = generateToken(user);
        user = getCleanUser(user);

        res.status(201).send({ user, token });
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
              .send({ success: false, error: 'Email/Password do not match' });
          }

          const token = generateToken(user);
          user = getCleanUser(user);

          res.status(200).send({ user, token });
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
  },

  refreshToken(req, res) {
    let user = {
      id: req.id,
      firstname: req.firstname,
      lastname: req.lastname,
      username: req.username,
      email: req.email.toLowerCase(),
      image: req.profilePic,
      aboutMe: req.aboutMe,
      occupation: req.occupation,
      createdAt: req.createdAt,
      updatedAt: req.updatedAt
    };

    const token = generateToken(user);
    user = getCleanUser(user);

    res.status(200).send({ user, token });
  }
};
