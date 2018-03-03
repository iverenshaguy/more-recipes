import React from 'react';
import { AddReviewComponent as AddReview } from '../../../../components/shared/Reviews/AddReview';

const setup = () => {
  const props = {
    id: 2,
    submitting: false,
    submitError: null,
    showReviewForm: true
  };

  const shallowWrapper = shallow(<AddReview {...props} />);

  return { props, shallowWrapper };
};

describe('AddReview', () => {
  it('renders correctly', () => {
    const { shallowWrapper } = setup();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('.d-none').length).toBeFalsy();
  });

  it('renders correctly when showReviewForm is false', () => {
    const { props } = setup();
    const shallowWrapper = shallow(<AddReview {...props} showReviewForm={false} />);
    expect(shallowWrapper.find('.d-none').length).toBeTruthy();
  });
});
