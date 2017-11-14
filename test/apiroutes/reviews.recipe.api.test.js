import request from 'supertest';
import { expect } from 'chai';
import app from '../../server/src/bin/www';
import { sequelize, User, Recipe } from '../../server/src/models';
import './recipe.api.test';

const agent = request.agent(app);

describe('Routes: Recipe API Tests: Reviews', () => {
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
    userId: 1
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
    userId: 1
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
        expect(res.statusCode).to.equal(200);
        expect('Location', '/server');
        if (err) {
          return done(err);
        }
        done();
      });
  });

  after(() => sequelize.drop({ force: true }));

  describe('## Review an Existing Recipe for User Iveren', () => {
    const review = { rating: 4, comment: 'Very Good Recipe' };
    const badReview1 = { rating: 7, comment: '[Very Good Recipe]' };
    const badReview2 = { rating: 'Five', comment: '' };
    const badReview3 = {};

    describe('## Check for authorised right input', () => {
      it('should review recipe', (done) => {
        agent
          .post('/api/v1/recipes/1/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.rating).to.equal(4);
            expect(res.body.comment).to.equal('Very Good Recipe');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should not review recipe again', (done) => {
        agent
          .post('/api/v1/recipes/1/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message).to.equal('Review Already Submitted');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should not review recipe that belongs to user', (done) => {
        agent
          .post('/api/v1/recipes/2/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.message).to.equal('You can\'t review your own recipe');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });

    describe('## Check for authorised wrong input', () => {
      it('should not review recipe for Non-Existent ID 123', (done) => {
        agent
          .post('/api/v1/recipes/123/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not review recipe for Non-Existent ID abc', (done) => {
        agent
          .post('/api/v1/recipes/abc/reviews')
          .send(review)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
            if (err) return done(err);
            done();
          });
      });

      it('should not review recipe because of wrong input data', (done) => {
        agent
          .post('/api/v1/recipes/1/reviews')
          .send(badReview1)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.rating.msg).to.equal('Recipe must be rated from 1 - 5');
            expect(res.body.errors.comment.msg).to.equal('Review can only contain letters and the characters (,.\'-)');
            if (err) return done(err);
            done();
          });
      });

      it('should not review recipe because of wrong input data', (done) => {
        agent
          .post('/api/v1/recipes/1/reviews')
          .send(badReview2)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.rating.msg).to.equal('Recipe must be rated from 1 - 5');
            expect(res.body.errors.comment.msg).to.equal('Review cannot be empty');
            if (err) return done(err);
            done();
          });
      });

      it('should not review recipe because of wrong input data', (done) => {
        agent
          .post('/api/v1/recipes/1/reviews')
          .send(badReview3)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.errors.rating.msg).to.equal('Recipe must be rated');
            expect(res.body.errors.comment.msg).to.equal('Review must be specified');
            if (err) return done(err);
            done();
          });
      });
    });


    describe('## Check for unauthorised input', () => {
      it('should not review recipe', (done) => {
        request(app)
          .post('/api/v1/recipes/1/reviews')
          .send(review)
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
});
