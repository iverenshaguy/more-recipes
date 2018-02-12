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
        expect(res.body.recipes).to.have.lengthOf(10);
        expect(res.body.metadata.totalCount).to.equal(14);
        expect(res.body.metadata.itemsPerPage).to.equal(10);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(2);
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

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
        expect(res.body.recipes).to.have.lengthOf(10);
        expect(res.body.metadata.totalCount).to.equal(14);
        expect(res.body.metadata.itemsPerPage).to.equal(10);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(2);
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

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
        expect(res.body.metadata.totalCount).to.equal(14);
        expect(res.body.metadata.itemsPerPage).to.equal(2);
        expect(res.body.metadata.page).to.equal(2);
        expect(res.body.metadata.lastPage).to.equal(7);
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

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
        expect(res.body.recipes).to.have.lengthOf(10);
        expect(res.body.metadata.totalCount).to.equal(15);
        expect(res.body.metadata.itemsPerPage).to.equal(10);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(2);
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

        if (err) return done(err);
        done();
      });
  });
});
