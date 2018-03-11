import React, { Component } from 'react';
import {
  Nav,
  Navbar,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { userPropTypes } from '../../../helpers/proptypes';
import './Navbar.scss';

/**
 * @export
 * @class NavbarWrapper
 * @returns {component} NavbarWrapper
 */
class NavbarWrapper extends Component {
  /**
   * @memberof NavbarWrapper
   * @constructor
   * @returns {component} NavbarWrapper
   */
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.showAddRecipeModal = this.showAddRecipeModal.bind(this);
  }

  /**
   * @memberof NavbarWrapper
   * @param {object} e
   * @returns {component} NavbarWrapper
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  /**
   * @memberof NavbarWrapper
   * @param {object} e
   * @returns {component} NavbarWrapper
   */
  showAddRecipeModal(e) {
    e.preventDefault();
    this.props.showAddRecipeModal();
  }

  /**
   * @memberof NavbarWrapper
   * @returns {component} NavbarWrapper
   */
  render() {
    const { user, isAuthenticated } = this.props;
    const altImage = 'images/user-image-placeholder.png';

    if (!isAuthenticated) {
      return (
        <div>
          <Navbar color="faded" light expand="md" id="more-recipes-navbar">
            <Link to="/" className="navbar-brand">
              MORE RECIPES
            </Link>
          </Navbar>
        </div>
      );
    }

    return (
      <Navbar color="faded" light className="navbar-expand" id="more-recipes-navbar">
        <Link to="/" className="navbar-brand">
          MORE RECIPES
        </Link>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav className="justify-content-start notifications-link">
              <DropdownToggle nav>
                <FontAwesome name="bell" size="lg" />
              </DropdownToggle>
              <DropdownMenu right>
                <div className="container-fluid">
                  <p>You have a new review</p>
                  <div className="dropdown-divider" />
                  <p>3 people viewed your recipe</p>
                  <div className="dropdown-divider" />
                  <p>Review your security details</p>
                  <div className="dropdown-divider" />
                  <p>Chef Steve just posted a new recipe</p>
                  <div className="dropdown-divider" />
                  <p>1 person added your recipe to their favorites</p>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <div className="nav-profile-picture-div rounded-cirle menu-dropdown d-inline">
                <DropdownToggle nav>
                  <img src={user && user.profilePic ? user.profilePic : altImage} className="rounded-cirle" alt="User" />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to={`/${user && user.username}`} className="dropdown-item">
                    Profile
                  </Link>
                  <Link to={`/${user && user.username}/profile/edit`} className="dropdown-item">Edit Profile</Link>
                  {/* <div className="dropdown-divider" /> */}
                  {/* <a className="dropdown-item" id="my-recipes" href="user-profile.html">
                    My Recipes
                  </a> */}
                  {/* <div className="dropdown-divider" /> */}
                  {/* <a className="dropdown-item">Settings</a> */}
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/login" onClick={this.logout}>
                    Log out
                  </a>
                </DropdownMenu>
              </div>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="menu-dropdown">
                <FontAwesome name="reorder" size="lg" />
              </DropdownToggle>
              <DropdownMenu right>
                <a
                  className="dropdown-item add-recipe"
                  href="#add-edit-modal"
                  onClick={this.showAddRecipeModal}
                  title="New Recipe"
                >
                  Add a Recipe
                </a>
                {/* <a className="dropdown-item get-favorites" href="user-profile.html">
                  Favorite Recipes
                </a> */}
                <Link to="/" className="dropdown-item">
                  Top Recipes
                </Link>
                <a
                  className="dropdown-item"
                  href="#favorite-recipes"
                  title="favorite-recipes"
                >
                  Favorite Recipes
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

NavbarWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  showAddRecipeModal: PropTypes.func.isRequired,
  ...userPropTypes
};

export default NavbarWrapper;
