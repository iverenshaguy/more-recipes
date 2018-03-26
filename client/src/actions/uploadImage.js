import storage from '../firebase';
import { errorHandler } from '../utils';
import {
  SET_UPLOADING, SET_UPLOAD_TASK, UNSET_UPLOADING, CLEAR_UPLOAD_ERROR,
  UPLOAD_SUCCESS, UPLOAD_FAILURE
} from './actionTypes';

const setUploading = () => ({ type: SET_UPLOADING });

const setUploadTask = payload => ({ type: SET_UPLOAD_TASK, payload });

const unsetUploading = () => ({ type: UNSET_UPLOADING });

const clearUploadError = () => ({ type: CLEAR_UPLOAD_ERROR });

const uploadSuccess = () => ({ type: UPLOAD_SUCCESS });

const uploadFailure = payload => ({ type: UPLOAD_FAILURE, payload });


/**
 * Image Upload to Firebase
 * @function imageUplaod
 * @param {object} image - image file
 * @param {object} formerImagePath - former user img
 * @param {string} imagePath - image path
 * @param {function} successCallBack - success callback
 * @returns {function} success callback
 */
const uploadImage = (image, formerImagePath, imagePath, successCallBack) => (dispatch) => {
  // create a storage referencing the current time as filename
  const storageRef = storage.ref(imagePath);
  // upload the file
  const uploadTask = storageRef.put(image);

  // set uploadTask so that upload can be canceled by user
  dispatch(setUploadTask(uploadTask));

  uploadTask.on(
    'state_changed',
    // image upload progress
    () => {
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch(setUploading());
    },
    // image upload failure
    (err) => {
      const errorResponse = errorHandler(err);

      dispatch(uploadFailure(errorResponse));
      dispatch(unsetUploading());
    },
    // image upload success
    () => {
      // create a storage referencing the former image
      if (formerImagePath) {
        const formerStorageRef = storage.refFromURL(`${formerImagePath}`);
        // delete file if it exists
        formerStorageRef.delete();
      }

      dispatch(uploadSuccess(uploadTask.snapshot.downloadURL));
      dispatch(unsetUploading());
      successCallBack(uploadTask.snapshot.downloadURL);
    }
  );
};

export default {
  setUploading,
  unsetUploading,
  clearUploadError,
  uploadSuccess,
  uploadFailure,
  uploadImage
};
