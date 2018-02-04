import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Review Recipe', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;
  const review = { rating: 4, comment: 'Very Good Recipe' };
  const badReview1 = { rating: 7, comment: '[Very Good Recipe]' };
  const badReview2 = { rating: 'Five', comment: '' };
  const badReview3 = {};

  describe('## Right Input', () => {
    it('should review recipe', (done) => {
      agent
        .post(`${recipeURL}/5/reviews`)
        .send(review)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.rating).to.equal(4);
          expect(res.body.comment).to.equal('Very Good Recipe');

          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should not review recipe again', (done) => {
      agent
        .post(`${recipeURL}/5/reviews`)
        .send(review)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('Review Already Submitted');

          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should not review recipe that belongs to user', (done) => {
      agent
        .post(`${recipeURL}/9/reviews`)
        .send(review)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message).to.equal('You can\'t review your own recipe');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('## Wrong Input', () => {
    it('should not review recipe because of wrong input data 1', (done) => {
      agent
        .post(`${recipeURL}/7/reviews`)
        .send(badReview1)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors.rating.msg).to.equal('Recipe must be rated from 1 - 5');
          expect(res.body.errors.comment.msg).to.equal('Review can only contain letters and the characters (,.\'-)');
          if (err) return done(err);
          done();
        });
    });

    it('should not review recipe because of wrong input data 2', (done) => {
      agent
        .post(`${recipeURL}/7/reviews`)
        .send(badReview2)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors.rating.msg).to.equal('Recipe must be rated from 1 - 5');
          expect(res.body.errors.comment.msg).to.equal('Review cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not review recipe because of wrong input data 3', (done) => {
      agent
        .post(`${recipeURL}/7/reviews`)
        .send(badReview3)
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors.rating.msg).to.equal('Recipe must be rated');
          expect(res.body.errors.comment.msg).to.equal('Review must be specified');
          if (err) return done(err);
          done();
        });
    });
  });

  nonExistentRecipe('should not review recipe for Non-Existent ID 123', agent, 'post', `${recipeURL}/123/reviews`, expect, iverenToken);

  nonExistentRecipe('should not review recipe for Non-Existent ID abc', agent, 'post', `${recipeURL}/abc/reviews`, expect, iverenToken);

  unauthorizedInput('should not review recipe', agent, 'post', `${recipeURL}/6/reviews`, expect);
});
