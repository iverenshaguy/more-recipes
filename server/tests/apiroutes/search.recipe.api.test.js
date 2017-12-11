import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/bin/www';
import { sequelize, User, Recipe } from '../../src/models';
import './favorites.recipe.api.test';

const agent = request.agent(app);

describe('Routes: Recipe API Tests, Search', () => {
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
    password: 'LionJudah',
    aboutMe: 'I am great',
    occupation: 'Event Planner'
  }).then(() => User.create({
    firstname: 'Emiola',
    lastname: 'Olasanmi',
    username: 'emiolaolasanmi',
    email: 'emiolaolasanmi@gmail.com',
    password: 'emiolaolasanmi',
    aboutMe: 'Food Lover',
    occupation: 'Fashion Designer',
  }).then(() => User.create({
    firstname: 'Laruba',
    lastname: 'Adama',
    username: 'larubaadama',
    email: 'larubaadama@gmail.com',
    password: 'larubaadama',
    aboutMe: 'Non Conformist',
    occupation: 'Web Developer'
  }).then(() => User.create({
    firstname: 'Joyce',
    lastname: 'Ayoola',
    username: 'joyceayoola',
    email: 'joyceayoola@gmail.com',
    password: 'joyceayoola',
    aboutMe: 'Fashionista',
    occupation: 'Lecturer'
  }).then(user => user)))))));

  before((done) => {
    const user = {};
    user.email = 'iverenshaguy@gmail.com';
    user.password = 'LionJudah56';

    agent
      .post('/api/v1/users/signin')
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

  describe('## Get All Upvoted Recipes in Ascending Order: Check for authorised right input with no liked recipes', () => {
    it('should get no upvoted recipes with message \'There are no upvoted recipes\'', (done) => {
      agent
        .get('/api/v1/recipes')
        .query({ sort: 'upvotes', order: 'ascending' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('There are no upvoted recipes');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('## Get All Upvoted Recipes', () => {
    before(() => Recipe.create({
      recipeName: 'Coconut Rice',
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
        'Parboil Rice till half done'
      ],
      upvotes: 2,
      downvotes: 0,
      views: 4,
      userId: 2
    }).then(() => Recipe.create({
      recipeName: 'Sweet Potatoe Pottage',
      prepTime: '30 Minutes',
      cookTime: '20 Minutes',
      totalTime: '1 Hour',
      difficulty: 'Normal',
      extraInfo: 'Sweet Food, lol',
      vegetarian: 'true',
      ingredients: ['3 Potatoes', '2 bulbs of Onions '],
      preparations: [
        'Cut the potatoes into small pieces'
      ],
      directions: [
        'Boil Potatoes for 25 minutes till a bit soft'
      ],
      upvotes: 2,
      downvotes: 1,
      views: 9,
      userId: 1
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
      upvotes: 5,
      downvotes: 1,
      views: 14,
      userId: 3
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
      upvotes: 1,
      downvotes: 1,
      views: 4,
      userId: 2
    }).then(() => Recipe.create({
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
      upvotes: 0,
      downvotes: 1,
      views: 5,
      userId: 3
    }).then(() => Recipe.create({
      recipeName: 'Fried Rice',
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
        'Parboil Rice till half done'
      ],
      upvotes: 4,
      downvotes: 0,
      views: 15,
      userId: 2
    }).then(recipes => recipes)))))));

    describe('## Check for authorised right input with liked recipes', () => {
      it('should get upvoted recipes in ascending order', (done) => {
        agent
          .get('/api/v1/recipes')
          .query({ sort: 'upvotes', order: 'ascending' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(5);
            expect(res.body[0].recipeName).to.equal('Egusi Soup');
            expect(res.body[1].recipeName).to.equal('Fried Rice');
            expect(res.body[2].recipeName).to.equal('Coconut Rice');
            expect(res.body[3].recipeName).to.equal('Sweet Potatoe Pottage');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should get upvoted recipes in descending order', (done) => {
        agent
          .get('/api/v1/recipes')
          .query({ sort: 'upvotes', order: 'descending' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(5);
            expect(res.body[0].recipeName).to.equal('White Soup');
            expect(res.body[1].recipeName).to.equal('Coconut Rice');
            expect(res.body[2].recipeName).to.equal('Sweet Potatoe Pottage');
            expect(res.body[3].recipeName).to.equal('Fried Rice');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised wrong input', () => {
      it('should get all recipes for url with wrong query instead of upvoted recipes', (done) => {
        agent
          .get('/api/v1/recipes')
          .query({ sort: 'likes', order: 'ascending' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(6);
            expect(res.body[0].recipeName).to.equal('Coconut Rice');
            expect(res.body[3].recipeName).to.equal('Sweet Potatoe Pottage');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check for unauthorised input', () => {
      it('should not get any recipes', (done) => {
        request(app)
          .get('/api/v1/recipes')
          .query({ sort: 'upvotes', order: 'ascending' })
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
