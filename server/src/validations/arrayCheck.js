export default {
  // function to convert string to array if data is a string
  checkArrayData: (field) => {
    if (Array.isArray(field) === false) {
      field = [field];
    }

    return field;
  },
};
