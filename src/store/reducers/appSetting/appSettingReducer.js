import {
  SHOW_ALERT,
  HIDE_ALERT,
  WAITING
} from '../../actions/appSetting/appSettingTypes';

const initState = {
  showAlert: false,
  alertType: 'success',
  alertMessage: 'Initial Message',
  waiting: false
};

const appSettingReducer = (state = initState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertMessage: action.payload.message,
        alertType: action.payload.alertType
      }

    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false
      }

    case WAITING:
      return {
        ...state,
        waiting: action.payload
      };

    default:
      return state;
  }
}

export default appSettingReducer;