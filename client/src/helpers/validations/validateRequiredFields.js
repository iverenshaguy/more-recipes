/**
 * checks if all required fields are filled
 * @function validateRequiredFields
 * @param {array} touchedFields - touched fields
 * @param {array} requiredFields - required fields
 * @returns {bool}  true or false
 */
const validateRequiredFields = (touchedFields, requiredFields) => {
  let valid = true;
  requiredFields.forEach((item) => {
    if (!touchedFields.includes(item)) {
      valid = false;
    }
  });

  return valid;
};

export default validateRequiredFields;
