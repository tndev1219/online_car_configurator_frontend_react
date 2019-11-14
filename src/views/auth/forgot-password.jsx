/**
 * forgot password Page 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

import { Helmet } from "react-helmet";

import ForgotPassword from '../../components/UI/Forms/ForgotPassword';

class ForgotPasswordPage extends Component {

  render() {
    return (
      this.props.loggedIn ?
        <Redirect to="/" />
        :
        <div className="iron-forgot-pwd-page">
          <Helmet>
            <title>Car | Forgot Password</title>
          </Helmet>
          <div className="inner-container section-pad bg-base">
            <div className="container">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={10} lg={9} className="mx-auto">
                  <Grid container spacing={0} className="d-flex justify-content-center align-items-center">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className="forgot-password-image">
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <ForgotPassword />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = ( state ) => ({
  loggedIn: state.auth.token !== null && state.auth.token.trim() ? true : false
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);