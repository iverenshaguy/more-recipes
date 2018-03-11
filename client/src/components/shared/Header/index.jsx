import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';
import { logout } from '../../../actions/auth';
import { toggleModal } from '../../../actions/ui';
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
    this.showAddRecipeModal = this.showAddRecipeModal.bind(this);
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
   * @param {object} e
   * @returns {component} NavbarWrapper
   */
  showAddRecipeModal() {
    this.props.dispatch(toggleModal('addRecipe'));
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
          showAddRecipeModal={this.showAddRecipeModal}
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
