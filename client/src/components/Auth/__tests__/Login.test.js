import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../index';
import Home from '../../Home';
import App from '../../App';
import { LoginComponent } from '../LoginForm';
import { locationActions } from '../../../store/location';
import { authOperations } from '../../../store/auth';
import userApi from '../../../services/api/users';
import rootReducer, { composedEnhancers } from '../../../store';
import { login as loginMock } from '../../../__mocks__/api/users.mock';

userApi.login = jest.fn(loginMock); // eslint-disable-line

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

const { setAuthLocation } = locationActions;
const { clearAuthError } = authOperations;

const authStore = createStore(rootReducer, initialValues, composedEnhancers);

const dispatchMock = jest.fn();
const loadUserFromTokenMock = jest.fn();

const props = {
  authenticating: false,
  submitError: null
};

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

describe('Login', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const shallowComponent = shallow(<LoginComponent {...props} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0]).toEqual([setAuthLocation()]);
    expect(dispatchMock.mock.calls[1]).toEqual([clearAuthError()]);
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
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
    const shallowComponent = shallow(<LoginComponent {...props} dispatch={dispatchMock} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
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
  });

  describe('test for right input', () => {
    it('calls handleChange and handleBlur on input change and blur for email field', (done) => {
      const mountRoot = mount( //eslint-disable-line
        <MemoryRouter>
          <LoginComponent {...props} dispatch={dispatchMock} />
        </MemoryRouter>
      ); //eslint-disable-line
      const wrapper = mountRoot.find(LoginComponent);

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
      const mountRoot = mount( //eslint-disable-line
        <MemoryRouter>
          <LoginComponent {...props} dispatch={dispatchMock} />
        </MemoryRouter>
      ); //eslint-disable-line
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

    it('stores token to local storage for right username and password', () => {
      const mountRoot = mount( //eslint-disable-line
        <MemoryRouter>
          <LoginComponent {...props} dispatch={dispatchMock} />
        </MemoryRouter>
      ); //eslint-disable-line

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
    });
  });

  describe('test for wrong input', () => {
    it('async validates field and form on input change and blur', (done) => {
      const mountRoot = mount( //eslint-disable-line
        <MemoryRouter>
          <LoginComponent {...props} dispatch={dispatchMock} />
        </MemoryRouter>
      ); //eslint-disable-line
      const wrapper = mountRoot.find(LoginComponent);

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
      const mountRoot = mount( //eslint-disable-line
        <MemoryRouter>
          <LoginComponent {...props} dispatch={dispatchMock} />
        </MemoryRouter>
      ); //eslint-disable-line
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
    });
  });
});
