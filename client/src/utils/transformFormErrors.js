export default (formErrors) => {
  if (typeof formErrors === 'string') {
    return { email: formErrors };
  }

  return formErrors;
};
