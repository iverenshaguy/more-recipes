import { sequelize, Recipe, User, Review } from '../models';
import getItems from '../helpers/getItems';
import getRecipe from '../helpers/getRecipe';
import { checkArrayData } from '../helpers/arrayCheck';

export default {
  create(req, recipeData, res, next) {
    return Recipe
      .create({
        recipeName: recipeData.recipeName,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        totalTime: recipeData.totalTime,
        difficulty: recipeData.difficulty,
        extraInfo: recipeData.extraInfo,
        vegetarian: recipeData.vegetarian,
        userId: req.id,
        ingredients: recipeData.ingredients,
        preparations: recipeData.preparations,
        directions: recipeData.directions
      }, { include: [User] })
      .then(recipe => res.status(201).send(recipe))
      .catch(next);
  },

  viewRecipe(req, recipeData, res, next) {
    return getRecipe(req.id, +recipeData.recipeId)
      .then(responseObject => responseObject.recipeItem.increment('views').then((recipe) => {
        responseObject.recipeItem = recipe;
        return res.status(200).send(responseObject);
      }))
      .catch(next);
  },

  update(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        if (recipeData.ingredients) recipeData.ingredients = checkArrayData(recipeData.ingredients);
        if (recipeData.preparations) recipeData.preparations = checkArrayData(recipeData.preparations); // eslint-disable-line
        if (recipeData.directions) recipeData.directions = checkArrayData(recipeData.directions);

        return recipe
          .update(Object.assign({}, recipe, recipeData))
          .then(() => getRecipe(req.id, +recipeData.recipeId)
            .then(responseObject => res.status(200).send(responseObject)));
      })
      .catch(next);
  },

  delete(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(next);
      })
      .catch(next);
  },

  list(req, res, next) {
    return Recipe
      .findAll({
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: [],
          },
          {
            model: User,
            as: 'User',
            attributes: ['id', 'username', 'profilePic']
          }
        ],
        group: ['Recipe.id', 'User.id']
      })
      .then(recipes => getItems(req, res, recipes, 'recipes'))
      .catch(next);
  }
};
