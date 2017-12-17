import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';

const Header = props => (
  <header>
    <Navbar auth={props.auth} />
  </header>
);

Header.defaultProps = {
  auth: false,
};

Header.propTypes = {
  auth: PropTypes.bool,
};

export default Header;
