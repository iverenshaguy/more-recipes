import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Error from '../../shared/Error';
import PreLoader from '../../shared/PreLoader';
import { toggleReviewForm } from '../../../actions/ui';
import { voteRecipe } from '../../../actions/voteRecipe';
import SingleRecipeItem from '../../shared/SingleRecipeItem';
import { isReviewed } from '../../../selectors/recipeReviews';
import { fetchSingleRecipe } from '../../../actions/singleRecipe';
import { addRecipeToFavorites } from '../../../actions/favoriteRecipes';
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
  }

  static defaultProps = {
    error: null
  }

  /**
   * @constructor
   * @memberof SingleRecipe
   * @returns {nothing} Returns nothing
   */
  constructor() {
    super();
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.addRecipeToFavorites = this.addRecipeToFavorites.bind(this);
    this.voteRecipe = this.voteRecipe.bind(this);
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
   * @returns {nothing} Returns nothing
   */
  toggleReviewForm() {
    this.props.dispatch(toggleReviewForm());
  }

  /**
   * @memberof SingleRecipe
   * @param {object} e
   * @returns {nothing} Returns nothing
   */
  addRecipeToFavorites(e) {
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
  voteRecipe(e, type) {
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
      isFetching, error, recipe, user, reviewed
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
              voteRecipe={this.voteRecipe}
              toggleReviewForm={this.toggleReviewForm}
              addRecipeToFavorites={this.addRecipeToFavorites}
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
  reviewed: isReviewed(state.singleRecipe.recipeReviews.reviews, state.auth.user.id)
});

export { SingleRecipe as SingleRecipeComponent };

export default connect(mapStateToProps)(SingleRecipe);
