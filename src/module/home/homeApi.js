import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getPolicyApi = (payload) => {
  return api.post(API.POLICY.inquiry, payload);
};

export const setLinkPolicyApi = (payload) => {
  return api.post(API.POLICY.link, payload);
};

export const getPoliciesApi = (payload) => {
  return api.get(API.POLICY.policy, payload);
};

export const getCheckPolisApi = (payload) => {
  return api.post(API.POLICY.checkpolis, payload);
};
export const getNotifCountApi = () => {
  return api.get(`${API.NOTIFICATION.getNotifCount}`);
};
export const getWidgetManfaatApi = () => {
  return api.get(`${API.POLICY.getWidgetManfaat}`);
};

export const getProductBannerApi = () => {
  return api.get(`${API.LANDING.getProductBanner}`);
};

export const getPolicyWidgetHomeApi = (payload) => {
  return api.get(API.POLICY.policyWidgetHome, payload);
};

export const getPolicyWidgetHomePublicApi = () => {
  return api.get(API.POLICY.policyWidgetHomePublic);
};

export const setCallTimeApi = () => {
  return api.post(API.LIFESAVER.setCallTime);
};

export const getListRsApi = (payload) => {
  const { search, page, limit, sort, type, lat, lng } = payload;
  if (type === '' && !lat && !lng) {
    return api.get(
      `${
        API.LIFESAVER.getListRs
      }?search=${search}&page=${page}&limit=${limit}&sort=${
        sort ? 'asc' : 'desc'
      }`
    );
  }
  if (!type && lat && lng) {
    return api.get(
      `${
        API.LIFESAVER.getListRs
      }?search=${search}&page=${page}&limit=${limit}&lat=${lat}&lng=${lng}&sort=${
        sort ? 'asc' : 'desc'
      }`
    );
  }
  if (type && lat && lng) {
    return api.get(
      `${
        API.LIFESAVER.getListRs
      }?search=${search}&page=${page}&limit=${limit}&lat=${lat}&type=${type}&lng=${lng}&sort=${
        sort ? 'asc' : 'desc'
      }`
    );
  }
  return api.get(
    `${
      API.LIFESAVER.getListRs
    }?search=${search}&page=${page}&limit=${limit}&type=${type}&sort=${
      sort ? 'asc' : 'desc'
    }`
  );
};

export const getPolicyProposalApi = (payload) => {
  return api.get(
    `${API.POLICY.getPolicyProposal}?proposalStatus=WAITING_FOR_PAYMENT`,
    payload
  );
};
