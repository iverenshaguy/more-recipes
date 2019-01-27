import React from 'react';
import MiniPreLoader from '../../../../components/shared/PreLoader/MiniPreLoader';
import { FavoriteRecipesComponent } from '../../../../components/pages/FavoriteRecipes';

const setup = () => {
  const props = {
    dispatch: jest.fn(),
    match: {
      path: '/favorites',
      isExact: true,
      url: '/favorites',
      params: {
        username: 'username'
      }
    },
    isFetching: false,
    recipes: [{ id: 1, recipeName: 'Rice', User: 'Me' }, { id: 5, recipeName: 'Beans', User: 'She' }],
    metadata: {
      firstPage: 1,
      lastPage: 3,
      page: 2,
      itemsPerPage: 5,
      pages: [1, 2, 3],
      totalCount: 13,
    },
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

  it('calls component will mount when mounted', () => {
    const { mountedWrapper, props } = setup();
    expect(props.dispatch).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('renders MiniPreloader when isFetching is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<FavoriteRecipesComponent {...props} isFetching />);

    expect(shallowWrapper.find(MiniPreLoader).length).toBeTruthy();
    expect(shallowWrapper.find('RecipeItems').length).toBeFalsy();
  });

  it('renders RecipeItems when isFetching is false and there are recipe', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<FavoriteRecipesComponent
      {...props}
      isFetching={false}
    />);

    expect(shallowWrapper.find(MiniPreLoader).length).toBeFalsy();
    expect(shallowWrapper.find('RecipeItems').length).toBeTruthy();
  });

  it('renders Favorite Recipes when isFetching is false and activeTab is recipes', () => {
    const { props } = setup();
    const wrapper = mount(<FavoriteRecipesComponent
      {...props}
      isFetching={false}
    />, rrcMock.get());

    wrapper.setState({ activeTab: 'categories' });
    wrapper.find('a[href="#recipes"]').simulate('click');

    expect(wrapper.find(MiniPreLoader).length).toBeFalsy();
    expect(wrapper.find('RecipeItems').length).toBeTruthy();
    expect(wrapper.find('a[href="#recipes"]').hasClass('active')).toBeTruthy();
    expect(wrapper.find('a[href="#categories"]').hasClass('active')).toBeFalsy();
    wrapper.unmount();
  });

  it('renders Favorite Recipes Categories when isFetching is false and activeTab is categories', () => {
    const { props } = setup();
    const wrapper = mount(<FavoriteRecipesComponent
      {...props}
      isFetching={false}
    />, rrcMock.get());

    wrapper.find('a[href="#categories"]').simulate('click');

    expect(wrapper.find(MiniPreLoader).length).toBeFalsy();
    expect(wrapper.find('RecipeItems').length).toBeTruthy();
    expect(wrapper.find('a[href="#recipes"]').hasClass('active')).toBeFalsy();
    expect(wrapper.find('a[href="#categories"]').hasClass('active')).toBeTruthy();
    wrapper.unmount();
  });

  it('redirects to page when username is different', () => {
    const { props } = setup();
    const match = {
      isExact: false,
      url: '/favorites',
      path: '/favorites',
      params: {
        username: 'username2'
      }
    };

    const mountedWrapper = mount(<FavoriteRecipesComponent
      {...props}
      match={match}
    />, rrcMock.get());

    expect(mountedWrapper.instance().state.activeTab).toEqual('recipes');
    expect(mountedWrapper.find('a[href="#recipes"]').hasClass('active')).toBeTruthy();
    expect(mountedWrapper.find('a[href="#categories"]').hasClass('active')).toBeFalsy();
    mountedWrapper.unmount();
  });

  it('renders categories when categories is passed to url', () => {
    const { props } = setup();
    const match = {
      isExact: false,
      url: '/favorites/categories',
      path: '/favorites/categories',
      params: {
        username: 'username'
      }
    };

    const mountedWrapper = mount(<FavoriteRecipesComponent
      {...props}
      match={match}
    />, rrcMock.get());

    expect(mountedWrapper.instance().state.activeTab).toEqual('categories');
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

  it('handles page change', () => {
    const { mountedWrapper } = setup();

    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(mountedWrapper.instance().state.currentPage).toEqual(2);

    mountedWrapper.unmount();
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
