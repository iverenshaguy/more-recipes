import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/Forms';

/**
 * @exports
 * @function Login
 * @param {object} props
 * @returns {JSX} Login
 */
const Login = (props) => {
  const loginMeta = {
    title: 'Sign In to Your Account',
    btnText: 'SIGN IN',
    extra: <p className="text-center">{'Don\'t have an account, '}<a href="/signup" onClick={e => props.changeForm(e, 'signup')}>Sign up here.</a></p>
  };

  return <Form {...props} type="login" meta={loginMeta} changeForm={props.changeForm} />;
};

Login.propTypes = {
  changeForm: PropTypes.func.isRequired
};

export default Login;

