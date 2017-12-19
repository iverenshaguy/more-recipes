import React from 'react';
import Modals, { AddRecipeModal } from '../index';

describe('Modals', () => {
  let isOpen = false;
  const toggleMock = () => {
    isOpen = !isOpen;
  };

  it("renders correctly when neither 'addRecipeModal' nor 'socialModal' props is passed", () => {
    const wrapper = shallow(<Modals toggle={toggleMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toBe('');
  });

  it("renders correctly when 'addRecipeModal' props is passed", () => {
    const wrapper = shallow(<Modals addRecipeModal toggle={toggleMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AddRecipeModal')).toBeTruthy();
  });

  it("renders correctly when 'socialModal' props is passed", () => {
    const wrapper = shallow(<Modals socialModal toggle={toggleMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('SocialModal')).toBeTruthy();
  });

  it('should toggle modal', () => {
    const component = (
      <AddRecipeModal isOpen={isOpen} toggle={toggleMock}>
        {' '}
        My Modal
      </AddRecipeModal>
    );
    const wrapper = mount(component); // eslint-disable-next-line

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(false);

    toggleMock();
    wrapper.setProps({
      isOpen,
    });

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(isOpen).toBe(true);
    wrapper.unmount();
  });
});
