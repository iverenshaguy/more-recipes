import React from 'react';
import { ModalComponent } from '../../../../components/shared/Modals';

describe('ModalComponent', () => {
  const isOpen = false;
  const dispatchMock = jest.fn();

  it("renders correctly when neither 'addRecipeModal' nor 'socialModal' props is passed", () => {
    const wrapper = shallow(<ModalComponent isOpen={isOpen} dispatch={dispatchMock} />);
    expect(wrapper.find('modal').length).toBeFalsy();
  });

  it("renders correctly when 'addRecipeModal' props is passed", () => {
    const wrapper = mount(<ModalComponent type="addRecipe" isOpen dispatch={dispatchMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AddRecipeModal')).toBeTruthy();
    wrapper.unmount();
  });

  it("renders correctly when 'socialModal' props is passed", () => {
    const wrapper = mount(<ModalComponent type="social" isOpen dispatch={dispatchMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('SocialModal')).toBeTruthy();
    wrapper.unmount();
  });

  it('toggles modal when toggled', () => {
    const wrapper = mount(<ModalComponent type="social" isOpen dispatch={dispatchMock} />);

    wrapper.find('SocialModal').prop('toggle')();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('toggles modal when close button is clicked', () => {
    const wrapper = mount(<ModalComponent type="addRecipe" isOpen dispatch={dispatchMock} />);

    wrapper.find('AddRecipeModal').prop('toggle')();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
