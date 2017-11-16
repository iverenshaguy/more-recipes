import request from 'supertest';
import { expect } from 'chai';
import app from '../../server/src/bin/www';
import { sequelize, User, Recipe, Favorite } from '../../server/src/models';
import './upvotes.recipe.api.test';

const agent = request.agent(app);

describe('Routes: Recipe API Tests, Favorites', () => {
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
    favorites: 0,
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

  describe('## Favorite Recipes for User', () => {
    before(() => Favorite.bulkCreate([
      {
        favorite: true,
        recipeId: 3,
        userId: 1
      },

      {
        favorite: true,
        recipeId: 4,
        userId: 5
      },

      {
        favorite: true,
        recipeId: 6,
        userId: 1
      },

      {
        favorite: true,
        recipeId: 3,
        userId: 5
      },

      {
        favorite: true,
        recipeId: 3,
        userId: 5
      },

      {
        favorite: true,
        recipeId: 3,
        userId: 3
      },

      {
        favorite: true,
        recipeId: 6,
        userId: 4
      },

      {
        favorite: true,
        recipeId: 6,
        userId: 5
      },

      {
        favorite: true,
        recipeId: 2,
        userId: 4
      },

      {
        favorite: true,
        recipeId: 2,
        userId: 3
      },

      {
        favorite: true,
        recipeId: 3,
        userId: 4
      },

      {
        favorite: true,
        recipeId: 6,
        userId: 3
      }
    ])
      .then(() => Favorite.findAll().then(favorites => favorites)));

    describe('## Add Recipe to Favorites for User Iveren', () => {
      describe('## Check for authorised right input', () => {
        it('should add recipe to favorites', (done) => {
          agent
            .post('/api/v1/recipes/1/favorites')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.message).to.equal('Recipe has been added to favorites');
              expect(res.body.recipes).to.have.lengthOf(3);
              expect(res.body.recipes[0].recipeName).to.equal('Egusi Soup');
              expect(res.body.recipes[1].recipeName).to.equal('Fried Rice');
              expect(res.body.recipes[2].recipeName).to.equal('Coconut Rice');

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should remove recipe from favorites', (done) => {
          agent
            .post('/api/v1/recipes/3/favorites')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body.message).to.equal('Recipe has been removed from favorites');
              expect(res.body.recipes).to.have.lengthOf(2);
              expect(res.body.recipes[0].recipeName).to.equal('Fried Rice');
              expect(res.body.recipes[1].recipeName).to.equal('Coconut Rice');

              if (err) {
                return done(err);
              }
              done();
            });
        });
      });

      describe('## Check for authorised wrong input', () => {
        it('should not add recipe with Non-Existent ID 123 to favorites', (done) => {
          agent
            .post('/api/v1/recipes/123/favorites')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(422);
              expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
              if (err) return done(err);
              done();
            });
        });

        it('should not add recipe with Non-Existent ID abc to favorites', (done) => {
          agent
            .post('/api/v1/recipes/abc/favorites')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(422);
              expect(res.body.errors.recipeId.msg).to.equal('Recipe Not Found');
              if (err) return done(err);
              done();
            });
        });
      });


      describe('## Check for unauthorised input', () => {
        it('should not add recipe to favorites', (done) => {
          request(app)
            .post('/api/v1/recipes/3/favorites')
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

    describe('## Get Favorites Recipes for User Iveren', () => {
      describe('## Check for authorised right input', () => {
        it('should get favorite recipes', (done) => {
          agent
            .get('/api/v1/users/1/recipes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.lengthOf(2);
              expect(res.body[0].recipeName).to.equal('Fried Rice');
              expect(res.body[1].recipeName).to.equal('Coconut Rice');

              if (err) {
                return done(err);
              }
              done();
            });
        });
      });

      describe('## Check for authorised wrong input', () => {
        it('should not get favorite recipes for url with wrong user id', (done) => {
          agent
            .get('/api/v1/users/2/recipes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(401);
              expect(res.body.message).to.equal('You are not authorized to access this page');
              if (err) return done(err);
              done();
            });
        });

        it('should not get favorite recipes for Non-Existent user abc', (done) => {
          agent
            .get('/api/v1/users/abc/recipes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(422);
              expect(res.body.errors.userId.msg).to.equal('User Not Found');
              if (err) return done(err);
              done();
            });
        });
      });

      describe('## Check for unauthorised input', () => {
        it('should not get any recipes', (done) => {
          request(app)
            .get('/api/v1/users/1/recipes')
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

    describe('## Check for Another User', () => {
      before((done) => {
        const user = {
          email: 'praiseshaguy@gmail.com',
          password: 'LionJudah'
        };

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

      it('should return no favorite recipes', (done) => {
        agent
          .get('/api/v1/users/2/recipes')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('You have no favorite recipes');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});
