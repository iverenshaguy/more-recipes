import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { InputGroup, InputGroupButton, Button, Form, Label, Input } from 'reactstrap';

/**
 * @exports
 * @function SearchForm
 * @param {object} props
 * @desc Renders Search Form
 * @returns {JSX} SearchForm
 */
const SearchForm = (props) => {
  const {
    size, handleSearch, searchValue, handleSearchInput
  } = props;

  return (
    <Form id="search-form" onSubmit={handleSearch}>
      <InputGroup size={size}>
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
  );
};

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};

export default SearchForm;
