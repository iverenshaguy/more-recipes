import React from 'react';
import { RenderIcon, RenderVoteIcon } from '../../../../components/shared/Icons';

describe('Icons', () => {
  describe('RenderIcon', () => {
    const props = {
      recipe: {
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
      },
      type: 'review',
      reviewed: false,
      handleClick: jest.fn()
    };

    it('renders correctly', () => {
      const shallowWrapper = shallow(<RenderIcon {...props} />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    });

    it('renders closed star when reviewed', () => {
      const mountedWrapper = mount(<RenderIcon
        {...props}
        icon="star"
        recipe={{ ...props.recipe, isReviewed: true }}
      />);

      expect(mountedWrapper.find('i.fa-star').length).toBeTruthy();
    });

    it('calls handleClick', () => {
      const mountedWrapper = mount(<RenderIcon {...props} icon="star" />);
      mountedWrapper.find('i.fa-star-o').simulate('click');

      expect(props.handleClick).toHaveBeenCalled();
      mountedWrapper.unmount();
    });

    it('renders correctly review icon when reviewed', () => {
      const shallowWrapper = shallow(<RenderIcon {...props} reviewed />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('FontAwesome[name="star"]').length).toBeTruthy();
    });
  });

  describe('RenderVoteIcon', () => {
    const props = {
      recipe: {
        id: 2,
        recipeName: 'Recipe',
        userId: 1,
        isReviewed: false,
        vote: null,
        ingredients: ['rice', 'beans'],
        preparations: ['wash', 'cook'],
        directions: ['wash', 'cook'],
        User: {
          id: 1,
          username: 'name'
        }
      },
      type: 'up',
      boolCheck: false,
      handleClick: jest.fn()
    };

    it('renders correctly', () => {
      const shallowWrapper = shallow(<RenderVoteIcon {...props} />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    });

    it('renders closed thumbs-up when upvoted', () => {
      const mountedWrapper = mount(<RenderVoteIcon
        {...props}
        recipe={{ ...props.recipe, vote: true }}
        boolCheck
      />);

      expect(mountedWrapper.find('i.fa-thumbs-up').length).toBeTruthy();
    });

    it('calls handleClick', () => {
      const mountedWrapper = mount(<RenderVoteIcon {...props} />);
      mountedWrapper.find('i.fa-thumbs-o-up').simulate('click');

      expect(props.handleClick).toHaveBeenCalled();
    });
  });
});
