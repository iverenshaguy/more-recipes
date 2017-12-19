import React from 'react';
import { InputGroup, InputGroupButton, Button, Form, Label, Input } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Hero = props => (
  <div className="container-fluid" id="hero-image">
    <div className="row mx-auto" id="hero-image-text">
      <div className="col align-self-center">
        <div className="row justify-content-center align-items-center mb-3">
          <div className="col-12">
            <h3>Search for a Recipe</h3>
          </div>
          <div className="col-8 py-4">
            <Form id="search-form">
              <InputGroup size="lg">
                <Label className="sr-only" for="search">
                  Search for Recipes
                </Label>
                <Input id="search" placeholder="Curried Chicken Gravy..." />
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
          onClick={() => props.toggle('addRecipeModal')}
          className="btn-default btn-lg"
          id="home-add-recipe-btn"
          title="New Recipe"
        >
          Add a New Recipe
        </Button>
      </div>
    </div>
  </div>
);

Hero.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default Hero;
