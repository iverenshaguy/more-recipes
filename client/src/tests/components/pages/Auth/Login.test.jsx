import React from 'react';
import Login from '../../../../components/pages/Auth/Login';

const changeFormMock = jest.fn();


describe('Login', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Login changeForm={changeFormMock} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
