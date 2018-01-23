import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PreLoader from '../shared/PreLoader';

/**
 * @class AuthenticatedComponent
 * @return {Component} - MyComponent
 */
class AuthenticatedComponent extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.shape({
        from: PropTypes.shape({
          hash: PropTypes.string,
          key: PropTypes.string,
          pathname: PropTypes.string,
          search: PropTypes.string
        })
      })
    }).isRequired,
    authLoading: PropTypes.bool.isRequired,
    MyComponent: PropTypes.func.isRequired
  };

  /**
   * @return {Component} - MyComponent
   */
  render() {
    const {
      MyComponent,
      authLoading,
      isAuthenticated,
      location
    } = this.props;

    if (authLoading) {
      return <PreLoader />;
    }

    if (isAuthenticated) {
      return <MyComponent {...this.props} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    );
  }
}

const requireAuthentication = (MyComponent) => {
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading,
    MyComponent
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export { AuthenticatedComponent };

export default requireAuthentication;
