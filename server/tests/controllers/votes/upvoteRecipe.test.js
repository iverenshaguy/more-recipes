import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Upvote Recipe', () => {
  const { emiolaToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should upvote recipe', (done) => {
    agent
      .post(`${recipeURL}/2/upvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Your vote has been recorded');
        expect(res.body.upvotes).to.equal(4);
        expect(res.body.downvotes).to.equal(4);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should upvote recipe that was formerly downvoted', (done) => {
    agent
      .post(`${recipeURL}/7/upvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Your vote has been recorded');
        expect(res.body.upvotes).to.equal(6);
        expect(res.body.downvotes).to.equal(3);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should remove upvote on already upvoted recipe', (done) => {
    agent
      .post(`${recipeURL}/2/upvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Your vote has been removed');
        expect(res.body.upvotes).to.equal(3);
        expect(res.body.downvotes).to.equal(4);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not upvote recipe that belongs to user', (done) => {
    agent
      .post('/api/v1/recipes/8/upvotes')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('You can\'t upvote your own recipe');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  nonExistentRecipe('should not upvote recipe for Non-Existent ID 123', agent, 'post', `${recipeURL}/123/upvotes`, expect, emiolaToken);

  nonExistentRecipe('should not upvote recipe for Non-Existent ID abc', agent, 'post', `${recipeURL}/abc/upvotes`, expect, emiolaToken);

  unauthorizedInput('should not upvote recipe', agent, 'post', `${recipeURL}/8/upvotes`, expect);
});
