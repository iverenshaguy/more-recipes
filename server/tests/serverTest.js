import http from 'http';
import chai from 'chai';

const expect = chai.expect;

describe('Server Check', () => {
  it('should return 200', (done) => {
    http.get('http://127.0.0.1:8000', (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
