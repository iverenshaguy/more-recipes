import {
  isRequired,
  minLength1,
  minLength2,
  minLength3,
  minLength10,
  maxLength15,
  maxLength144,
  maxLength255,
  isName,
  isRecipeName,
  isUsername,
  isAlphaNumeric,
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
  },
  recipe: {
    recipeName: [isRequired, minLength1, maxLength255, isRecipeName],
    prepTime: [minLength2, maxLength15, isAlphaNumeric],
    cookTime: [minLength2, maxLength15, isAlphaNumeric],
    totalTime: [isRequired, minLength2, maxLength15, isAlphaNumeric],
    ingredients: [isRequired, minLength1, isAlphaNumeric],
    preparations: [minLength1, isAlphaNumeric],
    directions: [isRequired, minLength1, isAlphaNumeric],
    extraInfo: [isAlphaNumeric],
  }
};

export default validation;
