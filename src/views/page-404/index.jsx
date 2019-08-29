/**
 * 404 Page 
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { Helmet } from "react-helmet";

export default class PageNotFound extends React.Component {

  render() {
    return (
      <div className="iron-page-not-found-wrap">
        <Helmet>
          <title>Car | Sign up</title>
        </Helmet>
        <div className="inner-container bg-base">
          <div className="container">
            <div className="iron-page-not-found py-sm-60">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={5} className="mx-auto">
                  <div className="rct-card-wrap">
                    <div className="text-center">
                      <h1>404</h1>
                      <h6>We can’t seem to find the page you’re looking for.</h6>
                      <Button component={Link} to="/" variant="contained" className="button btn-active btn-lg mb-25">
                        go to home
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

