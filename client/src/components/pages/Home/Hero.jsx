/* eslint-disable */
import React from 'react';
import { InputGroup, InputGroupButton, Button, Form, Label, Input } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { toggleModal } from '../../../actions/ui';

const Hero = ({
  dispatch,
  handleSearch,
  handleSearchInput,
  searchValue
}) => (
    <div className="container-fluid" id="hero-image">
      <div className="row mx-auto" id="hero-image-text">
        <div className="col align-self-center">
          <div className="row justify-content-center align-items-center mb-3">
            <div className="col-12">
              <h3>Search for a Recipe</h3>
            </div>
            <div className="col-8 py-4">
              <Form id="search-form" onSubmit={handleSearch}>
                <InputGroup size="lg">
                  <Label className="sr-only" for="search">
                    Search for Recipes
                  </Label>
                  <Input
                    id="search"
                    placeholder="Curried Chicken Gravy..."
                    onChange={handleSearchInput}
                    value={searchValue}
                  />
                  <InputGroupButton>
                    <Button type="submit" className="search-btn">
                      <FontAwesome name="search" />
                    </Button>
                  </InputGroupButton>
                </InputGroup>
              </Form>
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

Hero.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
};

export default Hero;
