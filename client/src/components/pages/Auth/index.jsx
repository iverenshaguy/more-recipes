import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Signup from './SignupForm';
import Login from './LoginForm';
import './LoginSignup.scss';

/**
 * @exports
 * @param {object} props
 * @returns {component} Auth
 */
const Auth = (props) => {
  const { from } = props.location.state ? props.location.state : { from: { pathname: '/' } };

  if (props.isAuthenticated) {
    return <Redirect to={from} />;
  }

  return (
    <div className="login-signup-body">
      <div className="container" id="login-signup-container">
        <Row className="my-5" id="login-signup-wrapper">
          <Col className="p-xs-2 p-lg-4" id="login-signup-div">
            {props.type === 'signup' ? <Signup {...props} /> : <Login {...props} />}
          </Col>
        </Row>
      </div>
    </div>
  );
};

Auth.propTypes = {
  type: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.shape({
      from: PropTypes.shape({
        hash: PropTypes.string,
        key: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string
      })
    })
  }).isRequired,
};

export { Auth as AuthComponent };

const mapStateToProps = state => ({
  authenticating: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  submitError: state.auth.error
});

export default connect(mapStateToProps)(Auth);
