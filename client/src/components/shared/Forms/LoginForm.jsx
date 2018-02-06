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
 * @returns {component} LoginForm
 */
const LoginForm = ({ state, handlers }) => (
  <div id="signin-form-div" >
    <h4 className="text-center">Sign In to Your Account</h4>
    <hr />
    <Form id="signin-form" className="mt-4 mb-3 px-5" onSubmit={handlers.handleSubmit}>
      {state.submitError && (
        <NormalAlert color="danger">
          <p className="text-center mb-0">{state.submitError}</p>
        </NormalAlert>
      )}
      <FormGroup>
        <Label for="login-email" className="col-form-label">
          Email Address
        </Label>
        <RenderInput
          type="email"
          name="email"
          id="login-email"
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
        <Label for="login-password" className="col-form-label">
          Password
        </Label>
        <RenderInput
          type="password"
          name="password"
          className="mb-4"
          id="login-password"
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
      </FormGroup>
      <Button className="btn-block mt-0" disabled={!state.formValid || state.pristine || state.submitting}>
        SIGN IN
      </Button>
    </Form>
    <p className="text-center">Dont have an account, <Link to="\signup" target="_self">Sign up here</Link>.</p>
  </div>
);

LoginForm.propTypes = {
  state: PropTypes.shape({
    values: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
    }),
    touched: PropTypes.shape({
      email: PropTypes.bool,
      password: PropTypes.bool
    }),
    error: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
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

export default LoginForm;
