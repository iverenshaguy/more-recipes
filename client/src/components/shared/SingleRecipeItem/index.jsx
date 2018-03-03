import React from 'react';
import PropTypes from 'prop-types';
import Reviews, { AddReview } from '../Reviews';
import { RenderIcon, RenderVoteIcon } from '../Icons';
import RecipeDetailsSection from '../RecipeDetailsSection';
import { recipeObjectPropTypes, userPropTypes } from '../../../helpers/proptypes';


/**
 * @exports
 * @function SingleRecipeItem
 * @param {object} props
 * @returns {JSX} SingleRecipeItem
 */
const SingleRecipeItem = (props) => {
  const {
    recipe, user, reviewed, voteRecipe, toggleReviewForm, addRecipeToFavorites
  } = props;
  let disableRecipeActions = false;

  if (recipe.recipeItem.userId === user.id) {
    disableRecipeActions = true;
  }

  return (
    <div className="container page-margin" id="recipe-wrapper">
      <div className="recipe-picture-wrapper">
        <div className="image-container">
          <img src={recipe.recipeItem.recipeImage} alt="recipe" className="img-fluid" />
        </div>
      </div>
      <div className="row px-xs-1 px-sm-2 px-md-2 px-lg-4 px-xl-5" id="recipe-details">
        <div className="col-12 px-5">
          <div className="heading p-5 text-center">
            <h3>{recipe.recipeItem.recipeName}</h3>
          </div>
          <div className="row" id="recipe-rating">
            <div className="col-xs-12 col-md-6 col-lg-4 pt-3 pb-1">
              {!disableRecipeActions && <p className="user-info"><span className="text-muted">Posted By </span>{recipe.recipeItem.User.username}</p>}
            </div>
            <div className="col-xs-12 col-md-6 col-lg-8 pt-3 pb-1" id="recipe-rating-info">
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-star" /> {(+recipe.recipeItem.rating).toPrecision(2)} &nbsp; &nbsp;</p>
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-heart" /> {recipe.recipeItem.upvotes} &nbsp;&nbsp;</p>
              <p className="text-muted inline-p"><i className="text-success aria-hidden fa fa-eye" /> {recipe.recipeItem.views} &nbsp;&nbsp;</p>
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-thumbs-down" /> {recipe.recipeItem.downvotes} &nbsp; &nbsp;</p>
            </div>
          </div>
          <RecipeDetailsSection recipe={recipe.recipeItem} />
          {!disableRecipeActions &&
            <div className="d-none d-xs-none d-sm-none d-md-flex d-lg-flex pt-5 pb-1 row align-items-center" id="call-to-action">
              <RenderIcon recipe={recipe} reviewed={reviewed} type="review" icon="star" handleClick={toggleReviewForm} />
              <RenderIcon recipe={recipe} type="favorite" icon="heart" handleClick={addRecipeToFavorites} />
              <RenderVoteIcon recipe={recipe} type="up" boolCheck handleClick={voteRecipe} />
              <RenderVoteIcon recipe={recipe} type="down" boolCheck={false} handleClick={voteRecipe} />
            </div>}
          {!disableRecipeActions &&
            !recipe.recipeItem.isReviewed &&
            !reviewed &&
            <AddReview id={recipe.recipeItem.id} />}
          <Reviews recipeId={recipe.recipeItem.id} />
          {/*
              TODO: Creating Notif Alert Component
              <div className="alert alert-success notif hide" id="favorited" role="alert">
                Added to Favorites!
              </div>
              <div className="alert alert-success notif hide" id="upvoted" role="alert">
                Upvoted!
              </div>
              <div className="alert alert-success notif hide" id="downvoted" role="alert">
                Downvoted!
              </div>
              <div className="alert alert-success notif hide" id="reviewed" role="alert">
                Review Added Succesfully!
              </div> */}
        </div>
      </div>
      {/* TODO: Create side rating toolbar component
          <div className="hidden-sm-down align-self-center" id="side-rating-toolbar">
            <p><a href="#add-edit-modal" data-toggle="modal"
            className="add-recipe"><i className="fa fa-lg fa-plus" /></a></p>
            <p><a href="#" className="favorite"><i className="fa fa-lg fa-heart-o" /></a></p>
            <p><a href="#" className="upvote"><i className="fa fa-lg fa-thumbs-o-up" /></a></p>
            <p><a href="#" className="downvote"><i className="fa fa-lg fa-thumbs-o-down" /></a></p>
            <p><a href="#social-modal" data-toggle="modal"
            className="share"><i className="fa fa-lg fa-share-alt" /></a></p>
          </div> */}
    </div>
  );
};

SingleRecipeItem.propTypes = {
  reviewed: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    recipeId: PropTypes.shape({
      msg: PropTypes.string
    })
  }),
  voteRecipe: PropTypes.func.isRequired,
  toggleReviewForm: PropTypes.func.isRequired,
  addRecipeToFavorites: PropTypes.func.isRequired,
  ...userPropTypes,
  ...recipeObjectPropTypes
};

SingleRecipeItem.defaultProps = {
  error: null
};

export default SingleRecipeItem;
