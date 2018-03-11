import imageUpload from '../../utils/imageUpload';

const storage = jest.genMockFromModule('../../firebase'); // eslint-disable-line

// storage.initializeApp = () => this;
// storage.storage = () => this;
// storage.ref = () => this;
// storage.refFromURL = () => this;
// storage.put = jest.fn().mockImplementation(() => {
//   this.snapshot = { downloadURL: 'url' };
//   return this;
// });
// storage.delete = () => this;
// storage.on = ('state_changed', jest.fn(), jest.fn(), jest.fn());

const uploadObject = {
  state: { uploading: false }
};
const mockSetState = jest.fn().mockImplementation((obj) => {
  uploadObject.state = Object.assign({}, uploadObject.state, obj);
});

uploadObject.setState = mockSetState;

const image = new Blob(['../../assets/images/user-image-placeholder.png'], { type: 'application/png' });
const imagePath = 'image.com/image';
const formerImagePath = 'formerImage.com/image';
const mockCallback = jest.fn();

describe('Utils: imageUpload', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should set uploading to true when upload starts', (done) => {
    imageUpload.call(
      uploadObject,
      image,
      formerImagePath,
      imagePath,
      mockCallback
    );

    expect(uploadObject.setState).toHaveBeenCalled();
    setTimeout(() => {
      expect(uploadObject.state.uploading).toBeTruthy();
      done();
    }, 500);
  });

  it('should set uploading to false when canceled', (done) => {
    imageUpload.call(
      uploadObject,
      image,
      formerImagePath,
      imagePath,
      mockCallback
    );

    uploadObject.state.uploadTask.cancel(); // eslint-disable-line

    expect(uploadObject.setState).toHaveBeenCalled();
    setTimeout(() => {
      expect(uploadObject.state.uploading).toBeFalsy();
      done();
    }, 3000);
  });

  // it('should delete formerImage if available', async () => {
  //   expect.assertions(1);
  //   try {
  //     await imageUpload.call(
  //       uploadObject,
  //       image,
  //       formerImagePath,
  //       imagePath,
  //       mockCallback
  //     );

  //     expect(mockCallback).toHaveBeenCalled();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });

  // it('should not call formerImage delete if unavailable', async () => {
  //   expect.assertions(1);
  //   try {
  //     await imageUpload.call(
  //       uploadObject,
  //       image,
  //       null,
  //       imagePath,
  //       mockCallback
  //     );

  //     expect(mockCallback).not.toHaveBeenCalled();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
});
