import { UPLOADING, UPLOAD_SUCCESS, UPLOAD_FAILURE } from './actionTypes';

const uploading = () => ({ type: UPLOADING });


const uploadSuccess = () => ({ type: UPLOAD_SUCCESS });

const uploadFailure = () => ({ type: UPLOAD_FAILURE });

export default {
  uploading,
  uploadSuccess,
  uploadFailure,
};
