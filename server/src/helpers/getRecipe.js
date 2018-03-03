import { sequelize, Recipe, User, Review, Favorite, Like } from '../models';

const getRecipe = (userId, recipeId) => {
  const responseObject = {};

  return Review.findOne({
    where: { recipeId, userId },
  }).then((review) => {
    responseObject.isReviewed = !!review;

    return Favorite.findOne({
      where: { recipeId, userId },
    }).then((favorite) => {
      responseObject.isFavorited = !!favorite;

      return Like.findOne({
        where: { recipeId, userId },
      }).then((vote) => {
        if (!vote) {
          responseObject.vote = null;
        } else if (vote.upvote === true) {
          responseObject.vote = true;
        } else {
          responseObject.vote = false;
        }

        return Recipe
          .findOne({
            where: { id: +recipeId },
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
          }).then((recipe) => {
            responseObject.recipeItem = recipe;

            return responseObject;
          });
      });
    });
  });
};

export default getRecipe;
