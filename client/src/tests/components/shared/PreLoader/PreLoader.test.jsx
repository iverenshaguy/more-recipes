import React from 'react';
import PreLoader, { MiniPreLoader } from '../../../../components/shared/PreLoader';

describe('PreLoaders', () => {
  it('renders correctly', () => {
    const mountedWrapper = mount(<PreLoader />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders MiniPreLoader correctly', () => {
    const mountedWrapper = mount(<MiniPreLoader />);
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });
});
