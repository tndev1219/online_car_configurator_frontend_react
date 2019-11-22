import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { Scrollbars }                 from 'react-custom-scrollbars';
import { makeStyles, withStyles }     from '@material-ui/core/styles';
import Tabs                           from '@material-ui/core/Tabs';
import Tab                            from '@material-ui/core/Tab';
import Grid                           from '@material-ui/core/Grid';
import Collapse                       from '@material-ui/core/Collapse';
import Drawer                         from '@material-ui/core/Drawer';
import Button                         from '@material-ui/core/Button';
import Divider                        from '@material-ui/core/Divider';
import FormControl                    from '@material-ui/core/FormControl';
import InputLabel                     from '@material-ui/core/InputLabel';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import Slider                         from '@material-ui/core/Slider';
import IconButton                     from '@material-ui/core/IconButton';

import CameraRoundedIcon              from '@material-ui/icons/CameraRounded';
import AlbumRoundedIcon               from '@material-ui/icons/AlbumRounded';
import AllInboxRoundedIcon            from '@material-ui/icons/AllInboxRounded';
import ConfirmationNumberRoundedIcon  from '@material-ui/icons/ConfirmationNumberRounded';
import CreditCardRoundedIcon          from '@material-ui/icons/CreditCardRounded';
import CallToActionRoundedIcon        from '@material-ui/icons/CallToActionRounded';
import CastConnectedRoundedIcon       from '@material-ui/icons/CastConnectedRounded';
import AccountBalanceRoundedIcon      from '@material-ui/icons/AccountBalanceRounded';
import HighlightRoundedIcon           from '@material-ui/icons/HighlightRounded';
import TableChartRoundedIcon          from '@material-ui/icons/TableChartRounded';
import CalendarTodayRoundedIcon       from '@material-ui/icons/CalendarTodayRounded';
import EventNoteRoundedIcon           from '@material-ui/icons/EventNoteRounded';
import BlurCircularRoundedIcon        from '@material-ui/icons/BlurCircularRounded';
import EventSeatRoundedIcon           from '@material-ui/icons/EventSeatRounded';
import CloseRoundedIcon               from '@material-ui/icons/CloseRounded';
import KeyboardArrowDownRoundedIcon   from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowLeftRoundedIcon   from '@material-ui/icons/KeyboardArrowLeftRounded';

import * as vehicleActions            from '../../../store/actions/vehicle';

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
   { index: 0, icon: <CameraRoundedIcon />,             label: 'Body',             showStateLabel: 'Body'            },
   { index: 1,  icon: <CameraRoundedIcon />,             label: 'Wheel',            showStateLabel: 'Wheel'           },
   { index: 2,  icon: <AlbumRoundedIcon />,              label: 'Tire',             showStateLabel: 'Tire'            },
   { index: 3,  icon: <AllInboxRoundedIcon />,           label: 'Suspension',       showStateLabel: 'Suspension'      },
   { index: 4,  icon: <ConfirmationNumberRoundedIcon />, label: 'Shock',            showStateLabel: 'Shock'           },
   { index: 5,  icon: <CreditCardRoundedIcon />,         label: 'Front Bumper',     showStateLabel: 'FrontBumper'     },
   { index: 6,  icon: <CallToActionRoundedIcon />,       label: 'Rear Bumper',      showStateLabel: 'RearBumper'      },
   { index: 7,  icon: <CastConnectedRoundedIcon />,      label: 'Fender',           showStateLabel: 'Fender'          },
   { index: 8,  icon: <AccountBalanceRoundedIcon />,     label: 'Grille',           showStateLabel: 'Grille'          },
   { index: 9,  icon: <HighlightRoundedIcon />,          label: 'Headlight',        showStateLabel: 'Headlight'       },
   { index: 10,  icon: <TableChartRoundedIcon />,         label: 'Hood',             showStateLabel: 'Hood'            },
   { index: 11, icon: <CalendarTodayRoundedIcon />,      label: 'Bed Cover',        showStateLabel: 'BedCover'        },
   { index: 12, icon: <EventNoteRoundedIcon />,          label: 'Bed Accessory',    showStateLabel: 'BedAccessory'    },
   { index: 13, icon: <BlurCircularRoundedIcon />,       label: 'Additional Light', showStateLabel: 'AdditionalLight' },
   { index: 14, icon: <EventSeatRoundedIcon />,          label: 'Hitch',            showStateLabel: 'Hitch'           }
];

const PrettoSlider = withStyles({
   root: {
      color : '#646464',
      height: 8,
   },
   thumb: {
      height         : 24,
      width          : 24,
      backgroundColor: '#fff',
      border         : '2px solid currentColor',
      marginTop      : -8,
      marginLeft     : -12,
      '&:focus,&:hover,&$active': {
         boxShadow: 'inherit',
      },
   },
   active: {},
   valueLabel: {
      left    : 'calc(-50% + 4px)',
      fontSize: '0.9rem'
   },
   track: {
      height      : 8,
      borderRadius: 4,
   },
   rail: {
      height      : 8,
      borderRadius: 4,
   },
})(Slider);

const areEqual = (prevProps, nextProps) => true;

const VerticalTabs = ({ changePartials, changeWheelSize, changeColor, changeTireSize, changeSuspensionSize }) => {

   const classes = useStyles();
   const dispatch = useDispatch();
   const selectedVehicleType = useSelector(state => state.vehicle.selectedVehicleType);

   useEffect(() => {
      dispatch(vehicleActions.getPartials(selectedVehicleType));
   }, [dispatch, selectedVehicleType]);
   
   const bodyData                 = useSelector(state => state.vehicle.bodyData);
   const wheelsData               = useSelector(state => state.vehicle.wheelsData);   
   const tiresData                = useSelector(state => state.vehicle.tiresData);
   const suspensionsData          = useSelector(state => state.vehicle.suspensionsData);
   const shockData                = useSelector(state => state.vehicle.shockData);
   const frontbumperData          = useSelector(state => state.vehicle.frontbumperData);
   const rearbumperData           = useSelector(state => state.vehicle.rearbumperData);
   const fenderData               = useSelector(state => state.vehicle.fenderData);
   const grilleData               = useSelector(state => state.vehicle.grilleData);
   const headlightData            = useSelector(state => state.vehicle.headlightData);
   const hoodData                 = useSelector(state => state.vehicle.hoodData);
   const bedcoverData             = useSelector(state => state.vehicle.bedcoverData);
   const bedaccessoryData         = useSelector(state => state.vehicle.bedaccessoryData);
   const additionallightData      = useSelector(state => state.vehicle.additionallightData);
   const hitchData                = useSelector(state => state.vehicle.hitchData);

   const wheelsDiametersData      = useSelector(state => state.vehicle.wheelsDiametersData);
   const wheelsWidthsData         = useSelector(state => state.vehicle.wheelsWidthsData);

   const bodyColorData            = useSelector(state => state.vehicle.bodyColorData);
   const wheelsColorData          = useSelector(state => state.vehicle.wheelsColorData);
   const suspensionsColorData     = useSelector(state => state.vehicle.suspensionsColorData);
   const shockColorData           = useSelector(state => state.vehicle.shockColorData);
   const frontbumperColorData     = useSelector(state => state.vehicle.frontbumperColorData);
   const rearbumperColorData      = useSelector(state => state.vehicle.rearbumperColorData);
   const fenderColorData          = useSelector(state => state.vehicle.fenderColorData);
   const grilleColorData          = useSelector(state => state.vehicle.grilleColorData);
   const headlightColorData       = useSelector(state => state.vehicle.headlightColorData);
   const hoodColorData            = useSelector(state => state.vehicle.hoodColorData);
   const bedcoverColorData        = useSelector(state => state.vehicle.bedcoverColorData);
   const bedaccessoryColorData    = useSelector(state => state.vehicle.bedaccessoryColorData);
   const additionallightColorData = useSelector(state => state.vehicle.additionallightColorData);
   const hitchColorData           = useSelector(state => state.vehicle.hitchColorData);

   const [state, setState] = useState({
      sltedPartialIndex       : 0,
      showContentsBar         : false,      
      sltedBodyBrand          : '',
      sltedWheelBrand         : '',
      sltedTireModelIndex     : 0,
      sltedWheelDiameterIndex : 0,
      sltedWheelWidthIndex    : 0,
      sltedTireDiameter       : tiresData[0] ? tiresData[0].modelMinSize : 33, // default diameter of tire is 33"
      sltedSuspensionSize     : 0,
      modelData               : null,
      colorData               : null
   });
   
   const [sltedPartialModel, setSltedPartialModel] = useState({
      sltedbodyModel           : '',
      sltedwheelModel          : '',
      sltedtireModel           : '',
      sltedsuspensionModel     : '',
      sltedshockModel          : '',
      sltedfrontbumperModel    : '',
      sltedrearbumperModel     : '',
      sltedfenderModel         : '',
      sltedgrilleModel         : '',
      sltedheadlightModel      : '',
      sltedhoodModel           : '',
      sltedbedcoverModel       : '',
      sltedbedaccessoryModel   : '',
      sltedadditionallightModel: '',
      sltedhitchModel          : ''      
   });
   
   const [toggleContent, setToggleContent] = useState({
      showBodyModelContents            : true,
      showBodyColorContents            : true,
      showWheelModelContents           : true,
      showWheelSizeContents            : true,
      showWheelColorContents           : true,
      showTireModelContents            : true,
      showTireSizeContents             : true,
      showSuspensionModelContents      : true,
      showSuspensionSizeContents       : true,
      showSuspensionColorContents      : true,
      showShockModelContents           : true,
      showShockColorContents           : true,
      showFrontBumperModelContents     : true,
      showFrontBumperColorContents     : true,
      showRearBumperModelContents      : true,
      showRearBumperColorContents      : true,
      showFenderModelContents          : true,
      showFenderColorContents          : true,
      showGrilleModelContents          : true,
      showGrilleColorContents          : true,
      showHeadlightModelContents       : true,
      showHeadlightColorContents       : true,
      showHoodModelContents            : true,
      showHoodColorContents            : true,
      showBedCoverModelContents        : true,
      showBedCoverColorContents        : true,
      showBedAccessoryModelContents    : true,
      showBedAccessoryColorContents    : true,
      showAdditionalLightModelContents : true,
      showAdditionalLightColorContents : true,
      showHitchModelContents           : true,
      showHitchColorContents           : true,
   });
   
   const [sltedColor, setSltedColor] = useState({
      sltedBodyColor            : '',
      sltedWheelColor           : '',
      sltedSuspensionColor      : '',
      sltedShockColor           : '',
      sltedFrontBumperColor     : '',
      sltedRearBumperColor      : '',
      sltedFenderColor          : '',
      sltedGrilleColor          : '',
      sltedHeadlightColor       : '',
      sltedHoodColor            : '',
      sltedBedCoverColor        : '',
      sltedBedAccessoryColor    : '',
      sltedAdditionalLightColor : '',
      sltedHitchColor           : ''
   });

   const sltPartial = (event, partialIndex) => {
      if (state.showContentsBar && partialIndex === state.sltedPartialIndex) {
         return;
      }

      if (partialIndex === 0) {
         if (state.sltedBodyBrand !== '') {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bodyColorData, modelData: null });
         } else {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bodyColorData, modelData: null });
         }
      } else if (partialIndex === 1) {
         if (state.sltedWheelBrand !== '') {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: wheelsData[state.sltedWheelBrand].paths });
         } else {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: null });
         }
      } else if (partialIndex === 2) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, modelData: tiresData });
      } else if (partialIndex === 3) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: suspensionsColorData, modelData: suspensionsData });
      } else if (partialIndex === 4) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: shockColorData, modelData: shockData });
      } else if (partialIndex === 5) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: frontbumperColorData, modelData: frontbumperData });
      } else if (partialIndex === 6) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: rearbumperColorData, modelData: rearbumperData });
      } else if (partialIndex === 7) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: fenderColorData, modelData: fenderData });
      } else if (partialIndex === 8) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: grilleColorData, modelData: grilleData });
      } else if (partialIndex === 9) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: headlightColorData, modelData: headlightData });
      } else if (partialIndex === 10) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: hoodColorData, modelData: hoodData });
      } else if (partialIndex === 11) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bedcoverColorData, modelData: bedcoverData });
      } else if (partialIndex === 12) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bedaccessoryColorData, modelData: bedaccessoryData });
      } else if (partialIndex === 13) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: additionallightColorData, modelData: additionallightData });
      } else if (partialIndex === 14) {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: hitchColorData, modelData: hitchData });
      } 
   };

   const sltBodyBrand = event => {
      if (event.target.value === state.sltedBodyBrand) {
         return;
      }

      var body = bodyData.filter(body => body.id === event.target.value);

      setState({ ...state, sltedBodyBrand: event.target.value, modelData: body[0].paths });
   };

   const sltWheelBrand = event => {
      if (event.target.value === state.sltedWheelBrand) {
         return;
      }

      var wheel = wheelsData.filter(wheel => wheel.id === event.target.value);

      setState({ ...state, sltedWheelBrand: event.target.value, modelData: wheel[0].paths });
   };

   const sltPartialModel = (modelPath, modelType) => {

      if (sltedPartialModel[`slted${modelType}Model`] === modelPath) {
         return;
      }

      setSltedPartialModel({ ...sltedPartialModel, [`slted${modelType}Model`]: modelPath });
      changePartials(modelPath, modelType);
   };

   const sltTireModel = (modelPath, modelType, sltedTireModelIndex) => {
      
      if (sltedPartialModel[`slted${modelType}Model`] === modelPath) {
         return;
      }

      changePartials(modelPath, modelType);

      var newSelectedTireDiameter = wheelsDiametersData[state.sltedWheelDiameterIndex].label * tiresData[sltedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;

      setState({ ...state, sltedTireDiameter: newSelectedTireDiameter, sltedTireModelIndex: sltedTireModelIndex });
      setSltedPartialModel({ ...sltedPartialModel, sltedtireModel: modelPath });

      changeTireSize(newSelectedTireDiameter);
   };

   const sltWheelSize = event => {
      if (event.target.name === 'sltedWheelDiameterIndex') {
         if (state.sltedWheelDiameterIndex === event.target.value) {
            return;
         }

         var currentsltedWheelWidthIndex = wheelsWidthsData[state.sltedWheelDiameterIndex][state.sltedWheelWidthIndex].label;
         var willsltedWheelWidthIndex = wheelsWidthsData[event.target.value].filter(width => width.label === currentsltedWheelWidthIndex);

         var newSelectedTireDiameter = wheelsDiametersData[event.target.value].label * tiresData[state.sltedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;

         if (willsltedWheelWidthIndex.length === 0) {
            setState({ ...state, sltedWheelDiameterIndex: event.target.value, sltedWheelWidthIndex: 0, sltedTireDiameter: newSelectedTireDiameter });
            changeWheelSize(wheelsDiametersData[event.target.value].label, wheelsWidthsData[event.target.value][0].label);
         } else {
            setState({ ...state, sltedWheelDiameterIndex: event.target.value, sltedWheelWidthIndex: willsltedWheelWidthIndex[0].id, sltedTireDiameter: newSelectedTireDiameter });
            changeWheelSize(wheelsDiametersData[event.target.value].label, wheelsWidthsData[event.target.value][willsltedWheelWidthIndex[0].id].label);
         }

         changeTireSize(newSelectedTireDiameter);
      } else {
         if (state.sltedWheelWidthIndex === event.target.value) {
            return;
         }

         setState({ ...state, sltedWheelWidthIndex: event.target.value });
         changeWheelSize(wheelsDiametersData[state.sltedWheelDiameterIndex].label, wheelsWidthsData[state.sltedWheelDiameterIndex][event.target.value].label);
      }
   };

   const sltSuspensionSize = (value, type) => {
      if (state.sltedSuspensionSize === value) {
         return;
      }

      setState({ ...state, sltedSuspensionSize: value });
      changeSuspensionSize(value, type);
   };

   const sltColor = (value, type) => {

      if (type === 'body') {
         if (sltedColor.sltedBodyColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedBodyColor: value });
      } else if (type === 'wheel') {
         if (sltedColor.sltedWheelColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedWheelColor: value });
      } else if (type === 'suspension') {
         if (sltedColor.sltedSuspensionColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedSuspensionColor: value });
      } else if (type === 'shock') {
         if (sltedColor.sltedShockColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedShockColor: value });
      } else if (type === 'frontbumper') {
         if (sltedColor.sltedFrontBumperColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedFrontBumperColor: value });
      } else if (type === 'rearbumper') {
         if (sltedColor.sltedRearBumperColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedRearBumperColor: value });
      } else if (type === 'fender') {
         if (sltedColor.sltedFenderColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedFenderColor: value });
      } else if (type === 'grille') {
         if (sltedColor.sltedGrilleColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedGrilleColor: value });
      } else if (type === 'headlight') {
         if (sltedColor.sltedHeadlightColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedHeadlightColor: value });
      } else if (type === 'hood') {
         if (sltedColor.sltedHoodColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedHoodColor: value });
      } else if (type === 'bedcover') {
         if (sltedColor.sltedBedCoverColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedBedCoverColor: value });
      } else if (type === 'bedaccessory') {
         if (sltedColor.sltedBedAccessoryColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedBedAccessoryColor: value });
      } else if (type === 'hitch') {
         if (sltedColor.sltedHitchColor === value) {
            return;
         }
         setSltedColor({ ...sltedColor, sltedHitchColor: value });
      }

      changeColor(value, type);
   };

   const toggleContentsBar = (status) => event => {

      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      setState({ ...state, showContentsBar: status, sltedPartialIndex: 0 });
   };

   const toggleContents = (type) => {
      setToggleContent({ ...toggleContent, [type]: !toggleContent[type] });
   };

   return (
      <div className={classes.root}>
         <Tabs
            orientation="vertical"
            variant="scrollable"
            value={state.sltedPartialIndex}
            onChange={sltPartial}
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
                              {
                                 state.sltedPartialIndex === 0 ?
                                    <p className="lead">Part</p>
                                 :
                                    <p className="lead">Model</p>
                              }
                           </Grid>
                        </Grid>
                        <IconButton onClick={() => toggleContents(`show${partialBar[state.sltedPartialIndex].showStateLabel}ModelContents`)} size="small" className={classes.transitionBtn} >
                           {toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}ModelContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                        </IconButton>

                        <Collapse in={toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}ModelContents`]} className={classes.collapse}>
                           {
                              state.sltedPartialIndex === 0 && // Brand select for Body
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel className="outlined-slt-label-sm">Brand</InputLabel>
                                 <Select
                                    value={state.sltedBodyBrand}
                                    onChange={sltBodyBrand}
                                    labelWidth={42}
                                    inputProps={{ name: 'sltedBodyBrand' }}
                                 >
                                    {bodyData.map((body, index) => (
                                       <MenuItem key={index} value={body.id}>{body.label}</MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           }
                           {
                              state.sltedPartialIndex === 1 && // Brand select for Wheels
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel className="outlined-slt-label-sm">Brand</InputLabel>
                                 <Select
                                    value={state.sltedWheelBrand}
                                    onChange={sltWheelBrand}
                                    labelWidth={42}
                                    inputProps={{ name: 'sltedWheelBrand' }}
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
                                          state.sltedPartialIndex !== 2 && // if selected partial is Not Tire
                                          <Button onClick={() => sltPartialModel(model.modelPath, model.modelType)}>
                                             <img src={model.imagePath} alt={`model${index}`} width='100' ></img>
                                          </Button>
                                       }
                                       {
                                          state.sltedPartialIndex === 2 && // if selected partial is Tire
                                          <Button onClick={() => sltTireModel(model.modelPath, model.modelType, index)}>
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
                        (state.sltedPartialIndex === 1 || state.sltedPartialIndex === 2 || state.sltedPartialIndex === 3) &&
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 <p className="lead">Size</p>
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${partialBar[state.sltedPartialIndex].showStateLabel}SizeContents`)} size="small" className={classes.transitionBtn} >
                              {toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}SizeContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}SizeContents`]} className={classes.collapse}>
                              {
                                 state.sltedPartialIndex === 1 && // if selected partial is Wheel
                                 <Grid container justify='center' className="mb-15">
                                    <Grid item style={{ width: 100 }} className="mr-10">
                                       <FormControl variant="outlined" className={classes.sizeForm}>
                                          <InputLabel className="outlined-slt-label-sm">Diameter</InputLabel>
                                          <Select
                                             value={state.sltedWheelDiameterIndex}
                                             onChange={sltWheelSize}
                                             labelWidth={66}
                                             inputProps={{
                                                name: 'sltedWheelDiameterIndex'
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
                                             value={state.sltedWheelWidthIndex}
                                             onChange={sltWheelSize}
                                             labelWidth={44}
                                             inputProps={{
                                                name: 'sltedWheelWidthIndex'
                                             }}
                                          >
                                             {wheelsWidthsData[state.sltedWheelDiameterIndex].map((width, index) => (
                                                <MenuItem key={index} value={width.id}>{width.label}"</MenuItem>
                                             ))}
                                          </Select>
                                       </FormControl>
                                    </Grid>
                                 </Grid>
                              }
                              {
                                 state.sltedPartialIndex === 2 && // if selected partial is Tire
                                 <Grid container justify='center' className="mb-15">
                                    <Grid item>
                                       <p className="lead" style={{ fontSize: '1rem' }}>Diameter : {parseInt(state.sltedTireDiameter)}"</p>
                                    </Grid>
                                 </Grid>
                              }
                              {
                                 state.sltedPartialIndex === 3 && // if selected partial is Suspension
                                 <Grid container justify='center' alignItems='center' className="mb-10">
                                    <Grid item style={{ width: 220 }}>
                                       <PrettoSlider
                                          className="mt-30"
                                          valueLabelDisplay="on"
                                          value={state.sltedSuspensionSize}
                                          max={10}
                                          valueLabelFormat={x => `${x}"`}
                                          onChange={(e, value) => sltSuspensionSize(value, 'suspension')}
                                       />
                                    </Grid>
                                 </Grid>
                              }
                           </Collapse>
                        </Grid>
                     }
                     {/* Color Select Section */}
                     {
                        state.sltedPartialIndex !== 2 && // if selected partial is not Tire
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 <p className="lead">Color</p>
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${partialBar[state.sltedPartialIndex].showStateLabel}ColorContents`)} size="small" className={classes.transitionBtn} >
                              {toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}ColorContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={toggleContent[`show${partialBar[state.sltedPartialIndex].showStateLabel}ColorContents`]} className={classes.collapse}>
                              <Grid container justify="space-between" className="mb-10" style={{ width: 242, marginLeft: 29 }} >
                                 {state.colorData && state.colorData.map((color, index) => (
                                    <Grid item key={index}>
                                       <Button onClick={() => sltColor(color.value, color.modelType)}>
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