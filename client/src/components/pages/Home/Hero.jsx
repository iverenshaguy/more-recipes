import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import SearchForm from '../../shared/Forms/SearchForm';
import { toggleModal } from '../../../actions/ui';

/**
 * @exports
 * @function Hero
 * @param {object} props
 * @returns {JSX} Hero
 */
const Hero = (props) => {
  const {
    dispatch, handleSearch, handleSearchInput, searchValue
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
          <Button
            onClick={() => dispatch(toggleModal('addRecipe'))}
            className="btn-default btn-lg"
            id="home-add-recipe-btn"
            title="New Recipe"
          >
            Add a New Recipe
          </Button>
        </div>
      </div>
    </div>);
};

Hero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
};

export default Hero;
