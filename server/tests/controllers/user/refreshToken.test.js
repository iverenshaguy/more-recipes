import {
  agent,
  expect,
  rootURL,
  tokens
} from '../../utils/setupTests';

const { iverenToken } = tokens;

describe('Refresh Token', () => {
  it('should refresh user token based on token input', (done) => {
    agent
      .get(`${rootURL}/users/token`)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.user.firstname).to.equal('Iveren');
        expect(res.body).to.haveOwnProperty('token');

        if (err) {
          return done(err);
        }
        done();
      });
  });
});
