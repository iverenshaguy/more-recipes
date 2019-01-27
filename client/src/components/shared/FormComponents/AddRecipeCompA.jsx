import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import RenderInput from './RenderInput';
import RenderSelect from './RenderSelect';
import RenderCheckBox from './RenderCheckBox';

/**
 * @exports
 * @class AddRecipeCompA
 * @extends Component
 * @returns {JSX} AddRecipeCompA
 */
class AddRecipeCompA extends Component {
  static propTypes = {
    pristine: PropTypes.bool.isRequired,
    values: PropTypes.shape({
      recipeName: PropTypes.string,
      vegetarian: PropTypes.bool,
      difficulty: PropTypes.string,
    }).isRequired,
    touched: PropTypes.shape({
      recipeName: PropTypes.bool,
      vegetarian: PropTypes.bool,
      difficulty: PropTypes.bool,
    }).isRequired,
    error: PropTypes.shape({
      recipeName: PropTypes.string,
      vegetarian: PropTypes.string,
      difficulty: PropTypes.string,
    }).isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
  };

  /**
   * @constructor
   * @memberof AddRecipeCompA
   * @returns {nothing} Return nothing
   */
  constructor() {
    super();

    this.state = { valid: false, };
  }

  /**
   * @memberof AddRecipeCompA
   * @param {object} nextProps
   * @returns {nothing} returns nothing
   */
  componentWillUpdate = (nextProps) => {
    if (nextProps !== this.props) {
      this.validateComp();
    }
  }

  /**
   * @memberof AddRecipeCompA
   * @returns {nothing} returns nothing
   */
  validateComp = () => {
    const { values, touched, error } = this.props;
    if (touched.recipeName && !!values.recipeName && !error.recipeName) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  /**
   * @memberof AddRecipeCompA
   * @returns {JSX} AddRecipeCompA
   */
  render() {
    const {
      values, error, touched, pristine, changePage, handleBlur, handleChange, handleFocus
    } = this.props;
    const { valid } = this.state;

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
          value={values.recipeName}
          placeholder="Jollof Rice and Curried Chicken"
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          meta={{
            touched: touched.recipeName,
            error: error.recipeName,
          }}
        />
        <RenderSelect
          id="difficulty"
          name="difficulty"
          label="Difficulty"
          labelClass="col-form-label-lg"
          required={false}
          value={values.difficulty}
          handleChange={handleChange}
          optionsArray={['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult']}
        />
        <RenderCheckBox
          id="vegetarian"
          name="vegetarian"
          required={false}
          label="Suitable For Vegetarians"
          checked={values.vegetarian}
          handleChange={handleChange}
        />
        <div className="text-right">
          <button type="button" className="btn btn-block btn-outline next-previous-btn" disabled={!valid || pristine} onClick={e => changePage(e, 'two')}>
            Continue
          </button>
        </div>
      </Fragment>
    );
  }
}

export default AddRecipeCompA;
