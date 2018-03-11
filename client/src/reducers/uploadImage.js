import { UPLOADING, UPLOAD_SUCCESS, UPLOAD_FAILURE } from '../actions/actionTypes';

const initialState = {
  uploading: false,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOADING:
      return Object.assign({}, state, {
        uploading: true,
        success: false
      });
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploading: false,
        success: true
      });
    case UPLOAD_FAILURE:
      return Object.assign({}, state, {
        uploading: false,
        success: false
      });
    default:
      return state;
  }
};
