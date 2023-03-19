import * as STATE from 'ca-module-login/loginInitialState';
import * as CONST from 'ca-module-login/loginConstant';
import _ from 'lodash';

const loginInitialState = {
  ...STATE.setLoginInitialState,
  ...STATE.setLoginSocialInitialState,
  action: '',
};

export const loginReducer = (state = loginInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_LOGIN]: () => ({
      ...state,
      setLoginParam: payload,
      setLoginFetch: true,
      action: type,
    }),
    [CONST.SET_LOGIN_SUCCESS]: () => ({
      ...state,
      setLoginResponse: payload,
      setLoginFetch: false,
      action: type,
    }),
    [CONST.SET_LOGIN_FAILED]: () => ({
      ...state,
      setLoginFailed: payload,
      setLoginFetch: false,
      action: type,
    }),

    [CONST.SET_LOGIN_CLEAR]: () => ({
      ...state,
      ...STATE.setLoginInitialState,
      action: type,
    }),
    [CONST.SET_LOGIN_CLEAR_SUCCESS]: () => ({
      ...state,
      ...STATE.setLoginInitialState,
      action: type,
    }),
    [CONST.SET_LOGIN_CLEAR_FAILED]: () => ({
      ...state,
      ...STATE.setLoginInitialState,
      action: type,
    }),

    [CONST.SET_LOGIN_SOCIAL]: () => ({
      ...state,
      setLoginSocialParam: payload,
      setLoginSocialFetch: true,
      action: type,
    }),
    [CONST.SET_LOGIN_SOCIAL_SUCCESS]: () => ({
      ...state,
      setLoginSocialResponse: payload,
      setLoginSocialFetch: false,
      action: type,
    }),
    [CONST.SET_LOGIN_SOCIAL_FAILED]: () => ({
      ...state,
      setLoginSocialFailed: payload,
      setLoginSocialFetch: false,
      action: type,
    }),
    [CONST.SET_LOGIN_SOCIAL_CLEAR]: () => ({
      ...state,
      ...STATE.setLoginSocialInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
