import React from 'react';
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
 * Returns NavbarWrapper Component
 * @export
 * @function NavbarWrapper
 * @param {object} props
 * @returns {component} NavbarWrapper
 */
const NavbarWrapper = (props) => {
  const { user, isAuthenticated } = props;
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
                <img
                  src={user && user.profilePic ? user.profilePic : altImage}
                  onError={(e) => { e.target.src = altImage; }}
                  className="rounded-cirle"
                  alt="User"
                />
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
                <a className="dropdown-item" href="/login" onClick={props.logout}>
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
              <Link
                to="/recipes/new"
                className="dropdown-item add-recipe"
                href="/recipes/new"
                title="New Recipe"
              >
                Add a Recipe
              </Link>
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
};

NavbarWrapper.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  showAddRecipeModal: PropTypes.func.isRequired,
  ...userPropTypes
};

export default NavbarWrapper;
