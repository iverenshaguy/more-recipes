import React, { Fragment } from 'react';
import { RenderInput } from '../FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function EditProfileForm
 * @param {object} props - props
 * @returns {component} EditProfileForm
 */
const EditProfileForm = ({ type, state, handlers }) => {
  EditProfileForm.propTypes = {
    ...formPropTypes(type)
  };

  return (
    <Fragment>
      <RenderInput
        type="text"
        name="firstname"
        label="First Name"
        required
        id="firstname"
        value={state.values.firstname}
        placeholder="Jane"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.firstname,
          error: state.error.firstname
        }}
      />
      <RenderInput
        type="text"
        name="lastname"
        id="lastname"
        label="Last Name"
        required={false}
        value={state.values.lastname}
        placeholder="Smith"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.lastname,
          error: state.error.lastname,
        }}
      />
      <RenderInput
        type="text"
        name="username"
        id="username"
        label="Username"
        required
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
      />
      <RenderInput
        type="textarea"
        name="aboutMe"
        id="user-info"
        label="Tell Us Something About Yourself"
        required={false}
        value={state.values.aboutMe}
        placeholder="I love to cook"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.aboutMe,
          error: state.error.aboutMe
        }}
      />
      <RenderInput
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
      />
    </Fragment>
  );
};

export default EditProfileForm;
