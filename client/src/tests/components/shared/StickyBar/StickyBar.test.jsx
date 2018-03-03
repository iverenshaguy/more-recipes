import React from 'react';
import { StickyBarComponent } from '../../../../components/shared/StickyBar';
import { toggleModal } from '../../../../actions/ui';

const dispatchMock = jest.fn();
const setup = (location) => {
  const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation={location} />);
  return { wrapper };
};

describe('StickyBarComponent', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { wrapper } = setup('view-recipe');

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();
    expect(wrapper.find('.fa-heart')).toBeTruthy();
    wrapper.unmount();
  });

  it("renders no sticky bar when current location is '/login'", () => {
    const { wrapper } = setup('/login');

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders no sticky bar when current location is '/signup'", () => {
    const { wrapper } = setup('/signup');

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls modal when add recipe button is clicked', () => {
    const { wrapper } = setup('view-recipe');

    wrapper.find('i.fa-plus').simulate('click');
    expect(dispatchMock).toHaveBeenCalledWith(toggleModal('addRecipe'));
    wrapper.unmount();
  });

  it('calls handleHomeIconClick() when home icon is clicked', () => {
    const handleHomeIconClickSpy = jest.spyOn(StickyBarComponent.prototype, 'handleHomeIconClick');
    const { wrapper } = setup('view-recipe');

    wrapper.find('i.fa-home').simulate('click');
    expect(handleHomeIconClickSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('calls handleSearchIconClick() when search icon is clicked', () => {
    const handleSearchIconClickSpy = jest.spyOn(StickyBarComponent.prototype, 'handleSearchIconClick');
    const { wrapper } = setup('view-recipe');

    wrapper.find('i.fa-search').simulate('click');
    expect(handleSearchIconClickSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('calls handleFavoritesIconClick() when favorites icon is clicked', () => {
    const handleFavoritesIconClickSpy = jest.spyOn(StickyBarComponent.prototype, 'handleFavoritesIconClick');
    const { wrapper } = setup('view-recipe');

    wrapper.find('i.fa-heart').simulate('click');
    expect(handleFavoritesIconClickSpy).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('calls handleUserIconClick() when user icon is clicked', () => {
    const handleUserIconClickSpy = jest.spyOn(StickyBarComponent.prototype, 'handleUserIconClick');
    const { wrapper } = setup('view-recipe');

    wrapper.find('i.fa-user').simulate('click');
    expect(handleUserIconClickSpy).toHaveBeenCalled();
    wrapper.unmount();
  });
});
