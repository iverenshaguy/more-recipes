import syncValidate from '../auth';


const rightLoginValues = {
  email: 'emilysanders@gmail.com',
  password: 'emilysanders'
};

const wrongLoginValues = {
  email: 'emily',
  password: 'ury'
};

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
  occupation: `wertyuiopiutrefklbnmjkdjkjkdkjkdljkldfmnm,hiojklwehoiywiyuoieupljggjwefnksdfpkopowegbkdjijkweioguisdnklsdpopkwe[ihrjkrfjiouirfdfjklrfjk
    djkdfjkhdfdkljkldfjolklklfdjkldfkljklkdjkllkdfkl;klsdfiojkkluwpjorojdfklndjklsdhisdfklklsiioowejnklsdjksdjklsdfjsdjljklsdjkldfjfjfjksdfjklsdfjd`
};

describe('Sync Validation: Auth', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Right Input', () => {
    test('email', () => {
      const check = syncValidate('email', 'emilysanders@gmail.com', rightLoginValues);

      expect(check).toEqual(null);
    });

    test('firstname', () => {
      const check = syncValidate('firstname', 'Emily', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('lastname', () => {
      const check = syncValidate('lastname', 'Sanders', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('username', () => {
      const check = syncValidate('username', 'emilysanders', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('password: login', () => {
      const check = syncValidate('password', 'emilysanders', rightLoginValues);

      expect(check).toEqual(null);
    });

    test('password: signup', () => {
      const check = syncValidate('password', 'emilysanders', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('passwordConfirm', () => {
      const check = syncValidate('passwordConfirm', 'emilysanders', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('aboutMe', () => {
      const check = syncValidate('aboutMe', 'I love to read', rightSignupValues);

      expect(check).toEqual(null);
    });

    test('occupation', () => {
      const check = syncValidate('occupation', 'Student', rightSignupValues);

      expect(check).toEqual(null);
    });
  });

  describe('Wrong Input', () => {
    test('email', () => {
      const check = syncValidate('email', 'emilysanders', wrongLoginValues);

      expect(check).toEqual('Invalid email address!');
    });

    test('firstname', () => {
      const check = syncValidate('firstname', '', wrongSignupValues);

      expect(check).toEqual('Required!');
    });

    test('lastname', () => {
      const check = syncValidate('lastname', '****', wrongSignupValues);

      expect(check).toEqual("Only letters and the characters (,.'-) allowed!");
    });

    test('username', () => {
      const check = syncValidate('username', 'emily sanders', wrongSignupValues);

      expect(check).toEqual('Username can only contain letters and numbers without space');
    });

    test('password: login', () => {
      const check = syncValidate('password', '', wrongLoginValues);

      expect(check).toEqual('Required!');
    });

    test('password: signup', () => {
      const check = syncValidate('password', 'emil', wrongSignupValues);

      expect(check).toEqual('Must be 10 characters or more!');
    });

    test('passwordConfirm', () => {
      const check = syncValidate('passwordConfirm', 'emilysandersss', rightSignupValues);

      expect(check).toEqual('Passwords do not match');
    });

    test('aboutMe', () => {
      const check = syncValidate('aboutMe', wrongSignupValues.aboutMe, wrongSignupValues);

      expect(check).toEqual('Must be 255 characters or less!');
    });

    test('occupation', () => {
      const check = syncValidate('occupation', '%&&#$@()', wrongSignupValues);

      expect(check).toEqual('Only alphanumeric characters allowed!');
    });
  });
});
