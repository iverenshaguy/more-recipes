import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from '../../shared/Forms';

/**
 * @exports
 * @class AddRecipeModal
 * @extends Component
 * @returns {component} AddRecipeModal
 */
class AddRecipeModal extends Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  };
  //   /**
  //  * @returns {component} AddRecipeModal
  //  */
  //   constructor() {
  //     super();
  //     this.state = {
  //       imageSrc: ''
  //     };

  //     this.handleFileSelect = this.handleFileSelect.bind(this);
  //   }

  //   /**
  //  * @override
  //  */
  //   handleFileSelect(e) {
  //     this.this.setState({
  //       imageSrc: e.target.result
  //     });
  //   }

  /**
 * @returns {component} AddRecipeModal
 */
  render() {
    const meta = {
      title: this.props.type === 'addRecipe' ? 'Add a New Recipe' : 'Edit Recipe',
      btnText: this.props.type === 'editRecipe' ? 'Add Recipe' : 'Edit Recipe'
    };

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        backdrop={false}
        size="lg"
        id="add-edit-modal"
      >
        <ModalHeader toggle={this.props.toggle} tag="div">
          {/* <h3 className="modal-title text-center" id="dynamic-modal-title">
            {`${this.props.type} Recipe`}
          </h3> */}
        </ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <div className="row" id="add-edit-recipe ">
              {/* <div className="offset-md-1 col-md-10 col-xs-12 col-sm-12 "> */}
              <div className="col-12">
                <Form {...this.props} type={this.props.type} meta={meta} />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.singleRecipe.recipe.adding,
  submitError: state.singleRecipe.recipe.error
});

export { AddRecipeModal as AddRecipeModalComponent };
export default connect(mapStateToProps)(AddRecipeModal);
