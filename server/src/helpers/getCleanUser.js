import getUserObject from './getUserObject';

const getCleanUser = (user) => {
  if (!user) return {};

  return getUserObject(user);
};

export default getCleanUser;
