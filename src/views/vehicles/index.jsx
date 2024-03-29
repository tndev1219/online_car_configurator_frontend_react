import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

import IntlMessages from '../../utils/IntlMessages';

import * as vehicleActions from '../../store/actions/vehicle';
import appConfig from '../../config/AppConfig';

const areEqual = (prevProps, nextProps) => true;

const Vehicles = () => {
   const dispatch = useDispatch();
   const vehiclesData = useSelector(state => state.vehicle.vehiclesData);
   const selectedBrand = useSelector(state => state.vehicle.selectedBrand);

   const [selectedVehiclesData, setSelectedVehiclesData] = useState(vehiclesData);
   
   useEffect(() => {
      dispatch(vehicleActions.getVehicles());
   }, [dispatch, selectedBrand]);

   useEffect(() => {
      if (vehiclesData.length !== 0 && selectedBrand.length !== 0) {
         var selectedVehiclesData = vehiclesData.filter((vehicle) => vehicle.brand.split(' ').join().toLowerCase() === selectedBrand.split('.')[1].split(" ").join(''));
         setSelectedVehiclesData(selectedVehiclesData);
      }
   }, [selectedBrand, vehiclesData]);

   return (
      <Fragment>
         <Helmet>
            <title>Car | Vehicles</title>
         </Helmet>
         <div className="iron-home-wrap">
            <div className="section-pad">
               <div className="container">
                  <Grid container spacing={3}>
                     {selectedVehiclesData.length !== 0 && selectedVehiclesData.map((vehicle, key) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={key} >
                           <Grow
                              in={true}
                              timeout={800}
                           >
                              <Button>
                                 <Card className="iron-shop-item iron-shadow hover-box-shadow">
                                    <Link 
                                       to={'/vehicle'} 
                                       className='d-block' 
                                       onClick={() => dispatch(vehicleActions.selectModel(vehicle.modelPath, vehicle.imagePath, vehicle.vehicleType, vehicle.configOptions))}
                                    >
                                       <CardMedia
                                          height="140"
                                          component="img"
                                          image={`${appConfig.serverURL}${vehicle.imagePath}`}
                                       />
                                       <CardContent className="iron-product-content pt-10 pb-0 border">
                                          <p className="text-capitalize mb-10" style={{textAlign: 'left'}}><IntlMessages id={selectedBrand} /> - {vehicle.vehicleType}</p>
                                       </CardContent>
                                    </Link>
                                 </Card>
                              </Button>
                           </Grow>
                        </Grid>
                     ))}
                     {selectedVehiclesData.length === 0 &&
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Grow
                              in={true}
                              timeout={800}
                           >
                              <p className="d-flex justify-content-center align-items-center mt-20" style={{fontSize: '1.2rem'}}>
                                 Any Vehicles are not yet registered!
                              </p>
                           </Grow>
                        </Grid>
                     }
                  </Grid>
               </div>
            </div>
         </div>
      </Fragment>
   );
}

export default React.memo((Vehicles), areEqual);