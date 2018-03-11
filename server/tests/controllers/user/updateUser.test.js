import { agent, expect, tokens, rootURL } from '../../utils/setupTests';
import unauthorizedInput from '../../utils/unautorizedInput';

describe('Update User', () => {
  const { iverenToken } = tokens;
  const userURL = `${rootURL}/users`;
  const newUser = {
    firstname: 'Dami',
    aboutMe: 'Black Beauty Coder'
  };

  it('should update user', (done) => {
    agent
      .put(`${userURL}/1`)
      .send(newUser)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.firstname).to.equal('Dami');
        expect(res.body.aboutMe).to.equal('Black Beauty Coder');
        if (err) return done(err);
        done();
      });
  });

  it('should update user\'s password', (done) => {
    agent
      .put(`${userURL}/1`)
      .send({ password: 'iverenshaguy1', passwordConfirm: 'iverenshaguy1' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.firstname).to.equal('Dami');
        expect(res.body.aboutMe).to.equal('Black Beauty Coder');
        if (err) return done(err);
        done();
      });
  });

  it('should update user\'s password back to former password', (done) => {
    agent
      .put(`${userURL}/1`)
      .send({ password: 'iverenshaguy', passwordConfirm: 'iverenshaguy' })
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.firstname).to.equal('Dami');
        expect(res.body.aboutMe).to.equal('Black Beauty Coder');
        if (err) return done(err);
        done();
      });
  });


  it('should not update another user\'s profile', (done) => {
    agent
      .put(`${userURL}/2`)
      .send(newUser)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.message).to.equal('You are not authorized to access this page');
        if (err) return done(err);
        done();
      });
  });

  it('should not update user because of wrong input data', (done) => {
    const badUser = {
      email: 'damishaguy@gmail.com',
      username: 'damishaguy',
      password: 'iverens',
    };

    agent
      .put(`${userURL}/1`)
      .send(badUser)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.email.msg).to.equal('Email cannot be changed');
        expect(res.body.errors.username.msg).to.equal('Username cannot be changed');
        expect(res.body.errors.password.msg).to.equal('Password must be at least 10 characters');
        expect(res.body.errors.passwordConfirm.msg).to.equal('Password Confirm field must be specified');
        if (err) return done(err);
        done();
      });
  });

  it('should not update user because of wrong input data: password', (done) => {
    const badUser = {
      password: 'iverenshaguy1',
      passwordConfirm: 'iverennshagiu'
    };

    agent
      .put(`${userURL}/1`)
      .send(badUser)
      .set('Accept', 'application/json')
      .set('authorization', iverenToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');
        if (err) return done(err);
        done();
      });
  });

  unauthorizedInput('should not update user', agent, 'put', `${userURL}/1`, expect);
});
