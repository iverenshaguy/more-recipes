import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar';

const Header = props => (
  <header>
    <Navbar auth={props.auth} type={props.type} />
  </header>
);

Header.defaultProps = {
  auth: false,
};

Header.propTypes = {
  auth: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

export default Header;
