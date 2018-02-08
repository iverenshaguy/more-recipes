import { auth as authAPI } from '../../services/api/users';
import { errorHandler } from '../../utils';

/**
 * Async Validate supplied field
 * @function asyncValidate
 * @param {string} operation - login or signup
 * @param {string} field - field to test
 * @param {string} value - field value
 * @returns {string} validation errorMessage
 */
const asyncValidate = operation => (field, value) =>
  new Promise((resolve, reject) => {
    authAPI(operation)({ [field]: value })
      .catch((error) => {
        const errorResponse = errorHandler(error);

        if (errorResponse.response && errorResponse.response[field]) {
          const errorMessage = { [field]: errorResponse.response[field].msg };
          reject(errorMessage);
        } else {
          resolve();
        }
      });
  });

export default asyncValidate;
