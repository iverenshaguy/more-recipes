import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label } from 'reactstrap';

/**
 * @exports
 * @function RenderSelect
 * @param {object} props
 * @returns {JSX} RenderSelect
 */
const RenderSelect = ({
  id,
  name,
  label,
  value,
  required,
  labelClass,
  handleChange,
  optionsArray,
}) => {
  const options = optionsArray.map(option => <option key={option} value={option}>{option}</option>);
  return (
    <Fragment>
      <FormGroup>
        <Label htmlFor="difficulty" className={`col-form-label ${labelClass}`}>
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
        <Input
          type="select"
          name={name}
          className="custom-select form-control"
          id={id}
          value={value}
          onChange={handleChange}
        >
          {options}
        </Input>
      </FormGroup>
    </Fragment>
  );
};

RenderSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  labelClass: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  optionsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};

RenderSelect.defaultProps = {
  labelClass: null
};

export default RenderSelect;
