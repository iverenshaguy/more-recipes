import { Recipe, Like } from '../models';
import getRecipe from '../helpers/getRecipe';

const handleVote = (req, res, upvoteData, bool, vote, voteOpp, next) => {
  const warning = `You can't ${vote} your own recipe`;
  const responseMessage = (status, newRecipeObj, action) => res.status(status).send({
    message: `Your vote has been ${action}`,
    recipe: newRecipeObj
  });

  return Recipe
    .findOne({ where: { id: +upvoteData.recipeId } })
    .then((recipe) => {
      if (recipe.userId === req.id) {
        return res.status(400).send({ message: warning });
      }

      return Like
        .findOne({ where: { recipeId: +upvoteData.recipeId, userId: req.id } })
        .then((alreadyLiked) => {
          if (alreadyLiked !== null) {
            if (alreadyLiked.upvote === bool) {
              return alreadyLiked.destroy().then(() => recipe.decrement(`${vote}s`)
                .then(() => getRecipe(req.id, +upvoteData.recipeId)
                  .then(responseObject => responseMessage(200, responseObject, 'removed'))))
                .catch(next);
            }

            return alreadyLiked.update({ upvote: bool })
              .then(() => recipe.increment(`${vote}s`)
                .then(() => recipe.decrement(`${voteOpp}s`)
                  .then(() => getRecipe(req.id, +upvoteData.recipeId)
                    .then(responseObject => responseMessage(201, responseObject, 'recorded')))))
              .catch(next);
          }

          return Like
            .create({
              upvote: bool,
              recipeId: +upvoteData.recipeId,
              userId: req.id
            })
            .then(() => recipe.increment(`${vote}s`)
              .then(() => getRecipe(req.id, +upvoteData.recipeId)
                .then(responseObject => responseMessage(201, responseObject, 'recorded'))))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

export default handleVote;
