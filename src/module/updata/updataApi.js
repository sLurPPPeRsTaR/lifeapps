import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

// Liveness
export const setUpdataLivenessApi = (payload) => {
  return api.post(API.KYC.selfie, payload);
};
// export const setUpdataLivenessApi = (payload, onUploadProgress) => {
//   const sendData = new FormData();
//   sendData.append('fileName', payload?.name);
//   sendData.append('file', payload);
//   sendData.append('category', 'E_KYC_UPDATE_DATA');
//   return api.post(API.KYC.selfie, sendData, {
//     onUploadProgress,
//     ...{
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       transformRequest: (data) => data,
//     },
//   });
// };

// KTP
export const setUpdataKTPApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_UPDATE_DATA');
  return api.post(API.KYC.idCard, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

// KK
export const setUpdataKKApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_UPDATE_DATA');
  return api.post(API.KYC.familyCard, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

export const getUpdataLastKTPInfoApi = (payload) => {
  const { category, certificateNo, policyNo, source } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.get(`${API.POLICY.getLastKTPInformation}?${queryParams}`);
};

export const getUpdataLastKKInfoApi = (payload) => {
  const { category, certificateNo, policyNo, source } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.get(`${API.POLICY.getLastKKInformation}?${queryParams}`);
};

export const getUpdataLastOtherInfoApi = (payload) => {
  const { category, certificateNo, policyNo, source } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.get(`${API.POLICY.getLastOtherInformation}?${queryParams}`);
};
export const setUpdataCheckKKKTPApi = (payload) => {
  const { category, certificateNo, policyNo, source, ...newPayload } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.post(`${API.POLICY.checkKKAndKTP}?${queryParams}`, newPayload);
};

export const setUpdataVerifyPengkinianApi = (payload) => {
  return api.put(API.KYC.verifyUpdata, payload);
};

export const getUpdataListBankApi = (payload) => {
  return api.get(API.POLICY.getListBank, payload);
};
// OTP
export const setUpdataRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtpByToken, payload);
};

// VERIFY OTP
export const setUpdataVerifyOtpApi = (payload) => {
  return api.post(API.AUTH.verifyOtp, payload);
};

// INQUIRY DOMESTIC ACCOUNT
export const getInquiryDomesticAccountApi = (payload) => {
  const sendData = new FormData();
  sendData.append('beneficiaryBankCode', payload?.beneficiaryBankCode);
  sendData.append(
    'beneficiaryAccountNumber',
    payload?.beneficiaryAccountNumber
  );
  return api.post(API.PAYMENT.inquiryDomesticAccount, sendData, {
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
};

// INQUIRY BANK ACCOUNT
export const setUpdataInquiryBankAccountApi = (payload) => {
  return api.post(API.POLICY.inquiryBankAccount, payload);
};

// Address API
// PROVINCE
export const getUpdataProvinceApi = () => {
  return api.get(`${API.POLICY.policyInqury.master.province}`);
};
// CITY
export const getUpdataCityApi = (payload) => {
  return api.get(`${API.POLICY.policyInqury.master.city}/${payload?.code}`);
};
// DISTRICT
export const getUpdataDistrictApi = (payload) => {
  return api.get(`${API.POLICY.policyInqury.master.district}/${payload?.code}`);
};
// SUBDISTRICT
export const getUpdataSubDistrictApi = (payload) => {
  return api.get(
    `${API.POLICY.policyInqury.master.subDistrict}/${payload?.code}`
  );
};

// Alter Policies
export const setUpdataAlterPoliciesApi = (payload) => {
  const { category, certificateNo, policyNo, source, ...newPayload } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.put(`${API.POLICY.policy}?${queryParams}`, newPayload);
};

// Get Detail EKYC
export const getUpdataDetailEKycApi = (payload) => {
  return api.get(API.KYC.getDetailEKyc, payload);
};

// BANK UPLOAD
export const setUpdataBankUploadApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  return api.post(API.POLICY.bankUpload, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

// FACECOMPARE
export const setUpdataFaceCompareApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_UPDATE_DATA');
  return api.post(API.KYC.faceCompare, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};

// Get Updata Validation Check
export const getUpdataValidationCheckApi = (payload) => {
  const { category, certificateNo, policyNo, source } = payload;
  const queryParams = encodeURI(
    `category=${category}&certificateNo=${certificateNo}&policyNo=${policyNo}&source=${source}`
  );
  return api.get(`${API.POLICY.validationCheck}?${queryParams}`);
};
