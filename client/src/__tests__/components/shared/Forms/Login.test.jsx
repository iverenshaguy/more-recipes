import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../../../components/shared/Forms/LoginForm';

const dispatchMock = jest.fn();

const setup = () => {
  const props = {
    state: {
      values: {
        email: '',
        password: ''
      },
      touched: { email: false, password: false },
      error: { email: null, password: null },
      pristine: true,
      formValid: false,
      asyncValidating: false,
      submitting: false,
      submitError: null
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
      <LoginForm {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

describe('LoginForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginForm {...props} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });

  it('disables submit button when form is clean', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginForm {...props} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      state: { ...props.state, submitting: true }
    };
    const shallowComponent = shallow(<LoginForm {...newProps} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      state: { ...props.state, submitError: 'Username/Password do not match' }
    };

    const shallowComponent = shallow(<LoginForm {...newProps} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('NormalAlert')).toBeTruthy();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });
});
