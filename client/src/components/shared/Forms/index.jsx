import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Form as BootstrapForm, Button } from 'reactstrap';
import AuthForm from './AuthForm';
import ReviewForm from './ReviewForm';
import MiniPreLoader from '../PreLoader/MiniPreLoader';
import { NormalAlert } from '../Alert';
import { formHelpers, getTouchedFields, formErrorCount } from '../../../helpers';
import AddRecipeForm from './AddRecipeForm';
import { changeRecipeFormState } from '../../../actions/ui';
import { uploadImage, clearUploadError } from '../../../actions/uploadImage';
import { recipeObjectPropTypes, uploadImageObjPropTypes } from '../../../helpers/proptypes';
import { arrayToObject, fileEventAdapter as adaptFileEventToValue, mapRecipeObject } from '../../../utils';
import {
  asyncValidate, syncValidate, validateRequiredFields, uploadValidation
} from '../../../helpers/validations';
import './Form.scss';

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
    }).isRequired,
    id: PropTypes.number,
    ...recipeObjectPropTypes,
    ...uploadImageObjPropTypes,
    changeForm: PropTypes.func,
    activeRecipeFormPage: PropTypes.string.isRequired,
    changeRecipeFormState: PropTypes.func.isRequired
  };

  static defaultProps = {
    submitError: null,
    changeForm: null,
    id: null
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
    const fields = (type.includes('Recipe')) ? formFields.recipe : formFields[type];
    const values = !fields.includes('vegetarian') ?
      arrayToObject(fields, '') :
      Object.assign({}, arrayToObject(fields, ''), { vegetarian: false });

    this.state = {
      type,
      values,
      image: null,
      touched: arrayToObject(fields, false),
      error: arrayToObject(fields, null),
      pristine: true,
      formValid: false,
      asyncValidating: false
    };
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  componentWillMount = () => {
    this.clearFormErrors();
  }

  /**
   * @memberof Form
   * @param {object} image
   * @returns {nothing} Returns nothing
   */
  setImageValue = (image) => {
    this.setState({ image });
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  clearFormErrors = () => {
    const { type } = this.state;
    const clearType = type.includes('Recipe') ? 'recipe' : type;
    const { clearFormError } = formHelpers;

    this.props.dispatch(clearFormError[clearType]);
    this.props.dispatch(clearUploadError());
  }


  /**
   * @memberof Form
   * @param {object} event
   * @param {number} i
   * @returns {nothing} Returns nothing
   */
  handleChange = (event, i) => {
    const { target } = event;
    const { value, name, type } = target;
    const newValue = type === 'checkbox' ? target.checked : value;

    if (i || i === 0) {
      const values = Object.assign({}, this.state.values);
      const touched = Object.assign({}, this.state.touched);
      values[name][i] = newValue;
      touched[name][i] = true;

      this.setState({
        values,
        touched,
        pristine: false
      }, () => { this.validateField(name, i); });
    } else {
      this.setState(prevState => ({
        values: { ...prevState.values, [name]: newValue },
        touched: { ...prevState.touched, [name]: true },
        pristine: false,
      }), () => { this.validateField(name); });
    }
  }

  /**
   * @memberof Form
   * @param {object} event
   * @param {element} preview
   * @returns {nothing} Returns nothing
   */
  handleChangeImage = (event, preview) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 2MB max size
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/png'];

    this.setState(prevState => ({
      values: { ...prevState.values, recipeImage: file },
      touched: { ...prevState.touched, recipeImage: true },
      error: { ...prevState.error, recipeImage: null },
      pristine: false,
    }));

    this.props.dispatch(clearUploadError());

    if (!uploadValidation(file, maxSize, allowedTypes)) {
      adaptFileEventToValue(this.setImageValue, preview)(event);
    } else {
      this.setState(prevState => ({
        error: { ...prevState.error, recipeImage: uploadValidation(file, maxSize, allowedTypes) },
      }));
      // reset input box
      event.target.value = '';
    }
  }

  /**
 * @memberof Form
 * @param {string} value
 * @returns {nothing} Returns nothing
 */
  handleRatingChange = (value) => {
    this.setState(prevState => ({
      values: { ...prevState.values, rating: value },
      touched: { ...prevState.touched, rating: true },
      pristine: false,
    }));
  }

  /**
   * @memberof Form
   * @param {object} e
   * @param {string} field
   * @returns {nothing} Returns nothing
   */
  handleAddField = (e, field) => {
    e.preventDefault();

    this.setState(prevState => ({
      values: { ...prevState.values, [field]: prevState.values[field].concat('') },
      touched: { ...prevState.touched, [field]: prevState.touched[field].concat(false) },
      error: { ...prevState.error, [field]: prevState.error[field].concat(null) }
    }));
  }

  /**
   * @memberof Form
   * @param {object} e
   * @param {string} field
   * @param {number} index
   * @returns {nothing} Returns nothing
   */
  handleRemoveField = (e, field, index) => {
    e.preventDefault();

    const { values, touched, error } = this.state;
    const fieldValue = Array.from(values[field]);
    const touchedValue = Array.from(touched[field]);
    const errorValue = Array.from(error[field]);

    // remove field value from arrays, splice mutates tha array
    fieldValue.splice(index, 1);
    touchedValue.splice(index, 1);
    errorValue.splice(index, 1);

    this.setState(prevState => ({
      values: { ...prevState.values, [field]: fieldValue },
      touched: { ...prevState.touched, [field]: touchedValue },
      error: { ...prevState.error, [field]: errorValue }
    }));
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  handleFocus = () => {
    this.clearFormErrors();
  }

  /**
   * @memberof Form
   * @param {object} event
   * @param {string} i
   * @returns {nothing} Returns nothing
   */
  handleBlur = (event, i) => {
    const { target } = event;
    const { value, name } = target;
    const { asyncValidateFields } = formHelpers;

    if (i || i === 0) {
      const touched = Object.assign({}, this.state.touched);
      touched[name][i] = true;

      this.setState({
        touched
      }, () => { this.validateField(name, i); });
    } else {
      this.setState(prevState => ({
        touched: { ...prevState.touched, [name]: true },
      }), () => { this.validateField(name); });
    }

    // start asyncvalidating when sync validation is completed
    setTimeout(() => {
      if (asyncValidateFields.includes(name) && this.state.error[name] === null) {
        this.asyncValidate(name, value);
      }
    }, 500);
  }

  /**
   * @memberof Form
   * @param {string} name
   * @param {string} value
   * @returns {nothing} Returns nothing
   */
  asyncValidate = (name, value) => {
    const { type } = this.state;
    const validationType = (type.includes('Recipe')) ? 'recipe' : type;

    this.setState({ asyncValidating: true }, () => {
      asyncValidate(validationType)(name, value)
        .then(() => { this.setState({ asyncValidating: false }); })
        .catch((error) => {
          this.setState(prevState => ({
            error: { ...prevState.error, [name]: error[name] },
            asyncValidating: false
          }));
        });
    });
  }

  /**
   * @memberof Form
   * @param {string} name
   * @param {number} i
   * @returns {nothing} Returns nothing
   */
  validateField = (name, i) => {
    const { type } = this.state;
    const validationType = type.includes('Recipe') ? 'recipe' : type;
    const error = syncValidate(validationType)(name, this.state.values, i);
    const errorValue = error || null;

    if (i || i === 0) {
      const errorObj = Object.assign({}, this.state.error);
      errorObj[name][i] = errorValue;

      this.setState({
        error: errorObj
      }, this.validateForm);
    } else {
      this.setState(prevState => ({
        error: { ...prevState.error, [name]: errorValue }
      }), this.validateForm);
    }
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  validateForm = () => {
    const formErrorArrayLength = formErrorCount(this.state.error);
    const touchedFields = getTouchedFields(this.state.touched);
    const { requiredFormFields } = formHelpers;
    const { type } = this.props;
    const formType = type.includes('Recipe') ? 'recipe' : type;
    const requiredFields = requiredFormFields[formType];

    if (formErrorArrayLength || this.state.uploadError) {
      this.setState({
        formValid: false
      });
    } else if (!formErrorArrayLength &&
      !this.state.uploadError &&
      validateRequiredFields(touchedFields, requiredFields)) {
      this.setState({
        formValid: true
      });
    }
  }

  /**
   * @memberof Form
   * @returns {boolean} returns true/false
   */
  showSubmitBtn = () => {
    const { type, activeRecipeFormPage } = this.props;
    if (!type.includes('Recipe')) return true;
    if (type.includes('Recipe') && activeRecipeFormPage === 'five') return true;
    return false;
  }

  /**
   * @memberof Form
   * @param {object} uploadTask
   * @returns {nothing} Returns nothing
   */
  submitter = (uploadTask) => {
    const { type } = this.state;
    const { formSubmitMapper } = formHelpers;
    const { values } = this.state;
    const newValues = type.includes('Recipe') ? mapRecipeObject(values) : values;

    switch (type) {
      case 'login':
      case 'signup':
        return formSubmitMapper[type](newValues);
      case 'addRecipe':
        return formSubmitMapper[type](newValues, uploadTask);
      case 'updateRecipe':
        return formSubmitMapper[type](this.props.id, newValues, uploadTask);
      default:
        return formSubmitMapper[type](this.props.id, newValues);
    }
  }

  /**
   * @memberof Form
   * @param {object} image - image
   * @return {state} returns new state
   */
  handleImageUpload = (image) => {
    const { uploadImageObj: { uploadTask } } = this.props;
    return this.props.dispatch(uploadImage(image, (this.props.recipe ? this.props.recipe.recipeItem.recipeImage : null), `recipes/${Date.now()}`, downloadURL =>
      this.setState(prevState => ({
        values: { ...prevState.values, recipeImage: downloadURL },
        error: { ...prevState.error, recipeImage: null }
      }), () => this.props.dispatch(this.submitter(uploadTask)))));
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.image) {
      return this.handleImageUpload(this.state.image);
    }

    return this.props.dispatch(this.submitter());
  }

  /**
   * @memberof Form
   * @returns {JSX} Form
   */
  renderForm = () => {
    const { type, uploadImageObj, activeRecipeFormPage } = this.props;
    const {
      values, touched, error, pristine, formValid, asyncValidating
    } = this.state;

    const formState = {
      error,
      values,
      touched,
      pristine,
      formValid,
      asyncValidating
    };

    const handlers = {
      handleAddField: this.handleAddField,
      handleRemoveField: this.handleRemoveField,
      handleChange: this.handleChange,
      handleChangeImage: this.handleChangeImage,
      handleRatingChange: this.handleRatingChange,
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      handleSubmit: this.handleSubmit
    };

    switch (type) {
      case 'login':
      case 'signup':
        return <AuthForm type={type} state={formState} handlers={handlers} />;
      case 'review':
        return <ReviewForm type={type} state={formState} handlers={handlers} />;
      case 'addRecipe':
      case 'editRecipe':
        return (<AddRecipeForm
          type={type}
          active={activeRecipeFormPage}
          state={formState}
          handlers={handlers}
          uploadImageObj={uploadImageObj}
          changeRecipeFormState={this.props.changeRecipeFormState}
        />);
      default:
        return <AuthForm type={type} state={formState} handlers={handlers} />;
    }
  }

  /**
   * @memberof Form
   * @returns {component} Form
   */
  render() {
    const { pristine, formValid } = this.state;

    const {
      submitting, submitError, type, meta, uploadImageObj
    } = this.props;

    const { title, btnText, extra } = meta;
    const requiredTextArray = ['addRecipe', 'editRecipe'];

    return (
      <div>
        {(submitting || uploadImageObj.uploading) &&
          <div className="modal-preloader text-center"><MiniPreLoader /></div>}
        {!submitting && !uploadImageObj.uploading &&
          <Fragment><h4 className="text-center">{title}</h4>
            <hr />
            {requiredTextArray.includes(type) &&
              <p className="text-muted mx-auto text-center">
                Fields marked
                <span className="text-danger">*</span> are important
              </p>}
            <BootstrapForm className="mt-4 mb-3 px-5" onSubmit={this.handleSubmit}>
              {(submitError || uploadImageObj.error) && (
                <NormalAlert color="danger">
                  <p className="text-center mb-0">{submitError || 'Something happened, please try again'}</p>
                </NormalAlert>
              )}
              {this.renderForm()}
              {this.showSubmitBtn() &&
                <Button
                  className="btn-block mt-4 text-uppercase"
                  disabled={!formValid || pristine || submitting || uploadImageObj.uploading}
                >
                  {btnText}
                </Button>}
            </BootstrapForm>
            {extra && extra}
          </Fragment>}
      </div>);
  }
}

const mapStateToProps = state => ({
  uploadImageObj: state.uploadImage,
  activeRecipeFormPage: state.ui.recipeForm.active
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeRecipeFormState
}, dispatch);

export { Form as FormComponent };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
