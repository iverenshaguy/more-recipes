import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TabContent, Nav, NavItem, Row, Col } from 'reactstrap';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './LoginSignup.scss';

/**
 * @exports
 * @class Login-Signup
 * @extends Component
 * @returns {component} Login-Signup
 */
class LoginSignup extends Component {
  static defaultProps = {
    login: false,
    signup: false,
  };

  static propTypes = {
    login: PropTypes.bool,
    signup: PropTypes.bool,
    updateLocationState: PropTypes.func.isRequired,
  };

  /**
   * @memberof LoginSignup
   * @param {object} props
   * @returns {component} Login-Signup
   */
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
    };
  }

  /**
   * @memberof LoginSignup
   * @returns {function} updateLocationState
   */
  componentWillMount() {
    if (this.props.login) {
      this.props.updateLocationState('login');
      this.setState({
        activeTab: '1',
      });
    }

    if (this.props.signup) {
      this.props.updateLocationState('signup');
      this.setState({
        activeTab: '2',
      });
    }
  }

  /**
   * @memberof LoginSignup
   * @returns {state} returns a new state
   * @param {string} tab
   */
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  /**
   * @memberof LoginSignup
   * @returns {component} Home
   */
  render() {
    return (
      <div className="login-signup-body">
        <div className="container" id="login-signup-container">
          <Row className="my-auto" id="login-signup-wrapper">
            <Col className="p-xs-2 p-lg-4" id="login-signup-div">
              <Nav tabs className="mx-auto" role="tablist">
                <NavItem>
                  <NavLink
                    to="/signup"
                    className="nav-link"
                    onClick={() => {
                      this.toggle('2');
                    }}
                    id="nav-tab-link-2"
                    role="tab"
                  >
                    REGISTER
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    onClick={() => {
                      this.toggle('1');
                    }}
                    id="nav-tab-link-1"
                    role="tab"
                  >
                    SIGNIN
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <SignupForm />
                <LoginForm />
              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export { LoginForm, SignupForm };
export default LoginSignup;
