import React from 'react';
import PreLoader from '../index';

describe('PreLoader', () => {
  it('renders correctly', () => {
    const mountedWrapper = mount(<PreLoader />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
