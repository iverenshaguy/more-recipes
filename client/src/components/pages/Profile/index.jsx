import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import ProfilePic from './ProfilePic';
import RecipeItems from '../../shared/RecipeItems';
import { MiniPreLoader } from '../../shared/PreLoader';
import { toggleModal } from '../../../actions/ui';
import { fetchUserRecipes } from '../../../actions/recipes';
import { userPropTypes, multiRecipePropTypes, urlMatchPropTypes } from '../../../helpers/proptypes';
import './Profile.scss';

/**
 * @exports
 * @class Profile
 * @extends Component
 * @classdesc Returns User Profile Page
 * @returns {JSX} User Profile
 */
class Profile extends Component {
  static propTypes = {
    ...userPropTypes,
    ...urlMatchPropTypes,
    ...multiRecipePropTypes,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  /**
   * @memberof Profile
   * @constructor
   * @returns {JSX} Profile
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
    this.showAddRecipeModal = this.showAddRecipeModal.bind(this);
  }

  /**
   * @memberof Profile
   * @returns {nothing} returns nothing
   */
  componentWillMount() {
    const { match, user, dispatch } = this.props;
    if (match.params.username !== user.username) {
      dispatch(push(`/${user.username}`));
    }

    dispatch(fetchUserRecipes(this.props.user.id, this.state.currentPage, this.state.limit));
  }

  /**
   * @memberof Home
   * @param {number} page
   * @returns {state} home
   */
  handlePageChange(page) {
    this.setState({
      currentPage: page
    }, () => this.props.dispatch(fetchUserRecipes(this.props.user.id, page, this.state.limit)));
  }

  /**
   * @memberof Profile
   * @returns {nothing} Returns nothing
   */
  showAddRecipeModal() {
    this.props.dispatch(toggleModal('addRecipe'));
  }

  /**
   * @memberof Profile
   * @param {object} e - event
   * @param {string} activeTab - tab
   * @returns {nothing} Returns nothing
   */
  toggleTab(e, activeTab) {
    e.preventDefault();
    const { user } = this.props;
    const location = activeTab === 'recipes' ? `/${user.username}` : `/${user.username}/favorites`;

    this.setState({ activeTab });
    this.props.dispatch(push(location));
  }

  /**
   * @memberof Profile
   * @returns {JSX} User Profile
   */
  render() {
    const { activeTab } = this.state;

    const {
      user, isFetching, recipes, metadata, uploadImage
    } = this.props;

    const recipesTab = classNames({
      'd-inline': true,
      'recipes-tab': true,
      'text-center': true,
      active: activeTab === 'recipes'
    });

    const favoritesTab = classNames({
      'd-inline': true,
      'favorites-tab': true,
      'text-center': true,
      active: activeTab === 'favorites'
    });

    return (
      <div className="user-profile pb-4">
        <div className="container-fluid user-profile-div">
          <div className="row justify-content-start user-info py-4 px-3 px-md-5">
            <ProfilePic user={user} uploadImage={uploadImage} />
            <div className="col-7 col-md-8 name-div align-self-center">
              <p className="name pt-2">{`${user.firstname} ${user.lastname}`}</p>
              <small className="text-muted username pt-1">{`@${user.username}`}</small>
              <p className="about-me pt-2">{user.aboutMe}</p>
            </div>
          </div>
        </div>
        <div className="container-fluid text-center user-profile-recipe-cards-wrapper mb-5 mt-1">
          <Button
            onClick={this.showAddRecipeModal}
            className="btn-default btn-lg d-none d-md-inline-block"
            id="home-add-recipe-btn"
            title="New Recipe"
          >
            Add a New Recipe
          </Button>
          <div className="profile-toggle-wrapper text-center mt-3">
            <a className={recipesTab} href="#recipes" onClick={e => this.toggleTab(e, 'recipes')}>
              <i className="aria-hidden flaticon flaticon-flat-plate-with-hot-food-from-side-view" />
              <span className="d-none d-sm-inline">&nbsp;&nbsp;RECIPES</span>
            </a>
            <a className={favoritesTab} href="#recipes" onClick={e => this.toggleTab(e, 'favorites')}>
              <FontAwesome name="heart" size="lg" tag="i" />
              <span className="d-none d-sm-inline">&nbsp;&nbsp;FAVORITES</span>
            </a>
          </div>
          {isFetching &&
            <div className="justify-content-center py-5">
              <MiniPreLoader />
            </div>}
          {!isFetching &&
            <div className="row justify-content-center user-profile-recipe-cards px-5 px-sm-5 px-md-0 mt-0">
              <RecipeItems
                title="MY RECIPES"
                recipes={recipes}
                handlePageChange={this.handlePageChange}
                metadata={metadata}
              />
            </div>}
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.isFetching,
  recipes: state.userRecipes.items,
  metadata: state.userRecipes.metadata,
  uploadImage: state.uploadImage
});

export { Profile as ProfileComponent };
export default connect(mapStateToProps)(Profile);
