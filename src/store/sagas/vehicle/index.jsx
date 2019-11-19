import { all, takeEvery, call, put, fork } from 'redux-saga/effects';

import * as vehicleTypes from '../../actions/vehicle/vehicleTypes';
import * as appSettingTypes from '../../actions/appSetting/appSettingTypes';

import { api } from '../../../api';

export function* getVehicles() {
   yield takeEvery(vehicleTypes.GET_VEHICLES, function* () {
      try {
         const res = yield call(api.POST, 'getVehicles');

         if (res.data.success) {
            yield put({
               type: vehicleTypes.GET_VEHICLES_SUCCESS,
               payload: res.data.result
            });
         } else {
            yield put({
               type: appSettingTypes.SHOW_ALERT,
               payload: {
                  message: res.data.message,
                  alertType: 'error'
               }
            });
         }
      } catch (err) {
         yield put({
            type: appSettingTypes.SHOW_ALERT,
            payload: {
               message: "Failed to Get Vehicles Data. Please try again later...",
               alertType: 'error'
            }
         });
      }
   });
}

export function* getPartials() {
   yield takeEvery(vehicleTypes.GET_PARTIALS, function* () {
      try {
         const res = yield call(api.POST, 'getPartials');

         if (res.data.success) {
            yield put({
               type: vehicleTypes.GET_PARTIALS_SUCCESS,
               payload: res.data.result
            });
         } else {
            yield put({
               type: appSettingTypes.SHOW_ALERT,
               payload: {
                  message: res.data.message,
                  alertType: 'error'
               }
            });
         }
      } catch (err) {
         yield put({
            type: appSettingTypes.SHOW_ALERT,
            payload: {
               message: "Failed to Get Partials Data. Please try again later...",
               alertType: 'error'
            }
         });
      }
   });
}

export default function* rootSaga() {
   yield all([
      fork(getVehicles),
      fork(getPartials)
   ]);
}