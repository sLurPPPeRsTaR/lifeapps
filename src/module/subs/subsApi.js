import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getSubscriptionsApi = () => {
  return api.get(`${API.SUBS.getSubscriptions}?page=1&limit=100`);
};

export const getSubscriptionDetailApi = (payload) => {
  return api.get(`${API.SUBS.getSubscriptionDetail}/${payload}`);
};

export const getBillsApi = (payload) => {
  return api.get(`${API.SUBS.getBills}/${payload.policyNo}?page=${payload.page}&limit=${payload.limit}`);
};

export const setResubscribeApi = (payload) => {
  return api.post(API.SUBS.setCancelUnsubscribe, payload);
}

export const getSubsasedApi = (payload) => {
  return api.get(`${API.SUBS.getSubscriptionDetail}/${payload}`);
};

export const setUnsubscribeApi = (payload) => {
  return api.post(API.SUBS.setUnsubscribe, payload);
}