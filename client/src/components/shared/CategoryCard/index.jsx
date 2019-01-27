import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay } from 'reactstrap';
import './CategoryCard.scss';

const CategoryCard = () => (
  <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-4 category-card">
    <Link to="/">
      <Card className="m-0 p-0 card-image">
        <CardImg
          bottom
          width="100%"
          className="img-fluid"
          src="images/jollof-rice-img.jpg"
          alt="recipe"
        />
        <CardImgOverlay className="text-center card-image-overlay text-white px-2 recipe-rating">
          <h5 className="mb-1 pt-3">Category</h5>
        </CardImgOverlay>
      </Card>
    </Link>
  </div>
);

export default CategoryCard;
