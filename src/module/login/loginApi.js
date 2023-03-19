import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const setLoginSocialApi = (payload) => {
  return api.post(API.AUTH.loginChannel, payload);
};
