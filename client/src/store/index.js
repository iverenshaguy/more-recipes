import { applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export const reducers = {};

const enhancers = [];
const middlewares = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);

  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

const configureStore = () => {
  return (
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    composedEnhancers
  );
};

export default configureStore;
