import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';
import nonExistentRecipe from '../../utils/nonExistentRecipe';

describe('Update Recipe', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  it('should update recipe', (done) => {
    const preparations = ['Soak the beans for 1 hour to reduce bloating', 'Boil for 10 minutes and drain water'];
    const directions = ['Put beans on fire', 'Cook it', 'Serve it'];
    const ingredients = ['Beans', 'Palm Oil'];

    agent
      .put(`${recipeURL}/9`)
      .send({ preparations, directions, ingredients })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipeItem.preparations).to.have.lengthOf(2);
        expect(res.body.recipeItem.directions).to.have.lengthOf(3);
        expect(res.body.recipeItem.ingredients).to.have.lengthOf(2);
        expect(res.body.recipeItem.preparations[0]).to.equal('Soak the beans for 1 hour to reduce bloating');
        expect(res.body.recipeItem.directions[1]).to.equal('Cook it');
        expect(res.body.recipeItem.ingredients[0]).to.equal('Beans');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not update preparations, directions or ingredients when unavailable in update object', (done) => {
    agent
      .put(`${recipeURL}/9`)
      .send({ difficulty: 'Easy' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.recipeItem.difficulty).to.equal('Easy');
        expect(res.body.recipeItem.preparations[0]).to.equal('Soak the beans for 1 hour to reduce bloating');
        expect(res.body.recipeItem.directions[1]).to.equal('Cook it');
        expect(res.body.recipeItem.ingredients[0]).to.equal('Beans');

        if (err) return done(err);
        done();
      });
  });

  it('should not update another user\'s recipe', (done) => {
    agent
      .put(`${recipeURL}/2`)
      .send({ ingredients: ['2 cups of beans', '3 Plantains', '2 bulbs of Onions'] })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Recipe Not Found');
        if (err) return done(err);
        done();
      });
  });

  it('should not update recipe because of wrong input data', (done) => {
    const badRecipe = {
      difficulty: 'Not Hard',
      extraInfo: '[Suitable for Vegans]',
      ingredients: {}
    };

    agent
      .put(`${recipeURL}/9`)
      .send(badRecipe)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.difficulty.msg).to.equal('Please select a valid field');
        expect(res.body.errors.extraInfo.msg).to.equal('Extra info can only contain letters and the characters (,.\'-)');
        expect(res.body.errors.ingredients.msg).to.equal('Ingredient can only contain letters and the characters (,.\'-)');
        if (err) return done(err);
        done();
      });
  });

  nonExistentRecipe('should not update recipe for Non-Existent ID 123', agent, 'put', `${recipeURL}/123`, expect, iverenToken);

  nonExistentRecipe('should not update recipe for Non-Existent ID abc', agent, 'put', `${recipeURL}/abc`, expect, iverenToken);

  unauthorizedInput('should not update recipe', agent, 'put', `${recipeURL}/9`, expect);
});
