import * as CONST from 'ca-module-subs/subsConstant';

export const getSubscriptions = (payload) => ({
  type: CONST.GET_SUBSCRIPTIONS,
  payload,
});
export const getSubscriptionsSuccess = (payload) => ({
  type: CONST.GET_SUBSCRIPTIONS_SUCCESS,
  payload,
});
export const getSubscriptionsFailed = (payload) => ({
  type: CONST.GET_SUBSCRIPTIONS_FAILED,
  payload,
});
export const getSubscriptionsClear = (payload) => ({
  type: CONST.GET_SUBSCRIPTIONS_CLEAR,
  payload,
});

export const getSubscriptionDetail = (payload) => ({
  type: CONST.GET_SUBSCRIPTION_DETAIL,
  payload,
});
export const getSubscriptionDetailSuccess = (payload) => ({
  type: CONST.GET_SUBSCRIPTION_DETAIL_SUCCESS,
  payload,
});
export const getSubscriptionDetailFailed = (payload) => ({
  type: CONST.GET_SUBSCRIPTION_DETAIL_FAILED,
  payload,
});
export const getSubscriptionDetailClear = (payload) => ({
  type: CONST.GET_SUBSCRIPTION_DETAIL_CLEAR,
  payload,
});

export const getBills = (payload) => ({
  type: CONST.GET_BILLS,
  payload,
});
export const getBillsSuccess = (payload) => ({
  type: CONST.GET_BILLS_SUCCESS,
  payload,
});
export const getBillsFailed = (payload) => ({
  type: CONST.GET_BILLS_FAILED,
  payload,
});
export const getBillsClear = (payload) => ({
  type: CONST.GET_BILLS_CLEAR,
  payload,
});

export const setResubscribe = (payload) => ({
  type: CONST.SET_RESUBSCRIBE,
  payload,
});
export const setResubscribeSuccess = (payload) => ({
  type: CONST.SET_RESUBSCRIBE_SUCCESS,
  payload,
});
export const setResubscribeFailed = (payload) => ({
  type: CONST.SET_RESUBSCRIBE_FAILED,
  payload,
});

export const setUnsubscribe = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE,
  payload,
});
export const setUnsubscribeSuccess = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE_SUCCESS,
  payload,
});
export const setUnsubscribeFailed = (payload) => ({
  type: CONST.SET_UNSUBSCRIBE_FAILED,
  payload,
});