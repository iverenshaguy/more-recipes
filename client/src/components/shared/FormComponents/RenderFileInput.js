/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { fileEventAdapter as adaptFileEventToValue } from '../../../utils';

const preview = document.querySelector('.photo-preview');

const RenderFileInput = ({
  input: {
    value: omitValue, onChange, onBlur, ...inputProps
  },
  meta: { touched, error },
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
        onChange={adaptFileEventToValue(onChange, preview)}
        onBlur={adaptFileEventToValue(onBlur, preview)}
        type="file"
        {...inputProps}
        {...props}
      />
      {touched && error && <small className="file-feedback">{error}</small>}
    </Fragment>
  );

RenderFileInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    // active: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.any
  }).isRequired
};

export default RenderFileInput;
