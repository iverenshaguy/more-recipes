import React from 'react';
import Hero from '../Hero';
import { toggleModal } from '../../../store/components/actions';

describe('Home: Hero', () => {
  const setup = () => {
    const dispatch = jest.fn();
    const shallowWrapper = shallow(<Hero dispatch={dispatch} />);
    const mountedWrapper = mount(<Hero dispatch={dispatch} />);

    return {
      shallowWrapper,
      mountedWrapper,
      dispatch,
    };
  };

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when mouted fully', () => {
    const { mountedWrapper } = setup();
    expect(toJson(mountedWrapper)).toMatchSnapshot();

    mountedWrapper.unmount();
  });

  it('calls toggleModal method on add recipe button click', () => {
    const { shallowWrapper, dispatch } = setup();

    shallowWrapper.find('#home-add-recipe-btn').simulate('click');
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleModal('addRecipe'));
  });
});
