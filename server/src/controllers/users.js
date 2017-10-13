import { User } from '../models';
import { hashPassword, verifyPassword } from '../password_hash/password_hash';

export default {
  create(req, res) {
    hashPassword(req.password).then((hash) => {
      User.create({
        firstname: req.firstname,
        lastname: req.lastname,
        username: req.username,
        email: req.email.toLowerCase(),
        passwordHash: hash,
        aboutMe: req.aboutMe,
        occupation: req.occupation,
        profilePic: req.profilePic,
        coverPhoto: req.coverPhoto,
      })
        .then(user => res.status(201).send(user));
      // .catch(error => res.status(400).send(error));
    });
    // .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User
      .all()
      .then(users => res.status(200).send(users));
    // .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    verifyPassword(req.password, req.passwordHash).then((verify) => {
      if (verify === false) {
        throw new Error('Username and password don\'t match!');
      }

      User.findOne({ where: { email: req.email } })
        .then(user => res.status(200).send(user));
      // .catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
  }
};
