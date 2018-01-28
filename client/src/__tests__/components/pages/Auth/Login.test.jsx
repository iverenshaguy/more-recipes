import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import Auth from '../../../../components/pages/Auth';
import Home from '../../../../components/pages/Home';
import App from '../../../../components/App';
import { LoginComponent } from '../../../../components/pages/Auth/LoginForm';
import setCurrentLocation from '../../../../actions/location';
import { clearAuthError } from '../../../../actions/auth';

const mock = new MockAdapter(axios, { delayResponse: 300 });
const url = '/api/v1';

const initialValues = {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false
  },
  location: {
    current: 'auth'
  },
  components: {
    modals: {
      isOpen: false,
      type: null
    }
  }
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const authStore = mockStore(initialValues);

const dispatchMock = jest.fn();
const loadUserFromTokenMock = jest.fn();

const state = {
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
    authenticating: false,
    submitError: null
  };

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <LoginComponent {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

describe('Login', () => {
  afterAll(() => {
    jest.clearAllMocks();
    mock.reset();
    mock.restore();
  });

  it('renders correctly', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginComponent {...props} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0]).toEqual([setCurrentLocation('auth')]);
    expect(dispatchMock.mock.calls[1]).toEqual([clearAuthError()]);
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginComponent
      {...props}
      submitError="Username/Password do not match"
      dispatch={dispatchMock}
    />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('NormalAlert')).toBeTruthy();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when form is clean', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginComponent {...props} dispatch={dispatchMock} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props } = setup();
    const shallowComponent = shallow(<LoginComponent
      {...props}
      authenticating
      dispatch={dispatchMock}
    />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('redirects to another location when authenticated', () => {
    const wrapper = mount( //eslint-disable-line
      <MemoryRouter
        initialEntries={['/login']}
      >
        <Provider store={authStore}>
          <App loadUserFromToken={loadUserFromTokenMock} />
        </Provider>
      </MemoryRouter>);

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Auth)).toHaveLength(0);

    wrapper.unmount();
  });

  describe('test for right input', () => {
    it('calls handleChange and handleBlur on input change and blur for email field', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(LoginComponent);

      mock.onPost(`${url}/users/signin`, { email: 'iverenshaguy@gmail.com' }).reply(422, {
        errors: {
          password: { msg: 'Password must be specified' }
        }
      });

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
      }, 500);
    });

    it('doesn\'t async validate password field', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(LoginComponent);

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
      const wrapper = mountRoot.find(LoginComponent);

      mock.onPost(`${url}/users/signin`, { email: 'iverenshaguy@gmail.com' }).reply(422, {
        errors: {
          password: { msg: 'Password must be specified' }
        }
      });

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
      const mountedAuthWrapper = mountRoot.find(LoginComponent);

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

      mountedAuthWrapper.find('input[name="email"]').simulate('focus');
      mountedAuthWrapper.find('input[name="email"]').simulate('change', emailEvent);
      mountedAuthWrapper.find('input[name="password"]').simulate('focus');
      mountedAuthWrapper.find('input[name="password"]').simulate('change', passwordEvent);

      expect(mountedAuthWrapper.instance().state).toEqual(newState);

      mountedAuthWrapper.find('form').simulate('submit', { preventDefault() { } });
      expect(dispatchMock).toHaveBeenCalled();

      mountRoot.unmount();
    });
  });

  describe('test for wrong input', () => {
    it('async validates field and form on input change and blur', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(LoginComponent);

      mock.onPost(`${url}/users/signin`, { email: 'emilysanders@gmail.com' }).reply(422, {
        errors: {
          email: { msg: 'This email is not registered, please signup instead' },
          password: { msg: 'Password must be specified' }
        }
      });

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
      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(blurState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 2000);
    });

    it('sync validates field and form on input change and blur', () => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(LoginComponent);

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
