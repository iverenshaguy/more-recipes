import React from 'react';
import RecipeDetailsItem from '../../../../components/shared/RecipeDetailsSection/RecipeDetailsItem';

const section = {
  items: ['good', 'nice'],
  title: 'Cooking Directions',
  id: 'cooking-directions',
  info: <p>I love to eat</p>
};

describe('RecipeDetailsSection', () => {
  it('renders correctly', () => {
    const wrapper = mount(<RecipeDetailsItem section={section} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders message when item is empty', () => {
    const wrapper = mount(<RecipeDetailsItem section={{ ...section, items: [] }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.mb-3').text()).toEqual('There are no cooking directions.');
    wrapper.unmount();
  });
});
