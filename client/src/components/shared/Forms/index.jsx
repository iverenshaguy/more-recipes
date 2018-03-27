import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form as BootstrapForm, Button } from 'reactstrap';
import AuthForm from './AuthForm';
import ReviewForm from './ReviewForm';
import MiniPreLoader from '../PreLoader/MiniPreLoader';
import { NormalAlert } from '../Alert';
import { formHelpers } from '../../../helpers';
import AddEditRecipeForm from './AddEditRecipeForm';
import { uploadImage, clearUploadError } from '../../../actions/uploadImage';
import { recipeObjectPropTypes } from '../../../helpers/proptypes';
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
    uploadImageObj: PropTypes.shape({
      url: PropTypes.string,
      error: PropTypes.string,
      uploading: PropTypes.bool,
      uploadTask: PropTypes.any
    }).isRequired,
  };

  static defaultProps = {
    submitError: null,
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
    const fields = (type === 'addRecipe' || type === 'editRecipe') ?
      formFields.recipe :
      formFields[type];

    this.state = {
      type,
      image: null,
      values: arrayToObject(fields, ''),
      touched: arrayToObject(fields, false),
      error: arrayToObject(fields, null),
      pristine: true,
      formValid: false,
      asyncValidating: false,
      fieldCount: (type === 'addRecipe' || type === 'editRecipe') ?
        { ingredients: 1, preparations: 1, directions: 1 } : null
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
    this.handleRemoveField = this.handleRemoveField.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.submitter = this.submitter.bind(this);
    this.setImageValue = this.setImageValue.bind(this);
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
   * @param {object} image
   * @returns {nothing} Returns nothing
   */
  setImageValue(image) {
    this.setState({ image });
  }

  /**
   * @memberof Form
   * @returns {nothing} Returns nothing
   */
  clearFormErrors() {
    const { type } = this.state;
    const clearType = (type === 'addRecipe' || type === 'editRecipe') ? 'recipe' : type;
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
  handleChange(event, i) {
    const { target } = event;
    const { value, name, type } = target;
    const newValue = type === 'checkbox' ? target.checked : value;

    if (i || i === 0) {
      const values = { ...this.state.values };
      const touched = { ...this.state.touched };
      values[name][i] = newValue;
      touched[name][i] = true;

      this.setState({
        values,
        touched,
        pristine: false
      }, () => { this.validateField(name, i); });
    } else {
      this.setState({
        values: { ...this.state.values, [name]: newValue },
        touched: { ...this.state.touched, [name]: true },
        pristine: false,
      }, () => { this.validateField(name); });
    }
  }

  /**
   * @memberof Form
   * @param {object} event
   * @param {element} preview
   * @returns {nothing} Returns nothing
   */
  handleChangeImage(event, preview) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 2MB max size
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/png'];

    this.setState({
      values: { ...this.state.values, recipeImage: file },
      touched: { ...this.state.touched, recipeImage: true },
      error: { ...this.state.error, recipeImage: null },
      pristine: false,
    });

    this.props.dispatch(clearUploadError());

    if (!uploadValidation(file, maxSize, allowedTypes)) {
      adaptFileEventToValue(this.setImageValue, preview)(event);
    } else {
      this.setState({
        error: { ...this.state.error, recipeImage: uploadValidation(file, maxSize, allowedTypes) },
      });
      // reset input box
      event.target.value = '';
    }
  }

  /**
 * @memberof Form
 * @param {string} value
 * @returns {nothing} Returns nothing
 */
  handleRatingChange(value) {
    this.setState({
      values: { ...this.state.values, rating: value },
      touched: { ...this.state.touched, rating: true },
      pristine: false,
    });
  }

  /**
   * @memberof Form
   * @param {object} e
   * @param {string} field
   * @returns {nothing} Returns nothing
   */
  handleAddField(e, field) {
    e.preventDefault();
    const {
      values, touched, error, fieldCount
    } = this.state;

    this.setState({
      fieldCount: { ...fieldCount, [field]: fieldCount[field]++ }, // eslint-disable-line
      values: { ...values, [field]: values[field].concat('') },
      touched: { ...touched, [field]: touched[field].concat(false) },
      error: { ...error, [field]: error[field].concat(null) }
    });
  }

  /**
   * @memberof Form
   * @param {object} e
   * @param {string} field
   * @param {number} index
   * @returns {nothing} Returns nothing
   */
  handleRemoveField(e, field, index) {
    e.preventDefault();
    const {
      values, touched, error, fieldCount
    } = this.state;

    const fieldValue = Array.from(values[field]);
    const touchedValue = Array.from(touched[field]);
    const errorValue = Array.from(error[field]);

    // remove field value from arrays, splice nutates tha array
    fieldValue.splice(index, 1);
    touchedValue.splice(index, 1);
    errorValue.splice(index, 1);

    this.setState({
      fieldCount: { ...fieldCount, [field]: fieldCount[field]-- }, // eslint-disable-line
      values: { ...values, [field]: fieldValue },
      touched: { ...touched, [field]: touchedValue },
      error: { ...error, [field]: errorValue }
    });
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
   * @param {string} i
   * @returns {nothing} Returns nothing
   */
  handleBlur(event, i) {
    const { target } = event;
    const { value, name } = target;
    const { type } = this.state;
    const validationType = (type === 'addRecipe' || type === 'editRecipe') ? 'recipe' : type;

    if (i || i === 0) {
      const touched = { ...this.state.touched };
      touched[name][i] = true;

      this.setState({
        touched
      }, () => { this.validateField(name, i); });
    } else {
      this.setState({
        touched: { ...this.state.touched, [name]: true },
      }, () => { this.validateField(name); });
    }

    setTimeout(() => {
      if ((name === 'email' || name === 'username') && this.state.error[name] === null) {
        // only set asyncvalidating when sync validation is completed
        this.setState({ asyncValidating: true }, () => {
          asyncValidate(validationType)(name, value)
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
   * @param {string} name
   * @param {number} i
   * @returns {nothing} Returns nothing
   */
  validateField(name, i) {
    const { type } = this.state;
    const validationType = (type === 'addRecipe' || type === 'editRecipe') ? 'recipe' : type;
    const error = syncValidate(validationType)(name, this.state.values, i);
    const errorValue = error || null;

    if (i || i === 0) {
      const errorObj = { ...this.state.error };
      errorObj[name][i] = errorValue;

      this.setState({
        error: errorObj
      }, this.validateForm);
    } else {
      this.setState({
        error: {
          ...this.state.error,
          [name]: errorValue
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
      Object.values(this.state.error).filter((value) => {
        let isError;
        if (Array.isArray(value)) {
          const filterError = (Object.values(value).filter(val => val !== null)).length;
          isError = filterError ? 'Error' : null;
        } else {
          isError = value;
        }
        return isError !== null;
      }).length;
    const touchedFields =
      Object.keys(this.state.touched).filter((key) => {
        let touched;
        if (Array.isArray(this.state.touched[key])) {
          const filterTouched =
            (Object.values(this.state.touched[key]).filter(val => val === true)).length;
          touched = !!filterTouched;
        } else {
          touched = this.state.touched[key];
        }
        return touched === true;
      });
    const { requiredFormFields } = formHelpers;
    const { type } = this.props;
    const formType = (type === 'addRecipe' || type === 'editRecipe') ? 'recipe' : type;
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
   * @param {object} uploadTask
   * @returns {nothing} Returns nothing
   */
  submitter(uploadTask) {
    const { type } = this.state;
    const { formSubmitMapper } = formHelpers;
    const { values } = this.state;
    const newValues = type === 'addRecipe' || type === 'editRecipe' ?
      mapRecipeObject(values) : values;

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
   * @memberof ProfilePic
   * @param {object} image - image
   * @return {state} returns new state
   */
  handleImageUpload(image) {
    const { uploadImageObj: { uploadTask } } = this.props;
    return this.props.dispatch(uploadImage(image, (this.props.recipe ? this.props.recipe.recipeItem.recipeImage : null), `recipes/${Date.now()}`, downloadURL =>
      this.setState({
        values: {
          ...this.state.values,
          recipeImage: downloadURL
        },
        error: {
          ...this.state.error,
          recipeImage: null
        }
      }, () => this.props.dispatch(this.submitter(uploadTask)))));
  }

  /**
   * @memberof Form
   * @param {object} event
   * @returns {nothing} Returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.image) {
      return this.handleImageUpload(this.state.image);
    }

    return this.props.dispatch(this.submitter());
  }

  /**
   * @memberof Form
   * @returns {component} Form
   */
  render() {
    const {
      values, touched, error, pristine, formValid, fieldCount, asyncValidating
    } = this.state;

    const {
      submitting, submitError, type, meta, uploadImageObj
    } = this.props;

    const { title, btnText, extra } = meta;

    const formState = {
      error,
      values,
      touched,
      pristine,
      formValid,
      fieldCount,
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

    return (
      <div>
        {(submitting || uploadImageObj.uploading) &&
          <div className="modal-preloader text-center"><MiniPreLoader /></div>}
        {!submitting && !uploadImageObj.uploading &&
          <Fragment><h4 className="text-center">{title}</h4>
            <hr />
            {(type !== 'login' && type !== 'review') &&
              <p className="text-muted mx-auto text-center">
                Fields marked
                <span className="text-danger">*</span> are important
              </p>}
            <BootstrapForm className="mt-4 mb-3 px-5" onSubmit={handlers.handleSubmit}>
              {(submitError || uploadImageObj.error) && (
                <NormalAlert color="danger">
                  <p className="text-center mb-0">{submitError || 'Something happened, please try again'}</p>
                </NormalAlert>
              )}
              {(type === 'signup' || type === 'login') && <AuthForm type={type} state={formState} handlers={handlers} />}
              {type === 'review' && <ReviewForm type={type} state={formState} handlers={handlers} />}
              {(type === 'addRecipe' || type === 'editRecipe') &&
                <AddEditRecipeForm
                  type={type}
                  state={formState}
                  handlers={handlers}
                  uploadImageObj={uploadImageObj}
                />}
              <Button
                className="btn-block mt-0"
                disabled={!formValid || pristine || submitting || uploadImageObj.uploading}
              >
                {btnText}
              </Button>
            </BootstrapForm>
            {extra && extra}
          </Fragment>}
      </div>);
  }
}

const mapStateToProps = state => ({
  uploadImageObj: state.uploadImage
});


export { Form as FormComponent };

export default connect(mapStateToProps)(Form);
