import React from 'react';
import PropTypes from 'prop-types';
import { AddRecipeBtn } from '../../shared/Buttons';
import SearchForm from '../../shared/Forms/SearchForm';

/**
 * @exports
 * @function Hero
 * @param {object} props
 * @returns {JSX} Hero
 */
const Hero = (props) => {
  const {
    handleSearch, handleAddRecipe, handleSearchInput, searchValue
  } = props;

  return (
    <div className="container-fluid" id="hero-image">
      <div className="row mx-auto" id="hero-image-text">
        <div className="col align-self-center">
          <div className="row justify-content-center align-items-center mb-3">
            <div className="col-12">
              <h3>Search for a Recipe</h3>
            </div>
            <div className="col-8 py-4">
              <SearchForm
                size="lg"
                handleSearch={handleSearch}
                handleSearchInput={handleSearchInput}
                searchValue={searchValue}
              />
            </div>
          </div>
          <AddRecipeBtn handleClick={handleAddRecipe} />
        </div>
      </div>
    </div>);
};

Hero.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleAddRecipe: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
};

export default Hero;
