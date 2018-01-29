import { SET_CURRENT_LOCATION } from './actionTypes';

const setCurrentLocation = location => ({
  type: SET_CURRENT_LOCATION,
  payload: location
});

export default setCurrentLocation;
