import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import Pagination from '../Pagination';
import { multiReviewPropTypes } from '../../../helpers/proptypes';
import { fetchReviews } from '../../../actions/recipeReviews';
import MiniPreLoader from '../../shared/PreLoader/MiniPreLoader';
import getNoResultText from '../../../helpers/getNoResultText';
import AddReview from './AddReview';

/**
 * Returns Reviews Wrapper
 * @exports
 * @extends Component
 * @class Reviews
 * @param {array} reviews
 * @returns {JSX} Reviews
 */
class Reviews extends Component {
  static propTypes = {
    error: PropTypes.string,
    recipeId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    reviewing: PropTypes.bool.isRequired,
    ...multiReviewPropTypes
  }

  static defaultProps = {
    error: null
  }

  /**
   * @constructor
   * @memberof Reviews
   * @returns {nothing} - Returns nothing
   */
  constructor() {
    super();

    this.state = {
      currentPage: 1,
      limit: 10
    };

    this.getReviews = this.getReviews.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  /**
   * @memberof Reviews
   * @returns {noting} Returns nothing
   */
  componentWillMount() {
    this.getReviews();
  }

  /**
   * @memberof Reviews
   * @returns {noting} Returns nothing
   */
  getReviews() {
    const { currentPage, limit } = this.state;
    this.props.dispatch(fetchReviews(this.props.recipeId, currentPage, limit));
  }

  /**
   * @memberof Reviews
   * @param {number} page
   * @returns {state} home
   */
  handlePageChange(page) {
    this.setState({
      currentPage: page
    }, () => this.getReviews());
  }

  /**
   * @memberof Reviews
   * @returns {JSX} Reviews
   */
  render() {
    const {
      reviews, reviewing, error, metadata
    } = this.props;

    return (
      <div className="py-5 p-xs-1 p-md-5" id="reviews">
        <div className="col-12">
          <h4>Reviews</h4>
          <hr />
        </div>
        {reviewing && <div className="text-center"><MiniPreLoader /></div>}
        {!reviewing && !!reviews && reviews.length === 0 && <div className="text-center no-reviews">{getNoResultText('REVIEWS RESULT')}</div>}
        {error && <div className="text-center error">Something happened, please retry.</div>}
        {!!reviews && reviews.length !== 0 && reviews.sort((a, b) => b.id - a.id).map(review => (
          <div className="px-5 pb-3 review-heading" key={review.id}>
            <div className="row">
              <div className="col-4 rounded-circle text-left">
                <img src={review.User.profilePic} alt="user" className="review-picture" />
              </div>
              <div className="col-8 mr-0 text-right">
                <p className="mb-0">{review.User.username}</p>
              </div>
            </div>
            <hr style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
            <ReactStars value={+review.rating} size={30} color2="#f1c40f" half edit={false} />
            <p className="text-justify">{review.comment}</p>
          </div>))}
        {reviews.length !== 0 && <Pagination
          items={reviews}
          onPageChange={this.handlePageChange}
          metadata={metadata}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.singleRecipe.recipeReviews.reviews,
  metadata: state.singleRecipe.recipeReviews.metadata,
  error: state.singleRecipe.recipeReviews.error,
  reviewing: state.singleRecipe.recipeReviews.reviewing
});

export { AddReview, Reviews as ReviewsComponent };
export default connect(mapStateToProps)(Reviews);
