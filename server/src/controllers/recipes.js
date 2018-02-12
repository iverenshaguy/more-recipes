import { sequelize, Recipe, User, Review, Favorite, Like } from '../models';
import getItems from '../helpers/getItems';

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
      }, {
        include: [
          User
        ]
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(next);
  },

  viewRecipe(req, recipeData, res, next) {
    return Recipe
      .findOne({
        where: { id: +recipeData.recipeId },
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: ['rating', 'comment', 'userId']
          },
          {
            model: User,
            as: 'User',
            attributes: ['id', 'username']
          },
          // add favorite, like and unlike models to know recipe status as regards user
          // i.e. if user has liked, unliked or favorited recipe
          {
            model: Favorite,
            as: 'favorites',
            attributes: ['favorite', 'userId']
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['upvote', 'userId']
          },
        ],
        group: ['Recipe.id', 'reviews.id', 'User.id', 'favorites.id', 'likes.id']
      })
      .then(recipe => recipe.increment('views').then(() => res.status(200).send(recipe)))
      .catch(next);
  },

  update(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .update(Object.assign(recipe, recipeData))
          .then(() => res.status(200).send(recipe))
          .catch(next);
      })
      .catch(next);
  },

  delete(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: recipeData.recipeId, userId: req.id } })
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
            attributes: ['id', 'username']
          }
        ],
        group: ['Recipe.id', 'User.id']
      })
      .then(recipes => getItems(req, res, recipes, 'recipes'))
      .catch(next);
  }
};
