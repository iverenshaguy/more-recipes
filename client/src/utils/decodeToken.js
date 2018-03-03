import jwt from 'jsonwebtoken';

/**
 * Decode localStorage Token
 * @function decodeToken
 * @returns {object} {user, exp, token}
 */
const decodeToken = () => {
  const token = localStorage.getItem('jwtToken');

  const decoded = jwt.decode(token);

  return { decoded, token };
};

export default decodeToken;
