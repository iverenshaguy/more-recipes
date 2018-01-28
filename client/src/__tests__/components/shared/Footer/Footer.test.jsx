import React from 'react';
import Footer from '../../../../components/shared/Footer';

const setup = () => {
  const mountedWrapper = mount(<Footer />);
  const shallowWrapper = shallow(<Footer />);

  return {
    mountedWrapper, shallowWrapper
  };
};

describe('Footer', () => {
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
