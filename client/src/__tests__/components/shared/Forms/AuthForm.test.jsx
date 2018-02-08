import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from '../../../../components/shared/Forms/AuthForm';
import { arrayToObject } from '../../../../utils';
import { formHelpers } from '../../../../helpers';

const dispatchMock = jest.fn();
const { formFields } = formHelpers;
const setup = (type) => {
  const props = {
    type,
    state: {
      values: arrayToObject(formFields[type], ''),
      touched: arrayToObject(formFields[type], false),
      error: arrayToObject(formFields[type], null),
      pristine: true,
      formValid: false,
      asyncValidating: false
    },
    handlers: {
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      handleFocus: jest.fn(),
      handleSubmit: jest.fn()
    }
  };

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <AuthForm {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

describe('AuthForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when type is login', () => {
    const { props } = setup('login');

    const shallowComponent = mount(<AuthForm {...props} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });

  it('renders correctly when type is signup', () => {
    const { props } = setup('signup');
    const shallowComponent = mount(<AuthForm {...props} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });
});
