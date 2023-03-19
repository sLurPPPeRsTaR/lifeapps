import { api } from 'ca-bootstrap/bootstrapApi';
import { encryptMpin } from 'ca-util/common';
import { API } from 'ca-util/constant';
import FormData from 'form-data';

export const getProfileDeviceApi = (payload) => {
  return api.get(API.USER.session, payload);
};
export const setProfileDeviceApi = (payload) => {
  return api.delete(`${API.USER.session}/${payload.sessionId}`);
};
export const setCreatePinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload?.pin, payload?.pin, 'CREATE_PIN');
  return api.post(API.PIN.pin, resultEncrypt);
};
export const setChangePinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload, payload?.oldPin, 'CHANGE_PIN');
  return api.put(API.PIN.pin, resultEncrypt);
};
export const getVerifyPinApi = (payload) => {
  const resultEncrypt = encryptMpin(payload, payload?.pin, 'VERIFY_PIN');
  return api.post(API.PIN.verify, resultEncrypt);
};
export const setPhoneNumberApi = (payload) => {
  return api.post(API.USER.changeMobilePhoneNumber, payload);
};
export const setEmailApi = (payload) => {
  return api.post(API.USER.changeEmail, payload);
};
export const setUploadProfileApi = (payload, onUploadProgress) => {
  const sendData = new FormData();
  sendData.append('fileName', payload?.name);
  sendData.append('file', payload);
  sendData.append('isPublic', 'false');
  sendData.append('directory', 'photos');
  return api.post(API.USER.photo, sendData, {
    onUploadProgress,
    ...{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data) => data,
    },
  });
};
export const setThumbnailApi = (payload) => {
  return api.post(API.USER.thumbnail, payload);
};
export const setUserFotoApi = (payload) => {
  return api.put(API.USER.user, payload);
};
export const setDeleteFotoProfileApi = (payload) => {
  return api.delete(`${API.USER.photo}/${payload.photoKey}`);
};
export const setDeleteUserTableApi = () => {
  return api.delete(API.USER.photo);
};
export const setCheckEmail = (payload) => {
  return api.post(API.USER.checkEmail, payload);
};
export const getCSInfoApi = () => {
  return api.get(API.META.getCSInfo);
};
export const getPersonalDataProvinceApi = (payload) => {
  return api.get(`v1/meta/getProvinsi/${payload.lang}`);
};
export const getPersonalDataCityApi = (payload) => {
  return api.get(`v1/meta/getCityById/${payload.provinceCode}/${payload.lang}`);
};
export const getPersonalDataDistrictApi = (payload) => {
  return api.get(
    `/v1/meta/getDistrictById/${payload.districtCode}/${payload.lang}`
  );
};

// OTP
export const setProfileRequestOtpApi = (payload) => {
  return api.post(API.AUTH.requestOtpByToken, payload);
};

// OTP NO LOGIN
export const setProfileRequestOtpNoLoginApi = (payload) => {
  return api.post(API.AUTH.requestOtp, payload);
};

// VERIFY OTP
export const setProfileVerifyOtpApi = (payload) => {
  return api.post(API.AUTH.verifyOtp, payload);
};

// VERIFY OTP NO LOGIN
export const setProfileVerifyOtpNoLoginApi = (payload) => {
  return api.post(API.AUTH.verifyOtpNoLogin, payload);
};

// FAQ
export const setProfileFaqApi = (payload) => {
  return api.post(API.USER.faq, payload, {
    headers: {
      Language: payload.lang,
    },
  });
};

// NOLOGINFAQ
export const setProfileNoLoginFaqApi = (payload) => {
  return api.post(API.USER.noLoginFaq, payload, {
    headers: {
      Language: payload.lang,
    },
  });
};

// USER ID CARD INFO
export const getUserIDCardInfoApi = (payload) => {
  return api.post(API.KYC.getUserIdentityCardInfo, payload);
};

// ADDRESS LIST
export const getAddressListApi = (payload) => {
  return api.get(API.USER.address, payload);
};

// SAVE ADDRESS
export const setSaveAddressApi = (payload) => {
  return api.post(API.USER.address, payload);
};

// UPDATE ADDRESS
export const setUpdateAddressApi = (payload) => {
  return api.put(API.USER.address, payload);
};

// DELETE ADDRESS
export const setDeleteAddressApi = (payload) => {
  return api.delete(`${API.USER.address}/${payload.id}`);
};

// DELETE ACCOUNT
export const setDeleteAccountApi = (payload) => {
  return api.delete(API.AUTH.delete, payload);
};

// Address API
// PROVINCE
export const getProfileProvinceApi = (payload) => {
  return api.get(`${API.META.getProvinsi}/${payload?.lang}`);
};
// CITY
export const getProfileCityApi = (payload) => {
  return api.get(`${API.META.getCityById}/${payload?.code}/${payload?.lang}`);
};
// DISTRICT
export const getProfileDistrictApi = (payload) => {
  return api.get(
    `${API.META.getDistrictById}/${payload?.code}/${payload?.lang}`
  );
};
// SUBDISTRICT
export const getProfileSubDistrictApi = (payload) => {
  return api.get(
    `${API.META.getSubDistrictById}/${payload?.code}/${payload?.lang}`
  );
};
// REFERRAL
export const getProfileReferralApi = () => {
  return api.get(API.USER.referral);
};
// userParty
export const getProfileUserPartyApi = () => {
  return api.get(API.CUSTOMER.PRODUCT.userParty);
};
