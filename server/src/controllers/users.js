import { User, Recipe, Favorite } from '../models';
import { verifyPassword } from '../validations/password_hash';

export default {
  create(req, userData, res) {
    return User.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password,
      aboutMe: userData.aboutMe,
      occupation: userData.occupation,
      profilePic: userData.profilePic,
      coverPhoto: userData.coverPhoto,
    })
      .then((user) => {
        req.session.user = user.dataValues;
        res.status(201).send(user);
      });
  },

  list(req, res) {
    return User
      .all()
      .then(users => res.status(200).send(users));
  },

  signin(req, userData, res) {
    return User.findOne({ where: { email: userData.email } })
      .then((user) => {
        verifyPassword(userData.password, user.passwordHash).then((verify) => {
          if (!verify) {
            return res.status(401).send({ error: 'Username/Password do not match' });
          }
          req.session.user = user.dataValues;

          res.status(200).send(user);
        });
      });
  },

  retrieve(req, res) {
    return User.findOne({ where: { email: req.session.user.email } })
      .then(user => res.status(200).send(user));
  },

  getFavorites(req, res) {
    if (+req.session.user.id !== +req.params.userId) {
      return res.status(401).send({ message: 'You are not authorized to access this page' });
    }

    return Recipe.findAll({
      include: [{
        model: Favorite,
        as: 'favorites',
        attributes: [],
        where: {
          favorite: true
        }
      }],
      where: {
        userId: req.params.userId,
      }
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'You have no favorite recipes' });
        }

        return res.status(200).send(recipes);
      });
  }
};
