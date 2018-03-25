/**
 * Validate File Before Upload
 * @function uploadValidation
 * @param {object} file - file object
 * @param {number} maxSize - max allowed size
 * @param {array} allowedTypes - allowed file types array
 * @returns {boolean} returns boolean
 */
function uploadValidation(file, maxSize, allowedTypes) {
  if (!allowedTypes.includes(file.type)) {
    this.setState({
      uploadError: 'Invalid File Type'
    });
    return false;
  }

  if (file.size > maxSize) {
    this.setState({
      uploadError: 'File too large'
    });
    return false;
  }

  return true;
}

export default uploadValidation;
