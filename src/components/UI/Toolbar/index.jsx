import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';

import AlbumRoundedIcon from '@material-ui/icons/AlbumRounded';
import DirectionsCarRoundedIcon from '@material-ui/icons/DirectionsCarRounded';
import DirectionsBusRoundedIcon from '@material-ui/icons/DirectionsBusRounded';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import SportsMotorsportsRoundedIcon from '@material-ui/icons/SportsMotorsportsRounded';
import MotorcycleRoundedIcon from '@material-ui/icons/MotorcycleRounded';
// import ExitToAppRoundedIcon         from '@material-ui/icons/ExitToAppRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

// import * as authActions from '../../../store/actions/auth';
import * as vehicleActions from '../../../store/actions/vehicle';

const useStyles = makeStyles(theme => ({
   root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100vh'
   },
   tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
   },
   list: {
      width: 300,
   },
   category_btn: {
      fontSize: '0.8125rem !important',
      width: '95px !important',
      minWidth: 'unset !important',
      borderBottom: '1px dashed #e0e0e0 !important',
      height: 110
   },
   sub_toolbar: {
      left: 'unset !important',
      top: 'unset !important',
      bottom: 'unset !important',
      right: 'unset !important',
      position: 'unset !important',
      zIndex: 'unset !important'
   },
   closeButton: {
      margin: 10,
      marginLeft: 260
   },
   collapse: {
      marginTop: -17
   },
   formControl: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(3),
      minWidth: '73%',
   },
   sizeForm: {
      minWidth: '100%'
   },
   transitionBtn: {
      marginTop: -88,
      marginLeft: 255
   },
}));

const partialBar = [
   { index: 0, icon: <AlbumRoundedIcon />, label: 'Wheel' },
   { index: 1, icon: <AlbumRoundedIcon />, label: 'Tire' },
   { index: 2, icon: <DirectionsCarRoundedIcon />, label: 'Suspension' },
   { index: 3, icon: <DirectionsBusRoundedIcon />, label: 'Bus' },
   { index: 4, icon: <LocalShippingRoundedIcon />, label: 'Truck' },
   { index: 5, icon: <SportsMotorsportsRoundedIcon />, label: 'Helmet' },
   { index: 6, icon: <MotorcycleRoundedIcon />, label: 'Motor' },
   //   { index: 7, icon: <ExitToAppRoundedIcon />, label: 'Logout' }
];

const PrettoSlider = withStyles({
   root: {
      color: '#646464',
      height: 8,
   },
   thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
         boxShadow: 'inherit',
      },
   },
   active: {},
   valueLabel: {
      left: 'calc(-50% + 4px)',
      fontSize: '0.9rem'
   },
   track: {
      height: 8,
      borderRadius: 4,
   },
   rail: {
      height: 8,
      borderRadius: 4,
   },
})(Slider);

const areEqual = (prevProps, nextProps) => true;

const VerticalTabs = ({ changePartials, changeWheelSize, changeColor, changeTireSize, changeSuspensionSize }) => {

   const classes = useStyles();
   const dispatch = useDispatch();
   
   useEffect(() => {
      dispatch(vehicleActions.getPartials());
   }, [dispatch]);
   
   const wheelsData           = useSelector(state => state.vehicle.wheelsData);   
   const tiresData            = useSelector(state => state.vehicle.tiresData);
   const suspensionsData      = useSelector(state => state.vehicle.suspensionsData);
   const wheelsDiametersData  = useSelector(state => state.vehicle.wheelsDiametersData);
   const wheelsWidthsData     = useSelector(state => state.vehicle.wheelsWidthsData);
   const wheelsColorData      = useSelector(state => state.vehicle.wheelsColorData);
   const suspensionsColorData = useSelector(state => state.vehicle.suspensionsColorData);

   const [state, setState] = useState({
      selectedPartialIndex       : 0,
      showContentsBar            : false,
      showWheelModelContents     : true,
      showWheelSizeContents      : true,
      showWheelColorContents     : true,
      showTireModelContents      : true,
      showTireSizeContents       : true,
      showSuspensionModelContents: true,
      showSuspensionSizeContents : true,
      showSuspensionColorContents: true,
      selectedWheelBrand         : '',
      selectedModel              : '',
      selectedTireModelIndex     : 0,
      selectedWheelDiameterIndex : 0,
      selectedWheelWidthIndex    : 0,
      selectedTireDiameter       : tiresData[0].modelMinSize,
      selectedWheelColor         : '',
      selectedSuspensionColor    : '',
      selectedSuspensionSize     : 0,
      modelData                  : null,
      colorData                  : null
   });
   
   const selectPartial = (event, partialIndex) => {
      if (state.showContentsBar && partialIndex === state.selectedPartialIndex) {
         return;
      }

      if (partialIndex === 0) {
         if (state.selectedWheelBrand !== '') {
            setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: wheelsData[state.selectedWheelBrand].paths });
         } else {
            setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: null });
         }
      } else if (partialIndex === 1) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, modelData: tiresData });
      } else if (partialIndex === 2) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: suspensionsColorData, modelData: suspensionsData });
      } else if (partialIndex === 3) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: null, modelData: null });
      } else if (partialIndex === 4) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: null, modelData: null });
      } else if (partialIndex === 5) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: null, modelData: null });
      } else if (partialIndex === 6) {
         setState({ ...state, selectedPartialIndex: partialIndex, showContentsBar: true, colorData: null, modelData: null });
      } else {
         // dispatch logout();
      }
   };

   const selectWheelBrand = event => {
      if (event.target.value === state.selectedWheelBrand) {
         return;
      }

      var wheel = wheelsData.filter(wheel => wheel.id === event.target.value);

      setState({ ...state, selectedWheelBrand: event.target.value, modelData: wheel[0].paths });
   };

   const selectWheelModel = (modelPath, modelType) => {
      if (state.selectedModel === modelPath) {
         return;
      }

      setState({ ...state, selectedModel: modelPath });
      changePartials(modelPath, modelType);
   }

   const selectTireModel = (modelPath, modelType, selectedTireModelIndex) => {
      if (state.selectedModel === modelPath) {
         return;
      }

      changePartials(modelPath, modelType);

      var newSelectedTireDiameter = wheelsDiametersData[state.selectedWheelDiameterIndex].label * tiresData[selectedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;
      setState({ ...state, selectedModel: modelPath, selectedTireDiameter: newSelectedTireDiameter, selectedTireModelIndex: selectedTireModelIndex });
      changeTireSize(newSelectedTireDiameter);
   }

   const selectWheelSize = event => {
      if (event.target.name === 'selectedWheelDiameterIndex') {
         if (state.selectedWheelDiameterIndex === event.target.value) {
            return;
         }

         var currentselectedWheelWidthIndex = wheelsWidthsData[state.selectedWheelDiameterIndex][state.selectedWheelWidthIndex].label;
         var willselectedWheelWidthIndex = wheelsWidthsData[event.target.value].filter(width => width.label === currentselectedWheelWidthIndex);

         var newSelectedTireDiameter = wheelsDiametersData[event.target.value].label * tiresData[state.selectedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;

         if (willselectedWheelWidthIndex.length === 0) {
            setState({ ...state, selectedWheelDiameterIndex: event.target.value, selectedWheelWidthIndex: 0, selectedTireDiameter: newSelectedTireDiameter });
            changeWheelSize(wheelsDiametersData[event.target.value].label, wheelsWidthsData[event.target.value][0].label);
         } else {
            setState({ ...state, selectedWheelDiameterIndex: event.target.value, selectedWheelWidthIndex: willselectedWheelWidthIndex[0].id, selectedTireDiameter: newSelectedTireDiameter });
            changeWheelSize(wheelsDiametersData[event.target.value].label, wheelsWidthsData[event.target.value][willselectedWheelWidthIndex[0].id].label);
         }

         changeTireSize(newSelectedTireDiameter);
      } else {
         if (state.selectedWheelWidthIndex === event.target.value) {
            return;
         }

         setState({ ...state, selectedWheelWidthIndex: event.target.value });
         changeWheelSize(wheelsDiametersData[state.selectedWheelDiameterIndex].label, wheelsWidthsData[state.selectedWheelDiameterIndex][event.target.value].label);
      }
   };

   const selectSuspensionSize = (value, type) => {
      if (state.selectedSuspensionSize === value) {
         return;
      }

      setState({ ...state, selectedSuspensionSize: value });
      changeSuspensionSize(value, type);
   }

   const selectColor = (value, type) => {
      if (type === 'wheel') {
         if (state.selectedWheelColor === value) {
            return;
         }
         setState({ ...state, selectedWheelColor: value });
      } else if (type === 'suspension') {
         if (state.selectedSuspensionColor === value) {
            return;
         }
         setState({ ...state, selectedSuspensionColor: value })
      }

      changeColor(value, type);
   }

   const toggleContentsBar = (status) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({ ...state, showContentsBar: status, selectedPartialIndex: 0 });
   };

   const toggleContents = (type) => {
      setState({ ...state, [type]: !state[type] });
   }

   return (
      <div className={classes.root}>
         <Tabs
            orientation="vertical"
            variant="scrollable"
            value={state.selectedPartialIndex}
            onChange={selectPartial}
            className={classes.tabs}
         >
            {partialBar.map(partial => (
               <Tab className={classes.category_btn} icon={partial.icon} label={partial.label} key={partial.index} />
            ))}
         </Tabs>

         <Drawer
            open={state.showContentsBar}
            className={`${classes.sub_toolbar} contents-drawer`}
         >
            <div className={classes.list}>
               <IconButton onClick={toggleContentsBar(false)} size="small" className={classes.closeButton} >
                  <CloseRoundedIcon />
               </IconButton>
               <Divider variant="middle" />

               <Scrollbars
                  style={{ height: '93vh' }}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={200}
               >
                  <Grid container>
                     {/* Model Select Section */}
                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <Grid container className="pt-20" >
                           <Grid item className="ml-20">
                              <p className="lead">Model</p>
                           </Grid>
                        </Grid>
                        <IconButton onClick={() => toggleContents(`show${partialBar[state.selectedPartialIndex].label}ModelContents`)} size="small" className={classes.transitionBtn} >
                           {state[`show${partialBar[state.selectedPartialIndex].label}ModelContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                        </IconButton>

                        <Collapse in={state[`show${partialBar[state.selectedPartialIndex].label}ModelContents`]} className={classes.collapse}>
                           {
                              state.selectedPartialIndex === 0 && // Brand select for Wheels
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel className="outlined-slt-label-sm">Brand</InputLabel>
                                 <Select
                                    value={state.selectedWheelBrand}
                                    onChange={selectWheelBrand}
                                    labelWidth={42}
                                    inputProps={{ name: 'selectedWheelBrand' }}
                                 >
                                    {wheelsData.map((wheel, index) => (
                                       <MenuItem key={index} value={wheel.id}>{wheel.label}</MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           }
                           {
                              state.modelData &&
                              <Grid container justify="space-between" className="mb-10" style={{ width: 242, marginLeft: 32 }} >
                                 {state.modelData.map((model, index, arr) => (
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} key={index}>
                                       {
                                          (state.selectedPartialIndex === 0 || state.selectedPartialIndex === 2) && // if selected partial is Wheel or Suspension
                                          <Button onClick={() => selectWheelModel(model.modelPath, model.modelType)}>
                                             <img src={model.imagePath} alt={`model${index}`} width='100' ></img>
                                          </Button>
                                       }
                                       {
                                          state.selectedPartialIndex === 1 && // if selected partial is Tire
                                          <Button onClick={() => selectTireModel(model.modelPath, model.modelType, index)}>
                                             <img src={model.imagePath} alt={`model${index}`} width='100' ></img>
                                          </Button>
                                       }
                                       <p style={{ textAlign: 'center' }}>{model.modelName}</p>
                                    </Grid>
                                 ))}
                              </Grid>
                           }
                        </Collapse>
                     </Grid>
                     {/* Size Select Section */}
                     {
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 <p className="lead">Size</p>
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${partialBar[state.selectedPartialIndex].label}SizeContents`)} size="small" className={classes.transitionBtn} >
                              {state[`show${partialBar[state.selectedPartialIndex].label}SizeContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={state[`show${partialBar[state.selectedPartialIndex].label}SizeContents`]} className={classes.collapse}>
                              {
                                 state.selectedPartialIndex === 0 && // if selected partial is Wheel
                                 <Grid container justify='center' className="mb-15">
                                    <Grid item style={{ width: 100 }} className="mr-10">
                                       <FormControl variant="outlined" className={classes.sizeForm}>
                                          <InputLabel className="outlined-slt-label-sm">Diameter</InputLabel>
                                          <Select
                                             value={state.selectedWheelDiameterIndex}
                                             onChange={selectWheelSize}
                                             labelWidth={66}
                                             inputProps={{
                                                name: 'selectedWheelDiameterIndex'
                                             }}
                                          >
                                             {wheelsDiametersData.map((diameter, index) => (
                                                <MenuItem key={index} value={diameter.id}>{diameter.label}"</MenuItem>
                                             ))}
                                          </Select>
                                       </FormControl>
                                    </Grid>
                                    <Grid item style={{ width: 100 }} className="ml-10">
                                       <FormControl variant="outlined" className={classes.sizeForm}>
                                          <InputLabel className="outlined-slt-label-sm">Width</InputLabel>
                                          <Select
                                             value={state.selectedWheelWidthIndex}
                                             onChange={selectWheelSize}
                                             labelWidth={44}
                                             inputProps={{
                                                name: 'selectedWheelWidthIndex'
                                             }}
                                          >
                                             {wheelsWidthsData[state.selectedWheelDiameterIndex].map((width, index) => (
                                                <MenuItem key={index} value={width.id}>{width.label}"</MenuItem>
                                             ))}
                                          </Select>
                                       </FormControl>
                                    </Grid>
                                 </Grid>
                              }
                              {
                                 state.selectedPartialIndex === 1 && // if selected partial is Tire
                                 <Grid container justify='center' className="mb-15">
                                    <Grid item>
                                       <p className="lead" style={{ fontSize: '1rem' }}>Diameter : {parseInt(state.selectedTireDiameter)}"</p>
                                    </Grid>
                                 </Grid>
                              }
                              {
                                 state.selectedPartialIndex === 2 && // if selected partial is Suspension
                                 <Grid container justify='center' alignItems='center' className="mb-10">
                                    <Grid item style={{ width: 220 }}>
                                       <PrettoSlider
                                          className="mt-30"
                                          valueLabelDisplay="on"
                                          value={state.selectedSuspensionSize}
                                          max={10}
                                          valueLabelFormat={x => `${x}"`}
                                          onChange={(e, value) => selectSuspensionSize(value, 'suspension')}
                                       />
                                    </Grid>
                                 </Grid>
                              }
                           </Collapse>
                        </Grid>
                     }
                     {/* Color Select Section */}
                     {
                        state.selectedPartialIndex !== 1 && // if selected partial is not Tire
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 <p className="lead">Color</p>
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${partialBar[state.selectedPartialIndex].label}ColorContents`)} size="small" className={classes.transitionBtn} >
                              {state[`show${partialBar[state.selectedPartialIndex].label}ColorContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={state[`show${partialBar[state.selectedPartialIndex].label}ColorContents`]} className={classes.collapse}>
                              <Grid container justify="space-between" className="mb-10" style={{ width: 242, marginLeft: 29 }} >
                                 {state.colorData && state.colorData.map((color, index) => (
                                    <Grid item key={index}>
                                       <Button onClick={() => selectColor(color.value, color.modelType)}>
                                          <div style={{ width: 100, height: 100, background: `${color.value}` }}></div>
                                       </Button>
                                       <p style={{ textAlign: 'center' }}>{color.colorName}</p>
                                    </Grid>
                                 ))}
                              </Grid>
                           </Collapse>
                        </Grid>
                     }
                  </Grid>
               </Scrollbars>
            </div>
         </Drawer>
      </div>
   );
}

export default React.memo(VerticalTabs, areEqual);