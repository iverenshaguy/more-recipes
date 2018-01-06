import { Recipe, User, Review } from '../models';

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
};
