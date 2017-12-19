import React from 'react';
import PropTypes from 'prop-types';
import AddRecipeModal from './AddRecipeModal';
import SocialModal from './SocialModal';

const Modals = (props) => {
  if (props.addRecipeModal) {
    return <AddRecipeModal isOpen toggle={() => props.toggle('addRecipeModal')} />;
  }

  if (props.socialModal) {
    return <SocialModal isOpen toggle={() => props.toggle('socialModal')} />;
  }

  return '';
};

Modals.defaultProps = {
  addRecipeModal: false,
  socialModal: false,
};

Modals.propTypes = {
  addRecipeModal: PropTypes.bool,
  socialModal: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export { AddRecipeModal, SocialModal };
export default Modals;
