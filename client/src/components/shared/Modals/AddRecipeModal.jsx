import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

/**
 * @exports
 * @class AddRecipeModal
 * @extends Component
 * @returns {component} AddRecipeModal
 */
class AddRecipeModal extends Component {
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
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        backdrop={false}
        size="lg"
        id="add-edit-modal"
      >
        <ModalHeader toggle={this.props.toggle} tag="div">
          <h3 className="modal-title text-center" id="dynamic-modal-title">
            Add Recipe
          </h3>
        </ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <div className="row" id="add-edit-recipe ">
              {/* <div className="offset-md-1 col-md-10 col-xs-12 col-sm-12 "> */}
              <div className="col-12">
                <Form id="add-recipe" className="add-edit-form row">
                  {/* <Input type="file" className="hidden-xs-up " id="add-edit-image " /> */}
                  <FormGroup className="mt-5 col-12 ">
                    <Label for="recipe-name" className="col-form-label col-form-label-lg">
                      Recipe Name
                    </Label>
                    <Input
                      type="text "
                      id="recipe-name "
                      placeholder="Jollof Rice and Curried Chicken "
                    />
                  </FormGroup>
                  <div className="recipe-img-div col-12 d-none">
                    {/* <img
                      src={this.state.imageSrc}
                      id="recipe-photo-preview"
                      className="img-fluid"
                      alt="recipe-preview"
                    /> */}
                  </div>
                  <FormGroup className="col-12">
                    <Label
                      htmlFor="recipe-image"
                      id="dynamic-image-label"
                      className="col-form-label col-form-label-lg "
                    >
                      Change the Recipe Image
                    </Label>
                    <br />
                    <Label className="custom-file col-12">
                      <Input
                        type="file"
                        id="recipe-image"
                        className="recipe-image"
                        // onChange={this.handleFileSelect}
                      />
                      <span className="custom-file-control" />
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-12 ingredient-div">
                    <Label for="ingredients" className="col-form-label col-form-label-lg ">
                      Ingredients
                    </Label>
                    <Input
                      type="text"
                      id="ingredients"
                      name="ingredients[]"
                      placeholder="1 tbsp of pureed scotch bonnet pepper"
                      required
                    />
                  </FormGroup>
                  <div className="col-12">
                    <a className="text-muted mt-2 mb-0" id="add-ingredient">
                      <FontAwesome name="plus" /> Add Another Ingredient
                    </a>
                  </div>
                  <FormGroup className="col-12 preparation-div">
                    <Label for="preparations" className="col-form-label col-form-label-lg ">
                      Preparation
                    </Label>
                    <Input
                      type="text"
                      id="preparations"
                      name="preparations[]"
                      placeholder="Cut up the chicken "
                    />
                  </FormGroup>
                  <div className="col-12">
                    <a className="text-muted mt-2 mb-0" id="add-preparation">
                      <FontAwesome name="plus" /> Add
                    </a>
                  </div>
                  <FormGroup className="col-12 direction-div">
                    <Label for="directions" className="col-form-label col-form-label-lg ">
                      Directions
                    </Label>
                    <Input
                      type="text"
                      id="directions"
                      name="directions[]"
                      placeholder="Put the spiced chicken in a hot oven for 15 minutes "
                    />
                  </FormGroup>
                  <div className="col-12">
                    <a className="text-muted mt-2 mb-0" id="add-direction">
                      <FontAwesome name="plus" /> Add
                    </a>
                  </div>
                  <FormGroup className="col-xs-12 col-lg-4 ">
                    <Label for="prep-time " className="col-form-label col-form-label-lg ">
                      Preparation Time
                    </Label>
                    <Input type="text" id="prep-time" placeholder="20 Minutes " />
                  </FormGroup>
                  <FormGroup className="col-xs-12 col-lg-4 ">
                    <Label for="cook-time " className="col-form-label col-form-label-lg ">
                      Cooking Time
                    </Label>
                    <Input type="text " id="cook-time " placeholder="1 Hour 30 Minutes " />
                  </FormGroup>
                  <FormGroup className="col-xs-12 col-lg-4 ">
                    <Label for="total-time " className="col-form-label col-form-label-lg ">
                      Total Time to Cook
                    </Label>
                    <Input
                      type="text "
                      className="form-control "
                      id="total-time "
                      placeholder="1 Hour 50 Minutes "
                    />
                  </FormGroup>
                  <FormGroup className="col-12 ">
                    <Label for="difficulty" className="col-form-label-lg">
                      Difficulty
                    </Label>
                    <Input
                      type="select"
                      className="custom-select form-control "
                      id="difficulty"
                      defaultValue="Easy"
                    >
                      <option value="Easy ">Easy</option>
                      <option value="Normal ">Normal</option>
                      <option value="A Bit Difficult ">A Bit Difficult</option>
                      <option value="Difficult ">Difficult</option>
                      <option value="Very Difficult ">Very Difficult</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="col-12" check>
                    <Label for="vegetarian" check>
                      <Input type="checkbox" id="vegetarian" defaultValue />
                      Suitable For Vegetarians
                    </Label>
                  </FormGroup>
                  <FormGroup className="col-12">
                    <Label for="extra-info" className="col-form-label col-form-label-lg">
                      Extra Information (Allergy Warnings etc)
                    </Label>
                    <Input
                      type="text-area"
                      id="extra-info"
                      rows={5}
                      placeholder="Contains Mushrooms"
                      defaultValue=""
                    />
                  </FormGroup>
                  <FormGroup className="col-12 mt-3 ">
                    <Button className="btn-success btn-block ">ADD RECIPE</Button>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

AddRecipeModal.defaultProps = {
  isOpen: false,
};

AddRecipeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

export default AddRecipeModal;
