import * as CONST from './authConstant';

export const setDeviceId = (payload) => ({
  type: CONST.SET_DEVICE_ID,
  payload,
});
export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});
export const setAuth = (payload) => ({
  type: CONST.SET_AUTH,
  payload,
});
export const setToken = (payload) => ({
  type: CONST.SET_TOKEN,
  payload,
});
export const setUserData = (payload) => ({
  type: CONST.SET_USER_DATA,
  payload,
});
export const setWidgetToggle = (payload) => ({
  type: CONST.SET_WIDGET_TOGGLE,
  payload,
});

export const setClearAuth = (payload) => ({
  type: CONST.SET_CLEAR_AUTH,
  payload,
});
export const setClearAuthSuccess = (payload) => ({
  type: CONST.SET_CLEAR_AUTH_SUCCESS,
  payload,
});
export const setClearAuthFailed = (payload) => ({
  type: CONST.SET_CLEAR_AUTH_FAILED,
  payload,
});

export const setLogout = (payload) => ({
  type: CONST.SET_LOGOUT,
  payload,
});
export const setLogoutSuccess = (payload) => ({
  type: CONST.SET_LOGOUT_SUCCESS,
  payload,
});
export const setLogoutFailed = (payload) => ({
  type: CONST.SET_LOGOUT_FAILED,
  payload,
});
export const setLogoutClear = (payload) => ({
  type: CONST.SET_LOGOUT_CLEAR,
  payload,
});

export const setClearRefreshToken = (payload) => ({
  type: CONST.SET_CLEAR_REFRESH_TOKEN,
  payload,
});

export const getCheckIssuedPolicy = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY,
  payload,
});
export const getCheckIssuedPolicySuccess = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY_SUCCESS,
  payload,
});
export const getCheckIssuedPolicyFailed = (payload) => ({
  type: CONST.GET_CHECK_ISSUED_POLICY_FAILED,
  payload,
});
