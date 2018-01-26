import jwt from 'jsonwebtoken';

/**
 * Decode localStorage Token
 * @function decodeToken
 * @returns {object} {user, exp, token}
 */
const decodeToken = () => {
  const token = localStorage.getItem('jwtToken');

  const { user, exp } = jwt.decode(token);

  return { user, exp, token };
};

export default decodeToken;
