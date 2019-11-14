import { all } from 'redux-saga/effects';
import authSagas from './auth';
import vehicleSagas from './vehicle';

export default function* rootSaga(getState) {
   yield all([
      authSagas(),
      vehicleSagas()
   ]);
}