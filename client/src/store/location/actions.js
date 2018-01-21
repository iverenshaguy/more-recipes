import { HOME, AUTH } from './types';

const setHomeLocation = () => ({
  type: HOME
});

const setAuthLocation = () => ({
  type: AUTH
});

export default {
  setHomeLocation,
  setAuthLocation
};
