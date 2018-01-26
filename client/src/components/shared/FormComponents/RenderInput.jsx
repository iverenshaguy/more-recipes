import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from 'reactstrap';

const RenderInput = ({
  name,
  placeholder,
  type,
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
      <Input
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
    </Fragment>
  );
};

RenderInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    asyncValidating: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

RenderInput.defaultProps = {
  placeholder: null
};

export default RenderInput;
