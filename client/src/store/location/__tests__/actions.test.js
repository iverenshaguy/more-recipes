import {
  setHomeLocation,
  setAuthLocation
} from '../actions';

describe('Location Actions', () => {
  test('setHomeLocation', () => {
    const location = setHomeLocation();

    expect(location).toEqual({ type: 'HOME' });
  });

  test('toggleModal with null modal', () => {
    const location = setAuthLocation();

    expect(location).toEqual({ type: 'AUTH' });
  });
});

