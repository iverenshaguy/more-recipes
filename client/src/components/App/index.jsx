import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
// import { history } from '../store';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import StickyBar from '../shared/StickyBar';
import Modal from '../shared/Modals';
import Home from '../Home';
import Auth from '../Auth';
import { requireAuthentication } from '../hoc';
import '../../assets/font-awesome/css/font-awesome.css';
import '../../assets/kitchen-font/flaticon.css';
import './App.scss';

/**
 * Represents the App Component
 * @returns {component} App
 */
const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default App;
