import React from 'react';
import RecipeItems from '../../../../components/shared/RecipeItems';

const props = {
  title: 'TOP RECIPES',
  recipes: [
    {
      id: 8,
      recipeName: 'Chicken Pie',
      recipeImage: 'sjkks',
      totalTime: '1hr 30 minutes',
      difficulty: 'Easy',
      upvotes: 150,
      views: 290,
      rating: '4.760'
    },
    {
      id: 3,
      recipeName: 'Jollof Rice',
      recipeImage: 'jsksk',
      totalTime: '30 Minutes',
      difficulty: 'Normal',
      upvotes: 10,
      views: 100,
      rating: '3.3600'
    }
  ],
  metadata: {
    firstPage: 1,
    lastPage: 1,
    page: 1,
    itemsPerPage: 2,
    pages: [1],
    totalCount: 2,
  },
  handlePageChange: jest.fn()
};

const emptyProps = {
  title: 'SEARCH RESULTS',
  recipes: [],
  metadata: {},
  handlePageChange: jest.fn()
};

describe('RecipeItems', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RecipeItems {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when title is SEARCH RESULTS', () => {
    const wrapper = shallow(<RecipeItems {...props} title="SEARCH RESULTS" />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders correctly when no recipes are passed', () => {
    const wrapper = shallow(<RecipeItems {...emptyProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
