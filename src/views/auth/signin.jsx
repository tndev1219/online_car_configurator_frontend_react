import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { Helmet } from "react-helmet";

// UI components
import SignIn from '../../components/UI/Forms/SignIn';

class SignInPage extends Component {

  render() {
    return (
      this.props.loggedIn ?
        <Redirect to="/" />
        :
        <div className="iron-sign-in-page-wrap">
          <Helmet>
            <title>Car | Sign in</title>
          </Helmet>
          <div className="inner-container bg-base">
            <div className="container">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={10} lg={9} className="mx-auto">
                  <Grid container spacing={0} className="d-flex justify-content-center align-items-center">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className="sign-in-image">
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className="iron-forgot-pwd-form form-margin iron-shadow bg-base p-sm-25 py-20 px-15 rounded">
                        <SignIn ></SignIn>
                      </div>
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
  loggedIn: state.auth.token && state.auth.token.trim() ? true : false
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);