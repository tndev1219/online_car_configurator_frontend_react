import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from "react-redux";

// Redux
import * as appSettingActions from './store/actions/appSetting';

import Routes from './routes';

const App = ({ hideAlert, showAlert, alertMessage, alertType}) => {
  return (
    <div className="app-container">
      <Routes />
      <SweetAlert
        success={alertType === 'success'}
        error={alertType === 'error'}
        title=''
        confirmBtnText="Ok"
        confirmBtnBsStyle="warning"
        className="iron-alert-box"
        show={showAlert}
        onConfirm={hideAlert}
        onCancel={hideAlert}
        closeOnClickOutside
      >
        {alertMessage}
      </SweetAlert>
    </div>
  );
}

// map state to props
const mapStateToProps = ( state ) => ({
  showAlert: state.appSetting.showAlert,
  alertMessage: state.appSetting.alertMessage,
  alertType: state.appSetting.alertType,
})

const mapDispatchToProps = {
  hideAlert: appSettingActions.hideAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(App);