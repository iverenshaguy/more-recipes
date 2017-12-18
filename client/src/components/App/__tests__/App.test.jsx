import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../index';
import Home from '../../Home';
import LoginSignup from '../../LoginSignup';

describe('App', () => {
  it('renders without crashing', () => {
    // eslint-disable-next-line
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('changes addRecipeModal state when Add Recipe Button is clicked', () => {
    const mountedWrapper = mount(<App />);

    mountedWrapper.find('button #home-add-recipe-btn').simulate('click');

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.instance().state.addRecipeModal).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('changes addRecipeModal state when Add Recipe Icon in StickyBar is clicked', () => {
    const mountedWrapper = mount(<App />);

    mountedWrapper.find('span #add-edit-modal-icon').simulate('click');

    expect(mountedWrapper.instance().state.addRecipeModal).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('changes socialModal state when Share Recipe Icon in StickyBar is clicked', () => {
    const mountedWrapper = mount(<App />);

    mountedWrapper.find('span #social-modal-icon').simulate('click');
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.instance().state.socialModal).toBeTruthy();
    mountedWrapper.unmount();
  });

  it('changes location state when location changes to Home', () => {
    const mountedWrapper = mount(<App />);
    mountedWrapper.find('NavLink.navbar-brand').simulate('click');
    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(mountedWrapper.instance().state.location).toBe('home');
    mountedWrapper.unmount();
  });

  it('renders correct routes', () => {
    const wrapper = shallow(<App />);
    const routePath = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.render();
      return pathMap;
    }, {});

    expect(routePath['/'].type).toBe(Home);
    expect(routePath['/login'].type).toBe(LoginSignup);
    expect(routePath['/signup'].type).toBe(LoginSignup);
  });
});
