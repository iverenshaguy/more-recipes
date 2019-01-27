import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import FontAwesome from 'react-fontawesome';
import RecipeItems from '../../shared/RecipeItems';
import { MiniPreLoader } from '../../shared/PreLoader';
import { fetchFavoriteRecipes } from '../../../actions/recipes';
import { userPropTypes, multiRecipePropTypes, urlMatchPropTypes } from '../../../helpers/proptypes';
import './FavoriteRecipes.scss';

/**
 * @exports
 * @class FavoriteRecipes
 * @extends Component
 * @classdesc Returns User FavoriteRecipes Page
 * @returns {JSX} User FavoriteRecipes
 */
class FavoriteRecipes extends Component {
  static propTypes = {
    ...userPropTypes,
    ...urlMatchPropTypes,
    ...multiRecipePropTypes,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  /**
   * @memberof FavoriteRecipes
   * @constructor
   * @returns {JSX} FavoriteRecipes
   */
  constructor() {
    super();

    this.state = {
      limit: 5,
      currentPage: 1,
      activeTab: 'recipes'
    };

    this.toggleTab = this.toggleTab.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    // this.showModal = this.showModal.bind(this);
  }

  /**
   * @memberof FavoriteRecipes
   * @returns {nothing} returns nothing
   */
  componentWillMount() {
    const { match, user, dispatch } = this.props;

    if ((match.path).includes('categories')) {
      dispatch(push(`/${user.username}/favorites/categories`));

      this.setState({
        activeTab: 'categories'
      });
    } else if (match.params.username !== user.username) {
      // redirect user to real username if a new uer logins after an old user
      dispatch(push(`/${user.username}/favorites`));
    }

    dispatch(fetchFavoriteRecipes(this.props.user.id, this.state.currentPage, this.state.limit));
  }

  /**
   * @memberof Home
   * @param {number} page
   * @returns {state} home
   */
  handlePageChange(page) {
    this.setState({
      currentPage: page
    }, () => this.props.dispatch(fetchFavoriteRecipes(this.props.user.id, page, this.state.limit)));
  }

  // /**
  //  * @memberof FavoriteRecipes
  //  * @param {string} modal - modal to show
  //  * @returns {nothing} Returns nothing
  //  */
  // showModal(modal) {
  //   this.props.dispatch(toggleModal(modal));
  // }

  /**
   * @memberof FavoriteRecipes
   * @param {object} e - event
   * @param {string} activeTab - tab
   * @returns {nothing} Returns nothing
   */
  toggleTab(e, activeTab) {
    e.preventDefault();
    const { user } = this.props;
    const location = activeTab === 'recipes' ? `/${user.username}/favorites` : `/${user.username}/favorites/categories`;

    this.setState({ activeTab });
    this.props.dispatch(push(location));
  }

  /**
   * @memberof FavoriteRecipes
   * @returns {JSX} User FavoriteRecipes
   */
  render() {
    const { activeTab } = this.state;

    const {
      isFetching, recipes, metadata, user
    } = this.props;

    const recipesTab = classNames({
      'd-inline': true,
      'recipes-tab': true,
      'text-center': true,
      active: activeTab === 'recipes'
    });

    const categoriesTab = classNames({
      'd-inline': true,
      'recipes-tab': true,
      'text-center': true,
      active: activeTab === 'categories'
    });

    return (
      <div className="favorite-recipes pb-4">
        <h3 className="text-center pt-5">FAVORITE RECIPES</h3>
        <div className="profile-toggle-wrapper text-center mt-3">
          <Link to={`/${user.username}`} className="back-link"><FontAwesome name="arrow-left" tag="i" /> BACK TO PROFILE</Link>
          <a className={recipesTab} href="#recipes" onClick={e => this.toggleTab(e, 'recipes')}>
            <i className="aria-hidden flaticon flaticon-flat-plate-with-hot-food-from-side-view" />
            <span className="d-none d-sm-inline">&nbsp;&nbsp;RECIPES</span>
          </a>
          <a className={categoriesTab} href="#categories" onClick={e => this.toggleTab(e, 'categories')}>
            <FontAwesome name="folder" size="lg" tag="i" />
            <span className="d-none d-sm-inline">&nbsp;&nbsp;CATEGORIES</span>
          </a>
        </div>
        <div className="container-fluid text-center user-profile-recipe-cards-wrapper mb-5 mt-1">
          {isFetching &&
            <div className="justify-content-center py-5">
              <MiniPreLoader />
            </div>}
          {!isFetching &&
            <div className="row justify-content-center user-profile-recipe-cards px-5 px-sm-5 px-md-0 mt-0">
              {activeTab === 'recipes' && (
                <RecipeItems
                  title="RECIPES"
                  recipes={recipes}
                  handlePageChange={this.handlePageChange}
                  metadata={metadata}
                />
              )}
              {activeTab === 'categories' && (
                <RecipeItems
                  title="RECIPE CATEGORIES"
                  recipes={recipes}
                  handlePageChange={this.handlePageChange}
                  metadata={metadata}
                />
              )}
            </div>}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.isFetching,
  recipes: state.recipes.items,
  metadata: state.recipes.metadata,
});

export { FavoriteRecipes as FavoriteRecipesComponent };
export default connect(mapStateToProps)(FavoriteRecipes);
