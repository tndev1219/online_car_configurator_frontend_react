/**
 * Fixed header component
 */
/* eslint-disable */
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

// components
import AppConfig from '../../../config/AppConfig';
import Logout from "./Logout";

function FixedHeader(props) {

   return (
      <div className="iron-fixed-header bg-primary">
         <div style={{height: '100%'}}>
            <Grid container spacing={0} style={{height: '100%'}}>
               <Grid item xs={6} sm={6} md={3} lg={3} xl={4} className="d-flex justify-content-start align-items-center" >
                  <div className="iron-app-logo ml-40">
                     <img src={AppConfig.AppLogo} alt="header-logo" onClick={() => props.history.push('/')} />
                  </div>
               </Grid>
               <Grid item xs={6} sm={6} md={9} lg={9} xl={8}>
                  <div className="d-flex justify-content-end align-items-center mr-40" style={{height: '100%'}}>
                     {props.isLoggedIn && <Logout />}
                     {!props.isLoggedIn && <Button component={Link} to={"/signin"} className="button-outline btn-white mr-20">Log In</Button>}
                     {!props.isLoggedIn && <Button component={Link} to={"/signup"} className="button-outline btn-white">Sign Up</Button>}
                  </div>
               </Grid>
            </Grid>
         </div>
      </div>
   );
}

export default connect(   
   state => ({
      isLoggedIn: state.auth.token ? true : false
   })
)(FixedHeader);