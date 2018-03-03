import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardText } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { singleRecipePropTypes } from '../../../helpers/proptypes';
import './RecipeCard.scss';

const RecipeCard = ({ recipe }) => (
  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mt-4 recipe-card">
    <Card>
      <Link to={`/recipes/${recipe.id}`}>
        <CardImg
          top
          width="100%"
          className="img-fluid"
          src="images/jollof-rice-img.jpg"
          alt="recipe"
        />
        <CardBody className="card-block text-center pb-3">
          <h5 className="mb-1">{recipe.recipeName}</h5>
          <p className="card-text mb-2"><span className="text-muted">Posted by </span>{recipe.User.username}</p>
        </CardBody>
        <CardBody className="card-block text-center recipe-details">
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="clock-o" /> {recipe.totalTime}
          </CardText>
          <CardText className="text-muted mr-0 d-inline"> | </CardText>
          <CardText className="text-muted d-inline">
            <i className="aria-hidden flaticon flaticon-oven-kitchen-tool-for-cooking-foods" />
            {recipe.difficulty}
          </CardText>
        </CardBody>
        <CardBody className="text-center text-muted px-2 recipe-rating">
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="star" /> {(+recipe.rating).toPrecision(2)}
          </CardText>
          <CardText className="text-muted mr-2 d-inline"> | </CardText>
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="heart" /> {recipe.upvotes}
          </CardText>
          <CardText className="text-muted mr-2 d-inline"> | </CardText>
          <CardText className="text-muted mr-2 d-inline">
            <FontAwesome name="eye" className="text-success" /> {recipe.views}
          </CardText>
        </CardBody>
      </Link>
    </Card>
  </div>
);

RecipeCard.propTypes = {
  ...singleRecipePropTypes
};

export default RecipeCard;
