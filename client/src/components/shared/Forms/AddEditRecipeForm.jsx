import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FormGroup, Label, Input } from 'reactstrap';
import { RenderInput, RenderFileInput } from '../FormComponents';

/**
 * @exports
 * @class AddEditRecipeForm
 * @extends Component
 * @returns {JSX} AddEditRecipeForm
 */
class AddEditRecipeForm extends Component {
  static propTypes = {
    state: PropTypes.shape({
      pristine: PropTypes.bool,
      formValid: PropTypes.bool,
      asyncValidating: PropTypes.bool,
      fieldCount: PropTypes.shape({
        ingredients: PropTypes.number,
        preparations: PropTypes.number,
        directions: PropTypes.number,
      }),
    }).isRequired,
    handlers: PropTypes.shape({
      handleBlur: PropTypes.func,
      handleChange: PropTypes.func,
      handleChangeImage: PropTypes.func,
      handleFocus: PropTypes.func,
      handleSubmit: PropTypes.func,
      handleAddField: PropTypes.func.isRequired,
    }).isRequired
  };

  /**
   * @constructor
   * @memberof AddEditRecipeForm
   * @returns {nothing} Return nothing
   */
  constructor() {
    super();

    this.addField = this.addField.bind(this);
    this.mapFields = this.mapFields.bind(this);
  }

  /**
   * @memberof AddEditRecipeForm
   * @param {object} e
   * @param {string} field
   * @returns {nothing} returns nothing
   */
  addField(e, field) {
    e.preventDefault();
    const { handlers } = this.props;

    return handlers.handleAddField(field);
  }

  /**
   * @memberof AddEditRecipeForm
   * @param {string} field
   * @param {string} placeholder
   * @returns {JSX} Array of Fields
   */
  mapFields(field, placeholder) {
    const { state, handlers } = this.props;
    let key = 0;
    return state.values[field].map((value, i) => {
      key += 1;
      return (<RenderInput
        type="text"
        index={i}
        key={key}
        name={field}
        className="mb-4"
        label={null}
        id={`${field}[${i}]`}
        required={field === 'preparations'}
        value={state.values[field][i]}
        placeholder={placeholder}
        handleChange={handlers.handleChange}
        handleBlur={handlers.handleBlur}
        handleFocus={handlers.handleFocus}
        handleRemoveField={handlers.handleRemoveField}
        meta={{
          touched: state.touched[field][i],
          error: state.error[field][i],
        }}
      />);
    });
  }

  /**
   * @memberof AddEditRecipeForm
   * @returns {JSX} AddEditRecipeForm
   */
  render() {
    const { state, handlers } = this.props;

    return (
      <Fragment>
        <RenderInput
          type="text"
          name="recipeName"
          className="mb-4"
          label="Recipe Name"
          labelClass="col-form-label-lg"
          id="recipeName"
          required
          value={state.values.recipeName}
          placeholder="Jollof Rice and Curried Chicken"
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.recipeName,
            error: state.error.recipeName,
          }}
        />
        <RenderFileInput
          name="recipeImage"
          label="Recipe Image"
          labelClass="col-form-label-lg"
          value={state.values.recipeImage}
          required={false}
          meta={{
            touched: state.touched.recipeImage,
            error: state.error.recipeImage,
          }}
          handleChangeImage={handlers.handleChangeImage}
        />
        <div>
          <Label for="ingredients" className="col-form-label col-form-label-lg ">
            Ingredients<span className="text-danger">*</span>
          </Label>
        </div>
        {this.mapFields('ingredients', '1 tbsp of pureed scotch bonnet pepper')}
        <div className="col-12 mb-3">
          <a
            className="text-muted mt-2 mb-0"
            href="#add-ingredient"
            id="add-ingredient"
            onClick={e => handlers.handleAddField(e, 'ingredients')}
          >
            <FontAwesome name="plus" /> Add Another Ingredient
          </a>
        </div>
        <div>
          <Label for="preparations" className="col-form-label col-form-label-lg ">
            Preparation
          </Label>
        </div>
        {this.mapFields('preparations', 'Cut up the chicken')}
        <div className="col-12 mb-3">
          <a
            className="text-muted mt-2 mb-0"
            href="#add-preparation"
            id="add-preparation"
            onClick={e => handlers.handleAddField(e, 'preparations')}
          >
            <FontAwesome name="plus" /> Add Another Step
          </a>
        </div>
        <div>
          <Label for="directions" className="col-form-label col-form-label-lg ">
            Directions
          </Label>
        </div>
        {this.mapFields('directions', 'Put the spiced chicken in a hot oven for 15 minutes')}
        <div className="col-12 mb-3">
          <a
            className="text-muted mt-2 mb-0"
            href="#add-direction"
            id="add-direction"
            onClick={e => handlers.handleAddField(e, 'directions')}
          >
            <FontAwesome name="plus" /> Add Another Step
          </a>
        </div>
        <RenderInput
          type="text"
          name="prepTime"
          className="mb-4"
          label="Preparation Time"
          labelClass="col-form-label-lg"
          id="prep-time"
          required={false}
          value={state.values.prepTime}
          placeholder="20 Minutes"
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.prepTime,
            error: state.error.prepTime,
          }}
        />
        <RenderInput
          type="text"
          name="cookTime"
          className="mb-4"
          label="Cooking Time"
          labelClass="col-form-label-lg"
          id="cook-time"
          required={false}
          value={state.values.cookTime}
          placeholder="1 Hour 30 Minutes"
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.cookTime,
            error: state.error.cookTime,
          }}
        />
        <RenderInput
          type="text"
          name="totalTime"
          className="mb-4"
          label="Total Time to Cook"
          labelClass="col-form-label-lg"
          id="total-time"
          required
          value={state.values.totalTime}
          placeholder="1 Hour 50 Minutes"
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.totalTime,
            error: state.error.totalTime,
          }}
        />
        <FormGroup>
          <Label for="difficulty" className="col-form-label-lg">
            Difficulty
          </Label>
          <Input
            type="select"
            name="difficulty"
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
        <FormGroup check>
          <Label for="vegetarian" className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="vegetarian" defaultValue />
            <span className="custom-control-indicator" />
            <span className="custom-control-description">Suitable For Vegetarians</span>
          </Label>
        </FormGroup>
        <RenderInput
          type="textarea"
          rows={5}
          name="extraInfo"
          className="mb-4"
          label="Extra Information (Allergy Warnings etc)"
          labelClass="col-form-label-lg"
          id="extra-info"
          required={false}
          value={state.values.extraInfo}
          placeholder="Contains Mushrooms"
          handleChange={handlers.handleChange}
          handleBlur={handlers.handleBlur}
          handleFocus={handlers.handleFocus}
          meta={{
            touched: state.touched.extraInfo,
            error: state.error.extraInfo,
          }}
        />
      </Fragment>
    );
  }
}

export default AddEditRecipeForm;
