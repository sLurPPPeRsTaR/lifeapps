import * as STATE from 'ca-module-notification/notificationInitialState';
import * as CONST from 'ca-module-notification/notificationConstant';

const notificationInitialState = {
  ...STATE.getNotifInitialState,
  ...STATE.readNotifInitialState,
  action: '',
};

export const notificationReducer = (state = notificationInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.GET_NOTIF]: () => ({
      ...state,
      getNotifParam: { ...payload},
      getNotifFetch: true,
      action: type,
    }),
    [CONST.GET_NOTIF_SUCCESS]: () => ({
      ...state,
      getNotifResponse: payload,
      getNotifFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_FAILED]: () => ({
      ...state,
      getNotifError: payload,
      getNotifFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_CLEAR]: () => ({
      ...state,
      getNotifResponse: notificationInitialState.getNotifResponse,
      getNotifError: notificationInitialState.getNotifError,
      action: type,
    }),
    [CONST.READ_NOTIF]: () => ({
      ...state,
      readNotifParam: { ...payload},
      readNotifFetch: true,
      action: type,
    }),
    [CONST.READ_NOTIF_SUCCESS]: () => ({
      ...state,
      readNotifResponse: payload,
      readNotifFetch: false,
      action: type,
    }),
    [CONST.READ_NOTIF_FAILED]: () => ({
      ...state,
      readNotifError: payload,
      readNotifFetch: false,
      action: type,
    }),
    [CONST.READ_NOTIF_CLEAR]: () => ({
      ...state,
      readNotifResponse: notificationInitialState.readNotifResponse,
      readNotifError: notificationInitialState.readNotifError,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
