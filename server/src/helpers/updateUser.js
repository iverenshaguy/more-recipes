const updateUser = (user, userData) => user
  .update(Object.assign({}, user, userData))
  .then(updatedUser => updatedUser);

export default updateUser;
