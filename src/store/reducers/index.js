import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import appSettingReducer from './appSetting/appSettingReducer';

export default combineReducers({
  auth: authReducer,
  appSetting: appSettingReducer
});