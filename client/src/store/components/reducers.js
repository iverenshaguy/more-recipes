const initialState = {
  modals: {
    social: false,
    addRecipe: false
  }
};

export default (state = initialState, action) => {
  switch (action.payload) {
    case 'social':
      return Object.assign({}, state, {
        modals: {
          social: true,
          addRecipe: false
        }
      });
    case 'addRecipe':
      return Object.assign({}, state, {
        modals: {
          social: false,
          addRecipe: true
        }
      });
    case '':
      return Object.assign({}, state, {
        modals: {
          social: false,
          addRecipe: false
        }
      });
    default:
      return state;
  }
};
