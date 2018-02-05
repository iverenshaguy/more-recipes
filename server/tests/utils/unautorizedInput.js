const unauthorizedInput = (message, request, method, url, expect) => {
  describe('Unauthorized Input', () => {
    it(message, (done) => {
      request[method](url)
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
  });
};

export default unauthorizedInput;
