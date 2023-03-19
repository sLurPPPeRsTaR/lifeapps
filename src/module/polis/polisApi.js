import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';
// import CryptoJS from 'crypto-js';

// const encrypt = (content) => {
//   const key = CryptoJS.enc.Latin1.parse(DETAIL_POLICY_SECRET_KEY);
//   const encryptResult = CryptoJS.AES.encrypt(content, key, {
//     iv: key,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return encryptResult.toString();
// };

export const getPolicySummaryApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.summary}?policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};

export const getPolicySelfDataApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.selfData}?policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};

export const getPolicyBenefitApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.benefit}?policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};

export const getPolicyFundsApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.funds}?policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};

export const getPolicyClaimApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  const { limit, page } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.claim}?policyNo=${policyNo}&productCode=${productCode}&source=${source}&limit=${limit}&page=${page}`
  );
};

export const getPolicyClaimDetailApi = (payload) => {
  let { policyNo, productCode, source, claimNo } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  claimNo = encodeURIComponent(claimNo);
  return api.get(
    `${API.POLICY.detailClaim}?policyNo=${policyNo}&productCode=${productCode}&source=${source}&claimNo=${claimNo}`
  );
};

export const getPolicyDownloadApi = (payload) => {
  let { policyNo, productCode, source } = payload;
  policyNo = encodeURIComponent(policyNo);
  productCode = encodeURIComponent(productCode);
  source = encodeURIComponent(source);
  return api.get(
    `${API.POLICY.download}/privateDocument?policyNo=${policyNo}&productCode=${productCode}&source=${source}`
  );
};
