import { sequelize, Recipe, User, Review, Like } from '../models';

export default {
  create(req, recipeData, res) {
    return Recipe
      .create({
        recipeName: recipeData.recipeName,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        totalTime: recipeData.totalTime,
        difficulty: recipeData.difficulty,
        extraInfo: recipeData.extraInfo,
        vegetarian: recipeData.vegetarian,
        recipeImage: recipeData.recipeImage,
        userId: req.session.user.id,
        ingredients: recipeData.ingredients,
        preparations: recipeData.preparations,
        directions: recipeData.directions
      }, {
        include: [
          User
        ]
      })
      .then(recipe => res.status(201).send(recipe));
  },

  update(req, recipeData, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .update(Object.assign(recipe, recipeData))
          .then(() => res.status(200).send(recipe));
      });
  },

  delete(req, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .destroy()
          .then(() => res.status(204).send());
      });
  },

  list(req, res) {
    return Recipe
      .all()
      .then(recipes => res.status(200).send(recipes));
  },

  reviewRecipe(req, reviewData, res) {
    return Recipe
      .findOne({ where: { id: req.params.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return Review
          .findOne({ where: { recipeId: req.params.recipeId, userId: req.session.user.id } })
          .then((availableReview) => {
            if (availableReview) {
              return res.status(400).send({ message: 'Review Already Submitted' });
            }

            return Review
              .create({
                rating: reviewData.rating,
                comment: reviewData.comment,
                recipeId: req.params.recipeId,
                userId: req.session.user.id
              }, {
                include: [
                  User,
                  Recipe
                ]
              })
              .then(review => res.status(201).send(review));
          });
      });
  },

  getUpvoted(req, res) {
    return Recipe.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('likes.upvote')), 'upvotes']],
      },
      include: [{
        model: Like,
        as: 'likes',
        where: {
          upvote: true
        },
        attributes: []
      }],
      order: [[sequelize.fn('COUNT', sequelize.col('likes.upvote')), 'DESC']],
      group: ['Recipe.id']
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'There are no upvoted recipes' });
        }

        return res.status(200).send(recipes);
      });
  },

};
