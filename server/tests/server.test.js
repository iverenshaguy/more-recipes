import request from 'supertest';
import chai from 'chai';
import app from '../src/bin/www';

const expect = chai.expect;

describe('Server Check', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the More Recipes App');
        if (err) return done(err);
        done();
      });
  });
});
