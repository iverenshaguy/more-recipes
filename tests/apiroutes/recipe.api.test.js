import request from 'supertest';
import { expect } from 'chai';
import app from '../../server/src/bin/www';
import { sequelize, User, Recipe } from '../../server/src/models';
import './user.api.test';

const agent = request.agent(app);

describe('Routes: Recipe API Tests', () => {
  // before(() => sequelize.sync({ force: true, match: /_test$/ }).then(() => Recipe.create({
  before(() => sequelize.sync().then(() => Recipe.create({
    recipeName: 'Jollof Rice',
    prepTime: '30 Minutes',
    cookTime: '20 Minutes',
    totalTime: '1 Hour',
    difficulty: 'Normal',
    extraInfo: 'Sweet Food, lol',
    vegetarian: 'false',
    ingredients: ['2 Cups of Rice', '1 Kilo of Chicken'],
    preparations: [
      'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
      'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
    ],
    directions: [
      'Parboil Rice till half done',
      'Put already fried tomato stew on fire, add water and seasoning to taste'
    ],
    User: {
      firstname: 'Iveren',
      lastname: 'Shaguy',
      username: 'iverenshaguy',
      email: 'iverenshaguy@gmail.com',
      password: 'LionJudah56',
      aboutMe: 'I am great',
      occupation: 'Coder'
    }
  }, {
    include: [User]
  }).then(recipe => recipe)));

  before((done) => {
    const user = {};
    user.email = 'iverenshaguy@gmail.com';
    user.password = 'LionJudah56';

    agent
      .post('/api/users/signin')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect('Location', '/server');
        if (err) {
          return done(err);
        }
        done();
      });
  });

  after(() => sequelize.drop({ force: true }));

  const recipe = {};
  recipe.recipeName = 'Bean Pottage';
  recipe.prepTime = '5 minutes';
  recipe.cookTime = '45 minutes';
  recipe.totalTime = '50 minutes';
  recipe.difficulty = 'Easy';
  recipe.extraInfo = 'Suitable for Vegans';
  recipe.vegetarian = 'true';
  recipe.ingredients = ['2 cups of beans', '3 Plantains'];
  recipe.preparations = 'Soak the beans for 3 hours to reduce bloating';
  recipe.directions = [
    'Put the beans on fire with sliced onions (a big bulb)',
    'When it is very soft and can be easily mashed, add plantains, palmoil and ingredients'
  ];

  const badRecipe = {};
  badRecipe.recipeName = '';
  badRecipe.prepTime = '-5 minutes';
  badRecipe.cookTime = '45 minutes';
  badRecipe.totalTime = '50 minutes';
  badRecipe.difficulty = 'Not Hard';
  badRecipe.extraInfo = '[Suitable for Vegans]';
  badRecipe.vegetarian = 'true';
  badRecipe.ingredients = {};
  badRecipe.preparations = ['Soak the beans for 3 hours to reduce bloating'];

  describe('## Add a Recipe for User Iveren', () => {
    describe('## Check for authorised right input', () => {
      it('should create a new recipe', (done) => {
        agent
          .post('/api/recipes/')
          .send(recipe)
          .set('Accept', 'application/json')
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
    });

    describe('## Check for authorised wrong input', () => {
      it('should not create a new recipe', (done) => {
        agent
          .post('/api/recipes/')
          .send(badRecipe)
          .set('Accept', 'application/json')
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
    });


    describe('## Check for unauthorised input', () => {
      it('should not create a new recipe', (done) => {
        request(app)
          .post('/api/recipes/')
          .send(recipe)
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
  });

  describe('## Update an Existing Recipe for User Iveren', () => {
    describe('## Check for authorised right input', () => {
      it('should update recipe', (done) => {
        recipe.recipeName = 'Beans and Plantain Pottage';
        recipe.preparations = ['Soak the beans for 1 hour to reduce bloating', 'Boil for 10 minutes and drain water'];
        recipe.ingredients = '2 cups of beans';
        agent
          .put('/api/recipes/1')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipeName).to.equal('Beans and Plantain Pottage');
            expect(res.body.preparations).to.have.lengthOf(2);
            expect(res.body.preparations[0]).to.equal('Soak the beans for 1 hour to reduce bloating');
            expect(res.body.preparations[1]).to.equal('Boil for 10 minutes and drain water');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised wrong input', () => {
      it('should not update recipe for Non-Existent ID 123', (done) => {
        recipe.ingredients = ['2 cups of beans', '3 Plantains', '2 bulbs of Onions'];

        agent
          .put('/api/recipes/123')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not update recipe for Non-Existent ID abc', (done) => {
        agent
          .put('/api/recipes/abc')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.id.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not update recipe because of wrong input data', (done) => {
        badRecipe.prepTime = '5 minutes';

        agent
          .put('/api/recipes/1')
          .send(badRecipe)
          .set('Accept', 'application/json')
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
    });


    describe('## Check for unauthorised input', () => {
      it('should not update recipe', (done) => {
        request(app)
          .put('/api/recipes/1')
          .send(recipe)
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
  });

  describe('## Delete an Existing Recipe for User Iveren', () => {
    describe('## Check for authorised right input', () => {
      it('should delete recipe', (done) => {
        agent
          .delete('/api/recipes/1')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(204);

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised wrong input', () => {
      it('should not delete recipe for Non-Existent ID 123', (done) => {
        agent
          .delete('/api/recipes/123')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not delete recipe for Non-Existent ID abc', (done) => {
        agent
          .delete('/api/recipes/abc')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.id.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });
    });


    describe('## Check for unauthorised input', () => {
      it('should not delete recipe', (done) => {
        request(app)
          .delete('/api/recipes/1')
          .send(recipe)
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
  });

  describe('## Check for Wrong User', () => {
    before(() => User.create({
      firstname: 'Favour',
      lastname: 'Shaguy',
      username: 'favourshaguy',
      email: 'favourshaguy@gmail.com',
      password: 'LionJudah',
      aboutMe: 'I am great',
      occupation: 'Chef'
    })
      .then(user => user));

    before((done) => {
      const user = {};
      user.email = 'favourshaguy@gmail.com';
      user.password = 'LionJudah';

      agent
        .post('/api/users/signin')
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect('Location', '/server');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should not update recipe', (done) => {
      recipe.recipeName = 'Beans and Plantain Pottage';
      recipe.preparations = ['Soak the beans for 1 hour to reduce bloating', 'Boil for 10 minutes and drain water'];
      recipe.ingredients = '2 cups of beans';

      agent
        .put('/api/recipes/1')
        .send(recipe)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Recipe Not Found');

          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should not delete recipe', (done) => {
      agent
        .delete('/api/recipes/1')
        .send(recipe)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('Recipe Not Found');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
