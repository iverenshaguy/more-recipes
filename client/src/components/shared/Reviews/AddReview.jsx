import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../../shared/Forms';
import './AddReview.scss';

/**
 * @exports
 * Returns Review Wrapper
 * @param {object} props
 * @returns {JSX} RecipeWrapper
 */
const AddReview = (props) => {
  const meta = {
    title: 'Review this Recipe',
    btnText: 'Add Your Review'
  };

  const reviewFormClass = props.showReviewForm ? 'my-3' : 'd-none';

  return (
    <div className={reviewFormClass} id="review-wrapper">
      <div id="review-div">
        <div className="card card-block px-md-5 px-sm-3 py-3">
          <Form {...props} type="review" id={props.id} meta={meta} />
        </div>
      </div>
    </div>
  );
};

AddReview.propTypes = {
  id: PropTypes.number.isRequired,
  showReviewForm: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showReviewForm: state.ui.reviewForm.isOpen,
  id: state.singleRecipe.recipe.item.recipeItem.id,
  submitError: state.singleRecipe.recipeReviews.error,
  submitting: state.singleRecipe.recipeReviews.reviewing
});

export { AddReview as AddReviewComponent };

export default connect(mapStateToProps)(AddReview);
