/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { fileEventAdapter as adaptFileEventToValue } from '../../../utils';

const preview = document.querySelector('.photo-preview');

const RenderFileInput = ({
  value,
  meta: { touched, error },
  handleChangeImage,
  ...props
}) => (
    <Fragment>
      {touched &&
        !error && (
          <div className="preview-img-div">
            <img className="photo-preview" src="" alt="preview" />
          </div>
        )}
      <Input
        onChange={adaptFileEventToValue(handleChangeImage, preview)}
        onBlur={adaptFileEventToValue(handleChangeImage, preview)}
        type="file"
      />
      {touched && error && <small className="file-feedback">{error}</small>}
    </Fragment>
  );

RenderFileInput.propTypes = {
  value: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    // active: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.any
  }).isRequired
};

export default RenderFileInput;