import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Label, FormGroup, Button } from 'reactstrap';
import { RenderInput } from '../shared/FormComponents';
import { asyncValidate, auth as syncValidate } from '../../helpers/validations';
import { NormalAlert } from '../shared/Alert';
import { locationActions } from '../../store/location';
import { authOperations } from '../../store/auth';

const { setAuthLocation } = locationActions;
const { signup, clearAuthError } = authOperations;
const placeholder = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

/**
 * @exports
 * @class SignupForm
 * @extends Component
 * @returns {component} SignupForm
 */
class SignupForm extends Component {
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
 * @memberof SignupForm
 * @returns {nothing} Return nothing
 */
  constructor() {
    super();

    this.state = {
      values: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        occupation: '',
        aboutMe: ''
      },
      touched: {
        firstname: false,
        lastname: false,
        username: false,
        email: false,
        password: false,
        passwordConfirm: false,
        occupation: false,
        aboutMe: false
      },
      error: {
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password: null,
        passwordConfirm: null,
        occupation: null,
        aboutMe: null
      },
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
   * @memberof SignupForm
   * @returns {noting} Return nothing
   */
  componentWillMount() {
    this.props.dispatch(setAuthLocation());
    this.props.dispatch(clearAuthError());
  }

  /**
   * @memberof SignupForm
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
   * @memberof SignupForm
   * @returns {nothing} Returns nothing
   */
  handleFocus() {
    this.props.dispatch(clearAuthError());
  }

  /**
   * @memberof SignupForm
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleBlur(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      touched: { ...this.state.touched, [name]: true },
    }, () => { this.validateField(name, value); });

    setTimeout(() => {
      if ((name === 'email' || name === 'username') && this.state.error[name] === null) {
        this.setState({
          asyncValidating: true
        }, () => {
          asyncValidate('signup')(name, value)
            .then(() => {
              this.setState({
                asyncValidating: false
              });
            })
            .catch((error) => {
              this.setState({
                error: { ...this.state.error, [name]: error[name] },
                asyncValidating: false
              });
            });
        });
      }
    }, 500);
  }

  /**
   * @memberof SignupForm
   * @param {string} field
   * @param {string} value
   * @returns {nothing} Returns nothing
   */
  validateField(field, value) {
    const error = syncValidate(field, value, this.state.values);

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
   * @memberof SignupForm
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
   * @memberof SignupForm
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(signup(this.state.values));
  }

  /**
   * @memberof SignForm
   * @returns {component} SignupForm
   */
  render() {
    return (
      <div id="register-form-div">
        <h4 className="text-center">Register for a New Account</h4>
        <hr />
        <p className="text-muted mx-auto text-center">
          Fields marked
          <span className="text-danger">*</span> are important
        </p>
        <Form id="register-form" className="mt-4 mb-3 px-5" onSubmit={this.handleSubmit}>
          {this.props.submitError && (
            <NormalAlert color="danger">
              <p className="text-center mb-0">{this.props.submitError}</p>
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
              value={this.state.values.firstname}
              placeholder="Jane"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.firstname,
                error: this.state.error.firstname
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
              value={this.state.values.lastname}
              placeholder="Smith"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.lastname,
                error: this.state.error.lastname,
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
            <Label for="username" className="col-form-label col-form-label-lg">
              Username
              <span className="text-danger">*</span>
            </Label>
            <RenderInput
              type="text"
              name="username"
              id="username"
              value={this.state.values.username}
              placeholder="janesmith"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.username,
                error: this.state.error.username,
                asyncValidating: this.state.asyncValidating
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
              value={this.state.values.password}
              placeholder={placeholder}
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.password,
                error: this.state.error.password
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
              value={this.state.values.passwordConfirm}
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.passwordConfirm,
                error: this.state.error.passwordConfirm
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
              value={this.state.values.aboutMe}
              placeholder="I love to cook"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.aboutMe,
                error: this.state.error.aboutMe
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
              value={this.state.values.occupation}
              placeholder="Chef"
              handleChange={this.handleChange}
              handleBlur={this.handleBlur}
              handleFocus={this.handleFocus}
              meta={{
                touched: this.state.touched.occupation,
                error: this.state.error.occupation
              }}
            />
          </FormGroup>
          <Button className="btn-block mt-0" disabled={!this.state.formValid || this.state.pristine || this.props.authenticating}>
            REGISTER
          </Button>
        </Form>
        <p className="text-center">Already have an account, <Link to="\login" target="_self">Log in here</Link>.</p>
      </div>
    );
  }
}

export { SignupForm as SignupComponent };

export default connect()(SignupForm);
