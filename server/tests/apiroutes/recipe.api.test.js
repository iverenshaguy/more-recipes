import request from 'supertest';
import path from 'path';
import { expect } from 'chai';
import app from '../../src/bin/www';
import { sequelize, User, Recipe } from '../../src/models';
import './user.api.test';

const agent = request.agent(app);
let userToken;

describe('Routes: Recipe API Tests: Main', () => {
  before(() => sequelize.sync().then(() => User.create({
    firstname: 'Iveren',
    lastname: 'Shaguy',
    username: 'iverenshaguy',
    email: 'iverenshaguy@gmail.com',
    password: 'LionJudah56',
    aboutMe: 'I am great',
    occupation: 'Coder'
  }).then(() => User.create({
    firstname: 'Praise',
    lastname: 'Shaguy',
    username: 'praiseshaguy',
    email: 'praiseshaguy@gmail.com',
    password: 'LionJudah56',
    aboutMe: 'I am great',
    occupation: 'Event Planner'
  }).then(user => user))));

  before(() => Recipe.create({
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
    userId: 2
  }).then(() => Recipe.create({
    recipeName: 'Egusi Soup',
    prepTime: '30 Minutes',
    cookTime: '20 Minutes',
    totalTime: '1 Hour',
    difficulty: 'Normal',
    extraInfo: 'Sweet Food, lol',
    vegetarian: 'false',
    ingredients: ['2 Cups of Ground Egusi', '1 Kilo of Chicken'],
    preparations: [
      'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
      'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
    ],
    directions: [
      'Add chopped onions to oil and fry till it\'s transluscent',
      'Add already mixed Egusi and fry till oil separates'
    ],
    userId: 1
  }).then(() => Recipe.create({
    recipeName: 'White Soup',
    prepTime: '30 Minutes',
    cookTime: '20 Minutes',
    totalTime: '1 Hour',
    difficulty: 'Normal',
    extraInfo: 'Sweet Food, lol',
    vegetarian: 'false',
    ingredients: ['Whatever1', '1 Kilo of Chicken'],
    preparations: [
      'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
      'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
    ],
    directions: [
      'Add chopped onions to oil and fry till it\'s transluscent',
      'Whatever2'
    ],
    userId: 2
  }).then(recipes => recipes))));

  before((done) => {
    const user = {};
    user.email = 'iverenshaguy@gmail.com';
    user.password = 'LionJudah56';

    agent
      .post('/api/v1/users/signin')
      .send(user)
      .set('Accept', 'application/json')
      .end((err, res) => {
        userToken = res.body.token;
        expect(res.statusCode).to.equal(200);
        expect('Location', '/server');
        if (err) return done(err);
        done();
      });
  });

  after(() => sequelize.drop({ force: true }));

  describe('## Add a Recipe for User Iveren', () => {
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

    describe('## Check for authorised right input', () => {
      it('should create a new recipe', (done) => {
        agent
          .post('/api/v1/recipes/')
          .send(recipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
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
          .post('/api/v1/recipes/')
          .send(badRecipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
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
        agent
          .post('/api/v1/recipes/')
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

  describe('## Upload Recipe Image for an Existing Recipe', () => {
    const imageFilePath = path.resolve(__dirname, '../files/recipefile.jpg');

    describe('## Check For Wrong Input ', () => {
      const largeFilePath = path.resolve(__dirname, '../files/toolarge.jpg');
      const noneImageFilePath = path.resolve(__dirname, '../files/nonimage.pdf');

      it('should not upload image that is too large (more than 6MB)', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .attach('recipeImage', largeFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File too large!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is not an image', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .attach('recipeImage', noneImageFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('Only image files are allowed!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is non-existent and return and error', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .attach('recipeImage', '')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File is Empty!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is non-existent and return and error', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File is Empty!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file for Non-Existent ID 123', (done) => {
        agent
          .post('/api/v1/recipes/123/uploads')
          .attach('recipeImage', imageFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file for Non-Existent ID abc', (done) => {
        agent
          .post('/api/v1/recipes/jdfl/uploads')
          .attach('recipeImage', imageFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Right Input ', () => {
      const capsFileExt = path.resolve(__dirname, '../files/CAPS.JPG');

      it('should upload an image', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .attach('recipeImage', imageFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.recipeName).to.equal('Bean Pottage');
            expect(res.body.directions).to.be.an('array');
            expect(res.body.ingredients[0]).to.equal('2 cups of beans');
            expect(res.body.preparations).to.have.lengthOf(1);
            expect(path.extname(res.body.recipeImage)).to.equal('.jpg');
            if (err) return done(err);
            done();
          });
      });

      it('should upload an image and change uppercase file extension to lowercase', (done) => {
        agent
          .post('/api/v1/recipes/2/uploads')
          .attach('recipeImage', capsFileExt)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(path.extname(res.body.recipeImage)).to.equal('.jpg');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Unauthorised Input ', () => {
      it('should reject file upload and return \'You are not authorized to access this page, please signin\'', (done) => {
        agent
          .post('/api/v1/recipes/4/uploads')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.error).to.equal('You are not authorized to access this page, please signin');

            if (err) return done(err);
            done();
          });
      });

      it('should not upload file for uncreated recipe with id: 3', (done) => {
        agent
          .post('/api/v1/recipes/3/uploads')
          .attach('recipeImage', imageFilePath)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('## Update an Existing Recipe for User Iveren', () => {
    const recipe = {};
    const badRecipe = {};

    describe('## Check for authorised right input', () => {
      it('should update recipe', (done) => {
        recipe.recipeName = 'Beans and Plantain Pottage';
        recipe.preparations = ['Soak the beans for 1 hour to reduce bloating', 'Boil for 10 minutes and drain water'];
        recipe.ingredients = '2 cups of beans';

        agent
          .put('/api/v1/recipes/4')
          .send(recipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
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
      it('should not update another user\'s recipe', (done) => {
        recipe.ingredients = ['2 cups of beans', '3 Plantains', '2 bulbs of Onions'];

        agent
          .put('/api/v1/recipes/1')
          .send(recipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not update recipe for Non-Existent ID 123', (done) => {
        recipe.ingredients = ['2 cups of beans', '3 Plantains', '2 bulbs of Onions'];

        agent
          .put('/api/v1/recipes/123')
          .send(recipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not update recipe for Non-Existent ID abc', (done) => {
        agent
          .put('/api/v1/recipes/abc')
          .send(recipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not update recipe because of wrong input data', (done) => {
        badRecipe.difficulty = 'Not Hard';
        badRecipe.extraInfo = '[Suitable for Vegans]';
        badRecipe.ingredients = {};

        agent
          .put('/api/v1/recipes/4')
          .send(badRecipe)
          .set('Accept', 'application/json')
          .set('token', userToken)
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
        agent
          .put('/api/v1/recipes/4')
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
          .delete('/api/v1/recipes/2')
          .set('Accept', 'application/json')
          .set('token', userToken)
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
      it('should not delete another user\'s recipe', (done) => {
        agent
          .delete('/api/v1/recipes/1')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.message).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not delete recipe for Non-Existent ID 123', (done) => {
        agent
          .delete('/api/v1/recipes/123')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not delete recipe for Non-Existent ID abc', (done) => {
        agent
          .delete('/api/v1/recipes/abc')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });
    });


    describe('## Check for unauthorised input', () => {
      it('should not delete recipe', (done) => {
        agent
          .delete('/api/v1/recipes/2')
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

  describe('## Get all Recipes in App for User Iveren', () => {
    describe('## Check for authorised right input', () => {
      it('should get all recipes', (done) => {
        agent
          .get('/api/v1/recipes')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(3);
            expect(res.body[0].recipeName).to.equal('Jollof Rice');
            expect(res.body[1].recipeName).to.equal('Bean Pottage');
            expect(res.body[2].recipeName).to.equal('White Soup');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should get all recipes by page if page and limit are added to query', (done) => {
        agent
          .get('/api/v1/recipes')
          .query({
            page: '2', limit: '2'
          })
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipes).to.have.lengthOf(1);
            expect(res.body.metaData.totalRecipeCount).to.equal(3);
            expect(res.body.metaData.pageRecipeCount).to.equal(1);
            expect(res.body.metaData.page).to.equal(2);
            expect(res.body.metaData.lastPage).to.equal(2);
            expect(res.body.recipes[0].recipeName).to.equal('White Soup');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for unauthorised input', () => {
      it('should not get any recipes', (done) => {
        agent
          .get('/api/v1/recipes')
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

  describe('## Get details of an Existing Recipe for User Iveren', () => {
    describe('## Check for authorised right input', () => {
      it('should get recipe details', (done) => {
        agent
          .get('/api/v1/recipes/4')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.recipeName).to.equal('Bean Pottage');
            expect(res.body.directions).to.be.an('array');
            expect(res.body.ingredients[0]).to.equal('2 cups of beans');
            expect(res.body.preparations).to.have.lengthOf(1);
            expect(res.body.views).to.equal(1);

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised wrong input', () => {
      it('should not get details for Non-Existent ID 123', (done) => {
        agent
          .get('/api/v1/recipes/123')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not get details for Non-Existent ID abc', (done) => {
        agent
          .get('/api/v1/recipes/abc')
          .set('Accept', 'application/json')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });
    });


    describe('## Check for unauthorised input', () => {
      it('should not get recipe details', (done) => {
        agent
          .get('/api/v1/recipes/4')
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
});
