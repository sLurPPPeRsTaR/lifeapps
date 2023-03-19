import * as CONST from 'ca-module-notification/notificationConstant';

export const getNotif = (payload) => ({
  type: CONST.GET_NOTIF,
  payload,
});
export const getNotifSuccess = (payload) => ({
  type: CONST.GET_NOTIF_SUCCESS,
  payload,
});
export const getNotifFailed = (payload) => ({
  type: CONST.GET_NOTIF_FAILED,
  payload,
});
export const getNotifClear = (payload) => ({
  type: CONST.GET_NOTIF_CLEAR,
  payload,
});

export const readNotif = (payload) => ({
  type: CONST.READ_NOTIF,
  payload,
});
export const readNotifSuccess = (payload) => ({
  type: CONST.READ_NOTIF_SUCCESS,
  payload,
});
export const readNotifFailed = (payload) => ({
  type: CONST.READ_NOTIF_FAILED,
  payload,
});
export const readNotifClear = (payload) => ({
  type: CONST.READ_NOTIF_CLEAR,
  payload,
});
