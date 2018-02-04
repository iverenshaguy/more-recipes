import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Add Recipe', () => {
  const { iverenToken } = tokens;
  const recipeURL = `${rootURL}/recipes`;

  const recipe = {
    recipeName: 'Bean Pottage',
    prepTime: '5 minutes',
    cookTime: '45 minutes',
    totalTime: '50 minutes',
    difficulty: 'Easy',
    extraInfo: 'Suitable for Vegans',
    vegetarian: 'true',
    ingredients: ['2 cups of beans', '3 Plantains'],
    preparations: 'Soak the beans for 3 hours to reduce bloating',
    directions: [
      'Put the beans on fire with sliced onions (a big bulb)',
      'When it is very soft and can be easily mashed, add plantains, palmoil and ingredients'
    ]
  };

  const badRecipe = {
    recipeName: '',
    prepTime: '-5 minutes',
    cookTime: '45 minutes',
    totalTime: '50 minutes',
    difficulty: 'Not Hard',
    extraInfo: '[Suitable for Vegans]',
    vegetarian: 'true',
    ingredients: {},
    preparations: ['Soak the beans for 3 hours to reduce bloating'],
  };

  it('should create a new recipe', (done) => {
    agent
      .post(recipeURL)
      .send(recipe)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.recipeName).to.equal('Bean Pottage');
        expect(res.body.directions).to.be.an('array');
        expect(res.body.ingredients[0]).to.equal('2 cups of beans');
        expect(res.body.preparations).to.have.lengthOf(1);

        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should not create a new recipe', (done) => {
    agent
      .post(recipeURL)
      .send(badRecipe)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.recipeName.msg).to.equal('Recipe name cannot be empty');
        expect(res.body.errors.difficulty.msg).to.equal('Please select a valid field');
        expect(res.body.errors.prepTime.msg).to.equal('Prep time can only contain alphanumeric characters');
        expect(res.body.errors.ingredients.msg).to.equal('Ingredient can only contain letters and the characters (,.\'-)');
        expect(res.body.errors.directions.msg).to.equal('Direction must be specified');
        if (err) return done(err);
        done();
      });
  });


  unauthorizedInput('should not create a new recipe', agent, 'post', recipeURL, expect);
});
