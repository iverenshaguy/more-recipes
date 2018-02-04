import {
  agent,
  expect,
  rootURL
} from '../../utils/setupTests';

describe('Login', () => {
  const loginURL = `${rootURL}/users/signin`;
  describe('## Wrong Input ', () => {
    it('should return (Email must be specified)', (done) => {
      agent
        .post(loginURL)
        .send({ password: 'LionJudah234' })
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
      agent
        .post(loginURL)
        .send({ email: '', password: 'LionJudah234' })
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
      agent
        .post(loginURL)
        .send({ email: 'favourshaguy@gmail.com' })
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
      agent
        .post(loginURL)
        .send({ email: 'favourshaguy@gmail.com', password: '' })
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
      agent
        .post(loginURL)
        .send({ email: 'iverenshaguy', password: 'LionJudah234' })
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

  describe('## Right Input ', () => {
    it('should return (This account doesn\'t exist, please Sign Up Instead)', (done) => {
      agent
        .post(loginURL)
        .send({ email: 'favourshaguy@gmail.com', password: 'LionJudah234' })
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
      agent
        .post(loginURL)
        .send({ email: 'iverenshaguy@gmail.com', password: 'LionJudah234' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.error).to.equal('Email/Password do not match');
          if (err) return done(err);
          done();
        });
    });

    it('should validate user and return User', (done) => {
      agent
        .post(loginURL)
        .send({ email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.user.firstname).to.equal('Iveren');
          expect(res.body).to.haveOwnProperty('token');
          if (err) return done(err);
          done();
        });
    });
  });
});
