import path from 'path';
import del from 'del';
import { User, Recipe, Favorite } from '../models';
import { verifyPassword } from '../helpers/password_hash';

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
        req.session.user = user.dataValues;
        res.status(201).send(user);
      })
      .catch(next);
  },

  upload(req, res, next) {
    return User
      .findOne({ where: { id: req.session.user.id } })
      .then((user) => {
        const uploadPath = path.resolve(__dirname, '../../../public/images');
        const savedImage = `${uploadPath}/profile/${user.profilePic}`;

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
            return res.status(401).send({ error: 'Username/Password do not match' });
          }
          req.session.user = user.dataValues;
          res.status(200).send(user);
        });
      })
      .catch(next);
  },

  retrieve(req, res, next) {
    return User.findOne({
      where: { id: req.session.user.id },
      include: [{
        model: Recipe,
        as: 'recipes'
      }]
    })
      .then(user => res.status(200).send(user))
      .catch(next);
  },

  getFavorites(req, favoriteRecipeData, res, next) {
    if (+req.session.user.id !== +req.params.userId) {
      return res.status(401).send({ message: 'You are not authorized to access this page' });
    }

    return Recipe.findAll({
      include: [{
        model: Favorite,
        as: 'favorites',
        attributes: [],
        where: {
          userId: +favoriteRecipeData.userId,
        }
      }],
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'You have no favorite recipes' });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  }
};
