import { RESPONSE_STATUS } from 'ca-util/constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CONST from 'ca-module-notification/notificationConstant';
import {
  getNotifFailed,
  getNotifSuccess,
  readNotifFailed,
  readNotifSuccess,
} from './notificationAction';
import { getNotifApi, readNotifApi } from './notificationApi';

function* getNotif(params) {
  try {
    const response = yield call(getNotifApi, params.payload);
    yield put(getNotifSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getNotifFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getNotifFailed(error?.response?.data));
        break;
      default:
        yield put(getNotifFailed(error?.response?.data));
    }
  }
}

function* readNotif(params) {
  try {
    const response = yield call(readNotifApi, params.payload);
    yield put(readNotifSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(readNotifFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(readNotifFailed(error?.response?.data));
        break;
      default:
        yield put(readNotifFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_NOTIF, getNotif),
  takeLatest(CONST.READ_NOTIF, readNotif),
];
