/**
 * Adapt File Event to Value
 * @function adaptFileEventToValue
 * @param {function} delegate - event adapter
 * @param {object} preview - file preview
 * @param {object} event - event
 * @returns {function} delegate event function
 */
const adaptFileEventToValue = (delegate, preview) => (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);

  return delegate(file);
};

export default adaptFileEventToValue;
