import request from 'supertest';
import { expect } from 'chai';
import app from '../src/bin/www';

describe('App Home', () => {
  describe('Serve Client File', () => {
    it('should serve client file', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.contain('<div id="root"></div>');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('App Fallback Route', () => {
    it('should return a fallback page', (done) => {
      request(app)
        .get('/yadayada')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.text).to.contain('<div id="root"></div>');

          if (err) return done(err);
          done();
        });
    });
  });
});
