import { agent, expect, tokens } from '../../utils/setupTests';
import { Recipe } from '../../../src/models';

const { iverenToken } = tokens;

describe('Search For Recipes', () => {
  it('should return recipes according to search term', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({ search: 'rice' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(3);
        expect(res.body.metadata.totalCount).to.equal(3);
        expect(res.body.metadata.itemsPerPage).to.equal(3);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(1);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return recipes by page according to search term, limit and page', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({
        search: 'rice', page: '2', limit: '2'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(1);
        expect(res.body.metadata.totalCount).to.equal(3);
        expect(res.body.metadata.itemsPerPage).to.equal(1);
        expect(res.body.metadata.page).to.equal(2);
        expect(res.body.metadata.lastPage).to.equal(2);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return recipes on last page for page query that is greater than last page', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({
        search: 'rice', page: '4', limit: '2'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(1);
        expect(res.body.metadata.totalCount).to.equal(3);
        expect(res.body.metadata.itemsPerPage).to.equal(1);
        expect(res.body.metadata.page).to.equal(2);
        expect(res.body.metadata.lastPage).to.equal(2);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return recipes on first page for page less than first page', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({
        search: 'rice', page: '0.2', limit: '2'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(2);
        expect(res.body.metadata.totalCount).to.equal(3);
        expect(res.body.metadata.itemsPerPage).to.equal(2);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(2);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return no recipes for unavailable search term', (done) => {
    agent
      .get('/api/v1/recipes')
      .query({ search: 'puffpuff', limit: '2', page: '2' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(0);

        if (err) return done(err);
        done();
      });
  });

  describe('should get no upvoted recipes when there are no upvoted recipes', () => {
    before((done) => {
      Recipe.truncate({
        cascade: true
      }).then(() => done(), err => done(err));
    });

    it('should get no upvoted recipes', (done) => {
      agent
        .get('/api/v1/recipes')
        .query({ sort: 'upvotes', order: 'ascending' })
        .set('Accept', 'application/json')
        .set('authorization', iverenToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipes).to.have.lengthOf(0);

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
