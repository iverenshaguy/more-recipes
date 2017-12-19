import React from 'react';
import Home from '../index';

describe('Home', () => {
  const toggleModalMock = jest.fn();
  const updateLocationStateMock = jest.fn();
  const wrapper = (
    <Home toggleModal={toggleModalMock} updateLocationState={updateLocationStateMock} />
  );

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(wrapper);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when fully mounted', () => {
    const mountedWrapper = mount(wrapper);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('calls component will mount when mounted', () => {
    const mountedWrapper = mount(wrapper);
    expect(updateLocationStateMock).toHaveBeenCalledWith('home');
    mountedWrapper.unmount();
  });
});
