import { Recipe, User, Review } from '../models';
import getItems from '../helpers/getItems';

export default {
  reviewRecipe: (req, reviewData, res, next) => Recipe
    .findOne({ where: { id: +reviewData.recipeId } })
    .then((recipe) => {
      if (recipe.userId === req.id) {
        return res.status(400).send({ message: 'You can\'t review your own recipe' });
      }

      return Review
        .findOne({ where: { recipeId: +reviewData.recipeId, userId: req.id } })
        .then((availableReview) => {
          if (availableReview) {
            return res.status(400).send({ message: 'Review Already Submitted' });
          }

          return Review
            .create({
              rating: reviewData.rating,
              comment: reviewData.comment,
              recipeId: +reviewData.recipeId,
              userId: req.id
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
    .catch(next),

  getRecipeReviews: (req, reviewData, res, next) => Review
    .findAll({
      where: { recipeId: +reviewData.recipeId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username']
        }
      ],
      group: ['Review.id', 'User.id']
    })
    .then(reviews => getItems(req, res, reviews, 'reviews'))
    .catch(next)
};
