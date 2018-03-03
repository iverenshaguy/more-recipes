import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
 * @returns {JSX} Home
 */
class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ...multiRecipePropTypes,
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
      searchValue: '',
      limit: 5
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  /**
   * @memberof Home
   * @return {nothing} Returns nothing
   */
  componentWillMount() {
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
   * @param {object} event
   * @returns {state} home
   */
  handleSearchInput(event) {
    event.preventDefault();

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

    const { currentPage, limit, searchValue } = this.state;
    this.setState({
      title: 'SEARCH RESULTS'
    }, () => this.props.dispatch(searchRecipes(searchValue, currentPage, limit)));
  }

  /**
   * @memberof Home
   * @returns {fragment} Recipe items
   */
  renderBody() {
    const { isFetching, recipes, metadata } = this.props;
    const { title } = this.state;

    if (isFetching) {
      return <PreLoader />;
    }

    return (
      <RecipeItems
        title={title}
        recipes={recipes}
        handlePageChange={this.handlePageChange}
        metadata={metadata}
      />
    );
  }

  /**
   * @memberof Home
   * @returns {JSX} Home
   */
  render() {
    return (
      <div className="home">
        <Hero
          dispatch={this.props.dispatch}
          handleSearch={this.handleSearch}
          handleSearchInput={this.handleSearchInput}
          searchValue={this.state.searchValue}
        />
        {this.renderBody()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  recipes: state.recipes.items,
  metadata: state.recipes.metadata
});

export { Home as HomeComponent };

export default connect(mapStateToProps)(Home);
