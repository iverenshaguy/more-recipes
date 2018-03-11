import uploadValidation from '../../../helpers/validations/uploadValidation';

const rightImgFile = { type: 'application/gif', size: '9803' };
const pdfFile = { type: 'application/pdf', size: '9803' };
const largeFile = { type: 'application/jpeg', size: 3 * 1024 * 1024 };
const types = ['application/jpeg', 'application/gif', 'application/png'];
const maxSize = 2 * 1024 * 1024;
const validateObject = {
  state: { uploadError: null },
  validate: uploadValidation
};
const mockSetState = jest.fn().mockImplementation((obj) => {
  validateObject.state.uploadError = obj.uploadError;
});

validateObject.setState = mockSetState;


describe('Upload Validation', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Right Image File', () => {
    const validate = uploadValidation.call(validateObject, rightImgFile, maxSize, types);

    expect(validate).toBeTruthy();
    expect(validateObject.setState).not.toHaveBeenCalled();
  });

  test('PDF File', () => {
    const validate = uploadValidation.call(validateObject, pdfFile, maxSize, types);

    expect(validate).toBeFalsy();
    expect(validateObject.setState).toHaveBeenCalledWith({ uploadError: 'Invalid File Type' });
    expect(validateObject.state.uploadError).toEqual('Invalid File Type');
  });

  test('Large File', () => {
    const validate = uploadValidation.call(validateObject, largeFile, maxSize, types);

    expect(validate).toBeFalsy();
    expect(validateObject.setState).toHaveBeenCalledWith({ uploadError: 'File too large' });
    expect(validateObject.state.uploadError).toEqual('File too large');
  });
});
