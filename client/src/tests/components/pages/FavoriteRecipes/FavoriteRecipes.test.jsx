import React from 'react';
import MiniPreLoader from '../../../../components/shared/PreLoader/MiniPreLoader';
import FavComponents from '../../../../components/pages/FavoriteRecipes/FavComponents';
import { FavoriteRecipesComponent } from '../../../../components/pages/FavoriteRecipes';

const setup = () => {
  const props = {
    dispatch: jest.fn(),
    match: {
      isExact: true,
      url: '/favorites',
      params: {
        username: 'username'
      }
    },
    isFetching: false,
    recipes: [{ id: 1, recipeName: 'Rice', User: 'Me' }, { id: 5, recipeName: 'Beans', User: 'She' }],
    user: {
      id: 2,
      username: 'username'
    },
  };

  const shallowWrapper = shallow(<FavoriteRecipesComponent {...props} />, rrcMock.get());
  const mountedWrapper = mount(<FavoriteRecipesComponent {...props} />, rrcMock.get());

  return { props, shallowWrapper, mountedWrapper };
};

// const state = {
//   limit: 1,
//   currentPage: 1,
//   activeTab: 'recipes'
// };

describe('FavoriteRecipes', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders MiniPreloader when isFetching is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<FavoriteRecipesComponent {...props} isFetching />);

    expect(shallowWrapper.find(MiniPreLoader).length).toBeTruthy();
    expect(shallowWrapper.find(FavComponents).length).toBeFalsy();
  });

  it('renders FavComponents when isFetching is false and there are recipe', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<FavoriteRecipesComponent
      {...props}
      isFetching={false}
    />);

    expect(shallowWrapper.find(MiniPreLoader).length).toBeFalsy();
    expect(shallowWrapper.find(FavComponents).length).toBeTruthy();
  });

  it('calls component will mount when mounted', () => {
    const { mountedWrapper, props } = setup();
    expect(props.dispatch).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('redirects to page when username is different', () => {
    const { props } = setup();
    const match = {
      isExact: false,
      url: '/favorites',
      params: {
        username: 'username2'
      }
    };

    const mountedWrapper = mount(<FavoriteRecipesComponent
      {...props}
      match={match}
    />, rrcMock.get());

    expect(mountedWrapper.find('a[href="#recipes"]').hasClass('active')).toBeTruthy();
    expect(mountedWrapper.find('a[href="#categories"]').hasClass('active')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('renders categories when categories is passed to url', () => {
    const { props } = setup();
    const match = {
      isExact: false,
      url: '/favorites',
      params: {
        username: 'username'
      }
    };

    const mountedWrapper = mount(<FavoriteRecipesComponent
      {...props}
      match={match}
    />, rrcMock.get());

    expect(mountedWrapper.find('a[href="#recipes"]').hasClass('active')).toBeFalsy();
    expect(mountedWrapper.find('a[href="#categories"]').hasClass('active')).toBeTruthy();
    mountedWrapper.unmount();
  });

  // it('calls showModal', () => {
  //   const { shallowWrapper, dispatch } = setup();

  //   shallowWrapper.find('#home-add-recipe-btn').simulate('click');
  //   expect(dispatch).toHaveBeenCalledTimes(1);
  //   expect(dispatch).toHaveBeenCalledWith(toggleModal('addRecipe'));
  // });

  it('calls toggleTab when link is clicked', () => {
    const { mountedWrapper } = setup();
    const toggleTabSpy = jest.spyOn(mountedWrapper.instance(), 'toggleTab');

    mountedWrapper.find('a[href="#categories"]').simulate('click');
    expect(toggleTabSpy).toHaveBeenCalled();

    mountedWrapper.find('a[href="#recipes"]').simulate('click');
    expect(toggleTabSpy).toHaveBeenCalled();
  });

  // it('calls voteRecipe() when upvote icon is clicked', () => {
  //   const { mountedWrapper, props } = setup();

  //   mountedWrapper.find('i.fa-thumbs-up').simulate('click');

  //   expect(props.dispatch).toHaveBeenCalled();
  // });

  // it('calls voteRecipe() when downvote icon is clicked', () => {
  //   const { mountedWrapper, props } = setup();

  //   mountedWrapper.find('i.fa-thumbs-down').at(1).simulate('click');

  //   expect(props.dispatch).toHaveBeenCalled();
  // });
});
