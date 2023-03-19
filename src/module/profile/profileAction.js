import * as CONST from './profileConstant';

export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});

export const setPersonalData = (payload) => ({
  type: CONST.SET_PERSONAL_DATA,
  payload,
});
export const setPersonalDataSuccess = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_SUCCESS,
  payload,
});
export const setPersonalDataFailed = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_FAILED,
  payload,
});
export const setPersonalDataClear = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_CLEAR,
  payload,
});

export const getPersonalData = (payload) => ({
  type: CONST.GET_PERSONAL_DATA,
  payload,
});
export const getPersonalDataSuccess = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_SUCCESS,
  payload,
});
export const getPersonalDataFailed = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_FAILED,
  payload,
});

export const setProfileDevice = (payload) => ({
  type: CONST.SET_PROFILEDEVICE,
  payload,
});
export const setProfileDeviceSuccess = (payload) => ({
  type: CONST.SET_PROFILEDEVICE_SUCCESS,
  payload,
});
export const setProfileDeviceFailed = (payload) => ({
  type: CONST.SET_PROFILEDEVICE_FAILED,
  payload,
});
export const setProfileDeviceClear = (payload) => ({
  type: CONST.SET_PROFILEDEVICE_CLEAR,
  payload,
});

export const getProfileDevice = (payload) => ({
  type: CONST.GET_PROFILEDEVICE,
  payload,
});
export const getProfileDeviceSuccess = (payload) => ({
  type: CONST.GET_PROFILEDEVICE_SUCCESS,
  payload,
});
export const getProfileDeviceFailed = (payload) => ({
  type: CONST.GET_PROFILEDEVICE_FAILED,
  payload,
});
export const getProfileDeviceClear = (payload) => ({
  type: CONST.GET_PROFILEDEVICE_CLEAR,
  payload,
});

export const setCreatePin = (payload) => ({
  type: CONST.SET_CREATE_PIN,
  payload,
});
export const setCreatePinSuccess = (payload) => ({
  type: CONST.SET_CREATE_PIN_SUCCESS,
  payload,
});
export const setCreatePinFailed = (payload) => ({
  type: CONST.SET_CREATE_PIN_FAILED,
  payload,
});
export const setCreatePinClear = (payload) => ({
  type: CONST.SET_CREATE_PIN_CLEAR,
  payload,
});

export const setChangePin = (payload) => ({
  type: CONST.SET_CHANGE_PIN,
  payload,
});
export const setChangePinSuccess = (payload) => ({
  type: CONST.SET_CHANGE_PIN_SUCCESS,
  payload,
});
export const setChangePinFailed = (payload) => ({
  type: CONST.SET_CHANGE_PIN_FAILED,
  payload,
});
export const setChangePinClear = (payload) => ({
  type: CONST.SET_CHANGE_PIN_CLEAR,
  payload,
});

export const getVerifyPin = (payload) => ({
  type: CONST.GET_VERIFY_PIN,
  payload,
});
export const getVerifyPinSuccess = (payload) => ({
  type: CONST.GET_VERIFY_PIN_SUCCESS,
  payload,
});
export const getVerifyPinFailed = (payload) => ({
  type: CONST.GET_VERIFY_PIN_FAILED,
  payload,
});
export const getVerifyPinClear = (payload) => ({
  type: CONST.GET_VERIFY_PIN_CLEAR,
  payload,
});

export const setChangePassword = (payload) => ({
  type: CONST.SET_CHANGE_PASSWORD,
  payload,
});
export const setChangePasswordSuccess = (payload) => ({
  type: CONST.SET_CHANGE_PASSWORD_SUCCESS,
  payload,
});
export const setChangePasswordFailed = (payload) => ({
  type: CONST.SET_CHANGE_PASSWORD_FAILED,
  payload,
});
export const setChangePasswordClear = (payload) => ({
  type: CONST.SET_CHANGE_PASSWORD_CLEAR,
  payload,
});

export const setPhoneNumber = (payload) => ({
  type: CONST.SET_PHONE_NUMBER,
  payload,
});
export const setPhoneNumberSuccess = (payload) => ({
  type: CONST.SET_PHONE_NUMBER_SUCCESS,
  payload,
});
export const setPhoneNumberFailed = (payload) => ({
  type: CONST.SET_PHONE_NUMBER_FAILED,
  payload,
});
export const setPhoneNumberClear = (payload) => ({
  type: CONST.SET_PHONE_NUMBER_CLEAR,
  payload,
});

export const setEmail = (payload) => ({
  type: CONST.SET_EMAIL,
  payload,
});
export const setEmailSuccess = (payload) => ({
  type: CONST.SET_EMAIL_SUCCESS,
  payload,
});
export const setEmailFailed = (payload) => ({
  type: CONST.SET_EMAIL_FAILED,
  payload,
});
export const setEmailClear = (payload) => ({
  type: CONST.SET_EMAIL_CLEAR,
  payload,
});

export const setUploadProfile = (payload) => ({
  type: CONST.SET_UPLOAD_PROFILE,
  payload,
});
export const setUploadProfileSuccess = (payload) => ({
  type: CONST.SET_UPLOAD_PROFILE_SUCCESS,
  payload,
});
export const setUploadProfileFailed = (payload) => ({
  type: CONST.SET_UPLOAD_PROFILE_FAILED,
  payload,
});
export const setUploadProfileClear = (payload) => ({
  type: CONST.SET_UPLOAD_PROFILE_CLEAR,
  payload,
});

export const setDeleteFotoProfile = (payload) => ({
  type: CONST.SET_DELETE_FOTO_PROFILE,
  payload,
});
export const setDeleteFotoProfileSuccess = (payload) => ({
  type: CONST.SET_DELETE_FOTO_PROFILE_SUCCESS,
  payload,
});
export const setDeleteFotoProfileFailed = (payload) => ({
  type: CONST.SET_DELETE_FOTO_PROFILE_FAILED,
  payload,
});
export const setDeleteFotoProfileClear = (payload) => ({
  type: CONST.SET_DELETE_FOTO_PROFILE_CLEAR,
  payload,
});

export const getCSInfo = (payload) => ({
  type: CONST.GET_CS_INFO,
  payload,
});
export const getCSInfoSuccess = (payload) => ({
  type: CONST.GET_CS_INFO_SUCCESS,
  payload,
});
export const getCSInfoFailed = (payload) => ({
  type: CONST.GET_CS_INFO_FAILED,
  payload,
});
export const getCSInfoClear = (payload) => ({
  type: CONST.GET_CS_INFO_CLEAR,
  payload,
});

// GET PROVINCE
export const getPersonalDataProvince = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_PROVINCE,
  payload,
});
export const getPersonalDataProvinceSuccess = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_PROVINCE_SUCCESS,
  payload,
});
export const getPersonalDataProvinceFailed = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_PROVINCE_FAILED,
  payload,
});
export const getPersonalDataProvinceClear = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_PROVINCE_CLEAR,
  payload,
});

// SET PROVINCE
export const setPersonalDataProvince = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_PROVINCE,
  payload,
});
export const setPersonalDataProvinceClear = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_PROVINCE_CLEAR,
  payload,
});

// GET CITY
export const getPersonalDataCity = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_CITY,
  payload,
});
export const getPersonalDataCitySuccess = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_CITY_SUCCESS,
  payload,
});
export const getPersonalDataCityFailed = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_CITY_FAILED,
  payload,
});
export const getPersonalDataCityClear = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_CITY_CLEAR,
  payload,
});

// SET CITY
export const setPersonalDataCity = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_CITY,
  payload,
});
export const setPersonalDataCityClear = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_CITY_CLEAR,
  payload,
});

// GET DISTRICT
export const getPersonalDataDistrict = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_DISTRICT,
  payload,
});
export const getPersonalDataDistrictSuccess = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_DISTRICT_SUCCESS,
  payload,
});
export const getPersonalDataDistrictFailed = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_DISTRICT_FAILED,
  payload,
});
export const getPersonalDataDistrictClear = (payload) => ({
  type: CONST.GET_PERSONAL_DATA_DISTRICT_CLEAR,
  payload,
});

// SET DISTRICT
export const setPersonalDataDistrict = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_DISTRICT,
  payload,
});
export const setPersonalDataDistrictClear = (payload) => ({
  type: CONST.SET_PERSONAL_DATA_DISTRICT_CLEAR,
  payload,
});

// REQUEST OTP
export const setProfileRequestOtp = (payload) => ({
  type: CONST.SET_PROFILE_REQUEST_OTP,
  payload,
});
export const setProfileRequestOtpSuccess = (payload) => ({
  type: CONST.SET_PROFILE_REQUEST_OTP_SUCCESS,
  payload,
});
export const setProfileRequestOtpFailed = (payload) => ({
  type: CONST.SET_PROFILE_REQUEST_OTP_FAILED,
  payload,
});
export const setProfileRequestOtpClear = (payload) => ({
  type: CONST.SET_PROFILE_REQUEST_OTP_CLEAR,
  payload,
});

// VERIFY OTP
export const setProfileVerifyOtp = (payload) => ({
  type: CONST.SET_PROFILE_VERIFY_OTP,
  payload,
});
export const setProfileVerifyOtpSuccess = (payload) => ({
  type: CONST.SET_PROFILE_VERIFY_OTP_SUCCESS,
  payload,
});
export const setProfileVerifyOtpFailed = (payload) => ({
  type: CONST.SET_PROFILE_VERIFY_OTP_FAILED,
  payload,
});
export const setProfileVerifyOtpClear = (payload) => ({
  type: CONST.SET_PROFILE_VERIFY_OTP_CLEAR,
  payload,
});

// FAQ
export const setProfileFaq = (payload) => ({
  type: CONST.SET_PROFILE_FAQ,
  payload,
});
export const setProfileFaqSuccess = (payload) => ({
  type: CONST.SET_PROFILE_FAQ_SUCCESS,
  payload,
});
export const setProfileFaqFailed = (payload) => ({
  type: CONST.SET_PROFILE_FAQ_FAILED,
  payload,
});
export const setProfileFaqClear = (payload) => ({
  type: CONST.SET_PROFILE_FAQ_CLEAR,
  payload,
});

// NOLOGINFAQ
export const setProfileNoLoginFaq = (payload) => ({
  type: CONST.SET_PROFILE_NOLOGINFAQ,
  payload,
});
export const setProfileNoLoginFaqSuccess = (payload) => ({
  type: CONST.SET_PROFILE_NOLOGINFAQ_SUCCESS,
  payload,
});
export const setProfileNoLoginFaqFailed = (payload) => ({
  type: CONST.SET_PROFILE_NOLOGINFAQ_FAILED,
  payload,
});
export const setProfileNoLoginFaqClear = (payload) => ({
  type: CONST.SET_PROFILE_NOLOGINFAQ_CLEAR,
  payload,
});

// USER_ID_CARD_INFO
export const getUserIDCardInfo = (payload) => ({
  type: CONST.GET_USER_ID_CARD_INFO,
  payload,
});
export const getUserIDCardInfoSuccess = (payload) => ({
  type: CONST.GET_USER_ID_CARD_INFO_SUCCESS,
  payload,
});
export const getUserIDCardInfoFailed = (payload) => ({
  type: CONST.GET_USER_ID_CARD_INFO_FAILED,
  payload,
});
export const getUserIDCardInfoClear = (payload) => ({
  type: CONST.GET_USER_ID_CARD_INFO_CLEAR,
  payload,
});

// ADDRESS_LIST
export const getAddressList = (payload) => ({
  type: CONST.GET_ADDRESS_LIST,
  payload,
});
export const getAddressListSuccess = (payload) => ({
  type: CONST.GET_ADDRESS_LIST_SUCCESS,
  payload,
});
export const getAddressListFailed = (payload) => ({
  type: CONST.GET_ADDRESS_LIST_FAILED,
  payload,
});
export const getAddressListClear = (payload) => ({
  type: CONST.GET_ADDRESS_LIST_CLEAR,
  payload,
});

// SAVE_ADDRESS
export const setSaveAddress = (payload) => ({
  type: CONST.SET_SAVE_ADDRESS,
  payload,
});
export const setSaveAddressSuccess = (payload) => ({
  type: CONST.SET_SAVE_ADDRESS_SUCCESS,
  payload,
});
export const setSaveAddressFailed = (payload) => ({
  type: CONST.SET_SAVE_ADDRESS_FAILED,
  payload,
});
export const setSaveAddressClear = (payload) => ({
  type: CONST.SET_SAVE_ADDRESS_CLEAR,
  payload,
});

// UPDATE_ADDRESS
export const setUpdateAddress = (payload) => ({
  type: CONST.SET_UPDATE_ADDRESS,
  payload,
});
export const setUpdateAddressSuccess = (payload) => ({
  type: CONST.SET_UPDATE_ADDRESS_SUCCESS,
  payload,
});
export const setUpdateAddressFailed = (payload) => ({
  type: CONST.SET_UPDATE_ADDRESS_FAILED,
  payload,
});
export const setUpdateAddressClear = (payload) => ({
  type: CONST.SET_UPDATE_ADDRESS_CLEAR,
  payload,
});

// DELETE ACCOUNT
export const setDeleteAccount = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT,
  payload,
});
export const setDeleteAccountSuccess = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT_SUCCESS,
  payload,
});
export const setDeleteAccountFailed = (payload) => ({
  type: CONST.SET_DELETE_ACCOUNT_FAILED,
  payload,
});

// DELETE_ADDRESS
export const setDeleteAddress = (payload) => ({
  type: CONST.SET_DELETE_ADDRESS,
  payload,
});
export const setDeleteAddressSuccess = (payload) => ({
  type: CONST.SET_DELETE_ADDRESS_SUCCESS,
  payload,
});
export const setDeleteAddressFailed = (payload) => ({
  type: CONST.SET_DELETE_ADDRESS_FAILED,
  payload,
});
export const setDeleteAddressClear = (payload) => ({
  type: CONST.SET_DELETE_ADDRESS_CLEAR,
  payload,
});

// REFERRAL
export const getProfileReferral = (payload) => ({
  type: CONST.GET_PROFILE_REFERRAL,
  payload,
});
export const getProfileReferralSuccess = (payload) => ({
  type: CONST.GET_PROFILE_REFERRAL_SUCCESS,
  payload,
});
export const getProfileReferralFailed = (payload) => ({
  type: CONST.GET_PROFILE_REFERRAL_FAILED,
  payload,
});
export const getProfileReferralClear = (payload) => ({
  type: CONST.GET_PROFILE_REFERRAL_CLEAR,
  payload,
});

// ADDRESS
// PROVINCE
export const getProfileProvince = (payload) => ({
  type: CONST.GET_PROFILE_PROVINCE,
  payload,
});
export const getProfileProvinceSuccess = (payload) => ({
  type: CONST.GET_PROFILE_PROVINCE_SUCCESS,
  payload,
});
export const getProfileProvinceFailed = (payload) => ({
  type: CONST.GET_PROFILE_PROVINCE_FAILED,
  payload,
});
export const getProfileProvinceClear = (payload) => ({
  type: CONST.GET_PROFILE_PROVINCE_CLEAR,
  payload,
});
// CITY
export const getProfileCity = (payload) => ({
  type: CONST.GET_PROFILE_CITY,
  payload,
});
export const getProfileCitySuccess = (payload) => ({
  type: CONST.GET_PROFILE_CITY_SUCCESS,
  payload,
});
export const getProfileCityFailed = (payload) => ({
  type: CONST.GET_PROFILE_CITY_FAILED,
  payload,
});
export const getProfileCityClear = (payload) => ({
  type: CONST.GET_PROFILE_CITY_CLEAR,
  payload,
});
// DISTRICT
export const getProfileDistrict = (payload) => ({
  type: CONST.GET_PROFILE_DISTRICT,
  payload,
});
export const getProfileDistrictSuccess = (payload) => ({
  type: CONST.GET_PROFILE_DISTRICT_SUCCESS,
  payload,
});
export const getProfileDistrictFailed = (payload) => ({
  type: CONST.GET_PROFILE_DISTRICT_FAILED,
  payload,
});
export const getProfileDistrictClear = (payload) => ({
  type: CONST.GET_PROFILE_DISTRICT_CLEAR,
  payload,
});
// SUB_DISTRICT
export const getProfileSubDistrict = (payload) => ({
  type: CONST.GET_PROFILE_SUB_DISTRICT,
  payload,
});
export const getProfileSubDistrictSuccess = (payload) => ({
  type: CONST.GET_PROFILE_SUB_DISTRICT_SUCCESS,
  payload,
});
export const getProfileSubDistrictFailed = (payload) => ({
  type: CONST.GET_PROFILE_SUB_DISTRICT_FAILED,
  payload,
});
export const getProfileSubDistrictClear = (payload) => ({
  type: CONST.GET_PROFILE_SUB_DISTRICT_CLEAR,
  payload,
});

// userParty
export const getProfileUserParty = (payload) => ({
  type: CONST.GET_PROFILE_USER_PARTY,
  payload,
});
export const getProfileUserPartySuccess = (payload) => ({
  type: CONST.GET_PROFILE_USER_PARTY_SUCCESS,
  payload,
});
export const getProfileUserPartyFailed = (payload) => ({
  type: CONST.GET_PROFILE_USER_PARTY_FAILED,
  payload,
});
export const getProfileUserPartyClear = (payload) => ({
  type: CONST.GET_PROFILE_USER_PARTY_CLEAR,
  payload,
});
