import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import SingleRecipeItem from '../../../../components/shared/SingleRecipeItem';
import AddReview from '../../../../components/shared/Reviews/AddReview';
import initialValues from '../../../setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);
// const voteRecipeMock = jest.fn();
// const toggleReviewFormMock = jest.fn();
// const addRecipeToFavoritesMock = jest.fn();

const setup = () => {
  const props = {
    dispatch: jest.fn(),
    recipe: {
      recipeItem: {
        id: 2,
        recipeName: 'Recipe',
        userId: 1,
        isReviewed: false,
        ingredients: ['rice', 'beans'],
        preparations: ['wash', 'cook'],
        directions: ['wash', 'cook'],
        User: {
          id: 1,
          username: 'name'
        }
      }
    },
    error: null,
    user: {
      id: 2,
      username: 'username'
    },
    reviewed: false,
    voteRecipe: jest.fn(),
    toggleReviewForm: jest.fn(),
    addRecipeToFavorites: jest.fn(),
  };

  const shallowWrapper = shallow(<SingleRecipeItem {...props} />);
  const mountedWrapper = mount(//eslint-disable-line
    <Provider store={store}>
      <SingleRecipeItem {...props} />
    </Provider>);

  return { props, shallowWrapper, mountedWrapper };
};

describe('SingleRecipeItem', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('disables recipe username and recipe actions if recipe belongs to user', () => {
    const { props } = setup();
    const user = {
      id: 1,
      username: 'username'
    };
    const shallowWrapper = shallow(<SingleRecipeItem {...props} user={user} />);

    expect(shallowWrapper.find('p.user-info').length).toBeFalsy();
    expect(shallowWrapper.find('div#call-to-action').length).toBeFalsy();
  });

  it('shows review form when recipe is not reviewed and show review form is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<SingleRecipeItem {...props} showReviewForm />);
    expect(shallowWrapper.find(AddReview).length).toBeTruthy();
  });

  it('calls toggleReviewForm() when review icon is clicked', () => {
    const { props, mountedWrapper } = setup();
    const wrapper = mountedWrapper.find(SingleRecipeItem);

    wrapper.find('i.fa-star-o').simulate('click');

    expect(props.toggleReviewForm).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('calls addRecipeToFavorites() when favorite icon is clicked', () => {
    const { props, mountedWrapper } = setup();
    const wrapper = mountedWrapper.find(SingleRecipeItem);

    wrapper.find('i.fa-heart-o').simulate('click');

    expect(props.addRecipeToFavorites).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('calls voteRecipe() when upvote icon is clicked', () => {
    const { props, mountedWrapper } = setup();
    const wrapper = mountedWrapper.find(SingleRecipeItem);

    wrapper.find('i.fa-thumbs-up').simulate('click');

    expect(props.voteRecipe).toHaveBeenCalled();
    mountedWrapper.unmount();
  });
});
