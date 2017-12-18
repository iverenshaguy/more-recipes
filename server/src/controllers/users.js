import path from 'path';
import del from 'del';
import { User, Recipe } from '../models';
import { verifyPassword } from '../helpers/passwordHash';

export default {
  create(req, userData, res, next) {
    return User.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password,
      aboutMe: userData.aboutMe,
      occupation: userData.occupation,
    })
      .then((user) => {
        req.session.user = user.dataValues;
        res.status(201).send(user);
      })
      .catch(next);
  },

  upload(req, userData, res, next) {
    return User.findOne({ where: { id: req.session.user.id } })
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
      include: [
        {
          model: Recipe,
          as: 'recipes',
        },
      ],
    })
      .then(user => res.status(200).send(user))
      .catch(next);
  },
};
