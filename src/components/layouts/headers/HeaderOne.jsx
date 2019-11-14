/**
 * site header one component
 */
/* eslint-disable */
import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

// components
import HeaderMenu from "./HeaderMenu";
import Logout from "./Logout";
import SidebarMenu from '../sidebar';
import FixedHeader from '../headers/FixedHeader';
import AppConfig from '../../../config/AppConfig';

class HeaderOne extends React.Component {

   state = {
      fixedHeader: false
   }

   UNSAFE_componentWillMount() {
      window.addEventListener('scroll', this.hideBar);
   }

   UNSAFE_componentWillUnmount() {
      window.removeEventListener('scroll', this.hideBar);
   }

   // function to show and hide fixed header
   hideBar = () => {
      const { fixedHeader } = this.state;
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.scrollTop >= 200 ?
         !fixedHeader && this.setState({ fixedHeader: true })
         :
         fixedHeader && this.setState({ fixedHeader: false });
   }

   render() {
      return (
         <div>
            <AppBar position="static" className={`iron-header-wrapper bg-primary iron-header-v1 ${(this.state.fixedHeader) ? 'header-fixed' : ''}`}>
               <div className="iron-header-top py-30">
                  <div className="container">
                     <Grid container spacing={0} >
                        <Grid item md={4} lg={4} xl={4} className="d-flex justify-content-start align-items-center" >
                           <div className="iron-header-widgets d-flex justify-content-start align-items-center">
                           </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} className="d-flex justify-content-start align-items-center" >
                           <div className="iron-app-logo text-md-center">
                              <img src={AppConfig.AppLogo} alt="header-logo" width="50%" />
                           </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4} lg={4} xl={4} className="d-flex justify-content-end align-items-center" >
                           <div className="iron-header-widgets d-flex justify-content-end align-items-center ">
                              {this.props.isLoggedIn && <Logout />}
                              {!this.props.isLoggedIn && <Button component={Link} to={"/signin"} className="button-outline btn-white">Sign In</Button>}
                           </div>
                        </Grid>
                     </Grid>
                  </div>
               </div>
               <div className="iron-header-bottom">
                  <div className="container">
                     <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                           <div className="text-center position-relative">
                              <HeaderMenu />
                              <SidebarMenu />
                           </div>
                        </Grid>
                     </Grid>
                  </div>
               </div>
               <FixedHeader />
            </AppBar>
         </div>
      );
   }
}

export default connect(   
   state => ({
      isLoggedIn: state.auth.token ? true : false
   })
)(HeaderOne);