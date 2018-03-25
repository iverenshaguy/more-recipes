import React, { Fragment } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { Input, FormGroup, Label, InputGroup } from 'reactstrap';
import { renderFormFieldPropTypes } from '../../../helpers/proptypes';

const RenderInput = ({
  id,
  rows,
  name,
  type,
  label,
  index,
  required,
  labelClass,
  placeholder,
  meta: {
    error,
    touched,
    asyncValidating
  },
  handleChange,
  handleRemoveField,
  handleBlur,
  handleFocus,
  value
}) => {
  const validInput = classNames({
    'is-invalid': touched && error,
    'is-valid': touched && !error
  });

  const validFeedBack = classNames({
    'invalid-feedback': touched && error,
    'd-none': touched && !error
  });

  const input = (<Input
    id={id}
    type={type}
    name={name}
    rows={type === 'text-area' ? rows : undefined}
    placeholder={placeholder}
    className={validInput}
    value={value}
    onChange={e => ((index || index === 0) ? handleChange(e, index) : handleChange(e))}
    onBlur={e => ((index || index === 0) ? handleBlur(e, index) : handleBlur(e))}
    onFocus={e => handleFocus(e)}
  />);

  const inputGroup = (
    <InputGroup>
      {input}
      <div className="input-group-append">
        <span className="input-group-btn">
          <button
            className={`btn btn-secondary ${validInput}`}
            onClick={e => handleRemoveField(e, name, index)}
          >
            <FontAwesome name="times" tag="i" />
          </button>
        </span>
      </div>
    </InputGroup>);

  return (
    <Fragment>
      <FormGroup>
        {label &&
          <Label htmlFor={id} className={`col-form-label ${labelClass}`}>
            {label}
            {required && <span className="text-danger">*</span>}
          </Label>}
        {!index && input}
        {!!index && inputGroup}
        {touched && error && <div className={validFeedBack}>{error}</div>}
        {touched && (name === 'email' || name === 'username') &&
          asyncValidating && <small className="form-text">Checking...</small>}
      </FormGroup>
    </Fragment>
  );
};

RenderInput.propTypes = {
  ...renderFormFieldPropTypes
};

export default RenderInput;
