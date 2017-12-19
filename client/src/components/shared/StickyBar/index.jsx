import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Form, InputGroup, Label, Input, InputGroupButton, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './StickyBar.scss';

const StickyBar = (props) => {
  if (props.type === 'login' || props.type === 'signup') {
    return '';
  }

  return (
    <div className={props.type}>
      <div className="sticky-bar-wrapper text-center d-block d-sm-block d-md-none">
        <div className="container-fluid">
          <div className="row" id="result-search-form-div">
            <div className="col-12 w-100 py-3">
              <Form id="search-form">
                <InputGroup>
                  <Label className="sr-only" for="search">
                    Search for Recipe
                  </Label>
                  <Input type="text" id="search" placeholder="Search for More Recipes" />
                  <InputGroupButton className="input-group-btn">
                    <Button type="submit">Submit</Button>
                  </InputGroupButton>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
        <div className="sticky-bar text-center">
          {props.type === 'user-profile' && (
            <a className="nav-link d-inline">
              <i className="aria-hidden flaticon flaticon-oven-kitchen-tool-for-cooking-foods" />
            </a>
          )}
          {props.type !== 'user-profile' && (
            <a className="nav-link d-inline" data-toggle="modal">
              <FontAwesome
                name="share-alt"
                id="social-modal-icon"
                size="lg"
                onClick={() => props.toggleModal('socialModal')}
              />
            </a>
          )}
          <a className="nav-link d-inline" title="New Recipe">
            <FontAwesome
              name="plus"
              id="add-edit-modal-icon"
              size="lg"
              onClick={() => props.toggleModal('addRecipeModal')}
            />
          </a>
          {props.type === 'view-recipe' && (
            <a className="nav-link d-inline favorite" title="Favorite">
              <FontAwesome name="heart-o" size="lg" />
            </a>
          )}
          {props.type === 'view-recipe' && (
            <a className="nav-link d-inline upvote" title="Upvote">
              <FontAwesome name="thumbs-o-up" size="lg" />
            </a>
          )}
          {props.type === 'view-recipe' && (
            <a className="nav-link d-inline downvote" title="Downvote">
              <FontAwesome name="thumbs-o-down" size="lg" />
            </a>
          )}
          <a className="nav-link d-inline">
            <FontAwesome name="search" size="lg" className="search-icon" />
          </a>
          {props.type !== 'view-profile' && (
            <a className="nav-link d-inline">
              <FontAwesome name="heart" size="lg" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

StickyBar.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default StickyBar;
