import { config } from 'dotenv';
import { sequelize, User, Recipe, Review } from '../models';
import getItems from '../helpers/getItems';
import { hashPassword, verifyPassword } from '../helpers/passwordHash';
import { generateToken, getCleanUser, getUserObject, updateUser } from '../helpers';

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

  retrieve(req, data, res, next) {
    return User.findOne({
      where: { id: +data.userId }
    })
      .then(user => res.status(200).send(user))
      .catch(next);
  },

  update(req, userData, res, next) {
    if (+req.id !== +userData.userId) {
      return res.status(401).send({ message: 'You are not authorized to access this page' });
    }

    return User
      .findOne({ where: { id: +req.id } })
      .then((user) => {
        delete userData.email;
        delete userData.username;

        if (userData.password) {
          hashPassword(userData.password).then((hash) => {
            userData.passwordHash = hash;

            return updateUser(user, userData)
              .then(updatedUser => res.status(200).send(updatedUser));
          });
        }

        return updateUser(user, userData)
          .then(updatedUser => res.status(200).send(updatedUser));
      })
      .catch(next);
  },

  getUserRecipes(req, data, res, next) {
    return Recipe
      .findAll({
        where: { userId: +data.userId },
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: [],
          },
          {
            model: User,
            as: 'User',
            attributes: ['id', 'username', 'profilePic']
          }
        ],
        group: ['Recipe.id', 'User.id']
      })
      .then(recipes => getItems(req, res, recipes, 'recipes'))
      .catch(next);
  },

  refreshToken(req, res) {
    let user = getUserObject(req);

    const token = generateToken(user);
    user = getCleanUser(user);

    res.status(200).send({ user, token });
  }
};
