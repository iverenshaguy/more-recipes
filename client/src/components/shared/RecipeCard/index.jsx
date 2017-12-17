import React from 'react';
import { Card, CardImg, CardBody, CardText } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
// import PropTypes from 'prop-types';
import './RecipeCard.scss';

const RecipeCard = () => (
  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-4 recipe-card">
    <Card>
      <a href="view-recipe.html">
        <CardImg
          top
          width="100%"
          className="img-fluid"
          src="images/jollof-rice-img.jpg"
          alt="recipe"
        />
        <CardBody className="card-block text-center pb-0">
          <h5 className="mb-1">Jollof Rice and Chicken</h5>
          <CardText className="mb-2">
            <span className="text-muted">Posted by </span>
            @janesmith
          </CardText>
        </CardBody>
        <CardBody className="card-block text-center recipe-details">
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="clock-o" /> 45 minutes
          </CardText>
          <CardText className="text-muted mr-0 d-inline"> | </CardText>
          <CardText className="text-muted d-inline">
            <i className="aria-hidden flaticon flaticon-oven-kitchen-tool-for-cooking-foods" />
            A Bit Difficult
          </CardText>
        </CardBody>
        <CardBody className="text-center text-muted px-2 recipe-rating">
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="star" /> 4.5
          </CardText>
          <CardText className="text-muted mr-2 d-inline"> | </CardText>
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="heart" /> 200
          </CardText>
          <CardText className="text-muted mr-2 d-inline"> | </CardText>
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="eye" className="text-success" /> 350
          </CardText>
        </CardBody>
      </a>
    </Card>
  </div>
);

// RecipeCard.propTypes = {
//   recipe: PropTypes.object.isRequired,
// };

export default RecipeCard;
