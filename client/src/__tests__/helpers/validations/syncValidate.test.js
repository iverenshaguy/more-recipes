import syncValidate from '../../../helpers/validations/syncValidate';

const rightSignupValues = {
  email: 'emilysanders@gmail.com',
  firstname: 'Emily',
  lastname: 'Sanders',
  username: 'emilysanders',
  password: 'emilysanders',
  passwordConfirm: 'emilysanders',
  aboutMe: 'I love to cook',
  occupation: 'Student'
};

const wrongSignupValues = {
  email: 'emily',
  firstname: '',
  lastname: '****',
  username: 'emaily sanders',
  password: 'emil',
  passwordConfirm: 'emily',
  aboutMe: `wertyuiopiutrefklbnmjkdjkjkdkjkdljkldfmnm,hiojklwehoiywiyuoieupljggjwefnksdfpkopowegbkdjijkweioguisdnklsdpopkwe[ihrjkrfjiouirfdfjklrfjk
    djkdfjkhdfdkljkldfjolklklfdjkldfkljklkdjkllkdfkl;klsdfiojkkluwpjorojdfklndjklsdhisdfklklsiioowejnklsdjksdjklsdfjsdjljklsdjkldfjfjfjksdfjklsdfjd
    sdjhksduhjksdjkjklsdjklsdfjkjkljkllllllllllllllllllllllllllllllllllllllllllllllllllllllllbndjheuiewfffffffffffffffffffffffffffffffffff`,
  occupation: '%&#)@('
};

describe('Sync Validation: Auth', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Right Input', () => {
    test('email: login', () => {
      const check = syncValidate('login')('email', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('password: login', () => {
      const check = syncValidate('login')('password', { password: 'emilysanders' });

      expect(check).toEqual(null);
    });

    test('email: signup', () => {
      const check = syncValidate('signup')('email', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('firstname', () => {
      const check = syncValidate('signup')('firstname', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('lastname', () => {
      const check = syncValidate('signup')('lastname', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('username', () => {
      const check = syncValidate('signup')('username', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('password: signup', () => {
      const check = syncValidate('signup')('password', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('passwordConfirm', () => {
      const check = syncValidate('signup')('passwordConfirm', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('aboutMe', () => {
      const check = syncValidate('signup')('aboutMe', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('occupation', () => {
      const check = syncValidate('signup')('occupation', rightSignupValues);

      expect(check).toEqual(null);
    });
  });

  describe('Wrong Input', () => {
    test('email: login', () => {
      const check = syncValidate('login')('email', wrongSignupValues);

      expect(check).toEqual('Invalid email address!');
    });

    test('password: login', () => {
      const check = syncValidate('login')('password', { password: '' });

      expect(check).toEqual('Required!');
    });

    test('email', () => {
      const check = syncValidate('signup')('email', { email: '' });

      expect(check).toEqual('Required!');
    });

    test('firstname', () => {
      const check = syncValidate('signup')('firstname', wrongSignupValues);

      expect(check).toEqual('Required!');
    });

    test('lastname', () => {
      const check = syncValidate('signup')('lastname', wrongSignupValues);

      expect(check).toEqual("Only letters and the characters (,.'-) allowed!");
    });

    test('username', () => {
      const check = syncValidate('signup')('username', wrongSignupValues);

      expect(check).toEqual('Username can only contain letters and numbers without space');
    });

    test('password: signup', () => {
      const check = syncValidate('signup')('password', wrongSignupValues);

      expect(check).toEqual('Must be 10 characters or more!');
    });

    test('passwordConfirm', () => {
      const check = syncValidate('signup')('passwordConfirm', wrongSignupValues);

      expect(check).toEqual('Passwords do not match');
    });

    test('aboutMe', () => {
      const check = syncValidate('signup')('aboutMe', wrongSignupValues);

      expect(check).toEqual('Must be 255 characters or less!');
    });

    test('occupation', () => {
      const check = syncValidate('signup')('occupation', wrongSignupValues);

      expect(check).toEqual('Only alphanumeric characters allowed!');
    });
  });
});
