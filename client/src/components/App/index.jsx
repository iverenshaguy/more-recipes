import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { history } from '../../reducers';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import StickyBar from '../shared/StickyBar';
import Modal from '../shared/Modals';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Profile from '../pages/Profile';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Error from '../shared/Error';
import SingleRecipe from '../pages/SingleRecipe';
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
          <Route path="/:username/favorites" component={requireAuthentication(FavoriteRecipes)} />
          <Route path="/:username" component={requireAuthentication(Profile)} />
          <Route exact path="/recipes/:id" component={requireAuthentication(SingleRecipe)} />
          {/* <Route exact path="/recipes" component={requireAuthentication(AllRecipes)} /> */}
          <Route path="/login" render={props => <Auth {...props} type="login" />} />
          <Route path="/signup" render={props => <Auth {...props} type="signup" />} />
          <Route path="/page-not-found" render={() => <Error type={404} />} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
      <Footer />
      <StickyBar />
      <Modal />
    </div>
  </ConnectedRouter>
);

export default App;
