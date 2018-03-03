import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
import { logout } from '../../../actions/auth';
import { userPropTypes } from '../../../helpers/proptypes';

/**
 * @exports Header
 * @class Header
 * @return {Component} Header
 */
class Header extends Component {
  /**
   * @memberof Header
   * @constructor
   * @returns {JSX} Logged out User
   */
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  /**
   * @memberof Header
   * @returns {JSX} Logged out User
   */
  logout() {
    this.props.dispatch(logout());
  }

  /**
   * @memberof Header
   * @returns {JSX} Header
   */
  render() {
    return (
      <header>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          logout={this.logout}
          user={this.props.user}
        />
      </header>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  ...userPropTypes
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export { Header as HeaderComponent };

export default connect(mapStateToProps)(Header);
