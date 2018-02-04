const nonExistentRecipe = (message, request, method, url, expect, token) => {
  describe('Non-Existent Recipes', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
          if (err) return done(err);
          done();
        });
    });
  });
};

export default nonExistentRecipe;
