export default {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false
  },
  router: {
    location: {
      pathname: '/home'
    }
  },
  ui: {
    modals: {
      isOpen: false,
      type: null
    },
    reviewForm: {
      isOpen: false,
    }
  },
  isFetching: false,
  recipes: {
    items: [],
    errorMessage: '',
    metadata: {}
  },
  singleRecipe: {
    recipe: {
      item: {
        recipeItem: {
          id: 1
        }
      },
      error: null,
      favoriting: false,
      voting: false
    },
    recipeReviews: {
      reviews: [],
      metadata: {},
      addReviewSuccess: false,
      error: null,
      reviewing: false
    },
    // uploadImage: {
    //   uploading: false,
    //   success: false
    // }
  },
};
