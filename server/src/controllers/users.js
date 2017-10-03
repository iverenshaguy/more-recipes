import { User } from '../models';


export default {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        aboutMe: req.body.aboutMe,
        occupation: req.body.occupation,
        profilePic: req.body.profilePic,
        coverPhoto: req.body.coverPhoto,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};
