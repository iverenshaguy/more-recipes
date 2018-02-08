import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Input, FormGroup, Label } from 'reactstrap';
import { renderFormFieldPropTypes } from '../../../helpers/proptypes';

const RenderInput = ({
  id,
  name,
  type,
  label,
  required,
  placeholder,
  meta: {
    error,
    touched,
    asyncValidating
  },
  handleChange,
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

  return (
    <Fragment>
      <FormGroup>
        <Label for={id} className="col-form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </Label>
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={validInput}
          value={value}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e)}
          onFocus={e => handleFocus(e)}
        />
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
