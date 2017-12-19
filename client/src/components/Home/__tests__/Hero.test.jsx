import React from 'react';
import Hero from '../Hero';

describe('Home: Hero', () => {
  const setup = () => {
    const toggleModalMock = jest.fn();
    const shallowWrapper = shallow(<Hero toggle={toggleModalMock} />);
    const mountedWrapper = mount(<Hero toggle={toggleModalMock} />);

    return {
      shallowWrapper,
      mountedWrapper,
      toggleModalMock,
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
    const { shallowWrapper, toggleModalMock } = setup();

    shallowWrapper.find('#home-add-recipe-btn').simulate('click');
    expect(toggleModalMock).toHaveBeenCalledTimes(1);
  });
});
