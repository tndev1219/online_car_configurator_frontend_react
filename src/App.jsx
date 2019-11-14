import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';

// Redux
import * as appSettingActions from './store/actions/appSetting';

import Routes from './routes';

const App = (props) => {
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