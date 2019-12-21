import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import appConfig from '../../config/AppConfig';

const areEqual = (prevProps, nextProps) => true;

const Vehicle = (props) => {
   const selectedVehicleImagePath = useSelector(state => state.vehicle.selectedVehicleImagePath);

   useEffect(() => {
      if (selectedVehicleImagePath.length === 0) {
         props.history.push('/');
      }
   }, [selectedVehicleImagePath, props.history]);

   return (
      <Fragment>
         <Helmet>
            <title>Car | Vehicle</title>
         </Helmet>
         <div className="iron-home-wrap">
            <div className="section-pad">
               <div className="container">
                  <Grid container spacing={10}>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="d-flex justify-content-center align-items-center">
                        <Grow
                           in={true}
                           timeout={800}
                        >
                           <img src={`${appConfig.serverURL}${selectedVehicleImagePath}`} alt="vehicleImage"></img>
                        </Grow>
                     </Grid>
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="d-flex justify-content-center align-items-center">
                           <Link 
                              to={'/config'} 
                              style={{color: 'white', fontSize: '1rem', maxWidth: 964, width: '100%'}}
                           >
                              <Button variant="contained" className="button btn-active btn-lg text-capitalize" style={{width: '100%'}}>
                                 Start Your Build
                              </Button>
                           </Link>
                     </Grid>
                  </Grid>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default React.memo((Vehicle), areEqual);