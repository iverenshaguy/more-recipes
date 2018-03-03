import { FormComponent } from '../../../../components/shared/Forms';
import { mainFormSetup } from '../../../setup/formSetup';

const state = {
  type: 'review',
  values: {
    rating: '',
    comment: ''
  },
  touched: { rating: false, comment: false },
  error: { rating: null, comment: null },
  pristine: true,
  formValid: false,
  asyncValidating: false
};

const meta = {
  title: 'Review this Recipe',
  btnText: 'Add Your Review'
};

describe('ReviewForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls handleRatingChange when rating start is clicked', () => {
    const { mountRoot } = mainFormSetup('review', meta);
    const wrapper = mountRoot.find(FormComponent);

    const changeState = {
      ...state,
      values: { ...state.values, rating: 3.5 },
      touched: { ...state.touched, rating: true },
      pristine: false
    };

    wrapper.find('span[data-index=3]').simulate('click');
    expect(wrapper.instance().state).toEqual(changeState);
  });

  it('dispatches recipeReview submit handler', () => {
    const { mountRoot, dispatchMock } = mainFormSetup('review', meta);
    const wrapper = mountRoot.find(FormComponent);
    const event = { target: { name: 'comment', value: 'Nice' } };

    wrapper.find('span[data-index=3]').simulate('click');
    wrapper.find('textarea[name="comment"]').simulate('change', event);
    wrapper.find('form').simulate('submit', { preventDefault() { } });

    expect(dispatchMock).toHaveBeenCalled();
  });
});
