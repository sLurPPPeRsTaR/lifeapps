import { api } from 'ca-bootstrap/bootstrapApi';
import { encryptMpin } from 'ca-util/common';
import { API, LIVENESS_X_ADVAI_KEY } from 'ca-util/constant';
import FormData from 'form-data';

// SELFIE
export const setKycSelfieApi = (payload) => {
  return api.post(API.KYC.selfie, payload);
};

// ID CARD
export const setKycIdCardApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('category', 'E_KYC_LIFE_PLUS');
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

// VERIFY ID CARD
export const setKycVerifyIdCardApi = (payload) => {
  return api.put(API.KYC.verifyIdCard, payload);
};

// PIN
export const setKycPinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload?.pin, payload?.pin, 'CREATE_PIN');
  return api.post(API.PIN.pin, resultEncrypt);
};

// SET LIVENESS LICENSE
export const setLivenessLicenseApi = () => {
  return api.post(
    API.KYC.livenessLicense,
    {},
    {
      headers: {
        'X-ADVAI-KEY': LIVENESS_X_ADVAI_KEY,
      },
    }
  );
};

// GET LIVENESS RESULT
export const setLivenessResultApi = (payload) => {
  return api.post(API.KYC.livenessResult, payload, {
    headers: {
      'X-ADVAI-KEY': LIVENESS_X_ADVAI_KEY,
    },
  });
};

// VERIFY DUKCAPIL
export const setKycVerifyDukcapilApi = (payload) => {
  return api.post(API.KYC.verifyDukcapil, payload);
};

// FACECOMPARE
export const setKycFaceCompareApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', '');
  sendData.append('file', '');
  sendData.append('category', payload?.category);
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

// RATING
export const setKycRatingApi = (payload) => {
  return api.post(API.USER.rating, payload);
};

// ADD POSTALCODE FOR ID CARD
export const setAddPostalCodeKycIdCardApi = (payload) => {
  return api.put(API.KYC.idCard, payload);
};

// REFACECOMPARE
export const setKycReFaceCompareApi = () => {
  return api.post(`${API.KYC.faceCompare}/retry`);
};
