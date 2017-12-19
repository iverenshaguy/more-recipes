import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import RecipeItems from '../shared/RecipeItems';
import './Home.scss';

/**
 * @exports
 * @class Home
 * @extends Component
 * @returns {component} Home
 */
class Home extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    updateLocationState: PropTypes.func.isRequired,
  };

  /**
   * @memberof Home
   * @returns {function} updateLocationState
   */
  componentWillMount() {
    this.props.updateLocationState('home');
  }

  /**
   * @memberof Home
   * @returns {component} Home
   */
  render() {
    return (
      <div className="home">
        <Hero toggle={this.props.toggleModal} />
        <RecipeItems />
      </div>
    );
  }
}

export default Home;
