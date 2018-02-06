import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncValidate, syncValidate } from '../../../helpers/validations';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { arrayToObject } from '../../../utils';
import { formHelpers } from '../../../helpers';

/**
 * @exports
 * @class Form
 * @extends Component
 * @returns {component} Form
 */
class Form extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitError: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    submitError: null
  }

  /**
   * @constructor
   * @memberof Form
   * @param {object} props - props
   * @returns {nothing} Return nothing
   */
  constructor(props) {
    super(props);
    const { type } = props;
    const { formFields } = formHelpers;
    const fields = formFields[type];

    this.state = {
      type,
      values: arrayToObject(fields, ''),
      touched: arrayToObject(fields, false),
      error: arrayToObject(fields, null),
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
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  componentWillMount() {
    const { type } = this.props;
    const { clearFormError } = formHelpers;

    this.props.dispatch(clearFormError[type]);
  }

  /**
   * @memberof Form
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
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  handleFocus() {
    const { type } = this.state;
    const { clearFormError } = formHelpers;

    this.props.dispatch(clearFormError[type]);
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleBlur(event) {
    const { target } = event;
    const { value, name } = target;
    const { type } = this.state;

    this.setState({
      touched: { ...this.state.touched, [name]: true },
    }, () => { this.validateField(name); });

    setTimeout(() => {
      if ((name === 'email' || name === 'username') && this.state.error[name] === null) {
        this.setState({
          asyncValidating: true
        }, () => {
          asyncValidate(type)(name, value)
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
   * @memberof Form
   * @param {string} field
   * @param {string} values
   * @returns {nothing} Returns nothing
   */
  validateField(field) {
    const { type } = this.state;
    const error = syncValidate(type)(field, this.state.values);

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
   * @memberof Form
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
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    const { type } = this.state;
    const { formSubmitMapper } = formHelpers;

    this.props.dispatch(formSubmitMapper[type](this.state.values));
  }

  /**
   * @memberof Form
   * @returns {component} Form
   */
  render() {
    const {
      values, touched, error, pristine, formValid, asyncValidating
    } = this.state;

    const { submitting, submitError } = this.props;

    const formState = {
      values,
      touched,
      error,
      pristine,
      formValid,
      asyncValidating,
      submitting,
      submitError
    };

    const handlers = {
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      handleSubmit: this.handleSubmit
    };

    if (this.props.type === 'signup') {
      return <SignupForm state={formState} handlers={handlers} />;
    }

    return <LoginForm state={formState} handlers={handlers} />;
  }
}


export { Form as FormComponent };

export default connect()(Form);
