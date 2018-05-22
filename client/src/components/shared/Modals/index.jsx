import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SocialModal from './SocialModal';
import { toggleModal } from '../../../actions/ui';
import './Modals.scss';

const Modal = ({
  type, isOpen, dispatch
}) => {
  switch (type) {
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

export { SocialModal, Modal as ModalComponent };

export default connect(mapStateToProps)(Modal);
