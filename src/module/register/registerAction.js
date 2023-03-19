import * as CONST from './registerConstant';

export const setRequestOtp = (payload) => ({
  type: CONST.SET_REGISTER_OTP,
  payload,
});
export const setRequestOtpSuccess = (payload) => ({
  type: CONST.SET_REGISTER_OTP_SUCCESS,
  payload,
});
export const setRequestOtpFailed = (payload) => ({
  type: CONST.SET_REGISTER_OTP_FAILED,
  payload,
});
export const setRequestOtpClear = (payload) => ({
  type: CONST.SET_REGISTER_OTP_CLEAR,
  payload,
});

export const setRegister = (payload) => ({
  type: CONST.SET_REGISTER,
  payload,
});
export const setRegisterSuccess = (payload) => ({
  type: CONST.SET_REGISTER_SUCCESS,
  payload,
});
export const setRegisterFailed = (payload) => ({
  type: CONST.SET_REGISTER_FAILED,
  payload,
});
export const setRegisterClear = (payload) => ({
  type: CONST.SET_REGISTER_CLEAR,
  payload,
});

export const setRegisterSocial = (payload) => ({
  type: CONST.SET_REGISTER_SOCIAL,
  payload,
});
export const setRegisterSocialSuccess = (payload) => ({
  type: CONST.SET_REGISTER_SOCIAL_SUCCESS,
  payload,
});
export const setRegisterSocialFailed = (payload) => ({
  type: CONST.SET_REGISTER_SOCIAL_FAILED,
  payload,
});
export const setRegisterSocialClear = (payload) => ({
  type: CONST.SET_REGISTER_SOCIAL_CLEAR,
  payload,
});

export const getInquiryPolicyNo = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO,
  payload,
});
export const getInquiryPolicyNoSuccess = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_SUCCESS,
  payload,
});
export const getInquiryPolicyNoFailed = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_FAILED,
  payload,
});
export const getInquiryPolicyNoClear = (payload) => ({
  type: CONST.GET_INQUIRY_POLICY_NO_CLEAR,
  payload,
});

export const getCheckLinkPolicyNo = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO,
  payload,
});
export const getCheckLinkPolicyNoSuccess = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_SUCCESS,
  payload,
});
export const getCheckLinkPolicyNoFailed = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_FAILED,
  payload,
});
export const getCheckLinkPolicyNoClear = (payload) => ({
  type: CONST.GET_CHECK_LINK_POLICY_NO_CLEAR,
  payload,
});
