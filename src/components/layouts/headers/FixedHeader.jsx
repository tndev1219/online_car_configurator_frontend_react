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
import HeaderMenu from "./HeaderMenu";
import SidebarMenu from '../sidebar';
import AppConfig from '../../../config/AppConfig';
import Logout from "./Logout";

function FixedHeader(props) {

   return (
      <div className="iron-fixed-header bg-primary">
         <div className="container">
            <Grid container spacing={0} >
               <Grid item xs={6} sm={6} md={3} lg={3} xl={4} className="d-flex justify-content-start align-items-center" >
                  <div className="iron-app-logo">
                     <img src={AppConfig.AppLogo} alt="header-logo" width="50%" />
                  </div>
               </Grid>
               <Grid item xs={6} sm={6} md={9} lg={9} xl={8} >
                  <div className="d-flex justify-content-end align-items-center">
                     <HeaderMenu />
                     {props.isLoggedIn && <Logout />}
                     {!props.isLoggedIn && <Button component={Link} to={"/signin"} className="button-outline btn-white">Sign In</Button>}
                     <SidebarMenu />
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