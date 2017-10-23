import { User } from '../models';
import { verifyPassword } from '../validations/password_hash';

export default {
  create(req, userData, res) {
    User.create({
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
  retrieve(req, userData, res) {
    User.findOne({ where: { email: userData.email } })
      .then((user) => {
        verifyPassword(userData.password, user.passwordHash).then((verify) => {
          if (!verify) {
            throw new Error();
          }
          req.session.user = user.dataValues;
          return res.status(200).send(user);
        })
          .catch(error => res.status(400).send(error));
      });
  }
};
