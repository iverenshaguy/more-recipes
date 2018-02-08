import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setCurrentLocation from '../../../actions/location';
import { fetchTopRecipes, searchRecipes } from '../../../actions/recipes';
import Hero from './Hero';
import RecipeItems from '../../shared/RecipeItems';
import PreLoader from '../../shared/PreLoader';
import { multiRecipePropTypes } from '../../../helpers/proptypes';
import './Home.scss';

/**
 * @exports
 * @class Home
 * @extends Component
 * @returns {component} Home
 */
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ...multiRecipePropTypes
  };

  /**
   * @constructor
   * @memberof Home
   * @returns {nothing} - Returns nothing
   */
  constructor() {
    super();

    this.state = {
      title: 'TOP RECIPES',
      currentPage: 1,
      limit: 5,
      searchValue: ''
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @memberof Home
   * @return {nothing} Returns nothing
   */
  componentWillMount() {
    this.props.dispatch(setCurrentLocation('home'));
    this.props.dispatch(fetchTopRecipes(this.state.currentPage, this.state.limit));
  }

  /**
   * @memberof Home
   * @param {number} page
   * @returns {state} home
   */
  handlePageChange(page) {
    let fetch;
    const { limit, searchValue } = this.state;

    if (this.state.title === 'TOP RECIPES') {
      fetch = fetchTopRecipes(page, limit);
    } else {
      fetch = searchRecipes(searchValue, page, limit);
    }

    this.setState({
      currentPage: page
    }, () => this.props.dispatch(fetch));
  }

  /**
   * @memberof Home
   * @param {event} event
   * @returns {state} home
   */
  handleSearchInput(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  /**
   * @memberof Home
   * @param {object} event
   * @returns {state} home
   */
  handleSearch(event) {
    event.preventDefault();

    const { searchValue, currentPage, limit } = this.state;
    this.setState({
      title: 'SEARCH RESULTS'
    }, () => this.props.dispatch(searchRecipes(searchValue, currentPage, limit)));
  }

  /**
   * @memberof Home
   * @returns {fragment} Recipe items
   */
  renderBody() {
    const { isFetching, recipes, metaData } = this.props;
    const { title } = this.state;

    if (isFetching) {
      return <PreLoader />;
    }

    return (
      <RecipeItems
        title={title}
        recipes={recipes}
        handlePageChange={this.handlePageChange}
        metaData={metaData}
      />
    );
  }

  /**
   * @memberof Home
   * @returns {component} Home
   */
  render() {
    return (
      <div className="home">
        <Hero
          dispatch={this.props.dispatch}
          handleSearchInput={this.handleSearchInput}
          handleSearch={this.handleSearch}
          searchValue={this.state.searchValue}
        />
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  recipes: state.recipes.recipes,
  metaData: state.recipes.metaData
});

export { Home as HomeComponent };

export default connect(mapStateToProps)(Home);
