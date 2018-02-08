import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form as BootstrapForm, Button } from 'reactstrap';
import { asyncValidate, syncValidate } from '../../../helpers/validations';
import AuthForm from './AuthForm';
import { NormalAlert } from '../Alert';
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
    type: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      title: PropTypes.string,
      btnText: PropTypes.string,
      extra: PropTypes.element
    }).isRequired
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
    this.clearFormErrors();
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  clearFormErrors() {
    const { type } = this.state;
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
    this.clearFormErrors();
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
        // only set asyncvalidating when sync validation is completed
        this.setState({ asyncValidating: true }, () => {
          asyncValidate(type)(name, value)
            .then(() => { this.setState({ asyncValidating: false }); })
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

    const {
      submitting, submitError, type, meta
    } = this.props;

    const { title, btnText, extra } = meta;

    const formState = {
      values,
      touched,
      error,
      pristine,
      formValid,
      asyncValidating
    };

    const handlers = {
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      handleSubmit: this.handleSubmit
    };

    return (
      <div>
        <h4 className="text-center">{title}</h4>
        <hr />
        {type !== 'login' &&
          <p className="text-muted mx-auto text-center">
            Fields marked
            <span className="text-danger">*</span> are important
          </p>}
        <BootstrapForm className="mt-4 mb-3 px-5" onSubmit={handlers.handleSubmit}>
          {submitError && (
            <NormalAlert color="danger">
              <p className="text-center mb-0">{submitError}</p>
            </NormalAlert>
          )}
          {(type === 'signup' || type === 'login') && <AuthForm type={type} state={formState} handlers={handlers} />}
          <Button className="btn-block mt-0" disabled={!formValid || pristine || submitting}>
            {btnText}
          </Button>
        </BootstrapForm>
        {extra && extra}
      </div>);
  }
}


export { Form as FormComponent };

export default connect()(Form);
