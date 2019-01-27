import { agent, expect, rootURL } from '../../utils/setupTests';

describe('Signup', () => {
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

  const badUser = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    occupation: ''
  };

  const signupURL = `${rootURL}/users/signup`;

  describe('## Wrong Input ', () => {
    it('should not create a new user with bad request body 1', (done) => {
      badUser.lastname = 'Shaguy12';
      badUser.passwordConfirm = 'Liosnsid345';
      badUser.aboutMe = 'I am great';
      badUser.occupation = 'Student';

      agent
        .post(signupURL)
        .send(badUser)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors.lastname.msg, 'It shouldn\'t accept numbers').to.equal('Last name can only contain letters and the characters (,.\'-)');
          expect(res.body.errors.username.msg, 'It shouldn\'t accept an empty string').to.equal('Username must be between 2 to 144 charcters');
          expect(res.body.errors.email.msg, 'It shouldn\'t accept an empty string').to.equal('This email is invalid');
          expect(res.body.errors.password.msg, 'It shouldn\'t accept an empty string').to.equal('Password must be at least 10 characters');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new user with bad request body 2', (done) => {
      badUser.firstname = '[]';
      badUser.lastname = [];
      badUser.username = { iveren: 'Shaguy' };
      badUser.email = 'iverenshaguy';
      badUser.password = '';
      badUser.passwordConfirm = 'Liosnsid345';
      badUser.aboutMe = `dsjkdfpio;rfldpo[dfisyetiujedbsdfposdp9ioedyutugudjmkldpofgkvgjsdyuyjkhklpojlfyutsdvndskjkediksegsdjjkdppodrjnfdjhhsdyidk.
          dskdkdksdklfhcfmbcukhsdn,cfnoisdn,ksdhoisdlsdkpliseisd,.cxjsdklsdpoidmdlkdiidskduo9ioedhksdyukjhnfvdloikdf;oidjhgdy5wejuisdfjds jkediod
          dsjsdkfsdklmcxnxcvjksdflikfdlfdjkldf;jksdoioufdhfsdfklhyudfkdfhfoiuhkllfdsjldfsjslkdsjhlkfyuodfsuifdyofoifiofifyfiyosujhsd`;
      badUser.occupation = '**$$##';

      agent
        .post(signupURL)
        .send(badUser)
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

    it('should not create a new user with non unique username and email', (done) => {
      agent
        .post('/api/v1/users/signup')
        .send({ ...user, username: 'iverenshaguy', email: 'iverenshaguy@gmail.com' })
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

    it('should not create a new user with wrong password length', (done) => {
      agent
        .post('/api/v1/users/signup')
        .send({ ...user, password: 'Liosnsid3456' })
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

  describe('## Right Input ', () => {
    it('should create a new user', (done) => {
      agent
        .post(signupURL)
        .send(user)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.user.firstname).to.equal('Iveren');
          expect(res.body).to.haveOwnProperty('token');
          if (err) return done(err);
          done();
        });
    });
  });
});
