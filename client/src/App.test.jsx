/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  // eslint-disable-next-line
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders correctly', () => {
  const wrapper = shallow(<App />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
