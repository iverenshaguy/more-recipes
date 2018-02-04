import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Delete Recipe', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should delete recipe', (done) => {
    agent
      .delete(`${recipeURL}/1`)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not delete another user\'s recipe', (done) => {
    agent
      .delete(`${recipeURL}/2`)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Recipe Not Found');
        if (err) return done(err);
        done();
      });
  });

  nonExistentRecipe('should not delete recipe for Non-Existent ID 123', agent, 'delete', `${recipeURL}/123`, expect, iverenToken);

  nonExistentRecipe('should not delete recipe for Non-Existent ID abc', agent, 'delete', `${recipeURL}/abc`, expect, iverenToken);

  unauthorizedInput('should not delete recipe', agent, 'delete', `${recipeURL}/9`, expect);
});
