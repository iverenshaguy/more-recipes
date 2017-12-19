import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/font-awesome/css/font-awesome.css';
import '../../assets/kitchen-font/flaticon.css';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import StickyBar from '../shared/StickyBar';
import Modal from '../shared/Modals';
import Home from '../Home';
import LoginSignup from '../LoginSignup';
import './App.scss';

/**
 * @exports
 * @class App
 * @extends Component
 * @returns {component} App
 */
class App extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      addRecipeModal: false,
      socialModal: false,
      location: '',
    };
  }

  /**
   * @memberof App
   * @param {string} location
   * @return {state} New location State
   */
  updateLocationState = (location) => {
    this.setState({
      location,
    });
  };

  /**
   * @memberof App
   * @param {string} modal - Type of Modal
   * @override
   */
  toggleModal = (modal) => {
    this.setState(prevState => ({
      [modal]: !prevState[modal],
    }));
  };

  /**
   * @memberof App
   * @returns {component} App
   */
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header auth type={this.state.location} />
          <div className="content">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    toggleModal={this.toggleModal}
                    updateLocationState={this.updateLocationState}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <LoginSignup {...props} updateLocationState={this.updateLocationState} login />
                )}
              />
              <Route
                path="/signup"
                render={props => (
                  <LoginSignup {...props} updateLocationState={this.updateLocationState} signup />
                )}
              />
            </Switch>
          </div>
          <Footer />
          <StickyBar toggleModal={this.toggleModal} type={this.state.location} />
          <Modal
            addRecipeModal={this.state.addRecipeModal}
            socialModal={this.state.socialModal}
            toggle={this.toggleModal}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
