import React from 'react';
import { NormalAlert as Alert } from '../index';

const setup = () => {
  const props = {
    color: 'danger'
  };

  const mountedWrapper = mount(<Alert {...props}>My Alert</Alert>);
  const shallowWrapper = shallow(<Alert {...props}>My Alert</Alert>);

  return {
    props, mountedWrapper, shallowWrapper
  };
};

describe('Alert', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when fully mounted', () => {
    const { mountedWrapper } = setup();
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
