import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import Navbar from '../../Navbar';
import { HeaderComponent } from '../../../../components/shared/Header';

const dispatchMock = jest.fn();

const props = {
  isAuthenticated: false,
  currentLocation: 'auth',
  user: { firstname: 'Dave', lastname: 'Smith' },
  dispatch: dispatchMock
};

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HeaderComponent {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('logs user out on logout click', () => {
    const component = mount( //eslint-disable-line
      <MemoryRouter>
        <HeaderComponent
          user={{ firstname: 'Dave', lastname: 'Smith' }}
          isAuthenticated
          currentLocation="auth"
          dispatch={dispatchMock}
        />
      </MemoryRouter>);
    const wrapper = component.find(HeaderComponent);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('a[href="/login"]').simulate('click', { preventDefault() { } });

    expect(dispatchMock).toHaveBeenCalled();
    component.unmount();
  });

  it('calls Modal on Add Recipe click', () => {
    const component = mount( //eslint-disable-line
      <MemoryRouter>
        <HeaderComponent
          user={{ firstname: 'Dave', lastname: 'Smith' }}
          isAuthenticated
          currentLocation="auth"
          dispatch={dispatchMock}
        />
      </MemoryRouter>);
    const wrapper = component.find(HeaderComponent);

    wrapper.find('a[href="#add-edit-modal"]').simulate('click', { preventDefault() { } });

    expect(wrapper.find('.modal')).toBeTruthy();
    component.unmount();
  });
});
