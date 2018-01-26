import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function NormalAlert
 * @extends Component
 * @returns {component} Alert
 */
const NormalAlert = ({ color, children }) => // eslint-disable-line
  (<Alert color={color}>{children}</Alert>);

NormalAlert.propTypes = {
  color: PropTypes.string.isRequired
};

export default NormalAlert;
