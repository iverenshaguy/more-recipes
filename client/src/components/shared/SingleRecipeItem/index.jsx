import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Reviews, { AddReview } from '../Reviews';
import { RenderIcon, RenderVoteIcon } from '../Icons';
import RecipeDetailsSection from '../RecipeDetailsSection';
import { recipeObjectPropTypes, userPropTypes } from '../../../helpers/proptypes';
import './SingleRecipeItem.scss';

const altImage = '/images/jollof-rice-img.jpg';

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
          <img src={recipe.recipeItem.recipeImage ? recipe.recipeItem.recipeImage : altImage} alt="recipe" className="img-fluid" />
          {/* <div className="overlay"><span>...</span></div> */}
          <UncontrolledDropdown className="overlay">
            <DropdownToggle tag="a">...</DropdownToggle>
            <DropdownMenu right>
              <a className="dropdown-item" href="#edit">Edit Recipe</a>
              <a className="dropdown-item" href="#delete">Delete Recipe</a>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="row px-xs-1 px-sm-2 px-md-2 px-lg-4 px-xl-5" id="recipe-details">
        <div className="col-12 px-xl-5 px-lg-5 px-md-5 px-sm-4 px-xs-3">
          <div className="heading p-5 text-center">
            <h3>{recipe.recipeItem.recipeName}</h3>
          </div>
          <div className="row" id="recipe-rating">
            <div className="col-xs-12 col-md-6 col-lg-4 pt-3 pb-1">
              {!disableRecipeActions && <p className="user-info"><span className="text-muted">Posted By </span>{recipe.recipeItem.User.username}</p>}
            </div>
            <div className="col-xs-12 col-md-6 col-lg-8 pt-3 pb-1" id="recipe-rating-info">
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-star" /> {recipe.recipeItem.rating ? (+recipe.recipeItem.rating).toPrecision(2) : 0} &nbsp; &nbsp;</p>
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-heart" /> {recipe.recipeItem.upvotes} &nbsp;&nbsp;</p>
              <p className="text-muted inline-p"><i className="text-success aria-hidden fa fa-eye" /> {recipe.recipeItem.views} &nbsp;&nbsp;</p>
              <p className="text-muted inline-p"><i className="aria-hidden fa fa-thumbs-down" /> {recipe.recipeItem.downvotes} &nbsp; &nbsp;</p>
            </div>
          </div>
          <RecipeDetailsSection recipe={recipe.recipeItem} />
          {!disableRecipeActions &&
            <div className="d-flex pt-5 pb-1 align-items-center" id="call-to-action">
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
        </div>
      </div>
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
