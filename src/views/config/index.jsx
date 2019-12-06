import React from 'react';

import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

// Material UI
import { Grid } from '@material-ui/core';

import VerticalTabs from '../../components/UI/Toolbar';

// Redux
import * as authActions from '../../store/actions/auth';
import * as appSettingActions from '../../store/actions/appSetting';
import appConfig from '../../config/AppConfig';

class Config extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         bodyPartOptions: []
      };
      this.viewer3D = null;
   }

   componentDidMount() {

      if (this.props.selectedModel.length === 0) {
         this.props.history.push('/vehicles');
      } else {
         this.viewer3D = new window.Viewer3D();

         var vehicleModelURL = this.props.selectedModel;

         var self = this;

         this.viewer3D.loadEnvAndVehicleAsset(`${appConfig.serverURL}${vehicleModelURL}`, function (err, res) {
            if (res.length) {
               self.setState({ bodyPartOptions: res });
            }
         });

         window.viewer3D = this.viewer3D;
      }
   }

   changePartials = (path, type) => {
      window.viewer3D.loadPartialAsset(`${appConfig.serverURL}${path}`, type);
   }

   changeWheelSize = (diameter, width) => {
      window.viewer3D.setWheelSize(diameter, width);
   };

   changeTireSize = (diameter) => {
      window.viewer3D.setTireSize(diameter);
   };

   changeSuspensionSize = (value, type) => {
      window.viewer3D.setSuspensionSize(value);
   };

   changeColor = (value, modelType) => {
      window.viewer3D.setModelColor(value, modelType);
   };

   changeBodyPartColor = (value, bodyPart) => {
      window.viewer3D.setBodyColor(value, bodyPart);
   };

   changeBodyGlassOpacity = (value) => {
      window.viewer3D.setOpacityBodyGlass(value);
   };

   showAllBodyAnnotation = () => {
      window.viewer3D.showAllBodyAnnotation();
   };

   hideAllBodyAnnotation = () => {
      window.viewer3D.hideAllBodyAnnotation();
   };

   render() {

      return (
         <div className="iron-sign-in-page-wrap" style={{ height: '100vh' }}>
            <Helmet>
               <title>Car | Config</title>
            </Helmet>
            <Grid container>
               <Grid item>
                  <VerticalTabs
                     changePartials={this.changePartials}
                     changeWheelSize={this.changeWheelSize}
                     changeColor={this.changeColor}
                     changeTireSize={this.changeTireSize}
                     changeSuspensionSize={this.changeSuspensionSize}
                     changeBodyPartColor={this.changeBodyPartColor}
                     changeBodyGlassOpacity={this.changeBodyGlassOpacity}
                     bodyPartOptions={this.state.bodyPartOptions}
                     showAllBodyAnnotation={this.showAllBodyAnnotation}
                     hideAllBodyAnnotation={this.hideAllBodyAnnotation}
                  />
               </Grid>
               <Grid item>
                  <div id="viewer-3d">
                     <div id="loading-container">
                        <div className="spinner">
                           <div className="rect1"></div>
                           <div className="rect2"></div>
                           <div className="rect3"></div>
                           <div className="rect4"></div>
                           <div className="rect5"></div>
                        </div>
                     </div>
                     <div id="canvas-container"></div>
                  </div>
               </Grid>
            </Grid>
         </div>
      )
   }
}

const mapStateToProps = (state) => ({
   waiting: state.appSetting.waiting,
   selectedModel: state.vehicle.selectedModel
})

const mapDispatchToProps = {
   logout: authActions.logout,
   wait: appSettingActions.wait
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
