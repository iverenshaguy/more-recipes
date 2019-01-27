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
          expect(res.text).to.contain('<div id="root"></div>');

          if (err) return done(err);
          done();
        });
    });

    it('should return a fallback page', (done) => {
      request(app)
        .get('/yadayada')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          expect(res.text).to.contain('<div id="root"></div>');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('API Route', () => {
    it('should return a Welcome Message for API Home', (done) => {
      request(app)
        .get('/api')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Welcome to the More Recipes API');

          if (err) return done(err);
          done();
        });
    });

    it('should return a Welcome Message for Version 1 API Home', (done) => {
      request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Welcome to version 1 of the More Recipes API');

          if (err) return done(err);
          done();
        });
    });

    it('should return a Fallback Message for API Route', (done) => {
      request(app)
        .get('/api/fallback')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Where Are You Going? Page Not Found');

          if (err) return done(err);
          done();
        });
    });
  });
});
