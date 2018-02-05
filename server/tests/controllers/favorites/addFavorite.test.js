import { agent, expect, tokens } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Add Recipe to Favorites', () => {
  const { emiolaToken } = tokens;

  it('should add recipe to favorites', (done) => {
    agent
      .post('/api/v1/recipes/16/favorites')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.message).to.equal('Recipe has been added to favorites');
        expect(res.body.recipes).to.have.lengthOf(13);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should remove recipe from favorites', (done) => {
    agent
      .post('/api/v1/recipes/11/favorites')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Recipe has been removed from favorites');
        expect(res.body.recipes).to.have.lengthOf(12);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  nonExistentRecipe('should not add recipe with Non-Existent ID 123 to favorites', agent, 'post', '/api/v1/recipes/123/favorites', expect, emiolaToken);

  nonExistentRecipe('should not add recipe with Non-Existent ID abc to favorites', agent, 'post', '/api/v1/recipes/abc/favorites', expect, emiolaToken);

  unauthorizedInput('should not add recipe to favorites', agent, 'post', '/api/v1/recipes/3/favorites', expect);
});
