import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Get Recipe Details', () => {
  const { iverenToken } = tokens;

  const recipeURL = `${rootURL}/recipes`;

  it('should get recipe details', (done) => {
    agent
      .get(`${recipeURL}/4`)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipeItem.recipeName).to.equal('Beans and Plantain');
        expect(res.body.recipeItem.directions).to.be.an('array');
        expect(res.body.recipeItem.ingredients[0]).to.equal('2 Cups of Beans');
        expect(res.body.recipeItem.views).to.equal(20);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  nonExistentRecipe('should not get recipe details for Non-Existent ID 123', agent, 'get', `${recipeURL}/123`, expect, iverenToken);

  nonExistentRecipe('should not get recipe details for Non-Existent ID abc', agent, 'get', `${recipeURL}/abc`, expect, iverenToken);

  unauthorizedInput('should not get recipe details', agent, 'get', `${recipeURL}/4`, expect);
});
