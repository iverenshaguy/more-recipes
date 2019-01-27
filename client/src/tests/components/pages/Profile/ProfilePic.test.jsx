import React from 'react';
import ProfilePic from '../../../../components/pages/Profile/ProfilePic';

const mockFn = jest.fn();
const setup = () => {
  const props = {
    user: {
      id: 2,
      username: 'username'
    },
    uploadImageObj: {
      uploading: false,
      success: false,
      error: null
    },
    uploadImage: jest.fn(),
    setUploading: jest.fn(),
    uploadFailure: jest.fn(),
    uploadSuccess: jest.fn(),
    unsetUploading: jest.fn(),
    updateUserImage: mockFn,
    clearUploadError: jest.fn(),
  };

  const shallowWrapper = shallow(<ProfilePic {...props} />);
  const mountedWrapper = mount(<ProfilePic {...props} />);

  return { props, shallowWrapper, mountedWrapper };
};

const state = {
  uploadTask: {
    delete: jest.fn(),
    cancel: jest.fn()
  },
  uploading: false,
  uploadError: null
};

describe('ProfilePic', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders error when uploading is false and there is an error', () => {
    const { shallowWrapper } = setup();

    shallowWrapper.setState({ uploading: false, uploadError: 'An error occurred' });

    expect(shallowWrapper.find('.upload-error').length).toBeTruthy();
    expect(shallowWrapper.find('.upload-error').text()).toEqual('An error occurred');
  });

  it('does not render preloader when not uploading', () => {
    const { shallowWrapper } = setup();

    shallowWrapper.setProps({ uploadImageObj: { uploading: false } });

    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).not.toEqual('<MiniPreLoader />');
    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).toEqual('<FontAwesome />');
  });

  it('renders preloader when uploading', () => {
    const { shallowWrapper } = setup();

    shallowWrapper.setProps({ uploadImageObj: { uploading: true } });

    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).toEqual('<MiniPreLoader />');
    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).not.toEqual('<FontAwesome />');
  });

  it('renders user\'s profilepic when provided', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<ProfilePic
      {...props}
      user={{ id: 1, username: 'username', profilePic: 'pic.png' }}
    />, rrcMock.get());

    shallowWrapper.setState({ uploading: true });

    expect(shallowWrapper.find('img[src="pic.png"]')).toBeTruthy();
  });

  it('handles change image click', () => {
    const { mountedWrapper } = setup();
    const handleChangeImageClickSpy = jest.spyOn(mountedWrapper.instance(), 'handleChangeImageClick');
    const mockClick = jest.fn();

    mountedWrapper.instance().imageUploader.click = mockClick;
    mountedWrapper.setState({ ...state, uploadError: 'Error' });
    mountedWrapper.find('a[href="#profile-photo"]').simulate('click');

    expect(mountedWrapper.instance().state.uploadError).toBeNull();
    expect(handleChangeImageClickSpy).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('handles change image', () => {
    const { mountedWrapper } = setup();
    const handleChangeImageSpy = jest.spyOn(mountedWrapper.instance(), 'handleChangeImage');
    const image = new Blob(['../../assets/images/user-image-placeholder.png'], { type: 'application/png' });
    const event = { target: { files: [image] } };

    mountedWrapper.setState(state);
    mountedWrapper.find('input[type="file"]').simulate('change', event);

    expect(handleChangeImageSpy).toHaveBeenCalled();
    mountedWrapper.unmount();
  });
});
