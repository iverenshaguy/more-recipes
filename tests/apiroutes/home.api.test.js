import request from 'supertest';
import chai from 'chai';
import app from '../../server/src/bin/www';

const expect = chai.expect;

describe('API Test', () => {
  describe('API Home', () => {
    it('should return a Welcome Message', (done) => {
      request(app)
        .get('/api')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Welcome to the More Recipes API');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('API Version 1 Home', () => {
    it('should return a Welcome Message', (done) => {
      request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Welcome to version 1 of the More Recipes API');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('API Route FallBack', () => {
    it('should return a Fallback Message', (done) => {
      request(app)
        .get('/api/fallback')
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.message).to.equal('Where Are You Going? Page Not Found');

          if (err) return done(err);
          done();
        });
    });
  });
});
