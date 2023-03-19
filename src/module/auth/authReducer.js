import * as CONST from 'ca-module-auth/authConstant';
import * as STATE from 'ca-module-auth/authInitialState';
import _ from 'lodash';

const authInitialState = {
  ..._.cloneDeep(STATE.authInitialState),
  action: '',
};

export const authReducer = (state = authInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_LANG]: () => ({
      ...state,
      lang: payload,
      action: type,
    }),
    [CONST.SET_AUTH]: () => ({
      ...state,
      userData: {
        ...state.userData,
        ...payload.userData,
      },
      token: {
        ...state.token,
        ...payload.token,
      },
      action: type,
    }),
    [CONST.SET_TOKEN]: () => ({
      ...state,
      token: {
        ...state.token,
        ...payload.token,
      },
      action: type,
    }),
    [CONST.SET_USER_DATA]: () => ({
      ...state,
      userData: {
        ...state.userData,
        ...payload.userData,
      },
      action: type,
    }),
    [CONST.SET_WIDGET_TOGGLE]: () => ({
      ...state,
      widgetToggle: {
        ...state.widgetToggle,
        ...payload,
      },
      action: type,
    }),
    [CONST.SET_CLEAR_AUTH_SUCCESS]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      widgetToggle: {
        ..._.cloneDeep(STATE.authInitialState.widgetToggle),
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_CLEAR_AUTH_FAILED]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      widgetToggle: {
        ..._.cloneDeep(STATE.authInitialState.widgetToggle),
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_LOGOUT_SUCCESS]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      widgetToggle: {
        ..._.cloneDeep(STATE.authInitialState.widgetToggle),
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_LOGOUT_FAILED]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      widgetToggle: {
        ..._.cloneDeep(STATE.authInitialState.widgetToggle),
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_LOGOUT_CLEAR]: () => ({
      ...state,
      action: type,
    }),
    [CONST.SET_CLEAR_REFRESH_TOKEN]: () => ({
      ...state,
      userData: {
        ..._.cloneDeep(STATE.authInitialState.userData),
        deviceId: state.userData.deviceId,
      },
      widgetToggle: {
        ..._.cloneDeep(STATE.authInitialState.widgetToggle),
      },
      token: {
        ..._.cloneDeep(STATE.authInitialState.token),
      },
      action: type,
    }),
    [CONST.SET_DEVICE_ID]: () => ({
      ...state,
      userData: {
        ...state.userData,
        deviceId: payload,
      },
      action: type,
    }),
    [CONST.SET_COLOR_SCHEME]: () => ({
      ...state,
      colorScheme: payload,
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY]: () => ({
      ...state,
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY_SUCCESS]: () => ({
      ...state,
      userData: {
        ...state.userData,
        kkpmFlag: [...payload.data],
      },
      action: type,
    }),
    [CONST.GET_CHECK_ISSUED_POLICY_FAILED]: () => ({
      ...state,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
