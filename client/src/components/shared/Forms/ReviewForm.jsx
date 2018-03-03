import React, { Fragment } from 'react';
import ReactStars from 'react-stars';
import PropTypes from 'prop-types';
import { RenderInput } from '../FormComponents';
import { formPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function ReviewForm
 * @param {object} props - props
 * @returns {component} ReviewForm
 */
const ReviewForm = ({ type, state, handlers }) => {
  ReviewForm.propTypes = {
    ...formPropTypes(type),
    state: PropTypes.shape({
      rating: PropTypes.number
    }).isRequired
  };

  return (
    <Fragment>
      <ReactStars value={+state.values.rating} size={30} color2="#f1c40f" onChange={value => handlers.handleRatingChange(value)} />
      <RenderInput
        type="textarea"
        name="comment"
        half
        label="Add a Comment:"
        id="comment"
        required={false}
        value={state.values.comment}
        placeholder="I love this recipe"
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        meta={{
          touched: state.touched.comment,
          error: state.error.comment
        }}
      />
    </Fragment>
  );
};

export default ReviewForm;
