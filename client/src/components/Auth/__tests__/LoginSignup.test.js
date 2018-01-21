import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginSignup from '../index';

describe('LoginSignup', () => {
  const updateLocationStateMock = jest.fn();
  const loginWrapper = shallow(<LoginSignup login updateLocationState={updateLocationStateMock} />);
  const signupWrapper = shallow(<LoginSignup
    signup
    updateLocationState={updateLocationStateMock}
  />);

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when 'login' prop is passed", () => {
    expect(toJson(loginWrapper)).toMatchSnapshot();
  });

  it("renders correctly when 'signup' prop is passed", () => {
    expect(toJson(signupWrapper)).toMatchSnapshot();
  });

  it('renders correctly when signup button is clicked', () => {
    const wrapper = (
      <MemoryRouter initialEntries={['/login']}>
        <LoginSignup
          login
          updateLocationState={updateLocationStateMock}
        />
      </MemoryRouter>);
    const mountedWrapper = mount(wrapper);
    mountedWrapper.find('NavLink#nav-tab-link-2').simulate('click');
    expect(mountedWrapper.find('div#register-form-div').hasClass('active')).toBeTruthy();
    expect(mountedWrapper.find('div#signin-form-div').hasClass('active')).toBeFalsy();
  });

  it('renders correctly when login button is clicked', () => {
    const wrapper = (
      <MemoryRouter initialEntries={['/signup']}>
        <LoginSignup
          signup
          updateLocationState={updateLocationStateMock}
        />
      </MemoryRouter>);
    const mountedWrapper = mount(wrapper);
    mountedWrapper.find('NavLink#nav-tab-link-1').simulate('click');
    expect(mountedWrapper.find('div#signin-form-div').hasClass('active')).toBeTruthy();
    expect(mountedWrapper.find('div#register-form-div').hasClass('active')).toBeFalsy();
  });

  it('doesn\'t call setState when active tab is clicked on', () => {
    loginWrapper.setState({
      activeTab: '1'
    });
    loginWrapper.find('#nav-tab-link-1').simulate('click');
    expect(jest.spyOn(loginWrapper.instance(), 'setState')).not.toHaveBeenCalled();
  });
});
