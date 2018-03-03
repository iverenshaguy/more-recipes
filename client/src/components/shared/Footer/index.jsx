import React from 'react';
import './Footer.scss';

/**
 * @exports
 * @function Footer
 * @extends Component
 * @returns {JSX} Footer
 */
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© {(new Date()).getFullYear()} More Recipes</p>
    </div>
  </footer>
);

export default Footer;
