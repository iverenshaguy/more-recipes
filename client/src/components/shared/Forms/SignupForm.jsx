import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Label, FormGroup, Button } from 'reactstrap';
import { RenderInput } from '../FormComponents';
import { NormalAlert } from '../Alert';

const placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

/**
 * @exports
 * @param {object} props
 * @returns {component} SignupForm
 */
const SignupForm = ({ state, handlers }) => (
  <div id="register-form-div">
    <h4 className="text-center">Register for a New Account</h4>
    <hr />
    <p className="text-muted mx-auto text-center">
      Fields marked
      <span className="text-danger">*</span> are important
    </p>
    <Form id="register-form" className="mt-4 mb-3 px-5" onSubmit={handlers.handleSubmit}>
      {state.submitError && (
        <NormalAlert color="danger">
          <p className="text-center mb-0">{state.submitError}</p>
        </NormalAlert>
      )}
      <FormGroup>
        <Label for="firstname" className="col-form-label col-form-label-lg">
          First Name
          <span className="text-danger">*</span>
        </Label>
        <RenderInput
          type="text"
          name="firstname"
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
      </FormGroup>
      <FormGroup>
        <Label for="lastname" className="col-form-label col-form-label-lg">
          Last Name
        </Label>
        <RenderInput
          type="text"
          name="lastname"
          id="lastname"
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
      </FormGroup>
      <FormGroup>
        <Label for="email" className="col-form-label col-form-label-lg">
          Email Address
          <span className="text-danger">*</span>
        </Label>
        <RenderInput
          type="email"
          name="email"
          id="email"
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
      </FormGroup>
      <FormGroup>
        <Label for="username" className="col-form-label col-form-label-lg">
          Username
          <span className="text-danger">*</span>
        </Label>
        <RenderInput
          type="text"
          name="username"
          id="username"
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
      </FormGroup>
      <FormGroup>
        <Label for="password" className="col-form-label col-form-label-lg">
          Password
          <span className="text-danger">*</span>
        </Label>{' '}
        <small className="text-muted">(more than 10 characters)</small>
        <RenderInput
          type="password"
          name="password"
          id="password"
          value={state.values.password}
          placeholder={placeholder}
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.password,
            error: state.error.password
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="passwordconfirm" className="col-form-label col-form-label-lg">
          Password Confirmation
          <span className="text-danger">*</span>
        </Label>
        <RenderInput
          type="password"
          name="passwordConfirm"
          id="passwordconfirm"
          value={state.values.passwordConfirm}
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.passwordConfirm,
            error: state.error.passwordConfirm
          }}
        />
      </FormGroup>
      {/* <FormGroup>
            <Label htmlFor="pic" className="col-form-label col-form-label-lg">
              Pic
            </Label>
            <RenderFileInput
              type="file"
              name="pic"
              id="pic"
            />
          </FormGroup> */}
      <FormGroup>
        <Label htmlFor="user-info" className="col-form-label col-form-label-lg">
          Tell Us Something About Yourself
        </Label>
        <RenderInput
          type="textarea"
          name="aboutMe"
          id="user-info"
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
      </FormGroup>
      <FormGroup>
        <Label htmlFor="occupation" className="col-form-label col-form-label-lg">
          Occupation
        </Label>
        <RenderInput
          type="text"
          name="occupation"
          id="occupation"
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
      </FormGroup>
      <Button className="btn-block mt-0" disabled={!state.formValid || state.pristine || state.submitting}>
        REGISTER
      </Button>
    </Form>
    <p className="text-center">Already have an account, <Link to="\login" target="_self">Log in here</Link>.</p>
  </div>
);

SignupForm.propTypes = {
  state: PropTypes.shape({
    values: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      passwordConfirm: PropTypes.string,
      occupation: PropTypes.string,
      aboutMe: PropTypes.string
    }),
    touched: PropTypes.shape({
      firstname: PropTypes.bool,
      lastname: PropTypes.bool,
      username: PropTypes.bool,
      email: PropTypes.bool,
      password: PropTypes.bool,
      passwordConfirm: PropTypes.bool,
      occupation: PropTypes.bool,
      aboutMe: PropTypes.bool
    }),
    error: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      passwordConfirm: PropTypes.string,
      occupation: PropTypes.string,
      aboutMe: PropTypes.string
    }),
    pristine: PropTypes.bool,
    formValid: PropTypes.bool,
    asyncValidating: PropTypes.bool,
    submitting: PropTypes.bool,
    submitError: PropTypes.string
  }).isRequired,
  handlers: PropTypes.shape({
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
    handleSubmit: PropTypes.func,
  }).isRequired
};

export default SignupForm;
