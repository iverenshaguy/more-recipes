import React, { Fragment } from 'react';
import RecipeDetailsItem from './RecipeDetailsItem';
import { singleRecipePropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * Returns Recipe Item
 * @param {object} recipe
 * @returns {JSX} RecipeDetailsSection
 */
const RecipeDetailsSection = ({ recipe }) => {
  const ingredientsSection = {
    items: recipe.ingredients,
    title: 'Ingredients',
    id: 'ingredient-list',
    info: (
      <Fragment>
        <p className="inline-p text-muted"><i className="aria-hidden fa fa-clock-o fa-lg" /> {recipe.totalTime}<span className="hidden-sm-down">  |</span></p>
        <p className="inline-p text-muted"><i className="aria-hidden flaticon flaticon-oven-kitchen-tool-for-cooking-foods" /> {recipe.difficulty}</p>
      </Fragment>
    )
  };

  const preparationSection = {
    items: recipe.preparations,
    title: 'Preparation',
    id: 'preparation',
    info: (
      <Fragment>
        <p className="inline-p text-muted"><i className="aria-hidden fa fa-clock-o fa-lg" /> {recipe.prepTime}</p>
      </Fragment>
    )
  };

  const cookingDirectionsSection = {
    items: recipe.directions,
    title: 'Cooking Directions',
    id: 'cooking-directions',
    info: (
      <Fragment>
        <p className="inline-p text-muted"><i className="aria-hidden fa fa-clock-o" /> {recipe.cookTime} <span className="hidden-sm-down"> |&nbsp;</span></p>
        <p className="inline-p text-muted"><i className="aria-hidden fa fa-clock-o" /> Ready - {recipe.totalTime}</p>
      </Fragment>
    )
  };
  return (
    <Fragment>
      <RecipeDetailsItem section={ingredientsSection} />
      <RecipeDetailsItem section={preparationSection} />
      <RecipeDetailsItem section={cookingDirectionsSection} />
    </Fragment>
  );
};

RecipeDetailsSection.propTypes = {
  ...singleRecipePropTypes
};

export default RecipeDetailsSection;
