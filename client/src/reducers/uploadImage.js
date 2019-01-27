import {
  SET_UPLOADING, SET_UPLOAD_TASK, UNSET_UPLOADING,
  UPLOAD_SUCCESS, UPLOAD_FAILURE, CLEAR_UPLOAD_ERROR
} from '../actions/actionTypes';

const initialState = {
  uploadTask: null,
  uploading: false,
  error: null,
  url: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_UPLOAD_ERROR:
      return Object.assign({}, state, { error: null });
    case SET_UPLOADING:
      return Object.assign({}, state, { uploading: true });
    case UNSET_UPLOADING:
      return Object.assign({}, state, { uploading: false, uploadTask: null });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, { url: action.payload });
    case UPLOAD_FAILURE:
      return Object.assign({}, state, { error: action.payload });
    case SET_UPLOAD_TASK:
      return Object.assign({}, state, { uploadTask: action.payload });
    default:
      return state;
  }
};
