import React from 'react';
import AuthForm from '../../../../components/shared/Forms/AuthForm';
import { formComponentSetup as setup } from '../../../setup/formSetup';

describe('AuthForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is login', () => {
    const { props } = setup('login');

    const mountedComponent = mount(<AuthForm {...props} />);

    expect(toJson(mountedComponent)).toMatchSnapshot();
    mountedComponent.unmount();
  });

  it('renders correctly when type is signup', () => {
    const { props } = setup('signup');
    const mountedComponent = mount(<AuthForm {...props} />);

    expect(toJson(mountedComponent)).toMatchSnapshot();
    mountedComponent.unmount();
  });
});
