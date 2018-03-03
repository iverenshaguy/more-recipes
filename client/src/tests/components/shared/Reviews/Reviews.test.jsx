import React from 'react';
import { ReviewsComponent as Reviews } from '../../../../components/shared/Reviews';

const dispatchMock = jest.fn();

const setup = () => {
  const props = {
    recipeId: 5,
    dispatch: dispatchMock,
    reviews: [
      {
        id: 56,
        rating: 5,
        comment: 'Very Good',
        recipeId: 5,
        User: {
          id: 2,
          username: 'user',
          profilePic: null
        }
      },
      {
        id: 3,
        rating: 4,
        comment: 'Great',
        recipeId: 5,
        User: {
          id: 4,
          username: 'user',
          profilePic: null
        }
      },
      {
        id: 78,
        rating: 5,
        comment: 'Excellent',
        recipeId: 5,
        User: {
          id: 6,
          username: 'user6',
          profilePic: null
        }
      }
    ],
    metadata: {
      firstPage: 1,
      lastPage: 2,
      page: 1,
      itemsPerPage: 2,
      pages: [1, 2],
      totalCount: 3,
    },
    error: null,
    reviewing: false,
    user: {
      id: 43,
      firstName: 'Ivy',
      lastName: 'Shaguy',
      username: 'ivy'
    }
  };

  const shallowWrapper = shallow(<Reviews {...props} />);

  const mountedWrapper = mount(<Reviews {...props} />);

  return { props, mountedWrapper, shallowWrapper };
};

describe('Reviews', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('calls dispatch when mounted', () => {
    const { mountedWrapper } = setup();
    expect(dispatchMock).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('renders MiniPreloader when loading', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<Reviews {...props} reviewing />);

    expect(shallowWrapper.find('MiniPreLoader').length).toBeTruthy();
  });

  it('renders message when there are no reviews', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<Reviews {...props} reviews={[]} />);
    expect(shallowWrapper.find('.no-reviews').length).toBeTruthy();
    expect(shallowWrapper.find('.no-reviews').text()).toEqual('There are no reviews for this recipe');
  });

  it('renders error message when there is an error', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<Reviews {...props} error="This is an error" />);

    expect(shallowWrapper.find('.error').length).toBeTruthy();
    expect(shallowWrapper.find('.error').text()).toEqual('Something happened, please retry.');
  });

  it('renders pagination when reviews are more than current page', () => {
    const state = {
      currentPage: 1,
      limit: 2
    };

    const { mountedWrapper } = setup();
    const handlePageChangeSpy = jest.spyOn(mountedWrapper.instance(), 'handlePageChange');

    mountedWrapper.setState(state);
    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(handlePageChangeSpy).toHaveBeenCalled();
    expect(mountedWrapper.instance().state.currentPage).toEqual(2);
    mountedWrapper.unmount();
  });
});
