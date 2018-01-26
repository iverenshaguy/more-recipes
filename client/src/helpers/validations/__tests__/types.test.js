import {
  isRequired,
  maxLength,
  minLength,
  isNumber,
  minValue,
  isEmail,
  isAlphaNumeric,
  isName,
  isUsername,
  isPhoneNumber,
  isValidImage,
  isValidSize,
  isValidPasswordConfirm,
} from '../types';

describe('Validation Types', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Right Input', () => {
    test('isRequired', () => {
      const check = isRequired('emily');

      expect(check).toEqual(undefined);
    });

    test('maxLength', () => {
      const check = maxLength(10)('emilysand');

      expect(check).toEqual(undefined);
    });

    test('minLength', () => {
      const check = minLength(3)('Emily');

      expect(check).toEqual(undefined);
    });

    test('isNumber', () => {
      const check = isNumber(67);

      expect(check).toEqual(undefined);
    });

    test('minValue', () => {
      const check = minValue(200)(220);

      expect(check).toEqual(undefined);
    });

    test('isEmail', () => {
      const check = isEmail('emilysanders@gmail.com');

      expect(check).toEqual(undefined);
    });

    test('isAlphaNumeric', () => {
      const check = isAlphaNumeric('Password1234');

      expect(check).toEqual(undefined);
    });

    test('isName', () => {
      const check = isName('Emily Sanders');

      expect(check).toEqual(undefined);
    });

    test('isUsername', () => {
      const check = isUsername('myUsername');

      expect(check).toEqual(undefined);
    });

    test('isPhoneNumber', () => {
      const check = isPhoneNumber(1234567890);

      expect(check).toEqual(undefined);
    });

    test('isValidImage', () => {
      const check = isValidImage({ type: 'image/jpg' });

      expect(check).toEqual(undefined);
    });

    test('isValidSize', () => {
      const check = isValidSize(2097152, '2')({ size: 1048076 });

      expect(check).toEqual(undefined);
    });

    test('isValidPasswordConfirm', () => {
      const check = isValidPasswordConfirm('emilysanders', { password: 'emilysanders' });

      expect(check).toEqual(undefined);
    });
  });

  describe('Wrong Input', () => {
    test('isRequired', () => {
      const check = isRequired('');

      expect(check).toEqual('Required!');
    });

    test('maxLength', () => {
      const check = maxLength(10)('emilysanders');

      expect(check).toEqual('Must be 10 characters or less!');
    });

    test('minLength', () => {
      const check = minLength(3)('Em');

      expect(check).toEqual('Must be 3 characters or more!');
    });

    test('isNumber', () => {
      const check = isNumber('uueui');

      expect(check).toEqual('Must be a number!');
    });

    test('minValue', () => {
      const check = minValue(200)(120);

      expect(check).toEqual('Must be at least 200!');
    });

    test('isEmail', () => {
      const check = isEmail('emilysanders@gmail');

      expect(check).toEqual('Invalid email address!');
    });

    test('isAlphaNumeric', () => {
      const check = isAlphaNumeric('%^&*gjjks');

      expect(check).toEqual('Only alphanumeric characters allowed!');
    });

    test('isName', () => {
      const check = isName('Emily Sanders**');

      expect(check).toEqual("Only letters and the characters (,.'-) allowed!");
    });

    test('isUsername', () => {
      const check = isUsername('My Username');

      expect(check).toEqual('Username can only contain letters and numbers without space');
    });

    test('isPhoneNumber', () => {
      const check = isPhoneNumber(12345678910);

      expect(check).toEqual('Phone number is invalid, must be 10 digits!');
    });

    test('isValidImage', () => {
      const check = isValidImage({ type: 'image/pdf' });

      expect(check).toEqual('Picture must be a valid image');
    });

    test('isValidSize', () => {
      const check = isValidSize(2097152, '2')({ size: 3097152 });

      expect(check).toEqual('Picture must less than 2MB');
    });

    test('isValidPasswordConfirm', () => {
      const check = isValidPasswordConfirm('emilysandersss', { password: 'emilysanders' });

      expect(check).toEqual('Passwords do not match');
    });
  });
});
