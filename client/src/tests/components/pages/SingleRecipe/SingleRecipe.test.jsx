import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Error from '../../../../components/shared/Error';
import initialValues from '../../../setup/initialValues';
import { toggleReviewForm } from '../../../../actions/ui';
import PreLoader from '../../../../components/shared/PreLoader';
import SingleRecipeItem from '../../../../components/shared/SingleRecipeItem';
import { SingleRecipeComponent } from '../../../../components/pages/SingleRecipe';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

const setup = () => {
  const props = {
    dispatch: jest.fn(),
    match: {
      url: '/',
      params: {
        id: 10
      }
    },
    isFetching: false,
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
    showReviewForm: false,
    reviewed: false
  };

  const shallowWrapper = shallow(<SingleRecipeComponent {...props} />);
  const mountedWrapper = mount(// eslint-disable-line
    <Provider store={store}>
      <SingleRecipeComponent {...props} />
    </Provider>);

  return { props, shallowWrapper, mountedWrapper };
};

describe('SingleRecipe', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    // Fix for component that returns React Fragment
    const fragment = shallowWrapper.instance().render();
    expect(shallow(<div>{fragment}</div>).getElement()).toMatchSnapshot();
  });

  it('renders Preloader when isFetching is true', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<SingleRecipeComponent {...props} isFetching />);

    expect(shallowWrapper.find(PreLoader).length).toBeTruthy();
    expect(shallowWrapper.find(Error).length).toBeFalsy();
    expect(shallowWrapper.find(SingleRecipeItem).length).toBeFalsy();
  });

  it('renders Error when isFetching is false and there is an error', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<SingleRecipeComponent
      {...props}
      isFetching={false}
      recipe={{}}
      error="An error occurred"
    />);

    expect(shallowWrapper.find(Error).length).toBeTruthy();
    expect(shallowWrapper.find(PreLoader).length).toBeFalsy();
    expect(shallowWrapper.find(SingleRecipeItem).length).toBeFalsy();
  });

  it('renders SingleRecipeItem when isFetching is false and there is a recipe', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<SingleRecipeComponent
      {...props}
      isFetching={false}
    />);

    expect(shallowWrapper.find(SingleRecipeItem).length).toBeTruthy();
    expect(shallowWrapper.find(Error).length).toBeFalsy();
    expect(shallowWrapper.find(PreLoader).length).toBeFalsy();
  });

  it('calls toggleReviewForm() when review icon is clicked', () => {
    const { mountedWrapper, props } = setup();

    mountedWrapper.find('i.fa-star-o').simulate('click');

    expect(props.dispatch).toHaveBeenCalledWith(toggleReviewForm());
  });

  it('calls addRecipeToFavorites() when favorite icon is clicked', () => {
    const { mountedWrapper, props } = setup();

    mountedWrapper.find('i.fa-heart-o').simulate('click');

    expect(props.dispatch).toHaveBeenCalled();
  });

  it('calls voteRecipe() when upvote icon is clicked', () => {
    const { mountedWrapper, props } = setup();

    mountedWrapper.find('i.fa-thumbs-up').simulate('click');

    expect(props.dispatch).toHaveBeenCalled();
  });

  it('calls voteRecipe() when downvote icon is clicked', () => {
    const { mountedWrapper, props } = setup();

    mountedWrapper.find('i.fa-thumbs-down').at(1).simulate('click');

    expect(props.dispatch).toHaveBeenCalled();
  });
});
