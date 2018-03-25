const profilePicFileSize = 2097152; // 2MB
const recipeImageFileSize = 6291456; // 6MB

export const isRequired = value => (value ? undefined : 'Required!');

export const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less!` : undefined);

export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);
export const maxLength144 = maxLength(144);
export const maxLength255 = maxLength(255);

export const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more!` : undefined);

export const minLength1 = minLength(1);
export const minLength2 = minLength(2);
export const minLength3 = minLength(3);
export const minLength10 = minLength(10);

export const isNumber = value => (value && isNaN(Number(value)) ? `Must be a number!` : undefined); // eslint-disable-line

export const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}!` : undefined);
export const minValue18 = minValue(18);

export const isEmail = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address!'
    : undefined);

export const isAlphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters allowed!' : undefined);

export const isName = value =>
  (value && /[^a-z ,.'-\s]+$/i.test(value)
    ? "Only letters and the characters (,.'-) allowed!"
    : undefined);

export const isRecipeName = value =>
  (value && /[^a-z 0-9 ,.'-()\s]+$/i.test(value)
    ? "Only letters and the characters (,.'-) allowed!"
    : undefined);

export const isUsername = value =>
  (value && /[^a-zA-Z0-9]/i.test(value)
    ? 'Username can only contain letters and numbers without space'
    : undefined);

export const isPhoneNumber = value =>
  (value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Phone number is invalid, must be 10 digits!'
    : undefined);

export const isValidImage = (value) => {
  const fileType = value.type;
  const match = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
  const invalidType = type => type === fileType;
  if (match.find(invalidType) === undefined) {
    return 'Picture must be a valid image';
  }

  return undefined;
};

export const isValidSize = (size, strSize) => (value) => {
  const fileSize = value.size;

  if (fileSize > size) {
    return `Picture must less than ${strSize}MB`;
  }

  return undefined;
};

export const isValidPasswordConfirm = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords do not match';
  }
  return undefined;
};

export const isValidProfileImageSize = isValidSize(profilePicFileSize, '2');
export const isValidRecipeImageSize = isValidSize(recipeImageFileSize, '6');
