import { User } from '../models';

const notAString = elem => (typeof (elem) !== 'string');

export default {
  isValidName: (name) => {
    if (notAString(name)) {
      return false;
    }

    const nameArr = name.split(' ');
    const joinedName = name.replace(/\s/g, '');


    if (nameArr.find(notAString)) {
      return false;
    }

    if (name.length < 2 || nameArr.length >= 4) {
      return false;
    }

    if (joinedName.match(/[^A-z-]/g) !== null) {
      return false;
    }

    return true;
  },

  isValidUsername: (username) => {
    if (notAString(username)) {
      return false;
    }

    if (username.match(/[^A-z0-9_]/g) !== null) {
      return false;
    }

    if (username.length < 4) {
      return false;
    }

    return true;
  },

  isAvailableUsername: newUsername => User.findOne({ where: { username: newUsername } })
    .then((user, err) => {
      if (err) throw err;
      if (user == null) {
        return true;
      }
      return false;
    }),

  isAvailableEmail: newEmail => User.findOne({ where: { email: newEmail } })
    .then((user, err) => {
      if (err) throw err;
      if (user == null) {
        return true;
      }
      return false;
    })
};
