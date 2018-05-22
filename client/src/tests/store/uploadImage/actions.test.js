import { setUploading, setUploadTask, clearUploadError, unsetUploading, uploadSuccess, uploadFailure } from '../../../actions/uploadImage';

describe('Upload Actions', () => {
  test('setUploading', () => {
    const upload = setUploading();

    expect(upload).toEqual({ type: 'SET_UPLOADING' });
  });

  test('unsetUploading', () => {
    const upload = unsetUploading();

    expect(upload).toEqual({ type: 'UNSET_UPLOADING' });
  });

  test('setUploadTask', () => {
    const upload = setUploadTask('task');

    expect(upload).toEqual({ type: 'SET_UPLOAD_TASK', payload: 'task' });
  });

  test('clearUploadError', () => {
    const upload = clearUploadError();

    expect(upload).toEqual({ type: 'CLEAR_UPLOAD_ERROR' });
  });

  test('uploadSuccess', () => {
    const upload = uploadSuccess('upload');

    expect(upload).toEqual({ type: 'UPLOAD_SUCCESS', payload: 'upload' });
  });

  test('uploadFailure', () => {
    const upload = uploadFailure('error');

    expect(upload).toEqual({ type: 'UPLOAD_FAILURE', payload: 'error' });
  });
});
