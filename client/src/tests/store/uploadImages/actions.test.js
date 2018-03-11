import { uploading, uploadSuccess, uploadFailure } from '../../../actions/uploadImage';

describe('Upload Actions', () => {
  test('uploading', () => {
    const upload = uploading();

    expect(upload).toEqual({ type: 'UPLOADING' });
  });

  test('uploadSuccess', () => {
    const upload = uploadSuccess();

    expect(upload).toEqual({ type: 'UPLOAD_SUCCESS' });
  });

  test('uploadFailure', () => {
    const upload = uploadFailure();

    expect(upload).toEqual({ type: 'UPLOAD_FAILURE' });
  });
});
