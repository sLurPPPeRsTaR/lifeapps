import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-forpass/forpassConstant';
import {
  getResetPasswordSuccess,
  getResetPasswordFailed,
  setResetPasswordSuccess,
  setResetPasswordFailed,
} from 'ca-module-forpass/forpassAction';
import { setRequestOtpApi, setResetPasswordApi } from 'ca-module-auth/authApi';

function* getResetPassword(params) {
  try {
    const response = yield call(setRequestOtpApi, params.payload);
    yield put(getResetPasswordSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getResetPasswordFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getResetPasswordFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setResetPassword(params) {
  try {
    const response = yield call(setResetPasswordApi, params.payload);
    yield put(setResetPasswordSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setResetPasswordFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setResetPasswordFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.GET_RESET_PASSWORD, getResetPassword),
  takeLatest(CONST.SET_RESET_PASSWORD, setResetPassword),
];
