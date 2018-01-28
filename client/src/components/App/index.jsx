import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'loaders.css/src/animations/ball-scale-multiple.scss';
import { history } from '../../reducers';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import StickyBar from '../shared/StickyBar';
import Modal from '../shared/Modals';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import { requireAuthentication } from '../hoc';
import '../../assets/font-awesome/css/font-awesome.css';
import '../../assets/kitchen-font/flaticon.css';
import './App.scss';

/**
 * Represents the App Component
 * @returns {component} App
 */
const App = () => (
  <ConnectedRouter history={history}>
    <div className="app">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={requireAuthentication(Home)} />
          <Route path="/login" render={props => <Auth {...props} type="login" />} />
          <Route path="/signup" render={props => <Auth {...props} type="signup" />} />
        </Switch>
      </div>
      <Footer />
      <StickyBar />
      <Modal />
    </div>
  </ConnectedRouter>
);

export default App;
