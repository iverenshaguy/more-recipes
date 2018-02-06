import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SignupForm from '../../../../components//shared/Forms/SignupForm';

const dispatchMock = jest.fn();

const setup = () => {
  const props = {
    state: {
      values: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        aboutMe: '',
        occupation: ''
      },
      touched: {
        firstname: false,
        lastname: false,
        username: false,
        email: false,
        password: false,
        passwordConfirm: false,
        aboutMe: false,
        occupation: false
      },
      error: {
        firstname: null,
        lastname: null,
        username: null,
        email: null,
        password: null,
        passwordConfirm: null,
        aboutMe: null,
        occupation: null
      },
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
      <SignupForm {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

describe('SignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { props } = setup();
    const shallowComponent = shallow(<SignupForm {...props} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });

  it('disables submit button when form is clean', () => {
    const { props } = setup();
    const shallowComponent = shallow(<SignupForm {...props} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      state: { ...props.state, submitting: true }
    };
    const shallowComponent = shallow(<SignupForm {...newProps} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when form is invalid', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      state: { ...props.state, formValid: false }
    };
    const shallowComponent = shallow(<SignupForm {...newProps} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      state: { ...props.state, submitError: 'Error submitting form' }
    };

    const shallowComponent = shallow(<SignupForm {...newProps} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('NormalAlert')).toBeTruthy();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });
});
