import React from 'react';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Hero from '../../../../components/pages/Home/Hero';
import initialValues from '../../../setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const authStore = mockStore(initialValues);

const setup = () => {
  const dispatch = jest.fn();

  const props = {
    handleSearchInput: jest.fn(),
    handleAddRecipe: jest.fn(),
    handleSearch: jest.fn(),
    searchValue: '',
    dispatch,
  };

  const shallowWrapper = shallow(<Hero {...props} />);
  const mountedWrapper = mount(<Hero {...props} />);

  return {
    shallowWrapper,
    mountedWrapper,
    dispatch,
    props,
  };
};

describe('Home: Hero', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('redirects to new recipe page add recipe button click', () => {
    const { props } = setup();
    const mountedWrapper = mount( //eslint-disable-line
      <MemoryRouter
        initialEntries={['/']}
      >
        <Hero {...props} store={authStore} />
      </MemoryRouter>);

    mountedWrapper.find('Button#home-add-recipe-btn').simulate('click');

    expect(props.handleAddRecipe).toHaveBeenCalledTimes(1);

    mountedWrapper.unmount();
  });
});
