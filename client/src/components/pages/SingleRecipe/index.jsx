import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Error from '../../shared/Error';
import PreLoader from '../../shared/PreLoader';
import { toggleReviewForm } from '../../../actions/ui';
import { voteRecipe } from '../../../actions/voteRecipe';
import SingleRecipeItem from '../../shared/SingleRecipeItem';
import { isReviewed } from '../../../selectors/recipeReviews';
import { uploadValidation } from '../../../helpers/validations';
import { addRecipeToFavorites } from '../../../actions/favoriteRecipes';
import { fileEventAdapter as adaptFileEventToValue } from '../../../utils';
import { fetchSingleRecipe, updateRecipeImage } from '../../../actions/singleRecipe';
import { uploadImage, clearUploadError, uploadFailure } from '../../../actions/uploadImage';
import { recipeObjectPropTypes, urlMatchPropTypes, userPropTypes } from '../../../helpers/proptypes';
import './SingleRecipe.scss';

/**
 * @exports
 * @class SingleRecipe
 * @extends Component
 * @returns {JSX} SingleRecipe
 */
class SingleRecipe extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        recipeId: PropTypes.shape({
          msg: PropTypes.string
        })
      })
    ]),
    ...userPropTypes,
    ...urlMatchPropTypes,
    ...recipeObjectPropTypes,
    dispatch: PropTypes.func.isRequired,
    reviewed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    usersRecipe: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    error: null
  }

  /**
   * @memberof SingleRecipe
   * @return {nothing} Returns nothing
   */
  componentWillMount() {
    const { match } = this.props;
    const id = parseInt(match.params.id, 10);
    this.props.dispatch(fetchSingleRecipe(id));
  }

  /**
   * @memberof SingleRecipe
   * @param {object} e - event oject
   * @param {element} input - file input
   * @returns {nothing} Returns nothing
   */
  handleChangeImageClick = (e, input) => {
    e.preventDefault();
    this.props.dispatch(clearUploadError());
    input.click();
  }

  /**
   * @memberof SingleRecipe
   * @param {object} event
   * @param {element} preview
   * @returns {nothing} Returns nothing
   */
  handleChangeImage = (event, preview) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 2MB max size
    const allowedTypes = ['image/gif', 'image/jpeg', 'image/png'];

    this.props.dispatch(clearUploadError());

    // check for file to ensure it isn't undefined
    if (file) {
      if (!uploadValidation(file, maxSize, allowedTypes)) {
        adaptFileEventToValue(this.handleImageUpload, preview)(event);
        this.handleImageUpload(file);
      } else {
        this.props.dispatch(uploadFailure(uploadValidation(file, maxSize, allowedTypes)));
        // reset input box
        event.target.value = '';
      }
    }
  }

  /**
   * @memberof SingleRecipe
   * @param {object} image - image
   * @return {state} returns new state
   */
  handleImageUpload = (image) => {
    const { uploadImageObj: { uploadTask }, recipe } = this.props;
    return this.props.dispatch(uploadImage(
      image, recipe.recipeItem.recipeImage,
      `recipes/${Date.now()}`,
      (downloadURL) => {
        this.props.dispatch(clearUploadError());
        this.props.dispatch(updateRecipeImage(downloadURL, recipe.recipeItem.id, uploadTask));
      }
    ));
  }

  /**
   * @memberof SingleRecipe
   * @returns {nothing} Returns nothing
   */
  toggleReviewForm = () => {
    this.props.dispatch(toggleReviewForm());
  }

  /**
   * @memberof SingleRecipe
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  addRecipeToFavorites = (e) => {
    e.preventDefault();
    const { recipe: { recipeItem: { id } } } = this.props;
    this.props.dispatch(addRecipeToFavorites(id));
  }

  /**
   * @memberof SingleRecipe
   * @param {object} e
   * @param {string} type
   * @returns {nothing} Returns nothing
   */
  voteRecipe = (e, type) => {
    e.preventDefault();
    const { recipe: { recipeItem: { id } } } = this.props;
    this.props.dispatch(voteRecipe(id, type));
  }

  /**
   * Renders SingleRecipe Component
   * @memberof SingleRecipe
   * @returns {JSX} SingleRecipe
   */
  render() {
    const {
      isFetching, error, recipe, user, reviewed, usersRecipe
    } = this.props;

    return (
      <Fragment>
        {isFetching && <PreLoader />}
        {!isFetching && error && <Error type={500} />}
        {!isFetching && recipe && Object.keys(recipe).length !== 0 &&
          <div className="view-recipe" >
            <SingleRecipeItem
              user={user}
              recipe={recipe}
              reviewed={reviewed}
              usersRecipe={usersRecipe}
              voteRecipe={this.voteRecipe}
              uploadImageObj={this.props.uploadImageObj}
              toggleReviewForm={this.toggleReviewForm}
              handleChangeImage={this.handleChangeImage}
              handleImageUpload={this.handleImageUpload}
              addRecipeToFavorites={this.addRecipeToFavorites}
              handleChangeImageClick={this.handleChangeImageClick}
            />
          </div>}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.isFetching,
  recipe: state.singleRecipe.recipe.item,
  error: state.singleRecipe.recipe.error,
  uploadImageObj: state.uploadImage,
  reviewed: isReviewed(state.singleRecipe.recipeReviews.reviews, state.auth.user.id),
  usersRecipe: !!state.singleRecipe.recipe.item.recipeItem &&
    (state.auth.user.id === state.singleRecipe.recipe.item.recipeItem.userId),
});

export { SingleRecipe as SingleRecipeComponent };

export default connect(mapStateToProps)(SingleRecipe);
