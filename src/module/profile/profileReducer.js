import _ from 'lodash';
import * as CONST from 'ca-module-profile/profileConstant';
import * as STATE from 'ca-module-profile/profileInitialState';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';

const profileInitialState = {
  ...STATE.setPersonalDataInitialState,
  ...STATE.setProfileDeviceInitialState,
  ...STATE.getProfileDeviceInitialState,
  ...STATE.getPersonalDataInitialState,
  ...STATE.setCreatePinInitialState,
  ...STATE.setChangePinInitialState,
  ...STATE.getVerifyPinInitialState,
  ...STATE.setChangePasswordInitialState,
  ...STATE.setPhoneNumberInitialState,
  ...STATE.setEmailInitialState,
  ...STATE.setUploadProfileInitialState,
  ...STATE.setDeleteFotoProfileInitialState,
  ...STATE.getCSInfoInitialState,
  ...STATE.getPersonalDataProvinceInitialState,
  ...STATE.setPersonalDataProvinceInitialState,
  ...STATE.getPersonalDataCityInitialState,
  ...STATE.setPersonalDataCityInitialState,
  ...STATE.getPersonalDataDistrictInitialState,
  ...STATE.setPersonalDataDistrictInitialState,
  ...STATE.setProfileRequestOtpInitialState,
  ...STATE.setProfileVerifyOtpInitialState,
  ...STATE.setProfileFaqInitialState,
  ...STATE.setProfileNoLoginFaqInitialState,
  ...STATE.getUserIDCardInfoInitialState,
  ...STATE.getAddressListInitialState,
  ...STATE.setSaveAddressInitialState,
  ...STATE.setUpdateAddressInitialState,
  ...STATE.setDeleteAddressInitialState,
  ...STATE.getProfileProvinceInitialState,
  ...STATE.getProfileCityInitialState,
  ...STATE.getProfileDistrictInitialState,
  ...STATE.getProfileSubDistrictInitialState,
  ...STATE.getProfileReferralInitialState,
  ...STATE.getProfileUserPartyInitialState,
  action: '',
};

export const profileReducer = (state = profileInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(profileInitialState),
    }),
    [CONST.SET_PERSONAL_DATA]: () => ({
      ...state,
      setPersonalDataParam: payload,
      setPersonalDataFetch: true,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_SUCCESS]: () => ({
      ...state,
      setPersonalDataResponse: payload,
      setPersonalDataFetch: false,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_FAILED]: () => ({
      ...state,
      setPersonalDataFailed: payload,
      setPersonalDataFetch: false,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_CLEAR]: () => ({
      ...state,
      ...STATE.setPersonalDataInitialState,
      action: type,
    }),

    [CONST.GET_PERSONAL_DATA]: () => ({
      ...state,
      getPersonalDataParam: payload,
      getPersonalDataFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_SUCCESS]: () => ({
      ...state,
      getPersonalDataResponse: payload?.data?.userData,
      getPersonalDataFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_FAILED]: () => ({
      ...state,
      getPersonalDataFailed: payload,
      getPersonalDataFetch: false,
      action: type,
    }),

    [CONST.SET_PROFILEDEVICE]: () => ({
      ...state,
      setProfileDeviceParam: payload,
      setProfileDeviceFetch: true,
      action: type,
    }),
    [CONST.SET_PROFILEDEVICE_SUCCESS]: () => ({
      ...state,
      setProfileDeviceResponse: payload,
      setProfileDeviceFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILEDEVICE_FAILED]: () => ({
      ...state,
      setProfileDeviceFailed: payload,
      setProfileDeviceFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILEDEVICE_CLEAR]: () => ({
      ...state,
      ...STATE.setProfileDeviceInitialState,
      action: type,
    }),

    [CONST.GET_PROFILEDEVICE]: () => ({
      ...state,
      getProfileDeviceParam: payload,
      getProfileDeviceFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILEDEVICE_SUCCESS]: () => ({
      ...state,
      getProfileDeviceResponse: payload,
      getProfileDeviceFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILEDEVICE_FAILED]: () => ({
      ...state,
      getProfileDeviceFailed: payload,
      getProfileDeviceFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILEDEVICE_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileDeviceInitialState,
      action: type,
    }),
    // Create Pin
    [CONST.SET_CREATE_PIN]: () => ({
      ...state,
      setCreatePinParam: payload,
      setCreatePinFetch: true,
      action: type,
    }),
    [CONST.SET_CREATE_PIN_SUCCESS]: () => ({
      ...state,
      setCreatePinResponse: payload,
      setCreatePinFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_PIN_FAILED]: () => ({
      ...state,
      setCreatePinFailed: payload,
      setCreatePinFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setCreatePinInitialState,
      action: type,
    }),
    // Change Pin
    [CONST.SET_CHANGE_PIN]: () => ({
      ...state,
      setChangePinParam: payload,
      setChangePinFetch: true,
      action: type,
    }),
    [CONST.SET_CHANGE_PIN_SUCCESS]: () => ({
      ...state,
      setChangePinResponse: payload,
      setChangePinFetch: false,
      action: type,
    }),
    [CONST.SET_CHANGE_PIN_FAILED]: () => ({
      ...state,
      setChangePinFailed: payload,
      setChangePinFetch: false,
      action: type,
    }),
    [CONST.SET_CHANGE_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setChangePinInitialState,
      action: type,
    }),
    // Verify Pin
    [CONST.GET_VERIFY_PIN]: () => ({
      ...state,
      getVerifyPinParam: payload,
      getVerifyPinFetch: true,
      action: type,
    }),
    [CONST.GET_VERIFY_PIN_SUCCESS]: () => ({
      ...state,
      getVerifyPinResponse: payload,
      getVerifyPinFetch: false,
      action: type,
    }),
    [CONST.GET_VERIFY_PIN_FAILED]: () => ({
      ...state,
      getVerifyPinFailed: payload,
      getVerifyPinFetch: false,
      action: type,
    }),
    [CONST.GET_VERIFY_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.getVerifyPinInitialState,
      action: type,
    }),

    // Set Phone Number
    [CONST.SET_PHONE_NUMBER]: () => ({
      ...state,
      setPhoneNumberParam: payload,
      setPhoneNumberFetch: true,
      action: type,
    }),
    [CONST.SET_PHONE_NUMBER_SUCCESS]: () => ({
      ...state,
      setPhoneNumberResponse: payload,
      setPhoneNumberFetch: false,
      action: type,
    }),
    [CONST.SET_PHONE_NUMBER_FAILED]: () => ({
      ...state,
      setPhoneNumberFailed: payload,
      setPhoneNumberFetch: false,
      action: type,
    }),
    [CONST.SET_PHONE_NUMBER_CLEAR]: () => ({
      ...state,
      ...STATE.setPhoneNumberInitialState,
      action: type,
    }),

    // Set Email
    [CONST.SET_EMAIL]: () => ({
      ...state,
      setEmailParam: payload,
      setEmailFetch: true,
      action: type,
    }),
    [CONST.SET_EMAIL_SUCCESS]: () => ({
      ...state,
      setEmailResponse: payload,
      setEmailFetch: false,
      action: type,
    }),
    [CONST.SET_EMAIL_FAILED]: () => ({
      ...state,
      setEmailFailed: payload,
      setEmailFetch: false,
      action: type,
    }),
    [CONST.SET_EMAIL_CLEAR]: () => ({
      ...state,
      ...STATE.setEmailInitialState,
      action: type,
    }),

    // Change Password
    [CONST.SET_CHANGE_PASSWORD]: () => ({
      ...state,
      setChangePasswordParam: payload,
      setChangePasswordFetch: true,
      action: type,
    }),
    [CONST.SET_CHANGE_PASSWORD_SUCCESS]: () => ({
      ...state,
      setChangePasswordResponse: payload,
      setChangePasswordFetch: false,
      action: type,
    }),
    [CONST.SET_CHANGE_PASSWORD_FAILED]: () => ({
      ...state,
      setChangePasswordFailed: payload,
      setChangePasswordFetch: false,
      action: type,
    }),
    [CONST.SET_CHANGE_PASSWORD_CLEAR]: () => ({
      ...state,
      ...STATE.setChangePasswordInitialState,
      action: type,
    }),

    // Set Upload Profile
    [CONST.SET_UPLOAD_PROFILE]: () => ({
      ...state,
      setUploadProfileParam: payload,
      setUploadProfileFetch: true,
      action: type,
    }),
    [CONST.SET_UPLOAD_PROFILE_SUCCESS]: () => ({
      ...state,
      setUploadProfileResponse: payload,
      setUploadProfileFetch: false,
      action: type,
    }),
    [CONST.SET_UPLOAD_PROFILE_FAILED]: () => ({
      ...state,
      setUploadProfileFailed: payload,
      setUploadProfileFetch: false,
      action: type,
    }),
    [CONST.SET_UPLOAD_PROFILE_CLEAR]: () => ({
      ...state,
      ...STATE.setUploadProfileInitialState,
      action: type,
    }),

    // Set Delete Profile
    [CONST.SET_DELETE_FOTO_PROFILE]: () => ({
      ...state,
      setDeleteFotoProfileParam: payload,
      setDeleteFotoProfileFetch: true,
      action: type,
    }),
    [CONST.SET_DELETE_FOTO_PROFILE_SUCCESS]: () => ({
      ...state,
      setDeleteFotoProfileResponse: payload,
      setDeleteFotoProfileFetch: false,
      action: type,
    }),
    [CONST.SET_DELETE_FOTO_PROFILE_FAILED]: () => ({
      ...state,
      setDeleteFotoProfileFailed: payload,
      setDeleteFotoProfileFetch: false,
      action: type,
    }),
    [CONST.SET_DELETE_FOTO_PROFILE_CLEAR]: () => ({
      ...state,
      ...STATE.setDeleteFotoProfileInitialState,
      action: type,
    }),

    // Get CS Info
    [CONST.GET_CS_INFO]: () => ({
      ...state,
      getCSInfoParam: payload,
      getCSInfoFetch: true,
      action: type,
    }),
    [CONST.GET_CS_INFO_SUCCESS]: () => ({
      ...state,
      getCSInfoResponse: payload,
      getCSInfoFetch: false,
      action: type,
    }),
    [CONST.GET_CS_INFO_FAILED]: () => ({
      ...state,
      getCSInfoFailed: payload,
      getCSInfoFetch: false,
      action: type,
    }),
    [CONST.GET_CS_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getCSInfoInitialState,
      action: type,
    }),

    // GET PERSONAL DATA PROVINCE
    [CONST.GET_PERSONAL_DATA_PROVINCE]: () => ({
      ...state,
      getPersonalDataProvinceParam: payload,
      getPersonalDataProvinceFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_PROVINCE_SUCCESS]: () => ({
      ...state,
      getPersonalDataProvinceResponse: payload,
      getPersonalDataProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_PROVINCE_FAILED]: () => ({
      ...state,
      getPersonalDataProvinceFailed: payload,
      getPersonalDataProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_PROVINCE_CLEAR]: () => ({
      ...state,
      ...STATE.getPersonalDataProvinceInitialState,
      action: type,
    }),

    // SET PERSONAL DATA PROVINCE
    [CONST.SET_PERSONAL_DATA_PROVINCE]: () => ({
      ...state,
      setPersonalDataProvinceParam: payload,
      setPersonalDataProvinceFetch: true,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_PROVINCE_CLEAR]: () => ({
      ...state,
      ...STATE.setPersonalDataProvinceInitialState,
      action: type,
    }),

    // GET PERSONAL DATA CITY
    [CONST.GET_PERSONAL_DATA_CITY]: () => ({
      ...state,
      getPersonalDataCityParam: payload,
      getPersonalDataCityFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_CITY_SUCCESS]: () => ({
      ...state,
      getPersonalDataCityResponse: payload,
      getPersonalDataCityFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_CITY_FAILED]: () => ({
      ...state,
      getPersonalDataCityFailed: payload,
      getPersonalDataCityFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_CITY_CLEAR]: () => ({
      ...state,
      ...STATE.getPersonalDataCityInitialState,
      action: type,
    }),

    // SET PERSONAL DATA CITY
    [CONST.SET_PERSONAL_DATA_CITY]: () => ({
      ...state,
      setPersonalDataCityParam: payload,
      setPersonalDataCityFetch: true,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_CITY_CLEAR]: () => ({
      ...state,
      ...STATE.setPersonalDataCityInitialState,
      action: type,
    }),

    // GET PERSONAL DATA DISTRICT
    [CONST.GET_PERSONAL_DATA_DISTRICT]: () => ({
      ...state,
      getPersonalDataDistrictParam: payload,
      getPersonalDataDistrictFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_DISTRICT_SUCCESS]: () => ({
      ...state,
      getPersonalDataDistrictResponse: payload,
      getPersonalDataDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_DISTRICT_FAILED]: () => ({
      ...state,
      getPersonalDataDistrictFailed: payload,
      getPersonalDataDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_DATA_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.getPersonalDataDistrictInitialState,
      action: type,
    }),

    // SET PERSONAL DATA DISTRICT
    [CONST.SET_PERSONAL_DATA_DISTRICT]: () => ({
      ...state,
      setPersonalDataDistrictParam: payload,
      setPersonalDataDistrictFetch: true,
      action: type,
    }),
    [CONST.SET_PERSONAL_DATA_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.setPersonalDataDistrictInitialState,
      action: type,
    }),
    // REQUEST OTP
    [CONST.SET_PROFILE_REQUEST_OTP]: () => ({
      ...state,
      setProfileResendRequestOtp: payload.setProfileResendRequestOtp,
      setProfileRequestOtpParam: {
        ...payload,
        setProfileResendRequestOtp: undefined,
      },
      setProfileRequestOtpFetch: true,
      action: type,
    }),
    [CONST.SET_PROFILE_REQUEST_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setProfileRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_REQUEST_OTP_FAILED]: () => ({
      ...state,
      setProfileRequestOtpFailed: payload,
      setProfileRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_REQUEST_OTP_CLEAR]: () => ({
      ...state,
      setProfileRequestOtpFailed:
        profileInitialState.setProfileRequestOtpFailed,
      setProfileRequestOtpFetch: profileInitialState.setProfileRequestOtpFetch,
      setProfileResendRequestOtp:
        profileInitialState.setProfileResendRequestOtp,
      action: type,
    }),
    // VERIFY OTP
    [CONST.SET_PROFILE_VERIFY_OTP]: () => ({
      ...state,
      setProfileResendVerifyOtp: payload.setProfileResendVerifyOtp,
      setProfileVerifyOtpParam: {
        ...payload,
        setProfileResendVerifyOtp: undefined,
      },
      setProfileVerifyOtpFetch: true,
      action: type,
    }),
    [CONST.SET_PROFILE_VERIFY_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setProfileVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_VERIFY_OTP_FAILED]: () => ({
      ...state,
      setProfileVerifyOtpFailed: payload,
      setProfileVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_VERIFY_OTP_CLEAR]: () => ({
      ...state,
      setProfileVerifyOtpFailed: profileInitialState.setProfileVerifyOtpFailed,
      setProfileVerifyOtpFetch: profileInitialState.setProfileVerifyOtpFetch,
      setProfileResendVerifyOtp: profileInitialState.setProfileResendVerifyOtp,
      action: type,
    }),

    // FAQ
    [CONST.SET_PROFILE_FAQ]: () => ({
      ...state,
      setProfileFaqParam: payload,
      setProfileFaqFetch: true,
      action: type,
    }),
    [CONST.SET_PROFILE_FAQ_SUCCESS]: () => ({
      ...state,
      setProfileFaqResponse: payload,
      setProfileFaqFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_FAQ_FAILED]: () => ({
      ...state,
      setProfileFaqFailed: payload,
      setProfileFaqFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_FAQ_CLEAR]: () => ({
      ...state,
      ...STATE.setProfileFaqInitialState,
      action: type,
    }),

    // NOLOGINFAQ
    [CONST.SET_PROFILE_NOLOGINFAQ]: () => ({
      ...state,
      setProfileNoLoginFaqParam: payload,
      setProfileNoLoginFaqFetch: true,
      action: type,
    }),
    [CONST.SET_PROFILE_NOLOGINFAQ_SUCCESS]: () => ({
      ...state,
      setProfileNoLoginFaqResponse: payload,
      setProfileNoLoginFaqFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_NOLOGINFAQ_FAILED]: () => ({
      ...state,
      setProfileNoLoginFaqFailed: payload,
      setProfileNoLoginFaqFetch: false,
      action: type,
    }),
    [CONST.SET_PROFILE_NOLOGINFAQ_CLEAR]: () => ({
      ...state,
      ...STATE.setProfileNoLoginFaqInitialState,
      action: type,
    }),

    // GET USER ID CARD INFO
    [CONST.GET_USER_ID_CARD_INFO]: () => ({
      ...state,
      getUserIDCardInfoParam: payload,
      getUserIDCardInfoFetch: true,
      action: type,
    }),
    [CONST.GET_USER_ID_CARD_INFO_SUCCESS]: () => ({
      ...state,
      getUserIDCardInfoResponse: payload,
      getUserIDCardInfoFetch: false,
      action: type,
    }),
    [CONST.GET_USER_ID_CARD_INFO_FAILED]: () => ({
      ...state,
      getUserIDCardInfoFailed: payload,
      getUserIDCardInfoFetch: false,
      action: type,
    }),
    [CONST.GET_USER_ID_CARD_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getUserIDCardInfoInitialState,
      action: type,
    }),

    // GET ADDRESS LIST
    [CONST.GET_ADDRESS_LIST]: () => ({
      ...state,
      getAddressListParam: payload,
      getAddressListFetch: true,
      action: type,
    }),
    [CONST.GET_ADDRESS_LIST_SUCCESS]: () => ({
      ...state,
      getAddressListResponse: payload,
      getAddressListFetch: false,
      action: type,
    }),
    [CONST.GET_ADDRESS_LIST_FAILED]: () => ({
      ...state,
      getAddressListFailed: payload,
      getAddressListFetch: false,
      action: type,
    }),
    [CONST.GET_ADDRESS_LIST_CLEAR]: () => ({
      ...state,
      ...STATE.getAddressListInitialState,
      action: type,
    }),

    // SET SAVE ADDRESS
    [CONST.SET_SAVE_ADDRESS]: () => ({
      ...state,
      setSaveAddressParam: payload,
      setSaveAddressFetch: true,
      action: type,
    }),
    [CONST.SET_SAVE_ADDRESS_SUCCESS]: () => ({
      ...state,
      setSaveAddressResponse: payload,
      setSaveAddressFetch: false,
      action: type,
    }),
    [CONST.SET_SAVE_ADDRESS_FAILED]: () => ({
      ...state,
      setSaveAddressFailed: payload,
      setSaveAddressFetch: false,
      action: type,
    }),
    [CONST.SET_SAVE_ADDRESS_CLEAR]: () => ({
      ...state,
      ...STATE.setSaveAddressInitialState,
      action: type,
    }),

    // SET UPDATE ADDRESS
    [CONST.SET_UPDATE_ADDRESS]: () => ({
      ...state,
      setUpdateAddressParam: payload,
      setUpdateAddressFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATE_ADDRESS_SUCCESS]: () => ({
      ...state,
      setUpdateAddressResponse: payload,
      setUpdateAddressFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATE_ADDRESS_FAILED]: () => ({
      ...state,
      setUpdateAddressFailed: payload,
      setUpdateAddressFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATE_ADDRESS_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdateAddressInitialState,
      action: type,
    }),

    // SET DELETE ADDRESS
    [CONST.SET_DELETE_ADDRESS]: () => ({
      ...state,
      setDeleteAddressParam: payload,
      setDeleteAddressFetch: true,
      action: type,
    }),
    [CONST.SET_DELETE_ADDRESS_SUCCESS]: () => ({
      ...state,
      setDeleteAddressResponse: payload,
      setDeleteAddressFetch: false,
      action: type,
    }),
    [CONST.SET_DELETE_ADDRESS_FAILED]: () => ({
      ...state,
      setDeleteAddressFailed: payload,
      setDeleteAddressFetch: false,
      action: type,
    }),
    [CONST.SET_DELETE_ADDRESS_CLEAR]: () => ({
      ...state,
      ...STATE.setDeleteAddressInitialState,
      action: type,
    }),
    // DELETE ACCOUNT
    [CONST.SET_DELETE_ACCOUNT_SUCCESS]: () => ({
      ...state,
      action: type,
    }),
    [CONST.SET_DELETE_ACCOUNT_FAILED]: () => ({
      ...state,
      action: type,
    }),
    // REFERRAL
    [CONST.GET_PROFILE_REFERRAL]: () => ({
      ...state,
      getProfileReferralParam: payload,
      getProfileReferralFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_REFERRAL_SUCCESS]: () => ({
      ...state,
      getProfileReferralResponse: payload,
      getProfileReferralFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_REFERRAL_FAILED]: () => ({
      ...state,
      getProfileReferralFailed: payload,
      getProfileReferralFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_REFERRAL_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileReferralInitialState,
      getProfileReferralResponse: state.getProfileReferralResponse,
      action: type,
    }),
    // PROVINCE
    [CONST.GET_PROFILE_PROVINCE]: () => ({
      ...state,
      getProfileProvinceParam: payload,
      getProfileProvinceFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_PROVINCE_SUCCESS]: () => ({
      ...state,
      getProfileProvinceResponse: payload,
      getProfileProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_PROVINCE_FAILED]: () => ({
      ...state,
      getProfileProvinceFailed: payload,
      getProfileProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_PROVINCE_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileProvinceInitialState,
      getProfileProvinceResponse: state.getProfileProvinceResponse,
      action: type,
    }),
    // CITY
    [CONST.GET_PROFILE_CITY]: () => ({
      ...state,
      getProfileCityParam: payload,
      getProfileCityFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_CITY_SUCCESS]: () => ({
      ...state,
      getProfileCityResponse: payload,
      getProfileCityFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_CITY_FAILED]: () => ({
      ...state,
      getProfileCityFailed: payload,
      getProfileCityFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_CITY_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileCityInitialState,
      getProfileCityResponse: state.getProfileCityResponse,
      action: type,
    }),
    // DISTRICT
    [CONST.GET_PROFILE_DISTRICT]: () => ({
      ...state,
      getProfileDistrictParam: payload,
      getProfileDistrictFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_DISTRICT_SUCCESS]: () => ({
      ...state,
      getProfileDistrictResponse: payload,
      getProfileDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_DISTRICT_FAILED]: () => ({
      ...state,
      getProfileDistrictFailed: payload,
      getProfileDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileDistrictInitialState,
      getProfileDistrictResponse: state.getProfileDistrictResponse,
      action: type,
    }),
    // SUB_DISTRICT
    [CONST.GET_PROFILE_SUB_DISTRICT]: () => ({
      ...state,
      getProfileSubDistrictParam: payload,
      getProfileSubDistrictFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_SUB_DISTRICT_SUCCESS]: () => ({
      ...state,
      getProfileSubDistrictResponse: payload,
      getProfileSubDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_SUB_DISTRICT_FAILED]: () => ({
      ...state,
      getProfileSubDistrictFailed: payload,
      getProfileSubDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_SUB_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileSubDistrictInitialState,
      getProfileSubDistrictResponse: state.getProfileSubDistrictResponse,
      action: type,
    }),

    // userParty
    [CONST.GET_PROFILE_USER_PARTY]: () => ({
      ...state,
      getProfileUserPartyParam: payload,
      getProfileUserPartyFetch: true,
      action: type,
    }),
    [CONST.GET_PROFILE_USER_PARTY_SUCCESS]: () => ({
      ...state,
      getProfileUserPartyResponse: payload,
      getProfileUserPartyFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_USER_PARTY_FAILED]: () => ({
      ...state,
      getProfileUserPartyFailed: payload,
      getProfileUserPartyFetch: false,
      action: type,
    }),
    [CONST.GET_PROFILE_USER_PARTY_CLEAR]: () => ({
      ...state,
      ...STATE.getProfileUserPartyInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
