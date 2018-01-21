import React from 'react';
import StickyBar from '../index';

describe('StickyBar', () => {
  const dispatchMock = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders oven icon when type 'user-profile' is passed", () => {
    const wrapper = mount(<StickyBar dispatch={dispatchMock} currentLocation="user-profile" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.flaticon-oven-kitchen-tool-for-cooking-foods')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();
    expect(wrapper.find('.fa-heart')).toBeTruthy();

    wrapper.unmount();
  });

  it("renders no sticky bar when type 'login' is passed", () => {
    const wrapper = mount(<StickyBar dispatch={dispatchMock} currentLocation="auth" />);

    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.instance()).toBeNull();

    wrapper.unmount();
  });

  it("renders no sticky bar when type 'signup' is passed", () => {
    const wrapper = mount(<StickyBar dispatch={dispatchMock} currentLocation="auth" />);

    expect(toJson(wrapper)).toMatchSnapshot();

    expect(wrapper.instance()).toBeNull();

    wrapper.unmount();
  });

  it("renders share icon when type 'home' is passed", () => {
    const wrapper = mount(<StickyBar dispatch={dispatchMock} currentLocation="home" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.fa-share-alt')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();
    expect(wrapper.find('.fa-heart')).toBeTruthy();

    wrapper.unmount();
  });

  it("renders heart-o, thumbs-up-o, thumbs-down-o icons and does not render heart icon when type 'view-recipe' is passed", () => {
    const wrapper = mount(<StickyBar dispatch={dispatchMock} currentLocation="view-recipe" />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.fa-share-alt')).toBeTruthy();
    expect(wrapper.find('.fa-plus')).toBeTruthy();
    expect(wrapper.find('.fa-heart-o')).toBeTruthy();
    expect(wrapper.find('.fa-thumbs-up-o')).toBeTruthy();
    expect(wrapper.find('.fa-thumbs-down-o')).toBeTruthy();
    expect(wrapper.find('.fa-search')).toBeTruthy();

    wrapper.unmount();
  });
});
