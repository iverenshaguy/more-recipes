import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PreLoader from '../shared/PreLoader';

/**
 * @function AuthenticatedComponent
 * @return {Component} - MyComponent
 * @param {object} props
 */
const AuthenticatedComponent = (props) => {
  const {
    MyComponent,
    authLoading,
    isAuthenticated,
    location
  } = props;

  if (authLoading) {
    return <PreLoader />;
  }

  if (isAuthenticated) {
    return <MyComponent {...props} />;
  }

  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location }
      }}
    />
  );
};

AuthenticatedComponent.propTypes = {
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
