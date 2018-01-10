import request from 'supertest';
import path from 'path';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../../src/bin/www';
import { sequelize, User } from '../../src/models';
import './home.api.test';

const agent = request.agent(app);
const expiredToken = jwt.sign(
  {
    id: 1
  },
  process.env.SECRET,
  {
    expiresIn: 1
  }
);

const invalidToken1 = jwt.sign(
  {},
  process.env.SECRET,
  {
    expiresIn: 86400
  }
);

const invalidToken2 = jwt.sign(
  {
    id: 1,
  },
  'fakesecret',
  {
    expiresIn: 86400
  }
);

let userToken1;
let userToken2;


describe('Routes: User API Tests', () => {
  before(() => sequelize.sync().then(() => User.create({
    firstname: 'Iveren',
    lastname: 'Shaguy',
    username: 'iverenshaguy',
    email: 'iverenshaguy@gmail.com',
    password: 'LionJudah56',
    aboutMe: 'I am great',
    occupation: 'Coder'
  })).then(user => user));

  after(() => sequelize.drop({ force: true }));

  describe('## Create a New User', () => {
    describe('## Check For Wrong Input ', () => {
      const user = {};

      it('should not create a new user 1', (done) => {
        user.firstname = '';
        user.lastname = 'Shaguy12';
        user.username = '';
        user.email = '';
        user.password = '';
        user.passwordConfirm = 'Liosnsid345';
        user.aboutMe = 'I am great';
        user.occupation = 'Student';

        agent
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.firstname.msg).to.equal('First name cannot be empty');
            expect(res.body.errors.lastname.msg).to.equal('Last name can only contain letters and the characters (,.\'-)');
            expect(res.body.errors.username.msg).to.equal('Username must be between 2 to 144 charcters');
            expect(res.body.errors.email.msg).to.equal('This email is invalid');
            expect(res.body.errors.password.msg).to.equal('Password must be at least 10 characters');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a new user 2', (done) => {
        user.firstname = '[]';
        user.lastname = [];
        user.username = { iveren: 'Shaguy' };
        user.email = 'iverenshaguy';
        user.password = '';
        user.passwordConfirm = 'Liosnsid345';
        user.aboutMe = `dsjkdfpio;rfldpo[dfisyetiujedbsdfposdp9ioedyutugudjmkldpofgkvgjsdyuyjkhklpojlfyutsdvndskjkediksegsdjjkdppodrjnfdjhhsdyidk.
          dskdkdksdklfhcfmbcukhsdn,cfnoisdn,ksdhoisdlsdkpliseisd,.cxjsdklsdpoidmdlkdiidskduo9ioedhksdyukjhnfvdloikdf;oidjhgdy5wejuisdfjds jkediod
          dsjsdkfsdklmcxnxcvjksdflikfdlfdjkldf;jksdoioufdhfsdfklhyudfkdfhfoiuhkllfdsjldfsjslkdsjhlkfyuodfsuifdyofoifiofifyfiyosujhsd`;
        user.occupation = '**$$##';

        agent
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.firstname.msg, 'It shouldn\'t accept a string with square brackets').to.equal('First name can only contain letters and the characters (,.\'-)');
            expect(res.body.errors.lastname.msg, 'It shouldn\'t accept an array').to.equal('Last name can only contain letters and the characters (,.\'-)');
            expect(res.body.errors.username.msg, 'It shouldn\'t accept an object').to.equal('Username can only contain letters and numbers without space');
            expect(res.body.errors.email.msg, 'It shouldn\'t accept only a real email address').to.equal('This email is invalid');
            expect(res.body.errors.password.msg, 'Password fields shouldn\'t be blank').to.equal('Password must be at least 10 characters');
            expect(res.body.errors.aboutMe.msg, 'About me text should be less than or equal to 255 characters').to.equal('Text must not be more than 255 characters');
            expect(res.body.errors.occupation.msg, 'It shouldn\'t accept characters that are not alphanumeric').to.equal('Occupation must be alphanumeric');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a new user 3', (done) => {
        user.firstname = 'Favour';
        user.lastname = 'Shaguy';
        user.username = 'iverenshaguy';
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'Liosnsid56';
        user.passwordConfirm = 'Liosnsid56';
        user.aboutMe = 'I am great';
        user.occupation = 'Student';


        agent
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.username.msg).to.equal('Username unavailable');
            expect(res.body.errors.email.msg).to.equal('This email is already in use');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a new user 4', (done) => {
        user.password = 'Liosnsid3456';

        agent
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Right Input ', () => {
      const user = {
        firstname: ' Iveren  ',
        lastname: 'Shaguy',
        username: 'fru12',
        email: 'fru1@gmail.com',
        password: 'Liosnsid56',
        passwordConfirm: 'Liosnsid56',
        aboutMe: 'I am great',
        occupation: 'Coder'
      };

      it('should create a new user', (done) => {
        agent
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.user.firstname).to.equal('Iveren');
            expect(res.body).to.haveOwnProperty('token');
            if (err) return done(err);
            userToken1 = res.body.token;
            done();
          });
      });
    });
  });

  describe('## Upload Profile Picture for an Existing User', () => {
    const imageFilePath = path.resolve(__dirname, '../files/picfile.jpg');

    describe('## Check For Wrong Input ', () => {
      const largeFilePath = path.resolve(__dirname, '../files/toolarge.jpg');
      const noneImageFilePath = path.resolve(__dirname, '../files/nonimage.pdf');

      it('should not upload image that is too large (more than 2MB)', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .attach('profilePic', largeFilePath)
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File too large!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is not an image', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .attach('profilePic', noneImageFilePath)
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('Only image files are allowed!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is non-existent and return and error', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .attach('profilePic', '')
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File is Empty!');
            if (err) return done(err);
            done();
          });
      });

      it('should not upload file that is non-existent and return and error', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body.error).to.equal('File is Empty!');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Right Input ', () => {
      const capsFileExt = path.resolve(__dirname, '../files/CAPS.JPG');

      it('should upload an image', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .attach('profilePic', imageFilePath)
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.firstname).to.equal('Iveren');
            expect(res.body.lastname).to.equal('Shaguy');
            expect(res.body.username).to.equal('fru12');
            expect(res.body.email).to.equal('fru1@gmail.com');
            expect(res.body.passwordHash).to.be.a('string');
            expect(res.body.aboutMe).to.equal('I am great');
            expect(res.body.occupation).to.equal('Coder');
            expect(path.extname(res.body.profilePic)).to.equal('.jpg');
            if (err) return done(err);
            done();
          });
      });

      it('should upload an image and change uppercase file extension to lowercase', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .attach('profilePic', capsFileExt)
          .set('Accept', 'application/json')
          .set('authorization', userToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(path.extname(res.body.profilePic)).to.equal('.jpg');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Unauthorised Input ', () => {
      it('should reject file upload and return \'You are not authorized to access this page, please signin\'', (done) => {
        agent
          .post('/api/v1/users/uploads')
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.error).to.equal('You are not authorized to access this page, please signin');

            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('## Get a User after authentication', () => {
    describe('## Check For Wrong Input ', () => {
      it('should return (Email must be specified)', (done) => {
        const user = {};
        user.password = 'LionJudah234';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('Email must be specified');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Please enter a valid email address.)', (done) => {
        const user = {};
        user.email = '';
        user.password = 'LionJudah234';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('Please enter a valid email address.');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Password must be specified)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.password.msg).to.equal('Password must be specified');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Please enter a valid password.)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';
        user.password = '';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.password.msg).to.equal('Please enter a valid password.');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Please enter a valid email address.)', (done) => {
        const user = {};
        user.email = 'iverenshaguy';
        user.password = 'LionJudah234';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('Please enter a valid email address.');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Right Input ', () => {
      it('should return (This account doesn\'t exist, please Sign Up Instead)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';
        user.password = 'LionJudah234';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('This account doesn\'t exist, please Sign Up Instead');
            if (err) return done(err);
            done();
          });
      });

      it('should not authenticate user and return error \'Username/Password do not match\'', (done) => {
        const user = {};
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'LionJudah234';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.error).to.equal('Username/Password do not match');
            if (err) return done(err);
            done();
          });
      });

      it('should validate user and return User', (done) => {
        const user = {};
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'LionJudah56';

        agent
          .post('/api/v1/users/signin')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.user.firstname).to.equal('Iveren');
            expect(res.body).to.haveOwnProperty('token');
            if (err) return done(err);
            userToken2 = res.body.token;
            done();
          });
      });

      it('should authenticate user and return user data', (done) => {
        agent
          .get('/api/v1/users/profile')
          .set('Accept', 'application/json')
          .set('authorization', userToken2)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.firstname).to.equal('Iveren');
            expect(res.body.email).to.equal('iverenshaguy@gmail.com');
            if (err) return done(err);
            done();
          });
      });

      it('should not authorize user and return \'You are not authorized to access this page, please signin\'', (done) => {
        agent
          .get('/api/v1/users/profile')
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

      it('should not authorize user and return \'User authorization token is expired\'', (done) => {
        setTimeout(() => {
          request(app)
            .get('/api/v1/users/profile')
            .set('Accept', 'application/json')
            .set('authorization', expiredToken)
            .end((err, res) => {
              expect(res.statusCode).to.equal(403);
              expect(res.body.error).to.equal('User authorization token is expired');
              if (err) {
                return done(err);
              }
              done();
            });
        }, 9000);
      });

      it('should not authorize user and return \'Invalid user authorization token\'', (done) => {
        agent
          .get('/api/v1/users/profile')
          .set('Accept', 'application/json')
          .set('authorization', invalidToken1)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.error).to.equal('Invalid user authorization token');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should not authorize user and return \'Failed to authenticate token\'', (done) => {
        agent
          .get('/api/v1/users/profile')
          .set('Accept', 'application/json')
          .set('authorization', invalidToken2)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.error).to.equal('Failed to authenticate token');

            if (err) {
              return done(err);
            }
            done();
          });
      });

      it('should refresh user token based on token input', (done) => {
        agent
          .get('/api/v1/users/token')
          .set('Accept', 'application/json')
          .set('authorization', userToken2)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.user.firstname).to.equal('Iveren');
            expect(res.body).to.haveOwnProperty('token');

            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});
