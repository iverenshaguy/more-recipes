import { config } from 'dotenv';
import { User, Recipe } from '../models';
import { verifyPassword } from '../helpers/passwordHash';
import { generateToken, getCleanUser, getUserObject } from '../helpers';

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
    let user = getUserObject(req);

    const token = generateToken(user);
    user = getCleanUser(user);

    res.status(200).send({ user, token });
  }
};
