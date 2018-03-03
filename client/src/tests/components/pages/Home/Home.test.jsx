import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HomeComponent } from '../../../../components/pages/Home';

const setup = () => {
  const dispatch = jest.fn();

  const props = {
    dispatch,
    isFetching: false,
    recipes: [{ id: 1, recipeName: 'Rice', User: 'Me' }, { id: 5, recipeName: 'Beans', User: 'She' }],
    metadata: {
      firstPage: 1,
      lastPage: 3,
      page: 2,
      itemsPerPage: 5,
      pages: [1, 2, 3],
      totalCount: 13,
    }
  };

  const state = {
    title: 'TOP RECIPES',
    currentPage: 2,
    limit: 5,
    searchValue: ''
  };

  const mountedWrapper = mount(<MemoryRouter><HomeComponent {...props} /></MemoryRouter>);
  const shallowWrapper = shallow(<MemoryRouter><HomeComponent {...props} /></MemoryRouter>);

  return {
    state, props, mountedWrapper, shallowWrapper
  };
};

describe('Home', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper.find(HomeComponent))).toMatchSnapshot();
  });

  it('renders correctly when fully mounted', () => {
    const { mountedWrapper } = setup();
    expect(toJson(mountedWrapper.find(HomeComponent))).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('renders preloader if fetching', () => {
    const { props } = setup();
    const mountedWrapper = mount(<HomeComponent {...props} isFetching />);

    expect(mountedWrapper.find('PreLoader').length).toEqual(1);
    mountedWrapper.unmount();
  });

  it('calls component will mount when mounted', () => {
    const { mountedWrapper, props } = setup();
    expect(props.dispatch).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('handles page change for TOP RECIPES', () => {
    const { mountedWrapper, state } = setup();

    const handlePageChangeSpy = jest.spyOn(mountedWrapper.find(HomeComponent).instance(), 'handlePageChange');

    mountedWrapper.setState(state);

    mountedWrapper.find('a.page-link').at(4).simulate('click');

    expect(handlePageChangeSpy).toHaveBeenCalled();
    expect(mountedWrapper.find(HomeComponent).instance().state.currentPage).toEqual(3);

    mountedWrapper.unmount();
  });

  it('handles page change for SEARCH RECIPES', () => {
    const { state, props } = setup();
    // rrcMock = global variable that mocks react-router context
    const mountedWrapper = mount(<HomeComponent {...props} />, rrcMock.get());

    mountedWrapper.setState({ ...state, title: 'SEARCH RESULTS', searchValue: 'rice' });
    mountedWrapper.find('a.page-link').at(3).simulate('click');

    expect(mountedWrapper.instance().state.currentPage).toEqual(2);
    mountedWrapper.unmount();
  });

  it('handles search input', () => {
    const { mountedWrapper, props, state } = setup();

    const event = { target: { value: 'Chicken' } };

    mountedWrapper.setState(state);
    mountedWrapper.find('input#search').simulate('change', event);

    expect(props.dispatch).toHaveBeenCalled();
    expect(mountedWrapper.find(HomeComponent).instance().state.searchValue).toEqual('Chicken');

    mountedWrapper.unmount();
  });

  it('handles search', () => {
    const { mountedWrapper, props, state } = setup();

    const event = { target: { value: 'Chicken' } };

    mountedWrapper.setState(state);
    mountedWrapper.find('input#search').simulate('change', event);
    mountedWrapper.find('form').simulate('submit', { preventDefault() { } });

    expect(props.dispatch).toHaveBeenCalled();
    expect(mountedWrapper.find(HomeComponent).instance().state.title).toEqual('SEARCH RESULTS');

    mountedWrapper.unmount();
  });
});
