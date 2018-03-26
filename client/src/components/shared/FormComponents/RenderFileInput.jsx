import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';

/**
 * @exports
 * @function RenderFileInput
 * @param {object} props
 * @returns {JSX} RenderFileInput
 */
const RenderFileInput = (props) => {
  let recipeImage;

  const {
    name,
    value,
    label,
    labelClass,
    required,
    meta: {
      error,
      touched
    },
    handleChangeImage,
  } = props;

  const validFeedBack = classNames({
    'invalid-feedback': touched && error,
    'd-none': touched && !error
  });

  const showImage = classNames({
    'd-none': !touched || error,
    'd-block': touched && value && !error
  });

  return (
    <Fragment>
      <Label className={`col-form-label ${labelClass}`}>
        {label}
        {required && <span className="text-danger">*</span>}
      </Label>
      <div className={`image-preview-div ${showImage}`}>
        <img
          src={null}
          ref={(ref) => { recipeImage = ref; }}
          className={`img-fluid ${showImage}`}
          id="recipe-image-preview"
          alt="recipe-preview"
        />
        <br /><br />
      </div>
      <FormGroup>
        <input
          name={name}
          required={required}
          onChange={e => handleChangeImage(e, recipeImage)}
          type="file"
          accept="image/gif, image/jpeg, image/png"
        />
        {touched && error && <div className={validFeedBack}>{error}</div>}
      </FormGroup>
    </Fragment>
  );
};

RenderFileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  labelClass: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired, // eslint-disable-line
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  }).isRequired,
  handleChangeImage: PropTypes.func.isRequired,
};

export default RenderFileInput;
