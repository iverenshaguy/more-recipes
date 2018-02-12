import { agent, expect, tokens } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Get Favorites Recipes', () => {
  const { iverenToken } = tokens;

  it('should get favorite recipes', (done) => {
    agent
      .get('/api/v1/users/1/recipes')
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipes).to.have.lengthOf(10);
        expect(res.body.metadata.totalCount).to.equal(12);
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

  it('should not get favorite recipes for url with wrong user id', (done) => {
    agent
      .get('/api/v1/users/2/recipes')
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('You are not authorized to access this page');
        if (err) return done(err);
        done();
      });
  });

  it('should not get favorite recipes for Non-Existent user abc', (done) => {
    agent
      .get('/api/v1/users/abc/recipes')
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

    it('should return no favorite recipes', (done) => {
      agent
        .get('/api/v1/users/11/recipes')
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

  unauthorizedInput('should not get any recipes', agent, 'get', '/api/v1/users/1/recipes', expect);
});
