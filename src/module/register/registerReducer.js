import * as STATE from 'ca-module-register/registerInitialState';
import * as CONST from 'ca-module-register/registerConstant';

const registerInitialState = {
  ...STATE.setRequestOtpInitialState,
  ...STATE.setRegisterInitialState,
  ...STATE.setRegisterSocialInitialState,
  ...STATE.getInquiryPolicyNoInitialState,
  ...STATE.getCheckLinkPolicyNoInitialState,
  action: '',
};

export const registerReducer = (state = registerInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_REGISTER_OTP]: () => ({
      ...state,
      setResendRegisterOtp: payload.setResendRegisterOtp,
      setRequestOtpParam: { ...payload, setResendRegisterOtp: undefined },
      setRequestOtpFetch: true,
      action: type,
    }),
    [CONST.SET_REGISTER_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_OTP_FAILED]: () => ({
      ...state,
      setRequestOtpFailed: payload,
      setRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_OTP_CLEAR]: () => ({
      ...state,
      setRequestOtpFailed: registerInitialState.setRequestOtpFailed,
      setRequestOtpFetch: registerInitialState.setRequestOtpFetch,
      setResendRegisterOtp: registerInitialState.setResendRegisterOtp,
      action: type,
    }),

    [CONST.SET_REGISTER]: () => ({
      ...state,
      setRegisterParam: payload,
      setRegisterFetch: true,
      action: type,
    }),
    [CONST.SET_REGISTER_SUCCESS]: () => ({
      ...state,
      setRegisterResponse: payload,
      setRegisterFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_FAILED]: () => ({
      ...state,
      setRegisterFailed: payload,
      setRegisterFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_CLEAR]: () => ({
      ...state,
      setRegisterFailed: registerInitialState.setRegisterFailed,
      setRegisterFetch: registerInitialState.setRegisterFetch,
      action: type,
    }),

    [CONST.SET_REGISTER_SOCIAL]: () => ({
      ...state,
      setRegisterSocialParam: payload,
      setRegisterSocialFetch: true,
      action: type,
    }),
    [CONST.SET_REGISTER_SOCIAL_SUCCESS]: () => ({
      ...state,
      setRegisterSocialResponse: payload,
      setRegisterSocialFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_SOCIAL_FAILED]: () => ({
      ...state,
      setRegisterSocialFailed: payload,
      setRegisterSocialFetch: false,
      action: type,
    }),
    [CONST.SET_REGISTER_SOCIAL_CLEAR]: () => ({
      ...state,
      setRegisterSocialFailed: registerInitialState.setRegisterSocialFailed,
      setRegisterSocialFetch: registerInitialState.setRegisterFetch,
      action: type,
    }),

    [CONST.GET_INQUIRY_POLICY_NO]: () => ({
      ...state,
      getInquiryPolicyNoParam: payload,
      getInquiryPolicyNoFetch: true,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_SUCCESS]: () => ({
      ...state,
      getInquiryPolicyNoResponse: payload,
      getInquiryPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_FAILED]: () => ({
      ...state,
      getInquiryPolicyNoFailed: payload,
      getInquiryPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_INQUIRY_POLICY_NO_CLEAR]: () => ({
      ...state,
      getInquiryPolicyNoFailed: registerInitialState.getInquiryPolicyNoFailed,
      getInquiryPolicyNoFetch: registerInitialState.setRegisterFetch,
      action: type,
    }),

    [CONST.GET_CHECK_LINK_POLICY_NO]: () => ({
      ...state,
      getCheckLinkPolicyNoParam: payload,
      getCheckLinkPolicyNoFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_SUCCESS]: () => ({
      ...state,
      getCheckLinkPolicyNoResponse: payload,
      getCheckLinkPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_FAILED]: () => ({
      ...state,
      getCheckLinkPolicyNoFailed: payload,
      getCheckLinkPolicyNoFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_LINK_POLICY_NO_CLEAR]: () => ({
      ...state,
      getCheckLinkPolicyNoFailed:
        registerInitialState.getCheckLinkPolicyNoFailed,
      getCheckLinkPolicyNoFetch: registerInitialState.setRegisterFetch,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
