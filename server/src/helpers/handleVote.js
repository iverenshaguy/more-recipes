import { Recipe, Like } from '../models';

const handleVote = (req, res, upvoteData, bool, vote, voteOpp, next) => {
  const warning = `You can't ${vote} your own recipe`;
  const responseMessage = (status, newRecipe, action) => res.status(status).send({
    message: `Your vote has been ${action}`,
    upvotes: newRecipe.upvotes,
    downvotes: newRecipe.downvotes
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
              alreadyLiked.destroy().then(() => recipe.decrement(`${vote}s`)
                .then(newRecipe => responseMessage(200, newRecipe, 'removed')))
                .catch(next);
              return;
            }

            alreadyLiked.update({ upvote: bool })
              .then(() => recipe.increment(`${vote}s`)
                .then(() => recipe.decrement(`${voteOpp}s`)
                  .then(newRecipe => responseMessage(201, newRecipe, 'recorded')).catch(next))
                .catch(next))
              .catch(next);
            return;
          }

          return Like
            .create({
              upvote: bool,
              recipeId: +upvoteData.recipeId,
              userId: req.id
            })
            .then(() => recipe.increment(`${vote}s`)
              .then(newRecipe => res.status(201).send(responseMessage(201, newRecipe, 'recorded')))
              .catch(next))
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

export default handleVote;
