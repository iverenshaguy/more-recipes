import React from 'react';
import { HomeComponent } from '../index';
import { locationActions } from '../../../store/location';

const { setHomeLocation } = locationActions;

const setup = () => {
  const dispatch = jest.fn();

  const props = {
    dispatch
  };

  const mountedWrapper = mount(<HomeComponent dispatch={dispatch} />);
  const shallowWrapper = shallow(<HomeComponent dispatch={dispatch} />);

  return {
    props, mountedWrapper, shallowWrapper
  };
};

describe('Home', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when fully mounted', () => {
    const { mountedWrapper } = setup();
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('calls component will mount when mounted', () => {
    const { mountedWrapper, props } = setup();
    expect(props.dispatch).toHaveBeenCalledWith(setHomeLocation());
    mountedWrapper.unmount();
  });
});
