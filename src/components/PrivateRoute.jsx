import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  
  return (
    <Route {...rest} render={props => (
      loggedIn ?
        <Component {...props} />
        :
        <Redirect to="/signin" />
      )} 
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loggedIn: state.auth.token !== null && state.auth.token.trim() ? true : false
})

export default connect(mapStateToProps, {})(PrivateRoute);