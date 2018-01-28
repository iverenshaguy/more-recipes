import React from 'react';
import { StickyBarComponent } from '../../../../components/shared/StickyBar';

describe('StickyBarComponent', () => {
  const dispatchMock = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders oven icon when type 'user-profile' is passed", () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="user-profile" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.flaticon-oven-kitchen-tool-for-cooking-foods')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();
    expect(wrapper.find('.fa-heart')).toBeTruthy();

    wrapper.unmount();
  });

  it("renders no sticky bar when type 'login' is passed", () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="auth" />);

    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.instance()).toBeNull();

    wrapper.unmount();
  });

  it("renders no sticky bar when type 'signup' is passed", () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="auth" />);

    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.instance()).toBeNull();

    wrapper.unmount();
  });

  it("renders share icon when type 'home' is passed", () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="home" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.fa-share-alt')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();
    expect(wrapper.find('.fa-heart')).toBeTruthy();

    wrapper.unmount();
  });

  it("renders heart-o, thumbs-up-o, thumbs-down-o icons and does not render heart icon when type 'view-recipe' is passed", () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="view-recipe" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.fa-share-alt')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-heart-o')).toBeTruthy();
    expect(wrapper.find('.fa-thumbs-up-o')).toBeTruthy();
    expect(wrapper.find('.fa-thumbs-down-o')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();

    wrapper.unmount();
  });

  it('calls modal when share button is clicked', () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="view-recipe" />);

    wrapper.find('span#social-modal-icon').simulate('click');
    expect(dispatchMock).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('calls modal when add recipe button is clicked', () => {
    const wrapper = mount(<StickyBarComponent dispatch={dispatchMock} currentLocation="view-recipe" />);

    wrapper.find('span#add-edit-modal-icon').simulate('click');
    expect(dispatchMock).toHaveBeenCalled();

    wrapper.unmount();
  });
});
