import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line
ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
