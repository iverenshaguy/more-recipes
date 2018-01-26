import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setCurrentLocation from '../../store/location/actions';
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
    dispatch: PropTypes.func.isRequired
  };

  /**
   * @memberof Home
   * @return {state} New currentLocation State
   */
  componentWillMount() {
    this.props.dispatch(setCurrentLocation('home'));
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
