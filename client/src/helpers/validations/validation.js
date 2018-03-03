import {
  isRequired,
  minLength1,
  minLength3,
  minLength10,
  maxLength144,
  maxLength255,
  isName,
  isUsername,
  isEmail,
  isNumber,
  isValidPasswordConfirm
} from './types';

const validation = {
  login: {
    email: [isRequired, isEmail],
    password: [isRequired]
  },

  signup: {
    firstname: [isRequired, minLength1, maxLength144, isName],
    lastname: [maxLength144, isName],
    username: [isRequired, minLength3, maxLength144, isUsername],
    email: [isRequired, isEmail],
    password: [isRequired, minLength10],
    passwordConfirm: [isRequired, isValidPasswordConfirm],
    aboutMe: [maxLength255],
    occupation: [maxLength144]
  },

  review: {
    rating: [isNumber, isRequired],
    comment: [maxLength255, isRequired]
  }
};

export default validation;
