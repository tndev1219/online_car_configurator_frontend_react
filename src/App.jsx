import React, { useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Redux
import * as appSettingActions from './store/actions/appSetting';
import * as vehicleActions from './store/actions/vehicle';

import Routes from './routes';

const App = (props) => {

   const dispatch = useDispatch();
   
   useEffect(() => {
      dispatch(vehicleActions.getBrands());
   }, [dispatch]);

   useEffect(() => {
      dispatch(vehicleActions.getLogo());
   }, [dispatch]);

   return (
      <div className="app-container">
         <Switch>
            <Route path="/" component={Routes} />
         </Switch>
         <SweetAlert
            success={props.alertType === 'success'}
            error={props.alertType === 'error'}
            title=''
            confirmBtnText="Ok"
            confirmBtnBsStyle="warning"
            confirmBtnCssClass="iron-alert-box"
            className="iron-alert-box"
            show={props.showAlert}
            onConfirm={props.hideAlert}
            onCancel={props.hideAlert}
            closeOnClickOutside
         >
            {props.alertMessage}
         </SweetAlert>
      </div>
   );
}

// map state to props
const mapStateToProps = (state) => ({
   showAlert: state.appSetting.showAlert,
   alertMessage: state.appSetting.alertMessage,
   alertType: state.appSetting.alertType,
})

const mapDispatchToProps = {
   hideAlert: appSettingActions.hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(App);