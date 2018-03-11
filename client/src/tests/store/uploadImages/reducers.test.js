import reducer from '../../../reducers/uploadImage';

const state = {
  uploading: false,
  success: false
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle UPLOADING action', () => {
    const newState = reducer(state, {
      type: 'UPLOADING'
    });

    expect(newState).toEqual({ ...state, uploading: true });
  });

  it('should handle UPLOAD_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_SUCCESS'
    });

    expect(newState).toEqual({
      uploading: false,
      success: true
    });
  });

  it('should handle UPLOAD_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_FAILURE'
    });

    expect(newState).toEqual({
      uploading: false,
      success: false
    });
  });
});
