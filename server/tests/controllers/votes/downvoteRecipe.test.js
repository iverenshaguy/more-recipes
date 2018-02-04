import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Downvote Recipe', () => {
  const { emiolaToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should downvote recipe', (done) => {
    agent
      .post(`${recipeURL}/16/downvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Your vote has been recorded');
        expect(res.body.upvotes).to.equal(0);
        expect(res.body.downvotes).to.equal(1);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should downvote recipe that was formerly upvoted', (done) => {
    agent
      .post(`${recipeURL}/11/downvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Your vote has been recorded');
        expect(res.body.upvotes).to.equal(5);
        expect(res.body.downvotes).to.equal(4);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should remove downvote on already downvoted recipe', (done) => {
    agent
      .post(`${recipeURL}/16/downvotes`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Your vote has been removed');
        expect(res.body.upvotes).to.equal(0);
        expect(res.body.downvotes).to.equal(0);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not downvote recipe that belongs to user', (done) => {
    agent
      .post('/api/v1/recipes/8/downvotes')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal('You can\'t downvote your own recipe');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  nonExistentRecipe('should not downvote recipe for Non-Existent ID 123', agent, 'post', `${recipeURL}/123/downvotes`, expect, emiolaToken);

  nonExistentRecipe('should not downvote recipe for Non-Existent ID abc', agent, 'post', `${recipeURL}/abc/downvotes`, expect, emiolaToken);

  unauthorizedInput('should not downvote recipe', agent, 'post', `${recipeURL}/8/downvotes`, expect);
});
