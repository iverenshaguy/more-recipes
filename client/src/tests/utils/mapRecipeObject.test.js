import mapRecipeObject from '../../utils/mapRecipeObject';

describe('Utils: mapRecipeObject', () => {
  test('changes preparations and recipeImage if empty', () => {
    const obj = { recipeName: 'Name', preparations: [''], recipeImage: '' };
    const newString = mapRecipeObject(obj);

    expect(newString).toEqual({ recipeName: 'Name', preparations: '', recipeImage: null });
  });

  test('maps recipe object as is', () => {
    const obj = { recipeName: 'Name', preparations: ['Cook'], recipeImage: 'image.com/pic' };
    const newString = mapRecipeObject(obj);

    expect(newString).toEqual(obj);
  });
});
