import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { singleRecipePropTypes } from '../../../helpers/proptypes';

/**
 * Renders a Call To Action Icon
 * @param {object} props
 * @returns {JSX} Call To Action Icon
 */
const RenderVoteIcon = (props) => {
  const {
    // boolCheck is true/false for upvote/downvote
    // boolCheck is used to differentiate between upvote icon and downvote icon
    recipe, type, boolCheck, handleClick
  } = props;

  const { vote } = recipe;
  const checkVote = vote === null || (vote !== null && vote === !boolCheck);
  const icon = checkVote ? `thumbs-o-${type}` : `thumbs-${type}`;

  return (
    <span className={`${type}vote`}>
      <FontAwesome name={icon} size="lg" tag="i" onClick={e => handleClick(e, type)} />
      <p className="text-capitalize d-none d-xs-none d-sm-none d-md-block">
        {checkVote ? `${type}vote` : `${type}voted`}
      </p>
    </span>
  );
};

RenderVoteIcon.propTypes = {
  ...singleRecipePropTypes,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  boolCheck: PropTypes.bool.isRequired
};

export default RenderVoteIcon;
