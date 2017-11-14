import del from 'del';
import path from 'path';
import { Sequelize, sequelize, Recipe, User, Review, Like, Favorite } from '../models';

const { Op } = Sequelize;
const uploadPath = path.resolve(__dirname, '../../../public/images');

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
        userId: req.session.user.id,
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

  upload(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        const savedImage = `${uploadPath}/recipes/${recipe.recipeImage}`;

        del.sync([savedImage]);

        return recipe
          .update({ recipeImage: req.file.filename })
          .then(() => res.status(201).send(recipe))
          .catch(next);
      })
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
        recipe.increment('views').then(() => {
          recipe.reload()
            .then(() => res.status(200).send(recipe));
        });
      })
      .catch(next);
  },

  update(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.session.user.id } })
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
      .findOne({ where: { id: recipeData.recipeId, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        const savedImage = `${uploadPath}/recipes/${recipe.recipeImage}`;

        del.sync([savedImage]);

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
      .then(recipes => res.status(200).send(recipes))
      .catch(next);
  },

  reviewRecipe(req, reviewData, res, next) {
    return Recipe
      .findOne({ where: { id: +reviewData.recipeId } })
      .then((recipe) => {
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
              .then(review => res.status(201).send(review))
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  },

  addFavoriteRecipe(req, favoriteData, res, next) {
    return Favorite.findOne({
      where: {
        recipeId: +favoriteData.recipeId,
        userId: req.session.user.id
      }
    })
      .then((favorited) => {
        if (favorited) {
          favorited.destroy().then(() => Recipe.findAll({
            include: [{
              model: Favorite,
              as: 'favorites',
              attributes: [],
              where: {
                userId: req.session.user.id,
              }
            }],
          })
            .then(recipes => res.status(200).send({
              message: 'Recipe has been removed from favorites',
              recipes
            })))
            .catch(next);
          return;
        }

        return Favorite
          .create({
            favorite: true,
            recipeId: +favoriteData.recipeId,
            userId: req.session.user.id
          })
          .then(() => Recipe.findAll({
            include: [{
              model: Favorite,
              as: 'favorites',
              attributes: [],
              where: {
                userId: req.session.user.id,
              }
            }],
          })
            .then(recipes => res.status(200).send({
              message: 'Recipe has been added to favorites',
              recipes
            })))
          .catch(next);
      })
      .catch(next);
  },

  upvoteRecipe(req, upvoteData, res, next) {
    return Recipe
      .findOne({ where: { id: +upvoteData.recipeId } })
      .then((recipe) => {
        if (recipe.userId === req.session.user.id) {
          return res.status(400).send({ message: 'You can\'t upvote your own recipe' });
        }

        return Like
          .findOne({ where: { recipeId: +upvoteData.recipeId, userId: req.session.user.id } })
          .then((alreadyLiked) => {
            if (alreadyLiked && alreadyLiked.upvote) {
              alreadyLiked.destroy().then(() => recipe.decrement('upvotes')
                .then(newRecipe => res.status(200).send({
                  message: 'Your vote has been removed',
                  upvotes: newRecipe.upvotes,
                  downvotes: newRecipe.downvotes
                })))
                .catch(next);
            } else if (alreadyLiked && !alreadyLiked.upvote) {
              alreadyLiked.update({ upvote: true })
                .then(() => recipe.increment('upvotes')
                  .then(() => recipe.decrement('downvotes')
                    .then(newRecipe => res.status(200).send({
                      message: 'Your vote has been recorded',
                      upvotes: newRecipe.upvotes,
                      downvotes: newRecipe.downvotes
                    })).catch(next))
                  .catch(next))
                .catch(next);
            } else {
              return Like
                .create({
                  upvote: true,
                  recipeId: +upvoteData.recipeId,
                  userId: req.session.user.id
                })
                .then(() => recipe.increment('upvotes')
                  .then(newRecipe => res.status(200).send({
                    message: 'Your vote has been recorded',
                    upvotes: newRecipe.upvotes,
                    downvotes: newRecipe.downvotes
                  })).catch(next))
                .catch(next);
            }
          })
          .catch(next);
      })
      .catch(next);
  },

  downvoteRecipe(req, upvoteData, res, next) {
    return Recipe
      .findOne({ where: { id: +upvoteData.recipeId } })
      .then((recipe) => {
        if (recipe.userId === req.session.user.id) {
          return res.status(400).send({ message: 'You can\'t downvote your own recipe' });
        }

        return Like
          .findOne({ where: { recipeId: +upvoteData.recipeId, userId: req.session.user.id } })
          .then((alreadyLiked) => {
            if (alreadyLiked && !alreadyLiked.upvote) {
              alreadyLiked.destroy().then(() => recipe.decrement('downvotes')
                .then(newRecipe => res.status(200).send({
                  message: 'Your vote has been removed',
                  upvotes: newRecipe.upvotes,
                  downvotes: newRecipe.downvotes
                })))
                .catch(next);
            } else if (alreadyLiked && alreadyLiked.upvote) {
              alreadyLiked.update({ upvote: false })
                .then(() => recipe.increment('downvotes')
                  .then(() => recipe.decrement('upvotes')
                    .then(newRecipe => res.status(200).send({
                      message: 'Your vote has been recorded',
                      upvotes: newRecipe.upvotes,
                      downvotes: newRecipe.downvotes
                    })).catch(next))
                  .catch(next))
                .catch(next);
            } else {
              return Like
                .create({
                  upvote: false,
                  recipeId: +upvoteData.recipeId,
                  userId: req.session.user.id
                })
                .then(() => recipe.increment('downvotes')
                  .then(newRecipe => res.status(200).send({
                    message: 'Your vote has been recorded',
                    upvotes: newRecipe.upvotes,
                    downvotes: newRecipe.downvotes
                  })).catch(next))
                .catch(next);
            }
          })
          .catch(next);
      })
      .catch(next);
  },

  getUpvoted(req, res, next) {
    let orderBy = 'DESC';

    if (req.query.order === 'descending') {
      orderBy = 'ASC';
    }

    return Recipe.findAll({
      where: { upvotes: { [Op.ne]: 0 } },
      order: [['upvotes', orderBy]]
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'There are no upvoted recipes' });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  },

};
