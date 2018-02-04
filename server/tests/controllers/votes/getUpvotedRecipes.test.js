import { agent, expect, tokens, rootURL } from '../../utils/setupTests';

describe('Get Upvoted Recipes', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should get upvoted recipes in ascending order', (done) => {
    agent
      .get(recipeURL)
      .query({ sort: 'upvotes', order: 'ascending' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(14);
        expect(res.body[0].recipeName).to.equal('Peppered Chicken');
        expect(res.body[1].recipeName).to.equal('Egusi Soup');
        expect(res.body[2].recipeName).to.equal('White Soup');
        expect(res.body[3].recipeName).to.equal('Mixed Okro Soup (Obe Ila Asepo)');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get upvoted recipes in descending order', (done) => {
    agent
      .get(recipeURL)
      .query({ sort: 'upvotes', order: 'descending' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(14);
        expect(res.body[0].recipeName).to.equal('Yam Pottage');
        expect(res.body[1].recipeName).to.equal('Jollof Rice');
        expect(res.body[2].recipeName).to.equal('Rice and Beans');
        expect(res.body[3].recipeName).to.equal('Beans and Plantain');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get upvotes recipes by page according to limit and page', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({
        sort: 'upvotes', order: 'ascending', page: '2', limit: '2'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(2);
        expect(res.body.metaData.totalRecipeCount).to.equal(14);
        expect(res.body.metaData.pageRecipeCount).to.equal(2);
        expect(res.body.metaData.page).to.equal(2);
        expect(res.body.metaData.lastPage).to.equal(7);
        expect(res.body.recipes[0].recipeName).to.equal('White Soup');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get all recipes for url with wrong query instead of upvoted recipes', (done) => {
    agent
      .get(recipeURL)
      .query({ sort: 'likes', order: 'ascending' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.lengthOf(15);
        expect(res.body[0].recipeName).to.equal('Sweet Potatoe Pottage');
        expect(res.body[3].recipeName).to.equal('White Soup');
        if (err) return done(err);
        done();
      });
  });

  // it('should not get any recipes', (done) => {
  //   agent
  //     .get(recipeURL)
  //     .query({ sort: 'upvotes', order: 'ascending' })
  //     .set('Accept', 'application/json')
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(401);
  //       expect(res.body.err
  // or).to.equal('You are not authorized to access this page, please signin');

  //       if (err) {
  //         return done(err);
  //       }
  //       done();
  //     });
  // });
});
