import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Label, FormGroup, Button } from 'reactstrap';
import { RenderInput } from '../../shared/FormComponents';
import { asyncValidate, syncValidate } from '../../../helpers/validations';
import { NormalAlert } from '../../shared/Alert';
import setCurrentLocation from '../../../actions/location';
import { login, clearAuthError } from '../../../actions/auth';

const placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

/**
 * @exports
 * @class LoginForm
 * @extends Component
 * @returns {component} LoginForm
 */
class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authenticating: PropTypes.bool.isRequired,
    submitError: PropTypes.string,
  };

  static defaultProps = {
    submitError: null
  }

  /**
   * @constructor
   * @memberof LoginForm
   * @returns {nothing} Return nothing
   */
  constructor() {
    super();

    this.state = {
      values: {
        email: '',
        password: ''
      },
      touched: { email: false, password: false },
      error: { email: null, password: null },
      pristine: true,
      formValid: false,
      asyncValidating: false
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  /**
   * @memberof LoginForm
   * @returns {nothing} Returns nothing
   */
  componentWillMount() {
    this.props.dispatch(setCurrentLocation('auth'));
    this.props.dispatch(clearAuthError());
  }

  /**
   * @memberof LoginForm
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      values: { ...this.state.values, [name]: value },
      touched: { ...this.state.touched, [name]: true },
      pristine: false,
    }, () => { this.validateField(name, value); });
  }

  /**
   * @memberof LoginForm
   * @returns {nothing} Returns nothing
   */
  handleFocus() {
    this.props.dispatch(clearAuthError());
  }

  /**
   * @memberof LoginForm
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleBlur(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      touched: { ...this.state.touched, [name]: true },
    }, () => { this.validateField(name); });

    setTimeout(() => {
      if (name === 'email' && !this.state.error.email) {
        this.setState({
          asyncValidating: true
        }, () => {
          asyncValidate('login')(name, value)
            .then(() => {
              this.setState({
                asyncValidating: false
              });
            })
            .catch((error) => {
              this.setState({
                error: { ...this.state.error, email: error.email },
                asyncValidating: false
              });
            });
        });
      }
    }, 500);
  }

  /**
   * @memberof LoginForm
   * @param {string} field
   * @param {string} values
   * @returns {nothing} Returns nothing
   */
  validateField(field) {
    const error = syncValidate('login')(field, this.state.values);

    if (error) {
      this.setState({
        error: {
          ...this.state.error,
          [field]: error
        }
      }, this.validateForm);
    } else {
      this.setState({
        error: {
          ...this.state.error,
          [field]: null
        }
      }, this.validateForm);
    }
  }

  /**
   * @memberof LoginForm
   * @returns {nothing} Returns nothing
   */
  validateForm() {
    const formErrorArrayLength =
      Object.values(this.state.error).filter(value => value !== null).length;
    const formTouchedArrayLength =
      Object.values(this.state.touched).filter(value => value === true).length;
    const formFieldCount = Object.keys(this.state.values).length;

    if (formErrorArrayLength) {
      this.setState({
        formValid: false
      });
    } else if (!formErrorArrayLength && formTouchedArrayLength === formFieldCount) {
      this.setState({
        formValid: true
      });
    }
  }

  /**
   * @memberof LoginForm
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.values));
  }

  /**
   * @memberof LoginForm
   * @returns {component} LoginForm
   */
  render() {
    return (
      <div id="signin-form-div">
        <h4 className="text-center">Sign In to Your Account</h4>
        <hr />
        <Form id="signin-form" className="mt-4 mb-3 px-5" onSubmit={this.handleSubmit}>
          {this.props.submitError && (
            <NormalAlert color="danger">
              <p className="text-center mb-0">{this.props.submitError}</p>
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
              value={this.state.values.email}
              placeholder="janesmith@me.com"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.email,
                error: this.state.error.email,
                asyncValidating: this.state.asyncValidating
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
              value={this.state.values.password}
              placeholder={placeholder}
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.password,
                error: this.state.error.password,
              }}
            />
          </FormGroup>
          <Button className="btn-block mt-0" disabled={!this.state.formValid || this.state.pristine || this.props.authenticating}>
            SIGN IN
          </Button>
        </Form>
        <p className="text-center">Dont have an account, <Link to="\signup" target="_self">Sign up here</Link>.</p>
      </div>
    );
  }
}


export { LoginForm as LoginComponent };

export default connect()(LoginForm);
