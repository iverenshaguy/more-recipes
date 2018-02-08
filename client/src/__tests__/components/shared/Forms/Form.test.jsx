import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import moxios from 'moxios';
import { FormComponent } from '../../../../components/shared/Forms';
import { clearAuthError } from '../../../../actions/auth';

const dispatchMock = jest.fn();

const state = {
  type: 'login',
  values: {
    email: '',
    password: ''
  },
  touched: { email: false, password: false },
  error: { email: null, password: null },
  pristine: true,
  formValid: false,
  asyncValidating: false
};

const setup = () => {
  const props = {
    submitting: false,
    submitError: null,
    type: 'login',
    meta: {
      title: 'Sign In to Your Account',
      btnText: 'SIGN IN',
      extra: <p>something</p>
    }
  };

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <FormComponent {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

const signupMeta = {
  title: 'Register for a New Account',
  btnText: 'SIGN UP',
  extra: <p>something</p>
};

const url = '/api/v1';

describe('Form', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { props } = setup();
    const shallowComponent = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0]).toEqual([clearAuthError()]);
  });

  it('renders signup form when signup is passed', () => {
    const { props } = setup();
    const shallowComponent = shallow(<FormComponent
      {...props}
      type="signup"
      meta={signupMeta}
      dispatch={dispatchMock}
    />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });


  it('disables submit button when form is clean', () => {
    const { props } = setup();
    const shallowComponent = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      submitting: true
    };
    const shallowComponent = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props } = setup();
    const newProps = {
      ...props,
      submitError: 'Username/Password do not match'
    };

    const shallowComponent = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('NormalAlert')).toBeTruthy();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });


  describe('test for right input', () => {
    it('calls handleChange and handleBlur on input change and blur for email field', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'iverenshaguy@gmail.com' },
        touched: { ...state.touched, email: true },
        error: { email: null, password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: true
      };

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find('input[name="email"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);

      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(blurState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 600);
    });

    it('doesn\'t async validate password field', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);


      const changeState = {
        ...state,
        values: { ...state.values, password: 'iverenshaguy' },
        touched: { ...state.touched, password: true },
        error: { email: null, password: null },
        pristine: false
      };

      const event = { target: { name: 'password', value: 'iverenshaguy' } };

      wrapper.find('input[name="password"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="password"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="password"]').simulate('blur', event);

      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(changeState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 500);
    });

    it('sets asyncValidating to false if asyncValidate test passes', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);


      moxios.stubRequest(`${url}/users/signin`, {
        status: 422,
        response: {
          errors: {
            password: { msg: 'Password must be specified' }
          }
        },
      }, 5);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'iverenshaguy@gmail.com' },
        touched: { ...state.touched, email: true },
        error: { email: null, password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false
      };

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find('input[name="email"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);

      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(blurState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 2000);
    });

    it('submits valid form', () => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);

      const newState = {
        ...state,
        values: { email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' },
        touched: { email: true, password: true },
        error: { email: null, password: null },
        pristine: false,
        formValid: true
      };

      const emailEvent = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };
      const passwordEvent = { target: { name: 'password', value: 'iverenshaguy' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('change', emailEvent);
      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('change', passwordEvent);

      expect(wrapper.instance().state).toEqual(newState);

      wrapper.find('form').simulate('submit', { preventDefault() { } });
      expect(dispatchMock).toHaveBeenCalled();

      mountRoot.unmount();
    });
  });

  describe('test for wrong input', () => {
    it('async validates field and form on input change and blur', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);


      const changeState = {
        ...state,
        values: { ...state.values, email: 'emilysanders@gmail.com' },
        touched: { ...state.touched, email: true },
        error: { email: null, password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false,
        error: { email: 'This email is not registered, please signup instead', password: null },
      };

      const event = { target: { name: 'email', value: 'emilysanders@gmail.com' } };

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);

      moxios.stubRequest(`${url}/users/signin`, {
        status: 422,
        response: {
          errors: {
            email: { msg: 'This email is not registered, please signup instead' },
            password: { msg: 'Password must be specified' }
          }
        },
      }, 5);

      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(blurState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 800);
    });

    it('sync validates field and form on input change and blur', () => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(FormComponent);


      const changeState = {
        ...state,
        values: { ...state.values, email: 'emilysanders' },
        touched: { ...state.touched, email: true },
        error: { email: 'Invalid email address!', password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false
      };

      const event = { target: { name: 'email', value: 'emilysanders' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState, error: { email: 'Required!', password: null }, pristine: true, values: { ...state.values }
      }));

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);
      expect(wrapper.instance().state).toEqual(blurState);

      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState,
        error: { ...changeState.error, password: 'Required!' },
        touched: { email: true, password: true },
        values: { email: 'emilysanders', password: '' }
      }));

      mountRoot.unmount();
    });
  });
});
