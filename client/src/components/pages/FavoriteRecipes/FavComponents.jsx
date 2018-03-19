import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeItems from '../../shared/RecipeItems';
import { userPropTypes, multiRecipePropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function Fav
 * @param {object} props - props
 * @desc Returns User Favorite Components Route
 * @returns {JSX} User Favorite Components
 */
const FavComponents = props => (
  <Switch>
    <Route
      path={`${props.match.path}/categories`}
      render={() => (<RecipeItems
        title="RECIPE CATEGORIES"
        recipes={props.recipes}
        handlePageChange={props.handlePageChange}
        metadata={props.metadata}
      />)}
    />
    <Route
      path={props.match.path}
      render={() => (<RecipeItems
        title="RECIPES"
        recipes={props.recipes}
        handlePageChange={props.handlePageChange}
        metadata={props.metadata}
      />)}
    />
  </Switch>);

FavComponents.propTypes = {
  ...userPropTypes,
  ...multiRecipePropTypes,
};

export default FavComponents;
