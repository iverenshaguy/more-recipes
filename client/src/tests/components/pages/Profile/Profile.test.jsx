/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { toggleModal } from '../../../../actions/ui';
import RecipeItems from '../../../../components/shared/RecipeItems';
import MiniPreLoader from '../../../../components/shared/PreLoader/MiniPreLoader';
import { ProfileComponent } from '../../../../components/pages/Profile';
import initialValues from '../../../setup/initialValues';

const mockFn = jest.fn();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const authStore = mockStore(initialValues);
const setup = () => {
  const props = {
    dispatch: mockFn,
    updateUserImage: mockFn,
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
  };

  const shallowWrapper = shallow(<ProfileComponent {...props} />, rrcMock.get());
  const mountedWrapper = mount(<ProfileComponent {...props} store={authStore} />, rrcMock.get());

  return { props, shallowWrapper, mountedWrapper };
};

const state = {
  limit: 1,
  currentPage: 1,
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

  it('renders Redirects to user\'s profile when params is not equal to username', () => {
    const { props } = setup();
    // rrcMock = global variable that mocks react-router context
    const shallowWrapper = shallow(<ProfileComponent
      {...props}
      user={{ id: 1, username: 'username2' }}
    />, rrcMock.get());

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders user\'s RecipeItems when isFetching is false', () => {
    const { shallowWrapper } = setup();

    expect(shallowWrapper.find(RecipeItems).length).toBeTruthy();
  });

  it('renders MiniPreloader when isFetching is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<ProfileComponent {...props} isFetching />, rrcMock.get());

    expect(shallowWrapper.find(MiniPreLoader).length).toBeTruthy();
  });

  it('handles page change', () => {
    const { mountedWrapper } = setup();

    const handlePageChangeSpy = jest.spyOn(mountedWrapper.find(ProfileComponent).instance(), 'handlePageChange');

    mountedWrapper.setState(state);
    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(handlePageChangeSpy).toHaveBeenCalled();
    expect(mountedWrapper.find(ProfileComponent).instance().state.currentPage).toEqual(2);
    mountedWrapper.unmount();
  });

  it('calls showAddRecipeModal() when button is clicked', () => {
    const { mountedWrapper } = setup();
    const showAddRecipeModalSpy = jest.spyOn(mountedWrapper.find(ProfileComponent).instance(), 'showAddRecipeModal');

    mountedWrapper.setState(state);
    mountedWrapper.find('button#home-add-recipe-btn').simulate('click');

    expect(showAddRecipeModalSpy).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(toggleModal('addRecipe'));
    mountedWrapper.unmount();
  });
});
