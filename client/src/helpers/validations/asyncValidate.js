import api from '../../services/api';
import { errorHandler } from '../../utils';

const { userApi } = api;

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
    userApi[operation]({ [field]: value }).catch((error) => {
      if (error) {
        const errorResponse = errorHandler(error);

        if (errorResponse.response && errorResponse.response[field]) {
          const errorMessage = { [field]: errorResponse.response[field].msg };
          reject(errorMessage);
        }

        resolve();
      }

      resolve();
    });
  });

export default asyncValidate;
