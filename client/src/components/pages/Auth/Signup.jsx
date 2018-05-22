import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../shared/Forms';

/**
 * @exports
 * @function Signup
 * @param {object} props
 * @returns {JSX} Signup
 */
const Signup = (props) => {
  const signupMeta = {
    title: 'Register for a New Account',
    btnText: 'SIGN UP',
    extra: <p className="text-center">Already have an account, <a href="/login" onClick={e => props.changeForm(e, 'login')}>Log in here.</a></p>
  };

  return <Form {...props} type="signup" meta={signupMeta} changeForm={props.changeForm} />;
};

Signup.propTypes = {
  changeForm: PropTypes.func.isRequired
};

export default Signup;

