import { POLICY_STATUS, RESPONSE_STATUS } from 'ca-util/constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CONST from 'ca-module-subs/subsConstant';
import {
  getBillsFailed,
  getBillsSuccess,
  getSubscriptionDetailFailed,
  getSubscriptionDetailSuccess,
  getSubscriptionsFailed,
  getSubscriptionsSuccess,
  setResubscribeFailed,
  setResubscribeSuccess,
  setUnsubscribeFailed,
  setUnsubscribeSuccess,
} from './subsAction';
import {
  getBillsApi,
  getSubscriptionDetailApi,
  getSubscriptionsApi,
  setResubscribeApi,
  setUnsubscribeApi,
} from './subsApi';

function* getSubscriptions(params) {
  try {
    const response = yield call(getSubscriptionsApi, params.payload);
    const getActiveSubs = response?.data?.data?.filter((element) => {
      return (
        element?.status === POLICY_STATUS.active ||
        element?.status === POLICY_STATUS.gracePeriod
      );
    });
    const getInActiveSubs = response?.data?.data?.filter((element) => {
      return element?.status === POLICY_STATUS.lapse;
    });
    yield put(
      getSubscriptionsSuccess({
        getActiveSubs,
        getInActiveSubs,
      })
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getSubscriptionsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getSubscriptionsFailed(error?.response?.data));
        break;
      default:
        yield put(getSubscriptionsFailed(error?.response?.data));
    }
  }
}

function* getSubscriptionDetail(params) {
  try {
    const response = yield call(getSubscriptionDetailApi, params.payload);
    yield put(
      getSubscriptionDetailSuccess({
        ...response?.data?.data,
        planName: response?.data?.data?.planName?.replace(/ /g, ''),
      })
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getSubscriptionDetailFailed(error?.response?.data));
    }
  }
}

function* getBills(params) {
  try {
    const response = yield call(getBillsApi, params.payload);
    yield put(getBillsSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getBillsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getBillsFailed(error?.response?.data));
        break;
      default:
        yield put(getBillsFailed(error?.response?.data));
    }
  }
}

function* setResubscribe(params) {
  try {
    const response = yield call(setResubscribeApi, params.payload);
    yield put(setResubscribeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setResubscribeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setResubscribeFailed(error?.response?.data));
        break;
      default:
        yield put(setResubscribeFailed(error?.response?.data));
    }
  }
}

function* setUnsubscribe(params) {
  try {
    const response = yield call(setUnsubscribeApi, params.payload);
    yield put(setUnsubscribeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUnsubscribeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUnsubscribeFailed(error?.response?.data));
        break;
      default:
        yield put(setUnsubscribeFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_SUBSCRIPTIONS, getSubscriptions),
  takeLatest(CONST.GET_SUBSCRIPTION_DETAIL, getSubscriptionDetail),
  takeLatest(CONST.GET_BILLS, getBills),
  takeLatest(CONST.SET_RESUBSCRIBE, setResubscribe),
  takeLatest(CONST.SET_UNSUBSCRIBE, setUnsubscribe),
];
