import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';

/**
 * @exports
 * @function RenderCheckBox
 * @param {object} props
 * @returns {JSX} RenderCheckBox
 */
const RenderCheckBox = (props) => {
  const {
    id,
    name,
    label,
    checked,
    required,
    handleChange,
  } = props;

  return (
    <Fragment>
      <FormGroup check>
        <Label htmlFor={id} className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name={name}
            className="custom-control-input"
            id={id}
            checked={checked}
            onChange={handleChange}
          />
          <span className="custom-control-indicator" />
          <span className="custom-control-description">
            {label}{required && <span className="text-danger">*</span>}
          </span>
        </Label>
      </FormGroup>
    </Fragment>
  );
};

RenderCheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default RenderCheckBox;
