import fileEventAdapter from '../../utils/fileEventAdapter';

const delegate = jest.fn();
const readAsDataURL = jest.fn();
const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
const dummyFileReader = { addEventListener, readAsDataURL, result: 'Result' };
window.FileReader = jest.fn(() => dummyFileReader);

const event = { target: { files: ['My file'] } };

describe('Utils: fileEventAdapter', () => {
  test('works as expected', () => {
    const preview = { src: '' };

    fileEventAdapter(delegate, preview)(event);

    expect(addEventListener).toHaveBeenCalled();
    expect(readAsDataURL).toHaveBeenCalledWith('My file');
    expect(delegate).toHaveBeenCalledWith('My file');
    expect(preview.src).toEqual('Result');
  });
});
