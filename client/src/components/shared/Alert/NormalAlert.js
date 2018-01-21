import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/**
 * @exports
 * @class Alert
 * @extends Component
 * @returns {component} Alert
 */
class NormalAlert extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired
  };

  /**
   * @memberof Alert
   * @return {Component} New Alert Component
   */
  render() {
    return <Alert color={this.props.color}>{this.props.children}</Alert>; //eslint-disable-line
  }
}

export default NormalAlert;
