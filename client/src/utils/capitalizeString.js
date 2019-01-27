/**
 * Capitalizes the first letter in a string
 * @function capitalizeString
 * @param {string} str
 * @returns {string} Returns a string with the first letter capitalized
 */
function capitalizeString(str) {
  return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
}

export default capitalizeString;
