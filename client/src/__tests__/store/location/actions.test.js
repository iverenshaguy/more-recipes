import setCurrentLocation from '../../../actions/location';

describe('Location Actions', () => {
  test('setHomeLocation', () => {
    const location = setCurrentLocation('home');

    expect(location).toEqual({ type: 'SET_CURRENT_LOCATION', payload: 'home' });
  });
});

