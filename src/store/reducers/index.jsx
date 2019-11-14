import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import appSettingReducer from './appSetting/appSettingReducer';
import vehicleReducer from './vehicle/vehicleReducer';

export default combineReducers({
  auth: authReducer,
  appSetting: appSettingReducer,
  vehicle: vehicleReducer
});