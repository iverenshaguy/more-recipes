import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from './__mocks__/localStorage.mock';

configure({ adapter: new Adapter() });
global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.toJson = toJson;

window.localStorage = localStorageMock;

