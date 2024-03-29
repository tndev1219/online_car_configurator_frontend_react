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

import SettingsRoundedIcon            from '@material-ui/icons/SettingsRounded';
import DirectionsCarRoundedIcon       from '@material-ui/icons/DirectionsCarRounded';
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

import ColorPicker                    from '../Forms/ColorPicker';
import * as vehicleActions            from '../../../store/actions/vehicle';
import appConfig                      from '../../../config/AppConfig';

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
   envMenuItem: {
      display: 'block'
   },
   envOptionText: {
      marginBottom: 0,
      textAlign: 'center'
   }
}));

const partialBar = [
   { index: 0,  icon: <SettingsRoundedIcon />,           label: 'Setting',          showStateLabel: 'Setting'         },
   { index: 1,  icon: <DirectionsCarRoundedIcon />,      label: 'Body',             showStateLabel: 'Body'            },
   { index: 2,  icon: <CameraRoundedIcon />,             label: 'Wheel',            showStateLabel: 'Wheel'           },
   { index: 3,  icon: <AlbumRoundedIcon />,              label: 'Tire',             showStateLabel: 'Tire'            },
   { index: 4,  icon: <AllInboxRoundedIcon />,           label: 'Suspension',       showStateLabel: 'Suspension'      },
   { index: 5,  icon: <ConfirmationNumberRoundedIcon />, label: 'Shock',            showStateLabel: 'Shock'           },
   { index: 6,  icon: <CreditCardRoundedIcon />,         label: 'Front Bumper',     showStateLabel: 'FrontBumper'     },
   { index: 7,  icon: <CallToActionRoundedIcon />,       label: 'Rear Bumper',      showStateLabel: 'RearBumper'      },
   { index: 8,  icon: <CastConnectedRoundedIcon />,      label: 'Fender',           showStateLabel: 'Fender'          },
   { index: 9,  icon: <AccountBalanceRoundedIcon />,     label: 'Grille',           showStateLabel: 'Grille'          },
   { index: 10,  icon: <HighlightRoundedIcon />,         label: 'Headlight',        showStateLabel: 'Headlight'       },
   { index: 11, icon: <TableChartRoundedIcon />,         label: 'Hood',             showStateLabel: 'Hood'            },
   { index: 12, icon: <CalendarTodayRoundedIcon />,      label: 'Bed Cover',        showStateLabel: 'BedCover'        },
   { index: 13, icon: <EventNoteRoundedIcon />,          label: 'Bed Accessory',    showStateLabel: 'BedAccessory'    },
   { index: 14, icon: <BlurCircularRoundedIcon />,       label: 'Additional Light', showStateLabel: 'AdditionalLight' },
   { index: 15, icon: <EventSeatRoundedIcon />,          label: 'Hitch',            showStateLabel: 'Hitch'           }
];

const envOptions = [
   { 
      menuContent: <img src={require('../../../assets/images/env/venicesunset.jpg')} alt='venicesunset' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/venicesunset.jpg')} alt='venicesunset' style={{marginTop: 10}} />,
      label: 'VeniceSunset'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/pedestrian.jpg')} alt='pedestrian' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/pedestrian.jpg')} alt='pedestrian' style={{marginTop: 10}} />,
      label: 'Pedestrian'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/parking.jpg')} alt='parking' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/parking.jpg')} alt='parking' style={{marginTop: 10}} />,
      label: 'Parking'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/tunnel.jpg')} alt='tunnel' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/tunnel.jpg')} alt='tunnel' style={{marginTop: 10}} />,
      label: 'Tunnel'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/environment.jpg')} alt='environment' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/environment.jpg')} alt='environment' style={{marginTop: 10}} />,
      label: 'Environment'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/forest.jpg')} alt='forest' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/forest.jpg')} alt='forest' style={{marginTop: 10}} />,
      label: 'Forest'
   },
   { 
      menuContent: <img src={require('../../../assets/images/env/night.jpg')} alt='night' width={187} />,
      previewContent: <img src={require('../../../assets/images/env/night.jpg')} alt='night' style={{marginTop: 10}} />,
      label: 'Night'
   }
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

const areEqual = (prevProps, nextProps) => {
   if (prevProps.bodyPartOptions.length === 0 && nextProps.bodyPartOptions.length !== 0) {
      return false;
   }
   return true;
};

const VerticalTabs = ({ 
   changePartials, 
   changeWheelSize, 
   changeColor, 
   changeBodyGlassOpacity,
   changeTireSize, 
   changeSuspensionSize, 
   changeBodyPartColor, 
   changeWheelDistance,
   changeEnvMap,
   bodyPartOptions,
   showAllBodyAnnotation,
   hideAllBodyAnnotation
 }) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const vehicleConfigOptions = useSelector(state => state.vehicle.vehicleConfigOptions);
   const selectedVehicleType = useSelector(state => state.vehicle.selectedVehicleType);

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
      sltedEnvOption          : 0,     
      prevSltedBodyPartOption : '',
      sltedBodyPartOption     : '',
      sltedGlassOpacity       : 0,
      sltedWheelBrand         : '',
      sltedWheelDistance      : 0,
      sltedTireModelIndex     : 0,
      sltedWheelDiameterIndex : 0,
      sltedWheelWidthIndex    : 0,
      sltedTireDiameter       : tiresData[0] ? tiresData[0].modelMinSize : 33, // default diameter of tire is 33"
      sltedSuspensionSize     : 0,
      modelData               : null,
      colorData               : null
   });
   
   const [sltedPartialModel, setSltedPartialModel] = useState({
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
      showSettingModelContents         : true,
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
      sltedBodyColor        : '',
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

   const [configOptions, setConfigOptions] = useState(partialBar);

   useEffect(() => {
      dispatch(vehicleActions.getPartials(selectedVehicleType));
   }, [dispatch, selectedVehicleType]);

   useEffect(() => {
      const configOptions = partialBar.filter(option => vehicleConfigOptions.includes(option.label));
      configOptions.unshift(partialBar[0], partialBar[1]);
      
      setConfigOptions(configOptions);
   }, [vehicleConfigOptions]);

   const sltPartial = (event, partialIndex) => {
      if (state.showContentsBar && partialIndex === state.sltedPartialIndex) {
         return;
      }

      if (configOptions[state.sltedPartialIndex].label === 'Body' && configOptions[partialIndex].label !== 'Body') {
         hideAllBodyAnnotation();
      }

      if (configOptions[partialIndex].label === 'Setting') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, modelData: null });
      } else if (configOptions[partialIndex].label === 'Body') {
         showAllBodyAnnotation();
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bodyColorData, modelData: null });
      } else if (configOptions[partialIndex].label === 'Wheel') {
         if (state.sltedWheelBrand !== '') {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: wheelsData[state.sltedWheelBrand].paths });
         } else {
            setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: wheelsColorData, modelData: null });
         }
      } else if (configOptions[partialIndex].label ==='Tire') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, modelData: tiresData });
      } else if (configOptions[partialIndex].label === 'Suspension') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: suspensionsColorData, modelData: suspensionsData });
      } else if (configOptions[partialIndex].label === 'Shock') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: shockColorData, modelData: shockData });
      } else if (configOptions[partialIndex].label === 'Front Bumper') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: frontbumperColorData, modelData: frontbumperData });
      } else if (configOptions[partialIndex].label === 'Rear Bumper') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: rearbumperColorData, modelData: rearbumperData });
      } else if (configOptions[partialIndex].label === 'Fender') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: fenderColorData, modelData: fenderData });
      } else if (configOptions[partialIndex].label === 'Grille') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: grilleColorData, modelData: grilleData });
      } else if (configOptions[partialIndex].label === 'Headlight') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: headlightColorData, modelData: headlightData });
      } else if (configOptions[partialIndex].label === 'Hood') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: hoodColorData, modelData: hoodData });
      } else if (configOptions[partialIndex].label === 'Bed Cover') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bedcoverColorData, modelData: bedcoverData });
      } else if (configOptions[partialIndex].label === 'Bed Accessory') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: bedaccessoryColorData, modelData: bedaccessoryData });
      } else if (configOptions[partialIndex].label === 'Additional Light') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: additionallightColorData, modelData: additionallightData });
      } else if (configOptions[partialIndex].label === 'Hitch') {
         setState({ ...state, sltedPartialIndex: partialIndex, showContentsBar: true, colorData: hitchColorData, modelData: hitchData });
      } 
   };

   const sltEnvOption = event => {
      if (event.target.value === state.sltedEnvOption) {
         return;
      }

      setState({ ...state, sltedEnvOption: event.target.value });
      
      changeEnvMap(envOptions[event.target.value].label);
   };

   const sltBodyPartOption = event => {
      if (event.target.value === state.sltedBodyPartOption) {
         return;
      }

      setState({ ...state, sltedBodyPartOption: event.target.value });
   };

   const sltGlassOpacity = (value) => {
      if (state.sltedGlassOpacity === value) {
         return;
      }

      setState({ ...state, sltedGlassOpacity: value });
      
      changeBodyGlassOpacity(value);
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
      
      var newSelectedTireDiameter = null;
      if (tiresData[0]) {
         newSelectedTireDiameter = wheelsDiametersData[state.sltedWheelDiameterIndex].label * tiresData[sltedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;
      } else {
         newSelectedTireDiameter = wheelsDiametersData[state.sltedWheelDiameterIndex].label * 33 / wheelsDiametersData[0].label;
      }
      
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

         var newSelectedTireDiameter = null;
         if (tiresData[0]) {
            newSelectedTireDiameter = wheelsDiametersData[event.target.value].label * tiresData[state.sltedTireModelIndex].modelMinSize / wheelsDiametersData[0].label;
         } else {
            newSelectedTireDiameter = wheelsDiametersData[event.target.value].label * 33 / wheelsDiametersData[0].label;
         }
         
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

   const sltWheelDistance = value => {
      if (state.sltedWheelDistance === value) {
         return;
      }

      setState({ ...state, sltedWheelDistance: value });

      changeWheelDistance(value);
   }

   const sltSuspensionSize = event => {
      if (state.sltedSuspensionSize === event.target.value) {
         return;
      }

      setState({ ...state, sltedSuspensionSize: event.target.value });
      changeSuspensionSize(event.target.value, 'suspension');
   };

   const sltColor = (value, type) => {
      type = type.toLowerCase();

      if (type === 'body') {
         if (state.sltedBodyPartOption.length === 0 || (state.prevSltedBodyPartOption === state.sltedBodyPartOption && sltedColor.sltedBodyColor === value)) {
            return;
         }
         setState({ ...state, prevSltedBodyPartOption: state.sltedBodyPartOption });
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

      if (type === 'body') {
         changeBodyPartColor(value, state.sltedBodyPartOption);
      } else {
         changeColor(value, type);
      }
   };

   const toggleContentsBar = (status) => event => {

      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
         return;
      }

      if (configOptions[state.sltedPartialIndex].label === 'Body') {
         hideAllBodyAnnotation();
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
            {configOptions.map(partial => (
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
                                 configOptions[state.sltedPartialIndex].label === 'Body' ?
                                    <p className="lead">Part</p>
                                 :
                                    configOptions[state.sltedPartialIndex].label === 'Setting' ?
                                       <p className="lead">Environment</p>
                                    :
                                       <p className="lead">Model</p>
                              }
                           </Grid>
                        </Grid>
                        <IconButton onClick={() => toggleContents(`show${configOptions[state.sltedPartialIndex].showStateLabel}ModelContents`)} size="small" className={classes.transitionBtn} >
                           {toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}ModelContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                        </IconButton>

                        <Collapse in={toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}ModelContents`]} className={classes.collapse}>
                           {
                              configOptions[state.sltedPartialIndex].label === 'Setting' && // Environment select for Setting
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <Select
                                    value={state.sltedEnvOption}
                                    onChange={sltEnvOption}
                                    renderValue={id => (
                                       <div>{envOptions[id].label}</div>
                                    )}
                                 >
                                    {envOptions.map((env, index) => (
                                       <MenuItem key={index} value={index} className={`${classes.envMenuItem} testest`}>
                                          {env.menuContent}
                                          <p className={classes.envOptionText}>{env.label}</p>
                                       </MenuItem>
                                    ))}
                                 </Select>
                                 {envOptions[state.sltedEnvOption].previewContent}
                              </FormControl>
                           }
                           {
                              configOptions[state.sltedPartialIndex].label === 'Body' && // Option select for Body
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel className="outlined-slt-label-sm">Part Name</InputLabel>
                                 <Select
                                    value={state.sltedBodyPartOption}
                                    onChange={sltBodyPartOption}
                                    labelWidth={78}
                                 >
                                    {bodyPartOptions.map((bodyPart, index) => (
                                       <MenuItem key={index} value={bodyPart}>{bodyPart}</MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           }
                           {
                              configOptions[state.sltedPartialIndex].label === 'Wheel' && // Brand select for Wheels
                              <FormControl variant="outlined" className={classes.formControl}>
                                 <InputLabel className="outlined-slt-label-sm">Brand</InputLabel>
                                 <Select
                                    value={state.sltedWheelBrand}
                                    onChange={sltWheelBrand}
                                    labelWidth={42}
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
                                          configOptions[state.sltedPartialIndex].label !== 'Tire' && // if selected partial is Not Tire
                                          <Button onClick={() => sltPartialModel(model.modelPath, model.modelType)}>
                                             <img src={`${appConfig.serverURL}${model.imagePath}`} alt={`model${index}`} width='100' ></img>
                                          </Button>
                                       }
                                       {
                                          configOptions[state.sltedPartialIndex].label === 'Tire' && // if selected partial is Tire
                                          <Button onClick={() => sltTireModel(model.modelPath, model.modelType, index)}>
                                             <img src={`${appConfig.serverURL}${model.imagePath}`} alt={`model${index}`} width='100' ></img>
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
                        (configOptions[state.sltedPartialIndex].label === 'Wheel' || configOptions[state.sltedPartialIndex].label === 'Tire' || configOptions[state.sltedPartialIndex].label === 'Suspension') &&
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 <p className="lead">Size</p>
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${configOptions[state.sltedPartialIndex].showStateLabel}SizeContents`)} size="small" className={classes.transitionBtn} >
                              {toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}SizeContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}SizeContents`]} className={classes.collapse}>
                              {
                                 configOptions[state.sltedPartialIndex].label === 'Wheel' && // if selected partial is Wheel
                                 <>
                                    <Grid container justify='center' className="mb-15">
                                       <Grid item style={{ width: 100 }} className="mr-10">
                                          <FormControl variant="outlined" className={classes.sizeForm}>
                                             <InputLabel className="outlined-slt-label-sm">Diameter</InputLabel>
                                             <Select
                                                value={state.sltedWheelDiameterIndex}
                                                onChange={sltWheelSize}
                                                labelWidth={66}
                                                inputProps={{ name: 'sltedWheelDiameterIndex' }}
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
                                                inputProps={{ name: 'sltedWheelWidthIndex' }}
                                             >
                                                {wheelsWidthsData[state.sltedWheelDiameterIndex].map((width, index) => (
                                                   <MenuItem key={index} value={width.id}>{width.label}"</MenuItem>
                                                ))}
                                             </Select>
                                          </FormControl>
                                       </Grid>
                                    </Grid>
                                    <Grid container justify='center' alignItems='center' className="mb-10">
                                       <Grid item style={{ width: 220 }}>
                                          <div 
                                             className="wheel-distance-wrap"
                                          >
                                             <p className="wheel-distance-label">Distance</p>
                                             <p className="wheel-distance-value">{state.sltedWheelDistance}"</p>
                                             <PrettoSlider
                                                className="wheel-diatance-slider"
                                                value={state.sltedWheelDistance}
                                                max={4}
                                                step={0.1}
                                                onChange={(e, value) => sltWheelDistance(value)}
                                             />
                                          </div>
                                       </Grid>
                                    </Grid>
                                 </>
                              }
                              {
                                 configOptions[state.sltedPartialIndex].label === 'Tire' && // if selected partial is Tire
                                 <Grid container justify='center' className="mb-15">
                                    <Grid item>
                                       <p className="lead" style={{ fontSize: '1rem' }}>Diameter : {parseInt(state.sltedTireDiameter)}"</p>
                                    </Grid>
                                 </Grid>
                              }
                              {
                                 configOptions[state.sltedPartialIndex].label === 'Suspension' && // if selected partial is Suspension
                                 <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel className="outlined-slt-label-sm">Size</InputLabel>
                                    <Select
                                       value={state.sltedSuspensionSize}
                                       onChange={sltSuspensionSize}
                                       labelWidth={40}
                                    >
                                       <MenuItem value={0}>0</MenuItem>
                                       {state.modelData[0] && state.modelData[0].modelSizeArr.map((size, index) => (
                                          <MenuItem key={index} value={size}>{size}</MenuItem>
                                       ))}
                                    </Select>
                                 </FormControl>
                              }
                           </Collapse>
                        </Grid>
                     }
                     {/* Color Select Section */}
                     {
                        configOptions[state.sltedPartialIndex].label !== 'Tire' && configOptions[state.sltedPartialIndex].label !== 'Setting' && // if selected partial is not Tire and Setting
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                           <Divider variant="middle" />
                           <Grid container className="pt-20" >
                              <Grid item className="ml-20">
                                 {
                                    configOptions[state.sltedPartialIndex].label === 'Body' && state.sltedBodyPartOption === 'Body Glass' ?
                                    <p className="lead">Opacity</p>    
                                    :
                                    <p className="lead">Color</p>
                                 }
                              </Grid>
                           </Grid>
                           <IconButton onClick={() => toggleContents(`show${configOptions[state.sltedPartialIndex].showStateLabel}ColorContents`)} size="small" className={classes.transitionBtn} >
                              {toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}ColorContents`] ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowLeftRoundedIcon />}
                           </IconButton>

                           <Collapse in={toggleContent[`show${configOptions[state.sltedPartialIndex].showStateLabel}ColorContents`]} className={classes.collapse}>
                              {
                                 configOptions[state.sltedPartialIndex].label === 'Body' && state.sltedBodyPartOption === 'Body Glass' ?
                                 <>
                                    <Grid container justify='center' alignItems='center' className="mb-10">
                                       <Grid item style={{ width: 220 }}>
                                          <PrettoSlider
                                             className="mt-30"
                                             valueLabelDisplay="on"
                                             value={state.sltedGlassOpacity}
                                             max={100}
                                             onChange={(e, value) => sltGlassOpacity(value)}
                                          />
                                       </Grid>
                                    </Grid>
                                 </>
                                 :
                                 <>
                                    <Grid container justify="center" >
                                       <Grid item>
                                          <ColorPicker
                                             color={sltedColor[`slted${configOptions[state.sltedPartialIndex].showStateLabel}Color`]}
                                             handleChange={sltColor}
                                             type={configOptions[state.sltedPartialIndex].showStateLabel}
                                          />
                                          <p className="mt-5" style={{ textAlign: 'center' }}>Custom</p>
                                       </Grid>
                                    </Grid>
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
                                 </>
                              }
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