import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {
  AddRecipeCompA, AddRecipeCompB, RenderInput, RenderFileInput
} from '../FormComponents';

/**
 * @exports
 * @class AddRecipeForm
 * @extends Component
 * @returns {JSX} AddRecipeForm
 */
class AddRecipeForm extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    state: PropTypes.shape({
      pristine: PropTypes.bool,
      formValid: PropTypes.bool,
      asyncValidating: PropTypes.bool
    }).isRequired,
    handlers: PropTypes.shape({
      handleBlur: PropTypes.func,
      handleChange: PropTypes.func,
      handleChangeImage: PropTypes.func,
      handleFocus: PropTypes.func,
      handleSubmit: PropTypes.func,
      handleAddField: PropTypes.func.isRequired,
    }).isRequired,
    changeRecipeFormState: PropTypes.func.isRequired
  };

  /**
   * @memberof AddRecipeForm
   * @param {string} field
   * @param {string} placeholder
   * @returns {JSX} Array of Fields
   */
  mapFields = (field, placeholder) => {
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
   * @memberof AddRecipeForm
   * @param {object} e
   * @param {string} active
   * @returns {nothing} returns nothing
   */
  changePage = (e, active) => {
    e.preventDefault();
    this.props.changeRecipeFormState(active);
  }

  /**
   * @memberof AddRecipeForm
   * @returns {JSX} AddRecipeForm
   */
  render() {
    const { state, handlers, active } = this.props;

    return (
      <Fragment>
        <div style={{ display: active === 'one' ? 'block' : 'none' }}>
          <AddRecipeCompA
            pristine={state.pristine}
            values={{
              recipeName: state.values.recipeName,
              vegetarian: state.values.vegetarian,
              difficulty: state.values.difficulty,
            }}
            touched={{
              recipeName: state.touched.recipeName,
              vegetarian: state.touched.vegetarian,
              difficulty: state.touched.difficulty,
            }}
            error={{
              recipeName: state.error.recipeName,
              vegetarian: state.error.vegetarian,
              difficulty: state.error.difficulty,
            }}
            changePage={this.changePage}
            handleChange={handlers.handleChange}
            handleBlur={handlers.handleBlur}
            handleFocus={handlers.handleFocus}
          />
        </div>
        <div style={{ display: active === 'two' ? 'block' : 'none' }}>
          <AddRecipeCompB
            type="ingredients"
            next="three"
            previous="one"
            fields={this.mapFields('ingredients', '1 tbsp of pureed scotch bonnet pepper')}
            pristine={state.pristine}
            touched={{
              ingredients: state.touched.ingredients,
              preparations: state.touched.preparations,
              directions: state.touched.directions,
            }}
            error={{
              ingredients: state.error.ingredients,
              preparations: state.error.preparations,
              directions: state.error.directions,
            }}
            changePage={this.changePage}
            handleAddField={handlers.handleAddField}
          />
        </div>
        <div style={{ display: active === 'three' ? 'block' : 'none' }}>
          <AddRecipeCompB
            type="preparations"
            next="four"
            previous="two"
            fields={this.mapFields('preparations', 'Cut up the chicken')}
            pristine={state.pristine}
            touched={{
              ingredients: state.touched.ingredients,
              preparations: state.touched.preparations,
              directions: state.touched.directions,
            }}
            error={{
              ingredients: state.error.ingredients,
              preparations: state.error.preparations,
              directions: state.error.directions,
            }}
            changePage={this.changePage}
            handleAddField={handlers.handleAddField}
          />
        </div>
        <div style={{ display: active === 'four' ? 'block' : 'none' }}>
          <AddRecipeCompB
            type="directions"
            next="five"
            previous="three"
            fields={this.mapFields('directions', 'Put the spiced chicken in a hot oven for 15 minutes')}
            pristine={state.pristine}
            touched={{
              ingredients: state.touched.ingredients,
              preparations: state.touched.preparations,
              directions: state.touched.directions,
            }}
            error={{
              ingredients: state.error.ingredients,
              preparations: state.error.preparations,
              directions: state.error.directions,
            }}
            changePage={this.changePage}
            handleAddField={handlers.handleAddField}
          />
        </div>
        <div style={{ display: active === 'five' ? 'block' : 'none' }}>
          <a href="#prev" className="next-previous-a mb-1" onClick={e => this.changePage(e, 'four')}>
            <FontAwesome name="arrow-left" tag="i" /> Back
          </a>
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
        </div>
        <div style={{ display: active === 'six' ? 'block' : 'none' }}>
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
        </div>
      </Fragment>
    );
  }
}

export default AddRecipeForm;
