import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { locationActions } from '../../store/location';
import Hero from './Hero';
import RecipeItems from '../shared/RecipeItems';
import './Home.scss';

const { setHomeLocation } = locationActions;

/**
 * @exports
 * @class Home
 * @extends Component
 * @returns {component} Home
 */
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  /**
   * @memberof Home
   * @return {state} New currentLocation State
   */
  componentWillMount() {
    this.props.dispatch(setHomeLocation());
  }

  /**
   * @memberof Home
   * @returns {component} Home
   */
  render() {
    return (
      <div className="home">
        <Hero dispatch={this.props.dispatch} />
        <RecipeItems />
      </div>
    );
  }
}

export { Home as HomeComponent };

export default connect()(Home);
