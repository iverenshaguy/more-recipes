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
        expect(res.body.recipes).to.have.lengthOf(10);
        expect(res.body.metadata.totalCount).to.equal(15);
        expect(res.body.metadata.itemsPerPage).to.equal(10);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(2);
        expect(res.body.recipes[0].recipeName).to.equal('Sweet Potatoe Pottage');
        expect(res.body.recipes[1].recipeName).to.equal('Egusi Soup');
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

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
        expect(res.body.metadata.totalCount).to.equal(15);
        expect(res.body.metadata.itemsPerPage).to.equal(5);
        expect(res.body.metadata.page).to.equal(2);
        expect(res.body.metadata.lastPage).to.equal(3);
        expect(res.body.recipes[0].recipeName).to.equal('Vegetable Soup');
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  unauthorizedInput('should not get any recipes', agent, 'get', recipeURL, expect);
});
