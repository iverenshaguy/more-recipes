import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddRecipeBtn = ({ handleClick }) => (
  <Button
    onClick={handleClick}
    className="btn-default btn-lg d-none d-md-inline-block"
    id="home-add-recipe-btn"
    title="New Recipe"
  >
    Add a New Recipe
  </Button>
);

AddRecipeBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default AddRecipeBtn;
