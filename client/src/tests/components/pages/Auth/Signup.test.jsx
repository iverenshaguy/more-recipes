import React from 'react';
import Signup from '../../../../components/pages/Auth/Signup';

const changeFormMock = jest.fn();


describe('Signup', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Signup changeForm={changeFormMock} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
