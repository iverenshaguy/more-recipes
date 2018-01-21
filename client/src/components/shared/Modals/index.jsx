import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeModal from './AddRecipeModal';
import SocialModal from './SocialModal';
import { componentActions } from '../../../store/components';

const { toggleModal } = componentActions;

const Modal = ({
  addRecipeModal, socialModal, isOpen, dispatch
}) => {
  if (addRecipeModal) {
    return <AddRecipeModal isOpen={isOpen} toggle={() => dispatch(toggleModal())} />;
  }

  if (socialModal) {
    return <SocialModal isOpen={isOpen} toggle={() => dispatch(toggleModal())} />;
  }

  return null;
};

Modal.propTypes = {
  addRecipeModal: PropTypes.bool,
  socialModal: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

Modal.defaultProps = {
  addRecipeModal: false,
  socialModal: false,
};

const mapStateToProps = state => ({
  addRecipeModal: state.components.modals.addRecipe,
  socialModal: state.components.modals.social,
  isOpen: Object.keys(state.components.modals) !== 0,
});

export { AddRecipeModal, SocialModal, Modal as ModalComponent };

export default connect(mapStateToProps)(Modal);
