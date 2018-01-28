import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeModal from './AddRecipeModal';
import SocialModal from './SocialModal';
import { toggleModal } from '../../../actions/ui';

const Modal = ({
  type, isOpen, dispatch
}) => {
  switch (type) {
    case 'addRecipe':
      return <AddRecipeModal isOpen={isOpen} toggle={() => dispatch(toggleModal())} />;
    case 'social':
      return <SocialModal isOpen={isOpen} toggle={() => dispatch(toggleModal())} />;
    default:
      return null;
  }
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

Modal.defaultProps = {
  type: null
};

const mapStateToProps = state => ({
  type: state.ui.modals.type,
  isOpen: state.ui.modals.isOpen,
});

export { AddRecipeModal, SocialModal, Modal as ModalComponent };

export default connect(mapStateToProps)(Modal);
