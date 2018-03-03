import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

/**
 * @exports
 * @function Error
 * @param {object} props
 * @returns {JSX} Error
 */
const Error = (props) => {
  const { type } = props;
  return (
    <div className="container align-items-center justify-content-center" id="error-wrapper">
      <div className="container">
        <h3 className="text-center">{type === 404 ? 'Page Not Found' : 'Something happened, please try again'}</h3>
      </div>
    </div>
  );
};

Error.propTypes = {
  type: PropTypes.number
};

Error.defaultProps = {
  type: 500
};

export default Error;
