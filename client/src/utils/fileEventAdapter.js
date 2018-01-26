/**
 * Adapt File Event to Value
 * @function adaptFileEventToValue
 * @param {string} delegate - event adapter
 * @param {object} preview - file preview
 * @param {object} event - event
 * @returns {function} delegate event function
 */
const adaptFileEventToValue = (delegate, preview) => (event) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    preview.src = reader.result;
  });

  reader.readAsDataURL(event.target.files[0]);

  return delegate(event.target.files[0]);
};

export default adaptFileEventToValue;
