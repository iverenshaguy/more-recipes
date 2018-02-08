import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import Form from '../../shared/Forms';
import setCurrentLocation from '../../../actions/location';
import { authPropTypes } from '../../../helpers/proptypes';
import './Auth.scss';

/**
 * @exports
 * @class Auth
 * @extends Component
 * @returns {component} Auth
 */
class Auth extends Component {
  static propTypes = {
    ...authPropTypes,
    type: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  /**
   * @memberof LoginForm
   * @returns {nothing} Returns nothing
   */
  componentWillMount() {
    this.props.dispatch(setCurrentLocation('auth'));
  }

  /**
   * @memberof Auth
   * @returns {component} Auth
   */
  render() {
    const { from } = this.props.location.state ? this.props.location.state : { from: { pathname: '/' } };

    if (this.props.isAuthenticated) {
      return <Redirect to={from} />;
    }

    const signupMeta = {
      title: 'Register for a New Account',
      btnText: 'SIGN UP',
      extra: <p className="text-center">Already have an account, <Link to="/login">Log in here</Link>.</p>
    };

    const loginMeta = {
      title: 'Sign In to Your Account',
      btnText: 'SIGN IN',
      extra: <p className="text-center">Dont have an account, <Link to="/signup">Sign up here</Link>.</p>
    };

    return (
      <div className="login-signup-body">
        <div className="container" id="login-signup-container">
          <Row className="my-5" id="login-signup-wrapper">
            <Col className="p-xs-2 p-lg-4" id="login-signup-div">
              {this.props.type === 'signup' ?
                <Form {...this.props} type="signup" meta={signupMeta} /> :
                <Form {...this.props} type="login" meta={loginMeta} />}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export { Auth as AuthComponent };

const mapStateToProps = state => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  submitError: state.auth.error
});

export default connect(mapStateToProps)(Auth);
