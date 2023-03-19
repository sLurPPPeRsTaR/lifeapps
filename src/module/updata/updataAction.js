import * as CONST from 'ca-module-updata/updataConstant';

export const setClearUpdata = (payload) => ({
  type: CONST.SET_CLEAR_UPDATA,
  payload,
});

export const setIsKTPSame = (payload) => ({
  type: CONST.SET_IS_KTP_SAME,
  payload,
});

export const setIsKKSame = (payload) => ({
  type: CONST.SET_IS_KK_SAME,
  payload,
});

export const setUpdataLiveness = (payload) => ({
  type: CONST.SET_UPDATA_LIVENESS,
  payload,
});
export const setUpdataLivenessSuccess = (payload) => ({
  type: CONST.SET_UPDATA_LIVENESS_SUCCESS,
  payload,
});
export const setUpdataLivenessFailed = (payload) => ({
  type: CONST.SET_UPDATA_LIVENESS_FAILED,
  payload,
});
export const setUpdataLivenessClear = (payload) => ({
  type: CONST.SET_UPDATA_LIVENESS_CLEAR,
  payload,
});

export const setUpdataKTP = (payload) => ({
  type: CONST.SET_UPDATA_KTP,
  payload,
});
export const setUpdataKTPSuccess = (payload) => ({
  type: CONST.SET_UPDATA_KTP_SUCCESS,
  payload,
});
export const setUpdataKTPFailed = (payload) => ({
  type: CONST.SET_UPDATA_KTP_FAILED,
  payload,
});
export const setUpdataKTPClear = (payload) => ({
  type: CONST.SET_UPDATA_KTP_CLEAR,
  payload,
});

export const setUpdataKK = (payload) => ({
  type: CONST.SET_UPDATA_KK,
  payload,
});
export const setUpdataKKSuccess = (payload) => ({
  type: CONST.SET_UPDATA_KK_SUCCESS,
  payload,
});
export const setUpdataKKFailed = (payload) => ({
  type: CONST.SET_UPDATA_KK_FAILED,
  payload,
});
export const setUpdataKKClear = (payload) => ({
  type: CONST.SET_UPDATA_KK_CLEAR,
  payload,
});

export const getUpdataLastKTPInfo = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KTP_INFO,
  payload,
});
export const getUpdataLastKTPInfoSuccess = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KTP_INFO_SUCCESS,
  payload,
});
export const getUpdataLastKTPInfoFailed = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KTP_INFO_FAILED,
  payload,
});
export const getUpdataLastKTPInfoClear = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KTP_INFO_CLEAR,
  payload,
});

export const getUpdataLastKKInfo = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KK_INFO,
  payload,
});
export const getUpdataLastKKInfoSuccess = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KK_INFO_SUCCESS,
  payload,
});
export const getUpdataLastKKInfoFailed = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KK_INFO_FAILED,
  payload,
});
export const getUpdataLastKKInfoClear = (payload) => ({
  type: CONST.GET_UPDATA_LAST_KK_INFO_CLEAR,
  payload,
});

export const getUpdataLastOtherInfo = (payload) => ({
  type: CONST.GET_UPDATA_LAST_OTHER_INFO,
  payload,
});
export const getUpdataLastOtherInfoSuccess = (payload) => ({
  type: CONST.GET_UPDATA_LAST_OTHER_INFO_SUCCESS,
  payload,
});
export const getUpdataLastOtherInfoFailed = (payload) => ({
  type: CONST.GET_UPDATA_LAST_OTHER_INFO_FAILED,
  payload,
});
export const getUpdataLastOtherInfoClear = (payload) => ({
  type: CONST.GET_UPDATA_LAST_OTHER_INFO_CLEAR,
  payload,
});
export const setUpdataCheckKKKTP = (payload) => ({
  type: CONST.SET_UPDATA_CHECK_KK_KTP,
  payload,
});
export const setUpdataCheckKKKTPSuccess = (payload) => ({
  type: CONST.SET_UPDATA_CHECK_KK_KTP_SUCCESS,
  payload,
});
export const setUpdataCheckKKKTPFailed = (payload) => ({
  type: CONST.SET_UPDATA_CHECK_KK_KTP_FAILED,
  payload,
});
export const setUpdataCheckKKKTPClear = (payload) => ({
  type: CONST.SET_UPDATA_CHECK_KK_KTP_CLEAR,
  payload,
});

export const setUpdataVerifyPengkinian = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_PENGKINIAN,
  payload,
});
export const setUpdataVerifyPengkinianSuccess = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_PENGKINIAN_SUCCESS,
  payload,
});
export const setUpdataVerifyPengkinianFailed = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_PENGKINIAN_FAILED,
  payload,
});
export const setUpdataVerifyPengkinianClear = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_PENGKINIAN_CLEAR,
  payload,
});

export const getUpdataListBank = (payload) => ({
  type: CONST.GET_UPDATA_LIST_BANK,
  payload,
});
export const getUpdataListBankSuccess = (payload) => ({
  type: CONST.GET_UPDATA_LIST_BANK_SUCCESS,
  payload,
});
export const getUpdataListBankFailed = (payload) => ({
  type: CONST.GET_UPDATA_LIST_BANK_FAILED,
  payload,
});
export const getUpdataListBankClear = (payload) => ({
  type: CONST.GET_UPDATA_LIST_BANK_CLEAR,
  payload,
});
// OTP
export const setUpdataRequestOtp = (payload) => ({
  type: CONST.SET_UPDATA_REQUEST_OTP,
  payload,
});
export const setUpdataRequestOtpSuccess = (payload) => ({
  type: CONST.SET_UPDATA_REQUEST_OTP_SUCCESS,
  payload,
});
export const setUpdataRequestOtpFailed = (payload) => ({
  type: CONST.SET_UPDATA_REQUEST_OTP_FAILED,
  payload,
});
export const setUpdataRequestOtpClear = (payload) => ({
  type: CONST.SET_UPDATA_REQUEST_OTP_CLEAR,
  payload,
});

// VERIFY OTP
export const setUpdataVerifyOtp = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_OTP,
  payload,
});
export const setUpdataVerifyOtpSuccess = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_OTP_SUCCESS,
  payload,
});
export const setUpdataVerifyOtpFailed = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_OTP_FAILED,
  payload,
});
export const setUpdataVerifyOtpClear = (payload) => ({
  type: CONST.SET_UPDATA_VERIFY_OTP_CLEAR,
  payload,
});

// OTHERINFORMATION
export const setOtherInformation = (payload) => ({
  type: CONST.SET_UPDATA_OTHERINFORMATION,
  payload,
});
export const setOtherInformationClear = (payload) => ({
  type: CONST.SET_UPDATA_OTHERINFORMATION_CLEAR,
  payload,
});
// TEMP_STATE
export const setUpdataTempState = (payload) => ({
  type: CONST.SET_UPDATA_TEMP_STATE,
  payload,
});
export const setUpdataTempStateClear = (payload) => ({
  type: CONST.SET_UPDATA_TEMP_STATE_CLEAR,
  payload,
});

// ADDRESS
// PROVINCE
export const getUpdataProvince = (payload) => ({
  type: CONST.GET_UPDATA_PROVINCE,
  payload,
});
export const getUpdataProvinceSuccess = (payload) => ({
  type: CONST.GET_UPDATA_PROVINCE_SUCCESS,
  payload,
});
export const getUpdataProvinceFailed = (payload) => ({
  type: CONST.GET_UPDATA_PROVINCE_FAILED,
  payload,
});
export const getUpdataProvinceClear = (payload) => ({
  type: CONST.GET_UPDATA_PROVINCE_CLEAR,
  payload,
});
// CITY
export const getUpdataCity = (payload) => ({
  type: CONST.GET_UPDATA_CITY,
  payload,
});
export const getUpdataCitySuccess = (payload) => ({
  type: CONST.GET_UPDATA_CITY_SUCCESS,
  payload,
});
export const getUpdataCityFailed = (payload) => ({
  type: CONST.GET_UPDATA_CITY_FAILED,
  payload,
});
export const getUpdataCityClear = (payload) => ({
  type: CONST.GET_UPDATA_CITY_CLEAR,
  payload,
});
// DISTRICT
export const getUpdataDistrict = (payload) => ({
  type: CONST.GET_UPDATA_DISTRICT,
  payload,
});
export const getUpdataDistrictSuccess = (payload) => ({
  type: CONST.GET_UPDATA_DISTRICT_SUCCESS,
  payload,
});
export const getUpdataDistrictFailed = (payload) => ({
  type: CONST.GET_UPDATA_DISTRICT_FAILED,
  payload,
});
export const getUpdataDistrictClear = (payload) => ({
  type: CONST.GET_UPDATA_DISTRICT_CLEAR,
  payload,
});
// SUB_DISTRICT
export const getUpdataSubDistrict = (payload) => ({
  type: CONST.GET_UPDATA_SUB_DISTRICT,
  payload,
});
export const getUpdataSubDistrictSuccess = (payload) => ({
  type: CONST.GET_UPDATA_SUB_DISTRICT_SUCCESS,
  payload,
});
export const getUpdataSubDistrictFailed = (payload) => ({
  type: CONST.GET_UPDATA_SUB_DISTRICT_FAILED,
  payload,
});
export const getUpdataSubDistrictClear = (payload) => ({
  type: CONST.GET_UPDATA_SUB_DISTRICT_CLEAR,
  payload,
});

// ALTER POLICIES
export const setUpdataAlterPolicies = (payload) => ({
  type: CONST.SET_UPDATA_ALTER_POLICIES,
  payload,
});
export const setUpdataAlterPoliciesSuccess = (payload) => ({
  type: CONST.SET_UPDATA_ALTER_POLICIES_SUCCESS,
  payload,
});
export const setUpdataAlterPoliciesFailed = (payload) => ({
  type: CONST.SET_UPDATA_ALTER_POLICIES_FAILED,
  payload,
});
export const setUpdataAlterPoliciesClear = (payload) => ({
  type: CONST.SET_UPDATA_ALTER_POLICIES_CLEAR,
  payload,
});

// INQUIRY BANK ACCOUNT
export const setUpdataInquiryBankAccount = (payload) => ({
  type: CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT,
  payload,
});
export const setUpdataInquiryBankAccountSuccess = (payload) => ({
  type: CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_SUCCESS,
  payload,
});
export const setUpdataInquiryBankAccountFailed = (payload) => ({
  type: CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_FAILED,
  payload,
});
export const setUpdataInquiryBankAccountClear = (payload) => ({
  type: CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT_CLEAR,
  payload,
});

// UPDATA DETAIL EKYC
export const getUpdataDetailEKyc = (payload) => ({
  type: CONST.GET_UPDATA_DETAIL_EKYC,
  payload,
});
export const getUpdataDetailEKycSuccess = (payload) => ({
  type: CONST.GET_UPDATA_DETAIL_EKYC_SUCCESS,
  payload,
});
export const getUpdataDetailEKycFailed = (payload) => ({
  type: CONST.GET_UPDATA_DETAIL_EKYC_FAILED,
  payload,
});
export const getUpdataDetailEKycClear = (payload) => ({
  type: CONST.GET_UPDATA_DETAIL_EKYC_CLEAR,
  payload,
});

// BANK UPLOAD
export const setUpdataBankUpload = (payload) => ({
  type: CONST.SET_UPDATA_BANK_UPLOAD,
  payload,
});
export const setUpdataBankUploadSuccess = (payload) => ({
  type: CONST.SET_UPDATA_BANK_UPLOAD_SUCCESS,
  payload,
});
export const setUpdataBankUploadFailed = (payload) => ({
  type: CONST.SET_UPDATA_BANK_UPLOAD_FAILED,
  payload,
});
export const setUpdataBankUploadClear = (payload) => ({
  type: CONST.SET_UPDATA_BANK_UPLOAD_CLEAR,
  payload,
});

// FACECOMPARE
export const setUpdataFaceCompare = (payload) => ({
  type: CONST.SET_UPDATA_FACECOMPARE,
  payload,
});
export const setUpdataFaceCompareSuccess = (payload) => ({
  type: CONST.SET_UPDATA_FACECOMPARE_SUCCESS,
  payload,
});
export const setUpdataFaceCompareFailed = (payload) => ({
  type: CONST.SET_UPDATA_FACECOMPARE_FAILED,
  payload,
});
export const setUpdataFaceCompareClear = (payload) => ({
  type: CONST.SET_UPDATA_FACECOMPARE_CLEAR,
  payload,
});

// FACECOMPARE
export const getUpdataValidationCheck = (payload) => ({
  type: CONST.GET_UPDATA_VALIDATION_CHECK,
  payload,
});
export const getUpdataValidationCheckSuccess = (payload) => ({
  type: CONST.GET_UPDATA_VALIDATION_CHECK_SUCCESS,
  payload,
});
export const getUpdataValidationCheckFailed = (payload) => ({
  type: CONST.GET_UPDATA_VALIDATION_CHECK_FAILED,
  payload,
});
export const getUpdataValidationCheckClear = (payload) => ({
  type: CONST.GET_UPDATA_VALIDATION_CHECK_CLEAR,
  payload,
});
