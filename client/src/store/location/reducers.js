const initialState = {
  current: 'home'
};

export default (state = initialState, action) => {
  switch (action.payload) {
    case 'home':
      return Object.assign({}, state, { current: 'home' });
    case 'auth':
      return Object.assign({}, state, { current: 'auth' });
    default:
      return state;
  }
};
