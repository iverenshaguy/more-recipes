import request from 'supertest';
import chai from 'chai';
import app from '../../src/bin/www';
import { User } from '../../src/models';
import './apirouteshome.test';

const expect = chai.expect;


describe('Routes: User API Tests', () => {
  beforeEach(() => User.sync({ force: true }).then(() => User.create({
    firstname: 'Iveren',
    lastname: 'Shaguy',
    username: 'iverenshaguy',
    email: 'iverenshaguy@gmail.com',
    passwordHash: '000000100007a12041acdb057a189a80d1dcd7dad0e8490fcb1b09c0211dbc5d06708900a8dd4728bab663617450d813206529465fcc0ef3',
    aboutMe: 'I am great',
    occupation: 'Coder'
  })).then());
  describe('## Get All Users', () => {
    it('should return an array of users', (done) => {
      request(app)
        .get('/api/v1/users/')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);

          if (err) return done(err);
          done();
        });
    });
  });

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

        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.firstname.msg).to.equal('First name must be alphanumeric!');
            expect(res.body.errors.lastname.msg).to.equal('Last name must be alphanumeric text!');
            expect(res.body.errors.username.msg).to.equal('Username must be alphanumeric!');
            expect(res.body.errors.email.msg).to.equal('This email is invalid!');
            expect(res.body.errors.password.msg).to.equal('Password must be more than 8 characters!');
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

        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.firstname.msg, 'It shouldn\'t accept a string with square brackets').to.equal('First name must be alphanumeric!');
            expect(res.body.errors.lastname.msg, 'It shouldn\'t accept an array').to.equal('Last name must be alphanumeric text!');
            expect(res.body.errors.username.msg, 'It shouldn\'t accept an object').to.equal('Username must be alphanumeric!');
            expect(res.body.errors.email.msg, 'It shouldn\'t accept only a real email address').to.equal('This email is invalid!');
            expect(res.body.errors.password.msg, 'Password fields shouldn\'t be blank').to.equal('Password must be more than 8 characters!');
            expect(res.body.errors.aboutMe.msg, 'About me text should be less than or equal to 255 characters').to.equal('Text must not be more than 255 characters!');
            expect(res.body.errors.occupation.msg, 'It shouldn\'t accept characters that are not alphanumeric').to.equal('Occupation must be alphanumeric!');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a new user 3', (done) => {
        user.username = 'iverenshaguy';
        user.email = 'iverenshaguy@gmail.com';

        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.username.msg).to.equal('Username unavailable!');
            expect(res.body.errors.email.msg).to.equal('This email is already in use!');
            if (err) return done(err);
            done();
          });
      });

      it('should not create a new user 4', (done) => {
        user.password = 'Liosnsid3456';

        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match!');
            if (err) return done(err);
            done();
          });
      });
    });

    describe('## Check For Right Input ', () => {
      let user = {
        firstname: ' Iveren  ',
        lastname: 'Shaguy',
        username: 'fru12',
        email: 'fru1@gmail.com',
        password: 'Liosnsid',
        passwordConfirm: 'Liosnsid',
        aboutMe: 'I am great',
        occupation: 'Coder'
      };

      it('should create a new user', (done) => {
        request(app)
          .post('/api/v1/users/signup')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.firstname).to.equal('Iveren');
            expect(res.body.lastname).to.equal('Shaguy');
            expect(res.body.username).to.equal('fru12');
            expect(res.body.email).to.equal('fru1@gmail.com');
            expect(res.body.passwordHash).to.be.a('string');
            expect(res.body.aboutMe).to.equal('I am great');
            expect(res.body.occupation).to.equal('Coder');
            user = res.body;
            if (err) return done(err);
            done();
          });
      });
    });
  });

  describe('## Get a User after authentication', () => {
    describe('## Check For Wrong Input ', () => {
      it('should return (Email must be specified!)', (done) => {
        const user = {};
        user.password = 'LionJudah234';

        request(app)
          .get('/api/v1/users/login')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('Email must be specified!');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Please enter a valid email address.)', (done) => {
        const user = {};
        user.email = '';
        user.password = 'LionJudah234';

        request(app)
          .get('/api/v1/users/login')
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

      it('should return (Password must be specified!)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';

        request(app)
          .get('/api/v1/users/login')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.password.msg).to.equal('Password must be specified!');
            if (err) return done(err);
            done();
          });
      });

      it('should return (Please enter a valid password.)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';
        user.password = '';

        request(app)
          .get('/api/v1/users/login')
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

        request(app)
          .get('/api/v1/users/login')
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
      it('should return (This account doesn\'t exist! Please Sign Up Instead)', (done) => {
        const user = {};
        user.email = 'favourshaguy@gmail.com';
        user.password = 'LionJudah234';

        request(app)
          .get('/api/v1/users/login')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(422);
            expect(res.body).to.have.property('errors');
            expect(res.body.errors.email.msg).to.equal('This account doesn\'t exist! Please Sign Up Instead');
            if (err) return done(err);
            done();
          });
      });

      it('should be empty', (done) => {
        const user = {};
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'LionJudah234';

        request(app)
          .get('/api/v1/users/login')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            if (err) return done(err);
            done();
          });
      });

      it('should return a validated user', (done) => {
        const user = {};
        user.email = 'iverenshaguy@gmail.com';
        user.password = 'LionJudah';

        request(app)
          .get('/api/v1/users/login')
          .send(user)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.firstname).to.equal('Iveren');
            expect(res.body.email).to.equal('iverenshaguy@gmail.com');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
