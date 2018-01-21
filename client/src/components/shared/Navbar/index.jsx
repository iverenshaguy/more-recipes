import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';
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

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @memberof NavbarWrapper
   * @param {object} e
   * @returns {component} NavbarWrapper
   */
  handleClick(e) {
    e.preventDefault();
    this.props.logout();
  }

  /**
   * @memberof NavbarWrapper
   * @returns {component} NavbarWrapper
   */
  render() {
    if (!this.props.isAuthenticated || this.props.type === 'login' || this.props.type === 'signup') {
      return (
        <div>
          <Navbar color="faded" light expand="md" id="more-recipes-navbar">
            <NavLink to="/" className="navbar-brand">
              MORE RECIPES
            </NavLink>
          </Navbar>
        </div>
      );
    }

    return (
      <Navbar color="faded" light className="navbar-expand" id="more-recipes-navbar">
        <NavLink to="/" className="navbar-brand">
          MORE RECIPES
        </NavLink>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link">
                <FontAwesome name="home" />
              </NavLink>
            </NavItem>
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
                  <img src="images/profile/user1.jpg" className="rounded-cirle" alt="User" /> Jane
                </DropdownToggle>
                <DropdownMenu right>
                  <a className="dropdown-item" href="user-profile.html">
                    Profile
                  </a>
                  <a className="dropdown-item">Edit Profile</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="user-profile.html">
                    My Recipes
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item">Settings</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/login" onClick={this.handleClick}>
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
                  data-toggle="modal"
                  title="New Recipe"
                >
                  Add a Recipe
                </a>
                <a className="dropdown-item" href="search-recipes-user.html">
                  All Recipes
                </a>
                <a className="dropdown-item get-favorites" href="user-profile.html">
                  Favorite Recipes
                </a>
                <a className="dropdown-item" href="top-recipes-user.html">
                  Top Recipes
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
  type: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export default NavbarWrapper;
