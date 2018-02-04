import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Get All Recipes', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should get all recipes', (done) => {
    agent
      .get(recipeURL)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(15);
        expect(res.body[0].recipeName).to.equal('Sweet Potatoe Pottage');
        expect(res.body[1].recipeName).to.equal('Ogbona Soup');
        expect(res.body[2].recipeName).to.equal('Vegetable Soup');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get all recipes by page if page and limit are added to query', (done) => {
    agent
      .get(recipeURL)
      .query({
        page: '2', limit: '5'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(5);
        expect(res.body.metaData.totalRecipeCount).to.equal(15);
        expect(res.body.metaData.pageRecipeCount).to.equal(5);
        expect(res.body.metaData.page).to.equal(2);
        expect(res.body.metaData.lastPage).to.equal(3);
        expect(res.body.recipes[0].recipeName).to.equal('Mixed Okro Soup (Obe Ila Asepo)');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  unauthorizedInput('should not get any recipes', agent, 'get', recipeURL, expect);
});
