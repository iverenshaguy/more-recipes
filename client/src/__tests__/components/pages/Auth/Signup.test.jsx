import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import Auth from '../../../../components/pages/Auth';
import Home from '../../../../components/pages/Home';
import App from '../../../../components/App';
import { SignupComponent } from '../../../../components/pages/Auth/SignupForm';
import setCurrentLocation from '../../../../actions/location';
import { clearAuthError } from '../../../../actions/auth';

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
  ui: {
    modals: {
      isOpen: false,
      type: null
    }
  },
  isFetching: false,
  recipes: {
    recipes: [],
    errorMessage: '',
    metaData: {}
  }
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const authStore = mockStore(initialValues);

const dispatchMock = jest.fn();

const state = {
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
  asyncValidating: false
};

const setup = () => {
  const props = {
    authenticating: false,
    submitError: null,
  };

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <SignupComponent {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  return { props, mountRoot };
};

describe('Signup', () => {
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
    const shallowComponent = shallow(<SignupComponent {...props} dispatch={dispatchMock} />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
    expect(dispatchMock).toHaveBeenCalled();
    expect(dispatchMock.mock.calls[0]).toEqual([setCurrentLocation('auth')]);
    expect(dispatchMock.mock.calls[1]).toEqual([clearAuthError()]);
  });

  it('redirects when authenticated', () => {
    const { props } = setup();
    const shallowComponent = shallow(<SignupComponent
      {...props}
      isAuthenticated
      dispatch={dispatchMock}
    />);

    expect(toJson(shallowComponent)).toMatchSnapshot();
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props } = setup();
    const shallowComponent = shallow(<SignupComponent
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
    const shallowComponent = shallow(<SignupComponent {...props} dispatch={dispatchMock} />);

    expect(shallowComponent.find('Button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props } = setup();
    const shallowComponent = shallow(<SignupComponent
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
        initialEntries={['/signup']}
      >
        <Provider store={authStore}>
          <App />
        </Provider>
      </MemoryRouter>);

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Auth)).toHaveLength(0);

    wrapper.unmount();
  });

  describe('test for right input', () => {
    it('calls handleChange and handleBlur on input change and blur', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'damishaguy@gmail.com' },
        touched: { ...state.touched, email: true },
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
        pristine: false,
      };

      const blurState = {
        ...changeState,
        asyncValidating: true
      };

      const event = { target: { name: 'email', value: 'damishaguy@gmail.com' } };

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
      }, 700);
    });

    it('doesn\'t async validate field that is not email or username', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      const changeState = {
        ...state,
        values: { ...state.values, firstname: 'Iveren' },
        touched: { ...state.touched, firstname: true },
        pristine: false
      };

      const event = { target: { name: 'firstname', value: 'Iveren' } };

      wrapper.find('input[name="firstname"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="firstname"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="firstname"]').simulate('blur', event);

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
      const wrapper = mountRoot.find(SignupComponent);

      moxios.stubRequest(`${url}/users/signup`, {
        status: 422,
        response: {
          errors: {
            firstname: { msg: 'Firstname is required' },
            username: { msg: 'Username is required' },
            password: { msg: 'Password is required' },
            passwordConfirm: { msg: 'Passwords do not match' },
          }
        },
      }, 5);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'damishaguy@gmail.com' },
        touched: { ...state.touched, email: true },
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
        pristine: false,
      };

      const event = { target: { name: 'email', value: 'damishaguy@gmail.com' } };

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);
      wrapper.find('input[name="firstname"]').simulate('focus');

      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(changeState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 2000);
    });

    it('submits valid form', () => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      const newState = {
        ...state,
        values: {
          firstname: 'Jane',
          lastname: 'Smithy',
          username: 'janesmithy',
          email: 'janesmithy@gmail.com',
          password: 'janesmithy',
          passwordConfirm: 'janesmithy',
          aboutMe: 'I love books.',
          occupation: 'Web Designer'
        },
        touched: {
          firstname: true,
          lastname: true,
          username: true,
          email: true,
          password: true,
          passwordConfirm: true,
          aboutMe: true,
          occupation: true
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
        pristine: false,
        formValid: true
      };

      moxios.stubRequest(`${url}/users/signup`, {
        status: 201,
        response: {
          user: {
            id: '1',
            firstname: 'Jane',
            lastname: 'Smith',
            username: 'janesmith',
            email: 'janesmith@gmail.com',
            aboutMe: 'Food lover',
            occupation: 'Chef',
            updatedAt: '2017-10-30T00:47:03.687Z',
            createdAt: '2017-10-30T00:47:03.687Z'
          },
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE'
        },
      }, 5);

      const firstnameEvent = { target: { name: 'firstname', value: 'Jane' } };
      const lastnameEvent = { target: { name: 'lastname', value: 'Smithy' } };
      const emailEvent = { target: { name: 'email', value: 'janesmithy@gmail.com' } };
      const usernameEvent = { target: { name: 'username', value: 'janesmithy' } };
      const passwordEvent = { target: { name: 'password', value: 'janesmithy' } };
      const passwordConfirmEvent = { target: { name: 'passwordConfirm', value: 'janesmithy' } };
      const aboutMeEvent = { target: { name: 'aboutMe', value: 'I love books.' } };
      const occupationEvent = { target: { name: 'occupation', value: 'Web Designer' } };

      wrapper.find('input[name="firstname"]').simulate('change', firstnameEvent);
      wrapper.find('input[name="lastname"]').simulate('change', lastnameEvent);
      wrapper.find('input[name="email"]').simulate('change', emailEvent);
      wrapper.find('input[name="username"]').simulate('change', usernameEvent);
      wrapper.find('input[name="password"]').simulate('change', passwordEvent);
      wrapper.find('input[name="passwordConfirm"]').simulate('change', passwordConfirmEvent);
      wrapper.find('textarea[name="aboutMe"]').simulate('change', aboutMeEvent);
      wrapper.find('input[name="occupation"]').simulate('change', occupationEvent);

      expect(wrapper.instance().state).toEqual(newState);

      wrapper.find('form').simulate('submit', { preventDefault() { } });
      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('test for wrong input', () => {
    it('async validates email field and form on input change and blur', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      moxios.stubRequest(`${url}/users/signup`, {
        status: 422,
        response: {
          errors: {
            email: { msg: 'This email is already registered' },
            firstname: { msg: 'Firstname is required' },
            username: { msg: 'Username is required' },
            password: { msg: 'Password is required' },
            passwordConfirm: { msg: 'Passwords do not match' },
          }
        },
      }, 5);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'iverenshaguy@gmail.com' },
        touched: { ...state.touched, email: true },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false,
        error: { ...state.error, email: 'This email is already registered', password: null },
      };

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

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

    it('async validates username field and form on input change and blur', (done) => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      moxios.stubRequest(`${url}/users/signup`, {
        status: 422,
        response: {
          errors: {
            username: { msg: 'This username is already registered' },
            firstname: { msg: 'Firstname is required' },
            email: { msg: 'Email is required' },
            password: { msg: 'Password is required' },
            passwordConfirm: { msg: 'Passwords do not match' },
          }
        },
      }, 5);

      const changeState = {
        ...state,
        values: { ...state.values, username: 'iverenshaguy' },
        touched: { ...state.touched, username: true },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false,
        error: { ...state.error, username: 'This username is already registered' },
      };

      const event = { target: { name: 'username', value: 'iverenshaguy' } };

      wrapper.find('input[name="username"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="username"]').simulate('blur', event);
      setTimeout(() => {
        try {
          expect(wrapper.instance().state).toEqual(blurState);
          done();
        } catch (e) {
          done.fail(e);
        }
      }, 600);
    });

    it('sync validates field and form on input change and blur', () => {
      const { mountRoot } = setup();
      const wrapper = mountRoot.find(SignupComponent);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'emilysanders' },
        touched: { ...state.touched, email: true },
        error: { ...state.error, email: 'Invalid email address!' },
        pristine: false
      };

      const event = { target: { name: 'email', value: 'emilysanders' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState, error: { ...state.error, email: 'Required!' }, pristine: true, values: { ...state.values }
      }));

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState,
        error: { ...changeState.error, password: 'Required!' },
        touched: { ...state.touched, email: true, password: true },
        values: { ...state.values, email: 'emilysanders', password: '' }
      }));

      mountRoot.unmount();
    });
  });
});
