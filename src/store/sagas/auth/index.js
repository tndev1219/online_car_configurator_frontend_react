import { all, takeEvery, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as authTypes from '../../actions/auth/authTypes';
import * as appSettingTypes from '../../actions/appSetting/appSettingTypes';

import { api } from '../../../api';

export function* signupRequest() {
  yield takeEvery(authTypes.SIGNUP_REQUEST, function*(payload) {
    try {
      const res = yield call(api.POST, 'signup', payload.data);
      if (res.data.success) {
        yield put({
          type: authTypes.SIGNUP_SUCCESS
        });
      } else if (res.data.code === 402) {
        yield put({ 
          type: appSettingTypes.SHOW_ALERT,
          payload: {
            message: res.data.message,
            alertType: 'error'             
          }
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
      yield put({
        type: appSettingTypes.WAITING,
        payload: false
      }); 
    } catch (err) {
      yield put({ 
        type: authTypes.SIGNUP_ERROR 
      });
      yield put({
				type: appSettingTypes.WAITING,
				payload: false
			});
    }
  })
}

export function* signupSuccess() {
  yield takeEvery(authTypes.SIGNUP_SUCCESS, function*() {
    yield put({ 
      type: appSettingTypes.SHOW_ALERT,
      payload: {
        message: 'Sign Up Success!',
        alertType: 'success'         
      }
    });
    yield put(push('/signin'));
  });
}

export function* signupError() {
  yield takeEvery(authTypes.SIGNUP_ERROR, function*() {
    yield put({ 
      type: appSettingTypes.SHOW_ALERT,
      payload: {
        message: "Failed to Sign Up. Please try again later...",
        alertType: 'error'         
      }
    });
  });
}

export function* loginRequest() {
  yield takeEvery(authTypes.LOGIN_REQUEST, function*(payload) {
    try {
      const res = yield call(api.POST, 'signin', payload.data);
      if (res.data.success) {
        yield put({
          type: authTypes.LOGIN_SUCCESS,
          token: res.data.result.token
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
      yield put({
        type: appSettingTypes.WAITING,
        payload: false
      }); 
    } catch (err) {
      yield put({ 
        type: authTypes.LOGIN_ERROR 
      });
      yield put({
				type: appSettingTypes.WAITING,
				payload: false
			}); 
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(authTypes.LOGIN_SUCCESS, function*(payload) {
    yield localStorage.setItem('token', payload.token);
    yield put(push('/'));
  });
}

export function* loginError() {
  yield takeEvery(authTypes.LOGIN_ERROR, function*() {
    yield put({ 
      type: appSettingTypes.SHOW_ALERT,
      payload: {
        message: "Failed To Sign In. Please try again later...",
        alertType: 'error'         
      }
    });
  });
}

export function* logout() {
  yield takeEvery(authTypes.LOGOUT, function*() {
    localStorage.removeItem('token');
    yield put(push('/signin'));
    yield call(api.POST, 'logout');
  });
}

export function* sendEmail() {
	yield takeEvery(authTypes.SEND_EMAIL, function*(payload) {
		try {
      const res = yield call(api.POST, 'forgotpassword', payload.data);
      if (res.data.success) {
        yield put({ 
          type: appSettingTypes.SHOW_ALERT,
          payload: {
            message: res.data.message,
            alertType: 'success'
          }
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
      yield put({
        type: appSettingTypes.WAITING,
        payload: false
      }); 
    } catch (err) {
			yield put({
				type: appSettingTypes.WAITING,
				payload: false
			}); 
      yield put({ 
        type: appSettingTypes.SHOW_ALERT,
        payload: {
          message: 'Unable to Forgotten Password Verification. Please try again later...',
          alertType: 'error'             
        }
      });
    }
	});
}

export function* resetPassword() {
  yield takeEvery(authTypes.RESET_PASSWORD_REQUEST, function*(payload) {
		try {
      const res = yield call(api.POST, 'resetpassword', payload.data);
      if (res.data.success) {
        yield put({ 
          type: appSettingTypes.SHOW_ALERT,
          payload: {
            message: res.data.message,
            alertType: 'success'
          }
        });
        yield put(push('/signin'));
      } else {
        yield put({ 
          type: appSettingTypes.SHOW_ALERT,
          payload: {
            message: res.data.message,
            alertType: 'error'             
          }
        });
      }
      yield put({
        type: appSettingTypes.WAITING,
        payload: false
      }); 
    } catch (err) {
			yield put({
				type: appSettingTypes.WAITING,
				payload: false
			}); 
      yield put({ 
        type: appSettingTypes.SHOW_ALERT,
        payload: {
          message: 'Unable to Reset Password. Please try again later...',
          alertType: 'error'             
        }
      });
    }
	});
}

export default function* rootSaga() {
  yield all([
    fork(signupRequest),
    fork(signupSuccess),
    fork(signupError),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
    fork(sendEmail),
    fork(resetPassword)
  ]);
}
