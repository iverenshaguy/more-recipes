import reducer from '../../../reducers/location';

describe('Location Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual({ current: 'home' });
  });

  it('should handle HOME action with payload', () => {
    const newState = reducer({ current: 'auth' }, { type: 'SET_CURRENT_LOCATION', payload: 'home' });

    expect(newState).toEqual({ current: 'home' });
  });

  it('should handle AUTH action without payload', () => {
    const newState = reducer({ current: 'home' }, { type: 'SET_CURRENT_LOCATION', payload: 'auth' });

    expect(newState).toEqual({ current: 'auth' });
  });
});
