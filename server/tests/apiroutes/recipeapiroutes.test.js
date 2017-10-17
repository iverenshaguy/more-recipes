import request from 'supertest';
import chai from 'chai';
import app from '../../src/bin/www';
import { sequelize, User, Recipe } from '../../src/models';
import './userapiroutes.test';

const expect = chai.expect;
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
    User: {
      firstname: 'Iveren',
      lastname: 'Shaguy',
      username: 'iverenshaguy',
      email: 'iverenshaguy@gmail.com',
      password: 'LionJudah56',
      aboutMe: 'I am great',
      occupation: 'Coder'
    },
    ingredients: ['2 Cups of Rice', '1 Kilo of Chicken'],
    preparations: [
      'Cut the chicken into small pieces, season and leave to marinate for 1 hour. This can be done in advance to save time',
      'Boil on low heat for 25 minutes with little water to cook and preserve the chicken stock.'
    ],
    directions: [
      'Parboil Rice till half done',
      'Put already fried tomato stew on fire, add water and seasoning to taste'
    ]
  }, {
    include: [User]
  }).then()));

  after(() => sequelize.drop({ force: true }));

  describe('## Add a Recipe for User Iveren', () => {
    const user = {};
    const recipe = {};

    describe('## Login to Application', () => {
      it('should autheticate user', (done) => {
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'LionJudah56';

        agent
          .post('/api/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised right input', () => {
      recipe.recipeName = 'Bean Pottage';
      recipe.prepTime = '5 minutes';
      recipe.cookTime = '45 minutes';
      recipe.totalTime = '50 minutes';
      recipe.difficulty = 'Easy';
      recipe.extraInfo = 'Suitable for Vegans';
      recipe.vegetarian = true;
      recipe.ingredients = ['2 cups of beans', '3 Plantains'];
      recipe.preparations = ['Soak the beans for 3 hours to reduce bloating'];
      recipe.directions = [
        'Put the beans on fire with sliced onions (a big bulb)',
        'When it is very soft and can be easily mashed, add plantains, palmoil and ingredients'
      ];

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
      recipe.recipeName = 'Bean Pottage';
      recipe.prepTime = '5 minutes';
      recipe.cookTime = '45 minutes';
      recipe.totalTime = '50 minutes';
      recipe.difficulty = 'Easy';
      recipe.extraInfo = 'Suitable for Vegans';
      recipe.vegetarian = true;
      recipe.ingredients = ['2 cups of beans', '3 Plantains'];
      recipe.preparations = ['Soak the beans for 3 hours to reduce bloating'];
      recipe.directions = [
        'Put the beans on fire with sliced onions (a big bulb)',
        'When it is very soft and can be easily mashed, add plantains, palmoil and ingredients'
      ];

      xit('should not create a new recipe', (done) => {
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

      xit('should not create a new recipe', (done) => {
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

    describe('## Logout of Application', () => {
      it('should log user out', (done) => {
        agent
          .get('/api/users/logout')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for unauthorised input', () => {
      recipe.recipeName = 'Bean Pottage';
      recipe.prepTime = '5 minutes';
      recipe.cookTime = '45 minutes';
      recipe.totalTime = '50 minutes';
      recipe.difficulty = 'Easy';
      recipe.extraInfo = 'Suitable for Vegans';
      recipe.vegetarian = true;
      recipe.ingredients = ['2 cups of beans', '3 Plantains'];
      recipe.preparations = ['Soak the beans for 3 hours to reduce bloating'];
      recipe.directions = [
        'Put the beans on fire with sliced onions (a big bulb)',
        'When it is very soft and can be easily mashed, add plantains, palmoil and ingredients'
      ];

      it('should not create a new recipe', (done) => {
        agent
          .post('/api/recipes/')
          .send(recipe)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal('You are not authorized to access that page, please Signin.');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});
