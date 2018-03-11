import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Get All User Recipes', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/users/1/recipes/user`;

  it('should get all user recipes', (done) => {
    agent
      .get(recipeURL)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(3);
        expect(res.body.metadata.totalCount).to.equal(3);
        expect(res.body.metadata.itemsPerPage).to.equal(3);
        expect(res.body.metadata.page).to.equal(1);
        expect(res.body.metadata.lastPage).to.equal(1);
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should get all user recipes by page if page and limit are added to query', (done) => {
    agent
      .get(recipeURL)
      .query({
        page: '2', limit: '2'
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
        expect(res.body.recipes[0]).to.have.property('User');
        expect(res.body.recipes[0].User).to.be.an('object');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not get user recipes for Non-Existent user abc', (done) => {
    agent
      .get('/api/v1/users/abc/recipes/user')
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.userId.msg).to.equal('User Not Found');
        if (err) return done(err);
        done();
      });
  });

  describe('## Check for Another User', () => {
    let userToken;

    before((done) => {
      const user = {
        email: 'fru1@gmail.com',
        password: 'Liosnsid56'
      };

      agent
        .post('/api/v1/users/signin')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect('Location', '/server');
          if (err) return done(err);
          userToken = res.body.token;
          done();
        });
    });

    it('should return no user recipes', (done) => {
      agent
        .get('/api/v1/users/11/recipes/user')
        .set('Accept', 'application/json')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.recipes).to.have.lengthOf(0);
          if (err) return done(err);
          done();
        });
    });
  });

  unauthorizedInput('should not get any recipes', agent, 'get', recipeURL, expect);
});
