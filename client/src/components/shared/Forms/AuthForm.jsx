import React, { Fragment } from 'react';
import { RenderInput } from '../FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

const placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

/**
 * @exports
 * @function AuthForm
 * @param {object} props - props
 * @returns {component} AuthForm
 */
const AuthForm = ({ type, state, handlers }) => {
  AuthForm.propTypes = {
    ...formPropTypes(type)
  };

  // 'required' props is a ui prop that tells RenderInput to display red asterik

  return (
    <Fragment>
      {type === 'signup' && <RenderInput
        type="text"
        name="firstname"
        id="firstname"
        label="First Name"
        required
        value={state.values.firstname}
        placeholder="Jane"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.firstname,
          error: state.error.firstname
        }}
      />}
      {type === 'signup' && <RenderInput
        type="text"
        name="lastname"
        id="lastname"
        label="Last Name"
        required
        value={state.values.lastname}
        placeholder="Smith"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.lastname,
          error: state.error.lastname
        }}
      />}
      <RenderInput
        type="email"
        name="email"
        label="Email Address"
        id="email"
        required={false}
        value={state.values.email}
        placeholder="janesmith@me.com"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.email,
          error: state.error.email,
          asyncValidating: state.asyncValidating
        }}
      />
      {type === 'signup' && <RenderInput
        type="text"
        name="username"
        id="username"
        label="Username"
        required={false}
        value={state.values.username}
        placeholder="janesmith"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.username,
          error: state.error.username,
          asyncValidating: state.asyncValidating
        }}
      />}
      <RenderInput
        type="password"
        name="password"
        className="mb-4"
        label="Password"
        id="password"
        required={false}
        value={state.values.password}
        placeholder={placeholder}
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.password,
          error: state.error.password,
        }}
      />
      {type === 'signup' && <RenderInput
        type="password"
        name="passwordConfirm"
        id="passwordconfirm"
        label="Password Confirmation"
        required={false}
        value={state.values.passwordConfirm}
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.passwordConfirm,
          error: state.error.passwordConfirm
        }}
      />}
      {type === 'signup' && <RenderInput
        type="text"
        name="occupation"
        id="occupation"
        label="Occupation"
        required={false}
        value={state.values.occupation}
        placeholder="Chef"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.occupation,
          error: state.error.occupation
        }}
      />}
      {type === 'signup' && <RenderInput
        type="textarea"
        name="aboutMe"
        id="aboutMe"
        label="Tell us a little about you"
        required={false}
        value={state.values.aboutMe}
        placeholder="I am cool"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.aboutMe,
          error: state.error.aboutMe
        }}
      />}
    </Fragment>
  );
};

export default AuthForm;
