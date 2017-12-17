import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const SocialModal = props => (
  <Modal isOpen={props.isOpen} toggle={props.toggle} id="social-modal">
    <ModalHeader toggle={props.toggle} tag="div">
      <h3 className="modal-title text-center" id="social-modal">
        Share this Recipe
      </h3>
    </ModalHeader>
    <ModalBody className="text-center py-5">
      <div className="mb-5 container">
        <div className="row">
          <div className="col-4">
            <p>
              <FontAwesome name="facebook" size="2x" />
            </p>
            <p>Facebook</p>
          </div>
          <div className="col-4">
            <p>
              <FontAwesome name="pinterest" size="2x" />
            </p>
            <p>Pinterest</p>
          </div>
          <div className="col-4">
            <p>
              <FontAwesome name="twitter" size="2x" />
            </p>
            <p>Twitter</p>
          </div>
        </div>
      </div>
    </ModalBody>
  </Modal>
);

SocialModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default SocialModal;
