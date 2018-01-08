import handleVote from '../helpers/handleVote';

export default {
  upvoteRecipe: (req, upvoteData, res, next) =>
    handleVote(req, res, upvoteData, true, 'upvote', 'downvote', next),

  downvoteRecipe: (req, upvoteData, res, next) =>
    handleVote(req, res, upvoteData, false, 'downvote', 'upvote', next)
};
