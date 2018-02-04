import {
  agent,
  expect,
  tokens,
  rootURL,
  expiredToken,
  invalidToken,
  wrongSecretToken
} from '../../utils/setupTests';

describe('Retrieve', () => {
  const retrieveURL = `${rootURL}/users/profile`;
  const { iverenToken } = tokens;

  it('should authenticate user and return user data', (done) => {
    agent
      .get(retrieveURL)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.firstname).to.equal('Iveren');
        expect(res.body.email).to.equal('iverenshaguy@gmail.com');
        if (err) return done(err);
        done();
      });
  });

  it('should not authorize user and return \'You are not authorized to access this page, please signin\'', (done) => {
    agent
      .get(retrieveURL)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('You are not authorized to access this page, please signin');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not authorize user and return \'User authorization token is expired\'', (done) => {
    setTimeout(() => {
      agent
        .get(retrieveURL)
        .set('Accept', 'application/json')
        .set('authorization', expiredToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.error).to.equal('User authorization token is expired');
          if (err) {
            return done(err);
          }
          done();
        });
    }, 9000);
  });

  it('should not authorize user and return \'Invalid user authorization token\'', (done) => {
    agent
      .get(retrieveURL)
      .set('Accept', 'application/json')
      .set('authorization', invalidToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body.error).to.equal('Invalid user authorization token');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not authorize user and return \'Failed to authenticate token\'', (done) => {
    agent
      .get(retrieveURL)
      .set('Accept', 'application/json')
      .set('authorization', wrongSecretToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body.error).to.equal('Failed to authenticate token');

        if (err) {
          return done(err);
        }
        done();
      });
  });
});
