import capitalizeString from '../../utils/capitalizeString';

describe('Utils: capitalizeString', () => {
  test('creates new object from array', () => {
    const newString = capitalizeString('love');

    expect(newString).toEqual('Love');
  });
});
