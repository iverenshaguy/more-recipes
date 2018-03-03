import { isReviewed } from '../../../selectors/recipeReviews';

const reviews = [
  {
    id: 1,
    rating: 3,
    comment: '',
    User: {
      id: 2,
      username: 'usera'
    }
  },
  {
    id: 2,
    rating: 5,
    comment: 'Nice Recipe',
    User: {
      id: 3,
      username: 'userb'
    }
  }
];

describe('Selectors: isReviewed', () => {
  test('returns true when reviewed', () => {
    const check = isReviewed(reviews, 2);

    expect(check).toBeTruthy();
  });

  test('returns false when not reviewed', () => {
    const check = isReviewed(reviews, 5);

    expect(check).toBeFalsy();
  });
});
