import * as CONST from 'ca-module-login/loginConstant';

export const setLogin = (payload) => ({
  type: CONST.SET_LOGIN,
  payload,
});
export const setLoginSuccess = (payload) => ({
  type: CONST.SET_LOGIN_SUCCESS,
  payload,
});
export const setLoginFailed = (payload) => ({
  type: CONST.SET_LOGIN_FAILED,
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
  type: CONST.SET_LOGOUT_SUCCESS_FAILED,
  payload,
});

export const setLoginClear = (payload) => ({
  type: CONST.SET_LOGIN_CLEAR,
  payload,
});
export const setLoginClearSuccess = (payload) => ({
  type: CONST.SET_LOGIN_CLEAR_SUCCESS,
  payload,
});
export const setLoginClearFailed = (payload) => ({
  type: CONST.SET_LOGIN_CLEAR_FAILED,
  payload,
});

export const setLoginSocial = (payload) => ({
  type: CONST.SET_LOGIN_SOCIAL,
  payload,
});
export const setLoginSocialSuccess = (payload) => ({
  type: CONST.SET_LOGIN_SOCIAL_SUCCESS,
  payload,
});
export const setLoginSocialFailed = (payload) => ({
  type: CONST.SET_LOGIN_SOCIAL_FAILED,
  payload,
});
export const setLoginSocialClear = (payload) => ({
  type: CONST.SET_LOGIN_SOCIAL_CLEAR,
  payload,
});
