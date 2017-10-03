import * as User from '../models/user';

const notAString = elem => (typeof (elem) !== 'string');

export default {
  isValidName: (name) => {
    const nameArr = name.split(' ');
    const joinedName = name.replace(/\s/g, '');

    return new Promise((resolve, reject) => {
      if (notAString(name)) {
        reject('Your Name Should Be At Least a Word');
      }

      if (nameArr.find(notAString)) {
        reject('Your Name Should Be At Least a Word');
      }

      if (name.length < 2) {
        reject('Your Name Should Be More Than One Letter');
      }

      if (nameArr.length >= 4) {
        reject('Your Name Shouldn\'t Be More Than Three Words');
      }

      if (joinedName.match(/[^A-z-]/g) !== null) {
        reject('Your Name Should Contain Only Letters');
      }

      resolve('Valid Name');
    });
  },

  isValidUsername: username => new Promise((resolve, reject) => {
    if (notAString(username)) {
      reject('Your Username Must Be a Word');
    }

    if (username.match(/[^A-z0-9_]/g) !== null) {
      reject('Your Username is Not Valid');
    }

    if (username.length < 4) {
      reject('Your Username Must Be Longer Than Three Letters');
    }

    resolve('Valid Username');
  }),

  isUsernameAvailable: username => new Promise((resolve, reject) => {
    User.findOne({ username }, (err) => {
      if (err) throw err;
      if (username == null) {
        resolve('Username Available');
      } else {
        reject();
      }
    });
  }),

  isEmailAvailable: email => new Promise((resolve, reject) => {
    User.findOne({ email }, (err) => {
      if (err) throw err;
      if (email == null) {
        resolve('Email Available');
      } else {
        reject();
      }
    });
  })
};
