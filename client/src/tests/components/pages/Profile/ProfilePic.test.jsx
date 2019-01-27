/* eslint-disable */
import React from 'react';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import configureStore from 'redux-mock-store';
import { toggleModal } from '../../../../actions/ui';
import RecipeItems from '../../../../components/shared/RecipeItems';
import MiniPreLoader from '../../../../components/shared/PreLoader/MiniPreLoader';
import ProfilePic from '../../../../components/pages/Profile/ProfilePic';
import initialValues from '../../../setup/initialValues';

const mockFn = jest.fn();
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
// const authStore = mockStore(initialValues);
const setup = () => {
  const props = {
    updateUserImage: mockFn,
    user: {
      id: 2,
      username: 'username'
    },
    uploadImage: {
      uploading: false,
      success: false
    }
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

  it('renders change picture link and changes image opacity when not uploading', () => {
    const { shallowWrapper } = setup();

    shallowWrapper.setState({ uploading: false });
    const wrapperStyle = shallowWrapper.find('img').get(0).props.style;

    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).toEqual('Change Picture');
    expect(wrapperStyle).toHaveProperty('opacity', 1);
  });

  it('renders cancel upload link and changes image opacity when uploading', () => {
    const { shallowWrapper } = setup();

    shallowWrapper.setState({ uploading: true });
    const wrapperStyle = shallowWrapper.find('img').get(0).props.style;

    expect(shallowWrapper.find('a[href="#profile-photo"]').text()).toEqual('Cancel Upload');
    expect(wrapperStyle).toHaveProperty('opacity', 0.3);
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
    const handleCancelImageUploadSpy = jest.spyOn(mountedWrapper.instance(), 'handleCancelImageUpload');
    const mockClick = jest.fn();

    mountedWrapper.instance().imageUploader.click = mockClick;
    mountedWrapper.setState({ ...state, uploadError: 'Error' });
    mountedWrapper.find('a[href="#profile-photo"]').simulate('click');

    expect(mountedWrapper.instance().state.uploadError).toBeNull();
    expect(handleCancelImageUploadSpy).not.toHaveBeenCalled();
    expect(handleChangeImageClickSpy).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('handles cancel upload click', () => {
    const { mountedWrapper } = setup();
    const handleCancelImageUploadSpy = jest.spyOn(mountedWrapper.instance(), 'handleCancelImageUpload');
    const mockClick = jest.fn();

    mountedWrapper.instance().imageUploader.click = mockClick;
    mountedWrapper.setState({ ...state, uploadError: 'Error', uploading: true });
    mountedWrapper.find('a[href="#profile-photo"]').simulate('click');
    mountedWrapper.find('img').src = 'picn';

    expect(mountedWrapper.instance().state.uploadError).toBeNull();
    expect(mountedWrapper.find('img[src="images/user-image-placeholder.png"]')).toBeTruthy();
    expect(handleCancelImageUploadSpy).toHaveBeenCalled();
    expect(mockClick).not.toHaveBeenCalled();
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

  // it('handles image upload: successful upload', () => {
  //   const { props, mountedWrapper } = setup();
  //   const handleImageUploadSpy = jest.spyOn(mountedWrapper.instance(), 'handleImageUpload');
  //   const image = new Blob(['../../assets/images/user-image-placeholder.png'], { type: 'application/png', size: 2 * 1024 });
  //   const event = { target: { files: [image] } };

  //   mountedWrapper.setState(state);
  //   mountedWrapper.find('input[type="file"]').simulate('change', event);
  //   mountedWrapper.setProps({ ...props, uploadImage: { uploading: false, uploadSuccess: true } });

  //   expect(handleImageUploadSpy).toHaveBeenCalled();
  //   expect(mountedWrapper.instance().state.uploading).toBeFalsy();
  //   mountedWrapper.unmount();
  // });

  // it('handles image upload: unsuccessful upload', () => {
  //   const { props, mountedWrapper } = setup();
  //   const handleImageUploadSpy = jest.spyOn(mountedWrapper.instance(), 'handleImageUpload');
  //   const image = new Blob(['../../assets/images/user-image-placeholder.png'], { type: 'application/png', size: 2 * 1024 });
  //   const event = { target: { files: [image] } };

  //   mountedWrapper.setState(state);
  //   mountedWrapper.find('input[type="file"]').simulate('change', event);
  //   mountedWrapper.setProps({ ...props, uploadImage: { uploading: false, uploadSuccess: false } });

  //   expect(handleImageUploadSpy).toHaveBeenCalled();
  //   expect(mountedWrapper.instance().state.uploading).toBeFalsy();
  //   expect(mountedWrapper.instance().state.uploadError).toEqual('Something happened, please try again');
  //   expect(props.uploadTask.delete).toHaveBeenCalled();
  //   mountedWrapper.unmount();
  // });
});
