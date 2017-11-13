import { sequelize, Recipe, User, Review, Like } from '../models';

// Recipes Controller
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

  getSingleRecipe(req, recipeData, res) {
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
            model: Like,
            as: 'likes',
            attributes: ['upvote']
          },
          {
            model: Review,
            as: 'reviews',
            attributes: ['rating', 'comment', 'userId']
          },
        ],
        group: ['Recipe.id', 'reviews.id', 'likes.id']
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return res.status(200).send(recipe);
      });
  },

  update(req, recipeData, res) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .update(Object.assign(recipe, recipeData))
          .then(() => res.status(200).send(recipe));
      });
  },

  delete(req, recipeData, res) {
    return Recipe
      .findOne({ where: { id: recipeData.recipeId, userId: req.session.user.id } })
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
      .findAll({
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Like,
            as: 'likes',
            // where: {
            //   upvote: true
            // },
            attributes: ['upvote'],
          },
          {
            model: Review,
            as: 'reviews',
            attributes: []
          },
        ],
        group: ['Recipe.id', 'likes.id']
      })
      .then(recipes => res.status(200).send(recipes));
  },

  reviewRecipe(req, reviewData, res) {
    return Recipe
      .findOne({ where: { id: +reviewData.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        if (recipe.userId === req.session.user.id) {
          return res.status(400).send({ message: 'You can\'t review your own recipe' });
        }

        return Review
          .findOne({ where: { recipeId: +reviewData.recipeId, userId: req.session.user.id } })
          .then((availableReview) => {
            if (availableReview) {
              return res.status(400).send({ message: 'Review Already Submitted' });
            }

            return Review
              .create({
                rating: reviewData.rating,
                comment: reviewData.comment,
                recipeId: +reviewData.recipeId,
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

  upvoteRecipe(req, upvoteData, res) {
    return Recipe
      .findOne({ where: { id: +upvoteData.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        if (recipe.userId === req.session.user.id) {
          return res.status(400).send({ message: 'You can\'t upvote your own recipe' });
        }

        return Like
          .findOne({ where: { recipeId: +upvoteData.recipeId, userId: req.session.user.id } })
          .then((alreadyLiked) => {
            if (alreadyLiked && alreadyLiked.upvote) {
              return res.status(400).send({ message: 'Recipe Already Upvoted' });
            }

            if (alreadyLiked && !alreadyLiked.upvote) {
              return alreadyLiked
                .update({ upvote: true })
                .then(newLike => res.status(201).send(newLike));
            }

            return Like
              .create({
                upvote: true,
                recipeId: +upvoteData.recipeId,
                userId: req.session.user.id
              }, {
                include: [
                  User,
                  Recipe
                ]
              })
              .then(like => res.status(201).send(like));
          });
      });
  },

  downvoteRecipe(req, upvoteData, res) {
    return Recipe
      .findOne({ where: { id: +upvoteData.recipeId } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        if (recipe.userId === req.session.user.id) {
          return res.status(400).send({ message: 'You can\'t downvote your own recipe' });
        }

        return Like
          .findOne({ where: { recipeId: +upvoteData.recipeId, userId: req.session.user.id } })
          .then((alreadyLiked) => {
            if (alreadyLiked && !alreadyLiked.upvote) {
              return res.status(400).send({ message: 'Recipe Already Downvoted' });
            }

            if (alreadyLiked && alreadyLiked.upvote) {
              return alreadyLiked
                .update({ upvote: false })
                .then(newLike => res.status(201).send(newLike));
            }

            return Like
              .create({
                upvote: false,
                recipeId: +upvoteData.recipeId,
                userId: req.session.user.id
              }, {
                include: [
                  User,
                  Recipe
                ]
              })
              .then(downvote => res.status(201).send(downvote));
          });
      });
  },

  getUpvoted(req, res) {
    let orderBy = 'DESC';

    if (req.query.order === 'descending') {
      orderBy = 'ASC';
    }

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
      order: [[sequelize.fn('COUNT', sequelize.col('likes.upvote')), orderBy]],
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
