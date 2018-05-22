import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import capitalizeString from '../../../utils/capitalizeString';
import { recipeObjectPropTypes } from '../../../helpers/proptypes';

/**
 * Renders a Call To Action Icon
 * @param {object} props
 * @returns {JSX} Call To Action Icon
 */
const RenderIcon = (props) => {
  const {
    recipe, type, icon, reviewed, handleClick
  } = props;

  const alreadyDone = type === 'review' ? `${type}ed` : `${type}d`;
  const checkIfDone = type === 'review' ? `is${capitalizeString(`${type}`)}ed` : `is${capitalizeString(`${type}`)}d`;

  if (type === 'review' && reviewed) {
    return (
      <span className="review">
        <FontAwesome name="star" size="lg" tag="i" />
        <p className="text-capitalize d-none d-xs-none d-sm-none d-md-block">Reviewed</p>
      </span>
    );
  }

  const iconType = !recipe[checkIfDone] ? `${icon}-o` : `${icon}`;

  return (
    <span className={type}>
      <FontAwesome name={iconType} size="lg" tag="i" onClick={e => handleClick(e)} />
      <p className="text-capitalize d-none d-xs-none d-sm-none d-md-block">
        {!recipe[checkIfDone] ? type : alreadyDone}
      </p>
    </span>
  );
};

RenderIcon.propTypes = {
  ...recipeObjectPropTypes,
  type: PropTypes.string.isRequired,
  reviewed: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

RenderIcon.defaultProps = {
  reviewed: false
};

export default RenderIcon;
