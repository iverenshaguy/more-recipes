import { applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import createHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';

// export const history = createHistory();

const enhancers = [];
// const middlewares = [thunk, routerMiddleware(history)];
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);

  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

export const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);

export default rootReducer;
