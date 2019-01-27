/**
 * Returns number of errors in form
 * @function formErrorCount
 * @param {object} formErrors
 * @returns {number} Number of errors
 */
const formErrorCount = formErrors => Object.values(formErrors).filter((value) => {
  let isError;
  if (Array.isArray(value)) {
    const filterError = (Object.values(value).filter(val => val !== null)).length;
    isError = filterError ? 'Error' : null;
  } else {
    isError = value;
  }
  return isError !== null;
}).length;

export default formErrorCount;
