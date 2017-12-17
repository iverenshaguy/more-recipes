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

Home.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  updateLocationState: PropTypes.func.isRequired,
};

export default Home;
