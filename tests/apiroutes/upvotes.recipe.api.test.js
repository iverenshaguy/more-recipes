import request from 'supertest';
import { expect } from 'chai';
import app from '../../server/src/bin/www';
import { sequelize, User, Recipe, Like } from '../../server/src/models';
import './reviews.recipe.api.test';

const agent = request.agent(app);

describe('Routes: Recipe API Tests', () => {
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

  describe('## Get All Upvoted Recipes in Ascending Order', () => {
    describe('## Check for authorised  with right input with no liked recipes', () => {
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

    describe('## Check for authorised right input with liked recipes', () => {
      before(() => Like.bulkCreate([
        {
          upvote: true,
          recipeId: 3,
          userId: 5
        },

        {
          upvote: true,
          recipeId: 4,
          userId: 5
        },

        {
          upvote: false,
          recipeId: 5,
          userId: 3
        },

        {
          upvote: true,
          recipeId: 6,
          userId: 4
        },

        {
          upvote: true,
          recipeId: 3,
          userId: 5
        },

        {
          upvote: true,
          recipeId: 3,
          userId: 5
        },

        {
          upvote: false,
          recipeId: 4,
          userId: 2
        },

        {
          upvote: true,
          recipeId: 3,
          userId: 3
        },

        {
          upvote: true,
          recipeId: 6,
          userId: 4
        },

        {
          upvote: true,
          recipeId: 6,
          userId: 5
        },

        {
          upvote: false,
          recipeId: 2,
          userId: 4
        },

        {
          upvote: true,
          recipeId: 2,
          userId: 4
        },

        {
          upvote: true,
          recipeId: 2,
          userId: 3
        },

        {
          upvote: true,
          recipeId: 3,
          userId: 4
        },

        {
          upvote: false,
          recipeId: 3,
          userId: 5
        },

        {
          upvote: true,
          recipeId: 6,
          userId: 3
        }
      ])
        .then(() => Like.findAll().then(likes => likes)));

      it('should get upvoted recipes in ascending order', (done) => {
        agent
          .get('/api/v1/recipes')
          .query({ sort: 'upvotes', order: 'ascending' })
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(4);
            expect(res.body[0].recipeName).to.equal('Egusi Soup');
            expect(res.body[1].recipeName).to.equal('Fried Rice');
            expect(res.body[2].recipeName).to.equal('Sweet Potatoe Pottage');
            expect(res.body[3].recipeName).to.equal('White Soup');

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
            expect(res.body[3].recipeName).to.equal('White Soup');
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

  describe('## Favorite Recipes for User', () => {
    before(() => Like.sync().then(() => Like.create({
      upvote: false,
      recipeId: 5,
      userId: 1
    }).then(() => Like.create({
      upvote: true,
      recipeId: 1,
      userId: 1
    }).then(likes => likes))));

    describe('## Upvote an Existing Recipe for User Iveren', () => {
      describe('## Check for authorised right input', () => {
        it('should upvote recipe', (done) => {
          agent
            .post('/api/v1/recipes/3/upvotes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.upvote).to.equal(true);
              expect(res.body.recipeId).to.equal(3);
              expect(res.body.userId).to.equal(1);

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should upvote recipe', (done) => {
          agent
            .post('/api/v1/recipes/4/upvotes')
            .query({ upvote: 'true' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.upvote).to.equal(true);
              expect(res.body.recipeId).to.equal(4);
              expect(res.body.userId).to.equal(1);

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should upvote recipe that was formerly downvoted', (done) => {
          agent
            .post('/api/v1/recipes/5/upvotes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.upvote).to.equal(true);
              expect(res.body.recipeId).to.equal(5);
              expect(res.body.userId).to.equal(1);

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should not upvote recipe again', (done) => {
          agent
            .post('/api/v1/recipes/3/upvotes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body.message).to.equal('Recipe Already Upvoted');

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should not upvote recipe that belongs to user', (done) => {
          agent
            .post('/api/v1/recipes/2/upvotes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body.message).to.equal('You can\'t upvote your own recipe');

              if (err) {
                return done(err);
              }
              done();
            });
        });
      });

      describe('## Check for authorised wrong input', () => {
        it('should not upvote recipe for Non-Existent ID 123', (done) => {
          agent
            .post('/api/v1/recipes/123/upvotes')
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(404);
              expect(res.body.message).to.equal('Recipe Not Found');
              if (err) return done(err);
              done();
            });
        });

        it('should not upvote recipe for Non-Existent ID abc', (done) => {
          agent
            .post('/api/v1/recipes/abc/upvotes')
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
        it('should not upvote recipe', (done) => {
          request(app)
            .post('/api/v1/recipes/3/upvotes')
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

    describe('## Downvote an Existing Recipe for User Iveren', () => {
      describe('## Check for authorised right input', () => {
        it('should downvote recipe', (done) => {
          agent
            .post('/api/v1/recipes/6/upvotes')
            .query({ upvote: 'false' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.upvote).to.equal(false);
              expect(res.body.recipeId).to.equal(6);
              expect(res.body.userId).to.equal(1);

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should downvote recipe that was formerly upvoted', (done) => {
          agent
            .post('/api/v1/recipes/4/upvotes')
            .query({ upvote: 'false' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(201);
              expect(res.body.upvote).to.equal(false);
              expect(res.body.recipeId).to.equal(4);
              expect(res.body.userId).to.equal(1);

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should not downvote recipe again', (done) => {
          agent
            .post('/api/v1/recipes/6/upvotes')
            .query({ upvote: 'false' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body.message).to.equal('Recipe Already Downvoted');

              if (err) {
                return done(err);
              }
              done();
            });
        });

        it('should not downvote recipe that belongs to user', (done) => {
          agent
            .post('/api/v1/recipes/2/upvotes')
            .query({ upvote: 'false' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(400);
              expect(res.body.message).to.equal('You can\'t downvote your own recipe');

              if (err) {
                return done(err);
              }
              done();
            });
        });
      });

      describe('## Check for authorised wrong input', () => {
        it('should not downvote recipe for Non-Existent ID 123', (done) => {
          agent
            .post('/api/v1/recipes/123/upvotes')
            .query({ upvote: 'false' })
            .set('Accept', 'application/json')
            .end((err, res) => {
              expect(res.statusCode).to.equal(404);
              expect(res.body.message).to.equal('Recipe Not Found');
              if (err) return done(err);
              done();
            });
        });

        it('should not downvote recipe for Non-Existent ID abc', (done) => {
          agent
            .post('/api/v1/recipes/abc/upvotes')
            .query({ upvote: 'false' })
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
        it('should not downvote recipe', (done) => {
          request(app)
            .post('/api/v1/recipes/6/upvotes')
            .query({ upvote: 'false' })
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
              expect(res.body).to.have.lengthOf(3);
              expect(res.body[0].recipeName).to.equal('Coconut Rice');
              expect(res.body[1].recipeName).to.equal('Egusi Soup');
              expect(res.body[2].recipeName).to.equal('Jollof Rice');

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
