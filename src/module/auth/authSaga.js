import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import {
  getCheckIssuedPolicyApi,
  setClearAuthApi,
  setLogoutApi,
} from 'ca-module-auth/authApi';
import * as CONST from 'ca-module-auth/authConstant';
import {
  getCheckIssuedPolicyFailed,
  getCheckIssuedPolicySuccess,
  setClearAuthFailed,
  setClearAuthSuccess,
  setLogoutFailed,
  setLogoutSuccess,
} from 'ca-module-auth/authAction';

function* setClearAuth(params) {
  try {
    const response = yield call(setClearAuthApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setClearAuthSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setClearAuthFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setClearAuthFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setClearAuthFailed(error.response));
  }
}

function* setLogout(params) {
  try {
    const response = yield call(setLogoutApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setLogoutSuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setLogoutFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLogoutFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setLogoutFailed(error.response));
  }
}

function* getCheckIssuedPolicy(params) {
  try {
    const response = yield call(getCheckIssuedPolicyApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(getCheckIssuedPolicySuccess(response.data));
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(getCheckIssuedPolicyFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckIssuedPolicyFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(getCheckIssuedPolicyFailed(error.response));
  }
}

export default [
  takeLatest(CONST.SET_CLEAR_AUTH, setClearAuth),
  takeLatest(CONST.SET_LOGOUT, setLogout),
  takeLatest(CONST.GET_CHECK_ISSUED_POLICY, getCheckIssuedPolicy),
];
