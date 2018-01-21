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
  isValidPasswordConfirm,
  isAlphaNumeric
} from './types';

/**
 * sync Validate supplied field
 * @function syncValidate
 * @param {string} field - field to test
 * @param {string} value - field value
 * @param {string} values - all field values
 * @returns {string} field Error
 */
export const syncValidate = (field, value, values) => {
  if (field === 'email') {
    const validate = [isRequired(value), isEmail(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'firstname') {
    const validate = [isRequired(value), minLength1(value), maxLength144(value), isName(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'lastname') {
    const validate = [maxLength144(value), isName(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'username') {
    const validate = [isRequired(value), minLength3(value), maxLength144(value), isUsername(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'password' && (values.passwordConfirm || values.passwordConfirm === '')) {
    const validate = [isRequired(value), minLength10(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'password' && values.passwordConfirm === undefined) {
    const fieldError = isRequired(value);

    if (fieldError === undefined) {
      return null;
    }

    return fieldError;
  }

  if (field === 'passwordConfirm') {
    const validate = [isRequired(value), isValidPasswordConfirm(value, values)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'aboutMe') {
    const validate = [maxLength255(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }

  if (field === 'occupation') {
    const validate = [maxLength144(value), isAlphaNumeric(value)];

    const fieldError = validate.filter(val => val !== undefined)[0];

    if (typeof fieldError !== 'string') {
      return null;
    }

    return fieldError;
  }
};

export default syncValidate;
