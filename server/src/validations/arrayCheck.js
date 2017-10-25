export default {
  checkArrayData: (field) => {
    if (Array.isArray(field) === false) {
      field = [field];
    }

    return field;
  },
};
