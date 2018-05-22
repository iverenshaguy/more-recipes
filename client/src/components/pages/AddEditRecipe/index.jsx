import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../../shared/Forms';
import { urlMatchPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @class AddEditRecipe
 * @extends Component
 * @returns {component} AddEditRecipe
 */
class AddEditRecipe extends Component {
  static propTypes = {
    ...urlMatchPropTypes,
    type: PropTypes.string,
    uploading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    type: 'addRecipe'
  }

  /**
   * @memberof AddEditRecipe
   * @returns {component} AddEditRecipe
   */
  render() {
    const meta = {
      title: this.props.type === 'addRecipe' ? 'Add a New Recipe' : 'Edit Recipe',
      btnText: this.props.type === 'addRecipe' ? 'Add Recipe' : 'Edit Recipe'
    };

    return (
      <div className="card-form-body">
        <div className="container">
          <div className="my-5" id="card-form-wrapper">
            <div className="p-xs-2 pt-4 pb-3" id="login-signup-div">
              <Form {...this.props} type={this.props.type} meta={meta} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submitting: state.singleRecipe.recipe.adding,
  uploading: state.uploadImage.uploading,
  submitError: state.singleRecipe.recipe.error
});

export { AddEditRecipe as AddEditRecipeComponent };
export default connect(mapStateToProps)(AddEditRecipe);
