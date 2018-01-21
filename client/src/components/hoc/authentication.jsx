import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PreLoader from '../shared/PreLoader';

const requireAuthentication = (MyComponent) => {
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
      authLoading: PropTypes.bool.isRequired
    };

    /**
     * @return {Component} - MyComponent
     */
    render() {
      if (this.props.authLoading) {
        return <PreLoader />;
      }

      if (this.props.isAuthenticated) {
        return <MyComponent {...this.props} />;
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authLoading: state.auth.loading
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default requireAuthentication;
