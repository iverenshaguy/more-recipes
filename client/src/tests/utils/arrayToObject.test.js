import arrayToObject from '../../utils/arrayToObject';

describe('Utils: arrayToObject', () => {
  test('creates new object from array', () => {
    const obj = arrayToObject(['firstname', 'lastname'], true);

    expect(obj).toEqual({ firstname: true, lastname: true });
  });

  test('creates array as value of object item if element is ingredients, preparations or directions', () => {
    const obj = arrayToObject(['firstname', 'ingredients', 'directions', 'preparations'], true);

    expect(obj).toEqual({
      firstname: true, ingredients: [true], directions: [true], preparations: [true]
    });
  });
});
