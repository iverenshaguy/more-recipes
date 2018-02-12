import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Get Reviews for a Recipe', () => {
  const { iverenToken } = tokens;
  const reviewsURL = `${rootURL}/recipes/2/reviews`;

  it('should get all reviews for a recipe', (done) => {
    agent
      .get(reviewsURL)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.reviews).to.have.lengthOf(2);
        expect(res.body.metadata.totalCount).to.equal(2);
        expect(res.body.metadata.itemsPerPage).to.equal(2);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(1);
        expect(res.body.reviews[0]).to.have.property('User');
        expect(res.body.reviews[0].User).to.be.an('object');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get all recipes by page if page and limit are added to query', (done) => {
    agent
      .get(reviewsURL)
      .query({
        page: '2', limit: '1'
      })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.reviews).to.have.lengthOf(1);
        expect(res.body.metadata.totalCount).to.equal(2);
        expect(res.body.metadata.itemsPerPage).to.equal(1);
        expect(res.body.metadata.page).to.equal(2);
        expect(res.body.metadata.lastPage).to.equal(2);
        expect(res.body.reviews[0]).to.have.property('User');
        expect(res.body.reviews[0].User).to.be.an('object');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  unauthorizedInput('should not get any reviews', agent, 'get', reviewsURL, expect);
});
