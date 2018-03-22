import React from 'react';
import FavComponents from '../../../../components/pages/FavoriteRecipes/FavComponents';

const setup = () => {
  const props = {
    recipes: [{ id: 1, recipeName: 'Rice', User: 'Me' }, { id: 5, recipeName: 'Beans', User: 'She' }],
    user: {
      id: 2,
      username: 'username'
    },
    match: {
      isExact: true,
      path: '/favorites',
      url: '/favorites',
      params: {
        username: 'username'
      }
    },
  };

  const shallowWrapper = shallow(<FavComponents {...props} />, rrcMock.get());
  const mountedWrapper = mount(<FavComponents {...props} />, rrcMock.get());

  return { props, shallowWrapper, mountedWrapper };
};

describe('FavComponents', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
