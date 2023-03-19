import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getProductApi = (payload) => {
  return api.get(
    `${API.LIFESAVER.getProduct}?productCode=${payload?.productCode}&planCode=${payload?.planCode}`
  );
};

export const getListRsApi = (payload) => {
  const { search, page, limit, sort, type } = payload;
  if (type === '') {
    return api.get(
      `${
        API.LIFESAVER.getListRs
      }?search=${search}&page=${page}&limit=${limit}&sort=${
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

export const getPersonalRiplayApi = () => {
  return api.get(API.LIFESAVER.getPersonalRiplay, {
    responseType: 'blob',
  });
};

export const setSubmissionApi = (payload) => {
  return api.post(API.LIFESAVER.setSubmission, payload);
};

export const getCurrentSubsApi = () => {
  return api.get(API.LIFESAVER.getCurrentSubs);
};

export const getCampaignApi = (payload = '') => {
  return api.get(`${API.LIFESAVER.getCampaign}?eventCode=${payload}`);
};

export const getPolicyDetailApi = ({ policyNo, productCode, source }) => {
  return api.get(
    `${API.LIFESAVER.getPolicyDetail}policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};

export const setWaitingApi = () => {
  return api.post(API.LIFESAVER.setWaiting);
};

export const getIsUserEligibleApi = (payload = '') => {
  return api.get(`${API.INVITATION.getIsUserEligible}?channel=${payload}`);
};

export const setPersonEligibleApi = (payload) => {
  return api.post(API.LIFESAVER.setPersonEligible, payload);
};

export const getEligiblePosApi = () => {
  return api.get(API.LIFESAVER.getEligiblePos);
};

export const getTotalClaimApi = () => {
  return api.post(API.CUSTOMER.CLAIM.totalClaim);
};
