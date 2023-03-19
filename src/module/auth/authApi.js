import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const setClearAuthApi = (payload) => {
  const { ...sendData } = payload;
  return api.post(API.AUTH.logout, {
    ...sendData,
  });
};

export const setRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtp, {
    id: payload?.id,
    action: payload?.action,
  });
};

export const setLoginApi = (payload) => {
  return api.post(API.AUTH.login, payload);
};

export const setLogoutApi = (payload) => {
  return api.post(API.AUTH.logout, payload);
};

export const setResetPasswordApi = (payload) => {
  return api.post(API.AUTH.resetPassword, payload);
};

export const setChangePasswordApi = (payload) => {
  return api.post(API.AUTH.changePassword, payload);
};

export const setPersonalDataApi = (payload) => {
  return api.put(API.USER.user, payload);
};

export const getPersonalDataApi = (payload) => {
  return api.get(API.USER.user, payload);
};

export const getCheckIssuedPolicyApi = (payload) => {
  return api.get(API.POLICY.checkIssuedPolicy, payload);
};

export const getUserFlagApi = (payload) => {
  return api.get(API.USER.userFlag, payload);
};
