import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import FontAwesome from 'react-fontawesome';
import { toggleModal } from '../../../actions/ui';
import './StickyBar.scss';

/**
 * @exports
 * @extends Component
 * @class StickyBar
 * @classdesc Returns App Sticky Bar for Medium to Small Devices
*/
class StickyBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentLocation: PropTypes.string.isRequired
  }

  /**
   * @constructor
   * @memberof StickyBar
   * @returns {nothing} Returns nothing
   */
  constructor() {
    super();

    this.handleUserIconClick = this.handleUserIconClick.bind(this);
    this.handleHomeIconClick = this.handleHomeIconClick.bind(this);
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    this.handleFavoritesIconClick = this.handleFavoritesIconClick.bind(this);
    this.handleAddRecipeIconClick = this.handleAddRecipeIconClick.bind(this);
  }

  /**
   * @memberof StickyBar
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleHomeIconClick(e) {
    e.preventDefault();
    this.props.dispatch(push('/'));
  }

  /**
   * @memberof StickyBar
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleSearchIconClick(e) {
    e.preventDefault();
    this.props.dispatch(push('/'));
  }

  /**
   * @memberof StickyBar
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleFavoritesIconClick(e) {
    e.preventDefault();
    this.props.dispatch(push('/'));
  }

  /**
   * @memberof StickyBar
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleUserIconClick(e) {
    e.preventDefault();
    this.props.dispatch(push('/'));
  }

  /**
   * @memberof StickyBar
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  handleAddRecipeIconClick(e) {
    e.preventDefault();
    this.props.dispatch(toggleModal('addRecipe'));
  }

  /**
   * @memberof StickyBar
   * @returns {JSX} StickyBar
  */
  render() {
    const { currentLocation } = this.props;

    if (currentLocation === '/login' || currentLocation === '/signup') {
      return null;
    }

    return (
      <div className="view-recipe">
        <div className="sticky-bar-wrapper text-center d-block d-sm-block d-md-none">
          <div className="sticky-bar text-center">
            <div className="nav-link d-inline">
              <FontAwesome name="home" tag="i" size="lg" className="home-icon" onClick={this.handleHomeIconClick} />
            </div>
            <div className="nav-link d-inline">
              <FontAwesome name="search" tag="i" size="lg" className="search-icon" onClick={this.handleSearchIconClick} />
            </div>
            <div className="nav-link d-inline">
              <FontAwesome
                name="plus"
                tag="i"
                id="add-edit-modal-icon"
                size="lg"
                onClick={this.handleAddRecipeIconClick}
              />
            </div>
            <div className="nav-link d-inline">
              <FontAwesome name="heart" tag="i" size="lg" className="favorite-recipes-icon" onClick={this.handleFavoritesIconClick} />
            </div>
            <div className="nav-link d-inline">
              <FontAwesome name="user" tag="i" size="lg" className="user-icon" onClick={this.handleUserIconClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentLocation: state.router.location.pathname
});

export { StickyBar as StickyBarComponent };

export default connect(mapStateToProps)(StickyBar);
