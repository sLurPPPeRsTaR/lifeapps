import _ from 'lodash';
import * as STATE from 'ca-module-updata/updataInitialState';
import * as CONST from 'ca-module-updata/updataConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';

const updataInitialState = {
  ...STATE.updataInitialState,
  ...STATE.setUpdataLivenessInitialState,
  ...STATE.setUpdataKTPInitialState,
  ...STATE.setUpdataKKInitialState,
  ...STATE.getUpdataLastKTPInfoInitialState,
  ...STATE.getUpdataLastKKInfoInitialState,
  ...STATE.getUpdataLastOtherInfoInitialState,
  ...STATE.setUpdataCheckKKKTPInitialState,
  ...STATE.setUpdataVerifyPengkinianInitialState,
  ...STATE.getUpdataListBankInitialState,
  ...STATE.setUpdataRequestOtpInitialState,
  ...STATE.setUpdataVerifyOtpInitialState,
  ...STATE.getUpdataProvinceInitialState,
  ...STATE.getUpdataCityInitialState,
  ...STATE.getUpdataDistrictInitialState,
  ...STATE.getUpdataSubDistrictInitialState,
  ...STATE.setUpdataAlterPoliciesInitialState,
  ...STATE.setUpdataInquiryBankAccountInitialState,
  ...STATE.getUpdataDetailEKycInitialState,
  ...STATE.setUpdataBankUploadInitialState,
  ...STATE.setUpdataFaceCompareInitialState,
  ...STATE.getUpdataValidationCheckInitialState,
  action: '',
};

export const updataReducer = (state = updataInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(updataInitialState),
    }),
    [CONST.SET_CLEAR_UPDATA]: () => ({
      ...state,
      ..._.cloneDeep(updataInitialState),
    }),
    [CONST.SET_IS_KTP_SAME]: () => ({
      ...state,
      isKTPSame: payload,
    }),
    [CONST.SET_IS_KK_SAME]: () => ({
      ...state,
      isKKSame: payload,
    }),
    // Liveness
    [CONST.SET_UPDATA_LIVENESS]: () => ({
      ...state,
      setUpdataLivenessParam: payload,
      setUpdataLivenessFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_LIVENESS_SUCCESS]: () => ({
      ...state,
      setUpdataLivenessResponse: payload,
      setUpdataLivenessFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_LIVENESS_FAILED]: () => ({
      ...state,
      setUpdataLivenessFailed: payload,
      setUpdataLivenessFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_LIVENESS_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataLivenessInitialState,
      setUpdataLivenessResponse: state.setUpdataLivenessResponse,
      action: type,
    }),
    // KTP
    [CONST.SET_UPDATA_KTP]: () => ({
      ...state,
      setUpdataKTPParam: payload,
      setUpdataKTPFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_KTP_SUCCESS]: () => ({
      ...state,
      setUpdataKTPResponse: payload,
      setUpdataKTPFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_KTP_FAILED]: () => ({
      ...state,
      setUpdataKTPFailed: payload,
      setUpdataKTPFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_KTP_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataKTPInitialState,
      setUpdataKTPResponse: state.setUpdataKTPResponse,
      action: type,
    }),
    // KK
    [CONST.SET_UPDATA_KK]: () => ({
      ...state,
      setUpdataKKParam: payload,
      setUpdataKKFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_KK_SUCCESS]: () => ({
      ...state,
      setUpdataKKResponse: payload,
      setUpdataKKFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_KK_FAILED]: () => ({
      ...state,
      setUpdataKKFailed: payload,
      setUpdataKKFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_KK_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataKKInitialState,
      setUpdataKKResponse: state.setUpdataKKResponse,
      action: type,
    }),
    // Last KTP
    [CONST.GET_UPDATA_LAST_KTP_INFO]: () => ({
      ...state,
      getUpdataLastKTPInfoParam: payload,
      getUpdataLastKTPInfoFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KTP_INFO_SUCCESS]: () => ({
      ...state,
      getUpdataLastKTPInfoResponse: payload,
      getUpdataLastKTPInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KTP_INFO_FAILED]: () => ({
      ...state,
      getUpdataLastKTPInfoFailed: payload,
      getUpdataLastKTPInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KTP_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataLastKTPInfoInitialState,
      getUpdataLastKTPInfoResponse: state.getUpdataLastKTPInfoResponse,
      action: type,
    }),
    // Last KK
    [CONST.GET_UPDATA_LAST_KK_INFO]: () => ({
      ...state,
      getUpdataLastKKInfoParam: payload,
      getUpdataLastKKInfoFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KK_INFO_SUCCESS]: () => ({
      ...state,
      getUpdataLastKKInfoResponse: payload,
      getUpdataLastKKInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KK_INFO_FAILED]: () => ({
      ...state,
      getUpdataLastKKInfoFailed: payload,
      getUpdataLastKKInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_KK_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataLastKKInfoInitialState,
      getUpdataLastKKInfoResponse: state.getUpdataLastKKInfoResponse,
      action: type,
    }),
    // Last Other
    [CONST.GET_UPDATA_LAST_OTHER_INFO]: () => ({
      ...state,
      getUpdataLastOtherInfoParam: payload,
      getUpdataLastOtherInfoFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_OTHER_INFO_SUCCESS]: () => ({
      ...state,
      getUpdataLastOtherInfoResponse: payload,
      getUpdataLastOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_OTHER_INFO_FAILED]: () => ({
      ...state,
      getUpdataLastOtherInfoFailed: payload,
      getUpdataLastOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LAST_OTHER_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataLastOtherInfoInitialState,
      getUpdataLastOtherInfoResponse: state.getUpdataLastOtherInfoResponse,
      action: type,
    }),

    // Check KK KTP
    [CONST.SET_UPDATA_CHECK_KK_KTP]: () => ({
      ...state,
      setUpdataCheckKKKTPParam: payload,
      setUpdataCheckKKKTPFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_CHECK_KK_KTP_SUCCESS]: () => ({
      ...state,
      setUpdataCheckKKKTPResponse: payload,
      setUpdataCheckKKKTPFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_CHECK_KK_KTP_FAILED]: () => ({
      ...state,
      setUpdataCheckKKKTPFailed: payload,
      setUpdataCheckKKKTPFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_CHECK_KK_KTP_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataCheckKKKTPInitialState,
      setUpdataCheckKKKTPResponse: state.setUpdataCheckKKKTPResponse,
      setUpdataCheckKKKTPParam: state.setUpdataCheckKKKTPParam,
      action: type,
    }),
    // Verify Pengkinian
    [CONST.SET_UPDATA_VERIFY_PENGKINIAN]: () => ({
      ...state,
      setUpdataVerifyPengkinianParam: payload,
      setUpdataVerifyPengkinianFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS]: () => ({
      ...state,
      setUpdataVerifyPengkinianResponse: payload,
      setUpdataVerifyPengkinianFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_PENGKINIAN_FAILED]: () => ({
      ...state,
      setUpdataVerifyPengkinianFailed: payload,
      setUpdataVerifyPengkinianFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_PENGKINIAN_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataVerifyPengkinianInitialState,
      setUpdataVerifyPengkinianResponse:
        state.setUpdataVerifyPengkinianResponse,
      action: type,
    }),
    // List Bank
    [CONST.GET_UPDATA_LIST_BANK]: () => ({
      ...state,
      getUpdataListBankParam: payload,
      getUpdataListBankFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_LIST_BANK_SUCCESS]: () => ({
      ...state,
      getUpdataListBankResponse: payload,
      getUpdataListBankFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LIST_BANK_FAILED]: () => ({
      ...state,
      getUpdataListBankFailed: payload,
      getUpdataListBankFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_LIST_BANK_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataListBankInitialState,
      getUpdataListBankResponse: state.getUpdataListBankResponse,
      action: type,
    }),
    // REQUEST OTP
    [CONST.SET_UPDATA_REQUEST_OTP]: () => ({
      ...state,
      setUpdataResendRequestOtp: payload.setUpdataResendRequestOtp,
      setUpdataRequestOtpParam: {
        ...payload,
        setUpdataResendRequestOtp: undefined,
      },
      setUpdataRequestOtpFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_REQUEST_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setUpdataRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_REQUEST_OTP_FAILED]: () => ({
      ...state,
      setUpdataRequestOtpFailed: payload,
      setUpdataRequestOtpFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_REQUEST_OTP_CLEAR]: () => ({
      ...state,
      setUpdataRequestOtpFailed: updataInitialState.setUpdataRequestOtpFailed,
      setUpdataRequestOtpFetch: updataInitialState.setUpdataRequestOtpFetch,
      setUpdataResendRequestOtp: updataInitialState.setUpdataResendRequestOtp,
      action: type,
    }),
    // VERIFY OTP
    [CONST.SET_UPDATA_VERIFY_OTP]: () => ({
      ...state,
      setUpdataResendVerifyOtp: payload.setUpdataResendVerifyOtp,
      setUpdataVerifyOtpParam: {
        ...payload,
        setUpdataResendVerifyOtp: undefined,
      },
      setUpdataVerifyOtpFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_OTP_SUCCESS]: () => ({
      ...state,
      setRequestOtpResponse: payload,
      setUpdataVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_OTP_FAILED]: () => ({
      ...state,
      setUpdataVerifyOtpFailed: payload,
      setUpdataVerifyOtpFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_VERIFY_OTP_CLEAR]: () => ({
      ...state,
      setUpdataVerifyOtpFailed: updataInitialState.setUpdataVerifyOtpFailed,
      setUpdataVerifyOtpFetch: updataInitialState.setUpdataVerifyOtpFetch,
      setUpdataResendVerifyOtp: updataInitialState.setUpdataResendVerifyOtp,
      action: type,
    }),
    // OTHERINFORMATION
    [CONST.SET_UPDATA_OTHERINFORMATION]: () => ({
      ...state,
      otherInformation: payload,
    }),
    [CONST.SET_UPDATA_OTHERINFORMATION_CLEAR]: () => ({
      ...state,
      otherInformation: updataInitialState.otherInformation,
    }),
    // TEMP_STATE
    [CONST.SET_UPDATA_TEMP_STATE]: () => ({
      ...state,
      tempState: {
        ...state.tempState,
        ...payload,
      },
    }),
    [CONST.SET_UPDATA_TEMP_STATE_CLEAR]: () => ({
      ...state,
      tempState: updataInitialState.tempState,
    }),
    // PROVINCE
    [CONST.GET_UPDATA_PROVINCE]: () => ({
      ...state,
      getUpdataProvinceParam: payload,
      getUpdataProvinceFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_PROVINCE_SUCCESS]: () => ({
      ...state,
      getUpdataProvinceResponse: payload,
      getUpdataProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_PROVINCE_FAILED]: () => ({
      ...state,
      getUpdataProvinceFailed: payload,
      getUpdataProvinceFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_PROVINCE_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataProvinceInitialState,
      getUpdataProvinceResponse: state.getUpdataProvinceResponse,
      action: type,
    }),
    // CITY
    [CONST.GET_UPDATA_CITY]: () => ({
      ...state,
      getUpdataCityParam: payload,
      getUpdataCityFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_CITY_SUCCESS]: () => ({
      ...state,
      getUpdataCityResponse: payload,
      getUpdataCityFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_CITY_FAILED]: () => ({
      ...state,
      getUpdataCityFailed: payload,
      getUpdataCityFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_CITY_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataCityInitialState,
      getUpdataCityResponse: state.getUpdataCityResponse,
      action: type,
    }),
    // DISTRICT
    [CONST.GET_UPDATA_DISTRICT]: () => ({
      ...state,
      getUpdataDistrictParam: payload,
      getUpdataDistrictFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_DISTRICT_SUCCESS]: () => ({
      ...state,
      getUpdataDistrictResponse: payload,
      getUpdataDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_DISTRICT_FAILED]: () => ({
      ...state,
      getUpdataDistrictFailed: payload,
      getUpdataDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataDistrictInitialState,
      getUpdataDistrictResponse: state.getUpdataDistrictResponse,
      action: type,
    }),
    // SUB_DISTRICT
    [CONST.GET_UPDATA_SUB_DISTRICT]: () => ({
      ...state,
      getUpdataSubDistrictParam: payload,
      getUpdataSubDistrictFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_SUB_DISTRICT_SUCCESS]: () => ({
      ...state,
      getUpdataSubDistrictResponse: payload,
      getUpdataSubDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_SUB_DISTRICT_FAILED]: () => ({
      ...state,
      getUpdataSubDistrictFailed: payload,
      getUpdataSubDistrictFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_SUB_DISTRICT_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataSubDistrictInitialState,
      getUpdataSubDistrictResponse: state.getUpdataSubDistrictResponse,
      action: type,
    }),
    // ALTER POLICIES
    [CONST.SET_UPDATA_ALTER_POLICIES]: () => ({
      ...state,
      setUpdataAlterPoliciesParam: payload,
      setUpdataAlterPoliciesFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_ALTER_POLICIES_SUCCESS]: () => ({
      ...state,
      setUpdataAlterPoliciesResponse: payload,
      setUpdataAlterPoliciesFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_ALTER_POLICIES_FAILED]: () => ({
      ...state,
      setUpdataAlterPoliciesFailed: payload,
      setUpdataAlterPoliciesFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_ALTER_POLICIES_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataAlterPoliciesInitialState,
      setUpdataAlterPoliciesResponse: state.setUpdataAlterPoliciesResponse,
      action: type,
    }),
    // INQUIRY BANK ACCOUNT
    [CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT]: () => ({
      ...state,
      setUpdataInquiryBankAccountParam: payload,
      setUpdataInquiryBankAccountFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS]: () => ({
      ...state,
      setUpdataInquiryBankAccountResponse: payload,
      setUpdataInquiryBankAccountFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED]: () => ({
      ...state,
      setUpdataInquiryBankAccountFailed: payload,
      setUpdataInquiryBankAccountFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataInquiryBankAccountInitialState,
      setUpdataInquiryBankAccountResponse:
        state.setUpdataInquiryBankAccountResponse,
      action: type,
    }),
    // GET DETAIL EKYC
    [CONST.GET_UPDATA_DETAIL_EKYC]: () => ({
      ...state,
      getUpdataDetailEKycParam: payload,
      getUpdataDetailEKycFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_DETAIL_EKYC_SUCCESS]: () => ({
      ...state,
      getUpdataDetailEKycResponse: payload,
      getUpdataDetailEKycFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_DETAIL_EKYC_FAILED]: () => ({
      ...state,
      getUpdataDetailEKycFailed: payload,
      getUpdataDetailEKycFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_DETAIL_EKYC_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataDetailEKycInitialState,
      action: type,
    }),
    // BANK UPLOAD
    [CONST.SET_UPDATA_BANK_UPLOAD]: () => ({
      ...state,
      setUpdataBankUploadParam: payload,
      setUpdataBankUploadFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_BANK_UPLOAD_SUCCESS]: () => ({
      ...state,
      setUpdataBankUploadResponse: payload,
      setUpdataBankUploadFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_BANK_UPLOAD_FAILED]: () => ({
      ...state,
      setUpdataBankUploadFailed: payload,
      setUpdataBankUploadFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_BANK_UPLOAD_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataBankUploadInitialState,
      action: type,
    }),

    // FACECOMPARE
    [CONST.SET_UPDATA_FACECOMPARE]: () => ({
      ...state,
      setUpdataFaceCompareParam: payload,
      setUpdataFaceCompareFetch: true,
      action: type,
    }),
    [CONST.SET_UPDATA_FACECOMPARE_SUCCESS]: () => ({
      ...state,
      setUpdataFaceCompareResponse: payload,
      setUpdataFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_FACECOMPARE_FAILED]: () => ({
      ...state,
      setUpdataFaceCompareFailed: payload,
      setUpdataFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_UPDATA_FACECOMPARE_CLEAR]: () => ({
      ...state,
      ...STATE.setUpdataFaceCompareInitialState,
      action: type,
    }),

    // VALIDATION CHECK
    [CONST.GET_UPDATA_VALIDATION_CHECK]: () => ({
      ...state,
      getUpdataValidationCheckParam: payload,
      getUpdataValidationCheckFetch: true,
      action: type,
    }),
    [CONST.GET_UPDATA_VALIDATION_CHECK_SUCCESS]: () => ({
      ...state,
      getUpdataValidationCheckResponse: payload,
      getUpdataValidationCheckFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_VALIDATION_CHECK_FAILED]: () => ({
      ...state,
      getUpdataValidationCheckFailed: payload,
      getUpdataValidationCheckFetch: false,
      action: type,
    }),
    [CONST.GET_UPDATA_VALIDATION_CHECK_CLEAR]: () => ({
      ...state,
      ...STATE.getUpdataValidationCheckInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
