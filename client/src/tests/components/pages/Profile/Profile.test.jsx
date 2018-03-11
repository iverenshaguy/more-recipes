/* eslint-disable */
import React from 'react';
import { toggleModal } from '../../../../actions/ui';
import RecipeItems from '../../../../components/shared/RecipeItems';
import MiniPreLoader from '../../../../components/shared/PreLoader/MiniPreLoader';
import { ProfileComponent } from '../../../../components/pages/Profile';

const mockFn = jest.fn();
const setup = () => {
  const props = {
    dispatch: mockFn,
    isFetching: false,
    match: {
      url: '/',
      params: {
        username: 'username'
      }
    },
    user: {
      id: 2,
      username: 'username'
    },
    recipes: [{ id: 1, recipeName: 'Rice', User: 'Me' }, { id: 5, recipeName: 'Beans', User: 'She' }],
    metadata: {
      firstPage: 1,
      lastPage: 3,
      page: 2,
      itemsPerPage: 5,
      pages: [1, 2, 3],
      totalCount: 13,
    },
    uploadImage: {
      uploading: false,
      success: false
    }
  };

  const shallowWrapper = shallow(<ProfileComponent {...props} />, rrcMock.get());
  const mountedWrapper = mount(<ProfileComponent {...props} />, rrcMock.get());

  return { props, shallowWrapper, mountedWrapper };
};

const state = {
  limit: 1,
  uploadTask: {
    delete: jest.fn(),
    cancel: jest.fn()
  },
  currentPage: 1,
  uploading: false,
  uploadError: null
};

describe('Profile', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('calls componentWillMount and dispatch when mounted', () => {
    const { mountedWrapper } = setup();

    expect(mockFn).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('renders Redirects to user\'s profile params is not equal to username', () => {
    const { props } = setup();
    // rrcMock = global variable that mocks react-router context
    const shallowWrapper = shallow(<ProfileComponent
      {...props}
      user={{ id: 1, username: 'username2' }}
    />, rrcMock.get());

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders user\'s RecipeItmes when isFetching is false', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.find(RecipeItems).length).toBeTruthy();
  });

  it('renders MiniPreloader when isFetching is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<ProfileComponent {...props} isFetching />, rrcMock.get());

    expect(shallowWrapper.find(MiniPreLoader).length).toBeTruthy();
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
    const shallowWrapper = shallow(<ProfileComponent
      {...props}
      user={{ id: 1, username: 'username', profilePic: 'pic.png' }}
    />, rrcMock.get());

    shallowWrapper.setState({ uploading: true });

    expect(shallowWrapper.find('img[src="pic.png"]')).toBeTruthy();
  });

  it('handles page change', () => {
    const { mountedWrapper } = setup();

    const handlePageChangeSpy = jest.spyOn(mountedWrapper.instance(), 'handlePageChange');

    mountedWrapper.setState(state);
    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(handlePageChangeSpy).toHaveBeenCalled();
    expect(mountedWrapper.instance().state.currentPage).toEqual(2);
    mountedWrapper.unmount();
  });

  it('calls showAddRecipeModal() when button is clicked', () => {
    const { mountedWrapper } = setup();
    const showAddRecipeModalSpy = jest.spyOn(mountedWrapper.instance(), 'showAddRecipeModal');

    mountedWrapper.setState(state);
    mountedWrapper.find('button#home-add-recipe-btn').simulate('click');

    expect(showAddRecipeModalSpy).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(toggleModal('addRecipe'));
    mountedWrapper.unmount();
  });

  it('handles change image click', () => {
    const { mountedWrapper } = setup();
    const handleCancelImageUploadSpy = jest.spyOn(mountedWrapper.instance(), 'handleCancelImageUpload');
    const mockClick = jest.fn();

    mountedWrapper.instance().imageUploader.click = mockClick;
    mountedWrapper.setState({ ...state, uploadError: 'Error' });
    mountedWrapper.find('a[href="#profile-photo"]').simulate('click');

    expect(mountedWrapper.instance().state.uploadError).toBeNull();
    expect(handleCancelImageUploadSpy).not.toHaveBeenCalled();
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
