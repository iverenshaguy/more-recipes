// initial app state

const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('token')
};

export default initialState;
