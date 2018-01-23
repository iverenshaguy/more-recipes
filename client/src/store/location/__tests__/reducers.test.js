import reducer from '../reducers';

describe('Location Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual({ current: 'home' });
  });

  it('should handle HOME action with payload', () => {
    const newState = reducer({ current: 'auth' }, { type: 'HOME' });

    expect(newState).toEqual({ current: 'home' });
  });

  it('should handle AUTH action without payload', () => {
    const newState = reducer({ current: 'home' }, { type: 'AUTH' });

    expect(newState).toEqual({ current: 'auth' });
  });
});
