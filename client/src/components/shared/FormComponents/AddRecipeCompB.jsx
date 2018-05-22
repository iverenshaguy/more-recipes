import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Label } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

/**
 * @exports
 * @class AddRecipeCompB
 * @extends Component
 * @returns {JSX} AddRecipeCompB
 */
class AddRecipeCompB extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    previous: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
    pristine: PropTypes.bool.isRequired,
    fields: PropTypes.arrayOf(PropTypes.element).isRequired,
    touched: PropTypes.shape({
      ingredients: PropTypes.arrayOf(PropTypes.bool),
      directions: PropTypes.arrayOf(PropTypes.bool),
      preparations: PropTypes.arrayOf(PropTypes.bool)
    }).isRequired,
    error: PropTypes.shape({
      ingredients: PropTypes.arrayOf(PropTypes.string),
      directions: PropTypes.arrayOf(PropTypes.string),
      preparations: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    changePage: PropTypes.func.isRequired,
    handleAddField: PropTypes.func.isRequired
  };

  /**
   * @constructor
   * @memberof AddRecipeCompB
   * @returns {nothing} Return nothing
   */
  constructor() {
    super();

    this.state = { valid: false, };
  }

  /**
   * @memberof AddRecipeCompB
   * @param {object} nextProps
   * @returns {nothing} returns nothing
   */
  componentWillUpdate = (nextProps) => {
    if (nextProps !== this.props) {
      this.validateComp();
    }
  }

  /**
   * @memberof AddRecipeCompB
   * @returns {nothing} returns nothing
   */
  validateComp = () => {
    const { touched, error, type } = this.props;
    const checkTouchedList =
      (Object.values(touched[type]).filter(val => val === true)).length;
    const checkErrorList = (Object.values(error[type]).filter(val => val !== null)).length;

    // page is valid if type is preparations
    if (type === 'preparations') {
      this.setState({ valid: true });
      return;
    }

    if (checkTouchedList && !checkErrorList) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  /**
   * @memberof AddRecipeCompB
   * @returns {JSX} AddRecipeCompB
   */
  render() {
    const {
      fields, pristine, changePage, handleAddField, type, next, previous
    } = this.props;
    const { valid } = this.state;
    // const required = <span className="text-danger">*</span>;

    return (
      <Fragment>
        <a href="#prev" className="next-previous-a mb-1" onClick={e => changePage(e, previous)}>
          <FontAwesome name="arrow-left" tag="i" /> Back
        </a>
        <div>
          <Label htmlFor="ingredients" className="col-form-label col-form-label-lg text-capitalize">
            {type === 'preparations' ? 'Preparation' : type}
            {type === 'preparations' ? null : <span className="text-danger">*</span>}
          </Label>
        </div>
        {fields}
        <div className="col-12 mb-3">
          <a
            className="text-muted mt-2 mb-0"
            href={`#add-${type}"`}
            id={`add-${type}"`}
            onClick={e => handleAddField(e, type)}
          >
            <FontAwesome name="plus" /> Add
          </a>
        </div>
        <button type="button" className="btn btn-block btn-outline next-previous-btn" disabled={!valid || pristine} onClick={e => changePage(e, next)}>
          Continue
        </button>
      </Fragment>
    );
  }
}

export default AddRecipeCompB;
