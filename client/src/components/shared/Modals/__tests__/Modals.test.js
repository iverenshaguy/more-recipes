import React from 'react';
import Modals, { AddRecipeModal, SocialModal } from '../index';

describe('Modals', () => {
  let isOpen = false;
  const toggleMock = () => {
    isOpen = !isOpen;
    return dispatchMock(toggleModal());
  };
  const dispatchMock = jest.fn();
  toggle = {() => dispatch(toggleModal())

  it("renders correctly when neither 'addRecipeModal' nor 'socialModal' props is passed", () => {
    const wrapper = shallow(<Modals isOpen={isOpen} dispatch={dispatchMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders correctly when 'addRecipeModal' props is passed", () => {
    const wrapper = shallow(<Modals addRecipeModal isOpen dispatch={dispatchMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AddRecipeModal')).toBeTruthy();
  });

  it("renders correctly when 'socialModal' props is passed", () => {
    const wrapper = shallow(<Modals socialModal isOpen dispatch={dispatchMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('SocialModal')).toBeTruthy();
  });

  it('AddRecipeModal: should toggle modal', () => {
    const component = (
      <AddRecipeModal isOpen toggle={toggleMock}>
        {' '}
        My Modal
      </AddRecipeModal>
    );
    const wrapper = mount(component); // eslint-disable-next-line

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(true);

    toggleMock();
    wrapper.setProps({
      isOpen,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(false);
    wrapper.unmount();
  });

  it('SocialModal: should toggle modal', () => {
    const component = (
      <SocialModal isOpen toggle={toggleMock}>
        {' '}
        My Modal
      </SocialModal>
    );
    const wrapper = mount(component); // eslint-disable-next-line

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(true);

    toggleMock();
    wrapper.setProps({
      isOpen,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(false);
    wrapper.unmount();
  });
});
