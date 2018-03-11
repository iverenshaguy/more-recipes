const updateUser = (user, userData) => user
  .update(Object.assign({}, user, userData));

export default updateUser;
