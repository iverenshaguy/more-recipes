/**
 * Returns array of touched fields in form
 * @function getTouchedFields
 * @param {object} formTouchedObject
 * @returns {array} Array of touched fields
 */
const getTouchedFields = formTouchedObject => Object.keys(formTouchedObject).filter((key) => {
  let touched;
  if (Array.isArray(formTouchedObject[key])) {
    const filterTouched =
      (Object.values(formTouchedObject[key]).filter(val => val === true)).length;
    touched = !!filterTouched;
  } else {
    touched = formTouchedObject[key];
  }
  return touched === true;
});

export default getTouchedFields;
