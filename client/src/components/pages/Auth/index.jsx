import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { authPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @class Auth
 * @extends Component
 * @returns {JSX} Auth
 */
class Auth extends Component {
  static propTypes = {
    ...authPropTypes,
    username: PropTypes.string,
    type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    username: null
  }

  /**
   * @constructor
   * @memberof Auth
   * @returns {nothing} returns nothing
   */
  constructor() {
    super();

    this.state = {
      type: null
    };

    this.changeForm = this.changeForm.bind(this);
  }

  /**
   * @memberof Auth
   * @returns {nothing} returns nothing
   */
  componentWillMount() {
    this.setState({ type: this.props.type });
  }


  /**
   * @memberof Auth
   * @param {object} e - event
   * @param {string} type - form type
   * @returns {JSX} Form
   */
  changeForm(e, type) {
    e.preventDefault();

    this.setState({ type });
    this.props.dispatch(push(`/${type}`));
  }

  /**
   * @memberof Auth
   * @returns {JSX} Auth
   */
  render() {
    const { from } = this.props.location.state ? this.props.location.state : { from: { pathname: '/' } };
    if (this.props.isAuthenticated && this.props.type === 'signup') {
      return <Redirect to={{ pathname: `/${this.props.username}` }} />;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={from} />;
    }

    const loginSignupBody = classNames({
      'card-form-body': true,
      'signup-body': this.state.type === 'signup'
    });

    return (
      <div className={loginSignupBody}>
        <div className="container">
          <div className="my-5" id="card-form-wrapper">
            <div className="pt-4 pb-3" id="login-signup-div">
              {this.state.type === 'signup' ?
                <Signup {...this.props} changeForm={this.changeForm} /> :
                <Login {...this.props} changeForm={this.changeForm} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username,
  submitError: state.auth.error
});

export { Auth as AuthComponent };

export default connect(mapStateToProps)(Auth);
