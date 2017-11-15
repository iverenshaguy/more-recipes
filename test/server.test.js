import request from 'supertest';
import { expect } from 'chai';
import app from '../server/src/bin/www';

const agent = request.agent(app);
describe('Server Check', () => {
  it('should return 200', (done) => {
    agent
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the More Recipes App');
        if (err) return done(err);
        done();
      });
  });
});
