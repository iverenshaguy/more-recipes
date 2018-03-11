import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardHeader, CardImgOverlay } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { singleRecipePropTypes } from '../../../helpers/proptypes';
import './RecipeCard.scss';

const RecipeCard = ({ recipe }) => (
  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-4 recipe-card">
    <Card>
      <Link to={`/recipes/${recipe.id}`}>
        <CardHeader className="py-2">
          <CardText className="d-inline"><small>@{recipe.User.username}</small></CardText>
          <CardText className="d-inline float-right">
            <small className="text-muted"><FontAwesome name="heart" /> {recipe.upvotes}</small>
          </CardText>
        </CardHeader>
        <Card className="m-0 p-0 card-image">
          <CardImg
            bottom
            width="100%"
            className="img-fluid"
            src="images/jollof-rice-img.jpg"
            alt="recipe"
          />
          <CardImgOverlay className="text-center card-image-overlay text-white px-2 recipe-rating">
            <h5 className="mb-1 pt-3">{recipe.recipeName}</h5>
          </CardImgOverlay>
        </Card>
      </Link>
    </Card>
  </div>
);

RecipeCard.propTypes = {
  ...singleRecipePropTypes
};

export default RecipeCard;
