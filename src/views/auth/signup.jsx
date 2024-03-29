import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

import { Helmet } from "react-helmet";

// UI components
import SignUp from '../../components/UI/Forms/SignUp';

class SignUpPage extends Component {

  render() {
    return (
      this.props.loggedIn ?
        <Redirect to="/" />
        :
        <div className="iron-sign-up-page-wrap">
          <Helmet>
            <title>Car | Sign up</title>
          </Helmet>
          <div className="inner-container section-pad bg-base d-flex justify-content-center align-items-center">
            <div className="container">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={10} lg={9} className="mx-auto">
                  <Grid container spacing={0} className="d-flex justify-content-center align-items-center">
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <div className="register-image">
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <SignUp ></SignUp>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);