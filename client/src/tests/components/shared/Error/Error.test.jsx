import React from 'react';
import Error from '../../../../components/shared/Error';

const setup = () => {
  const props = {
    type: 404,
    dispatch: jest.fn()
  };

  const mountedWrapper = mount(<Error {...props} />);
  const shallowWrapper = shallow(<Error {...props} />);

  return {
    props, mountedWrapper, shallowWrapper
  };
};

describe('Error', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when mounted', () => {
    const { mountedWrapper } = setup();
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('shows Page Not Found when prop of type = 404 is passed', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper.find('h3.text-center').text()).toEqual('Page Not Found');
    expect(mountedWrapper.find('h3.text-center').text()).not.toEqual('Something happened, please try again');
    mountedWrapper.unmount();
  });

  it('shows Something happened, please try again when no type prop is passed', () => {
    const mountedWrapper = mount(<Error dispatch={jest.fn()} />);
    expect(mountedWrapper.find('h3.text-center').text()).not.toEqual('Page Not Found');
    expect(mountedWrapper.find('h3.text-center').text()).toEqual('Something happened, please try again');
    mountedWrapper.unmount();
  });
});
