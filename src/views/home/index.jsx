import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import * as vehicleActions from '../../store/actions/vehicle';

const areEqual = (prevProps, nextProps) => true;

const Home = (props) => {

   const dispatch = useDispatch();
   const registeredBrands = useSelector(state => state.vehicle.registeredBrands);

   return (
      <Fragment>
         <Helmet>
            <title>Car | Home</title>
         </Helmet>
         <div className="iron-home-wrap">
            <div className="section-pad">
               <div className="container">
                  <Grid container spacing={10} justify="space-around">
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h4>Select Your Vehicle</h4>
                     </Grid>
                     <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        {registeredBrands.length ? 
                           <Grid container spacing={10}>
                              {registeredBrands.map((brand, index) => (
                                 <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index} className="d-flex justify-content-center align-items-center">
                                    <Fade
                                       in={true}
                                       timeout={800}
                                    >
                                       <img 
                                          src={require(`../../assets/images/brands/${brand.toLowerCase().split(' ').join('')}.png`)} 
                                          alt="brand-list" 
                                          onClick={() => {
                                             dispatch(vehicleActions.selectBrand(`menu.${brand.toLowerCase().split(' ').join('')}`));
                                             props.history.push('vehicles')
                                          }}
                                       />
                                    </Fade>
                                 </Grid>
                              ))}
                           </Grid>
                           :
                           <h5 className="d-flex justify-content-center align-items-center" >There is no registered brand yet!</h5>
                        }
                     </Grid>
                  </Grid>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default React.memo((Home), areEqual);