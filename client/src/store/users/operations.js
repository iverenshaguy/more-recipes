import { authenticationSuccess, authenticationFailure } from './actions';
import { userApi } from '../../services/api/index';

const signin = user => async (dispatch) => {
  try {
    const res = await userApi.signin(user);

    dispatch(authenticationSuccess());

    localStorage.setItem('jwtToken', res.data.token);
  } catch (error) {
    dispatch(authenticationFailure());
  }
};

export default { signin };
