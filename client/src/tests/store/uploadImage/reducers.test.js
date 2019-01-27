import reducer from '../../../reducers/uploadImage';

const state = {
  uploadTask: null,
  uploading: false,
  error: null,
  url: null
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle SET_UPLOADING action', () => {
    const newState = reducer(state, {
      type: 'SET_UPLOADING'
    });

    expect(newState).toEqual({ ...state, uploading: true });
  });

  it('should handle UNSET_UPLOADING action', () => {
    const newState = reducer(state, {
      type: 'UNSET_UPLOADING'
    });

    expect(newState).toEqual({ ...state, uploading: false });
  });

  it('should handle SET_UPLOAD_TASK action', () => {
    const newState = reducer(state, {
      type: 'SET_UPLOAD_TASK',
      payload: 'uploadTask'
    });

    expect(newState).toEqual({ ...state, uploadTask: 'uploadTask' });
  });

  it('should handle CLEAR_UPLOAD_ERROR action', () => {
    const newState = reducer({ ...state, error: 'error' }, {
      type: 'CLEAR_UPLOAD_ERROR'
    });

    expect(newState).toEqual({ ...state, error: null });
  });

  it('should handle UPLOAD_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_SUCCESS',
      payload: 'upload'
    });

    expect(newState).toEqual({
      ...state,
      uploading: false,
      url: 'upload'
    });
  });

  it('should handle UPLOAD_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'UPLOAD_FAILURE',
      payload: 'error'
    });

    expect(newState).toEqual({
      ...state,
      uploading: false,
      error: 'error'
    });
  });
});
