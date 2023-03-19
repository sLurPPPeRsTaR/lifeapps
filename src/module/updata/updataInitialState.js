export const updataInitialState = {
  isKTPSame: false,
  isKKSame: false,
  otherInformation: {
    data: {
      phoneNumber: null,
      email: null,
      bankAccount: null,
      address: {
        residentAddress: null,
        officeAddress: null,
        correspondAddress: null,
        billingAddress: null,
      },
    },
  },
  tempState: {
    isUploadBookAccount: false,
  },
};

export const setUpdataLivenessInitialState = {
  setUpdataLivenessFetch: false,
  setUpdataLivenessParam: {},
  setUpdataLivenessResponse: {
    data: '',
  },
  setUpdataLivenessFailed: {
    message: '',
  },
};

export const setUpdataKTPInitialState = {
  setUpdataKTPFetch: false,
  setUpdataKTPParam: {},
  setUpdataKTPResponse: {
    data: '',
  },
  setUpdataKTPFailed: {
    message: '',
  },
};

export const setUpdataKKInitialState = {
  setUpdataKKFetch: false,
  setUpdataKKParam: {},
  setUpdataKKResponse: {
    data: '',
  },
  setUpdataKKFailed: {
    message: '',
  },
};

export const getUpdataLastKTPInfoInitialState = {
  getUpdataLastKTPInfoFetch: false,
  getUpdataLastKTPInfoParam: {},
  getUpdataLastKTPInfoResponse: {
    data: '',
  },
  getUpdataLastKTPInfoFailed: {
    message: '',
  },
};

export const getUpdataLastKKInfoInitialState = {
  getUpdataLastKKInfoFetch: false,
  getUpdataLastKKInfoParam: {},
  getUpdataLastKKInfoResponse: {
    data: '',
  },
  getUpdataLastKKInfoFailed: {
    message: '',
  },
};

export const getUpdataLastOtherInfoInitialState = {
  getUpdataLastOtherInfoFetch: false,
  getUpdataLastOtherInfoParam: {},
  getUpdataLastOtherInfoResponse: {
    data: '',
  },
  getUpdataLastOtherInfoFailed: {
    message: '',
  },
};
export const setUpdataCheckKKKTPInitialState = {
  setUpdataCheckKKKTPFetch: false,
  setUpdataCheckKKKTPParam: {},
  setUpdataCheckKKKTPResponse: {
    data: '',
  },
  setUpdataCheckKKKTPFailed: {
    message: '',
  },
};

export const setUpdataVerifyPengkinianInitialState = {
  setUpdataVerifyPengkinianFetch: false,
  setUpdataVerifyPengkinianParam: {},
  setUpdataVerifyPengkinianResponse: {
    data: '',
  },
  setUpdataVerifyPengkinianFailed: {
    message: '',
  },
};

export const getUpdataListBankInitialState = {
  getUpdataListBankFetch: false,
  getUpdataListBankParam: {},
  getUpdataListBankResponse: {
    data: '',
  },
  getUpdataListBankFailed: {
    message: '',
  },
};

// REQUEST OTP
export const setUpdataRequestOtpInitialState = {
  setUpdataRequestOtpFetch: false,
  setUpdataRequestOtpParam: {},
  setUpdataRequestOtpResponse: {},
  setUpdataRequestOtpFailed: {
    message: '',
  },
  setUpdataResendRequestOtp: false,
};

// VERIFY OTP
export const setUpdataVerifyOtpInitialState = {
  setUpdataVerifyOtpFetch: false,
  setUpdataVerifyOtpParam: {},
  setUpdataVerifyOtpResponse: {},
  setUpdataVerifyOtpFailed: {
    message: '',
  },
  setUpdataResendVerifyOtp: false,
};

// ADDRESS
// PROVINCE
export const getUpdataProvinceInitialState = {
  getUpdataProvinceFetch: false,
  getUpdataProvinceParam: {},
  getUpdataProvinceResponse: {},
  getUpdataProvinceFailed: {
    message: '',
  },
};
// CITY
export const getUpdataCityInitialState = {
  getUpdataCityFetch: false,
  getUpdataCityParam: {},
  getUpdataCityResponse: {},
  getUpdataCityFailed: {
    message: '',
  },
};
// DISTRICT
export const getUpdataDistrictInitialState = {
  getUpdataDistrictFetch: false,
  getUpdataDistrictParam: {},
  getUpdataDistrictResponse: {},
  getUpdataDistrictFailed: {
    message: '',
  },
};
// DISTRICT
export const getUpdataSubDistrictInitialState = {
  getUpdataSubDistrictFetch: false,
  getUpdataSubDistrictParam: {},
  getUpdataSubDistrictResponse: {},
  getUpdataSubDistrictFailed: {
    message: '',
  },
};

// Alter Policies
export const setUpdataAlterPoliciesInitialState = {
  setUpdataAlterPoliciesFetch: false,
  setUpdataAlterPoliciesParam: {},
  setUpdataAlterPoliciesResponse: {},
  setUpdataAlterPoliciesFailed: {
    message: '',
  },
};

// Inquiry Bank Account
export const setUpdataInquiryBankAccountInitialState = {
  setUpdataInquiryBankAccountFetch: false,
  setUpdataInquiryBankAccountParam: {},
  setUpdataInquiryBankAccountResponse: {},
  setUpdataInquiryBankAccountFailed: {
    message: '',
  },
};

// Get Detail EKYC
export const getUpdataDetailEKycInitialState = {
  getUpdataDetailEKycFetch: false,
  getUpdataDetailEKycParam: {},
  getUpdataDetailEKycResponse: {},
  getUpdataDetailEKycFailed: {
    message: '',
  },
};

// BANK UPLOAD
export const setUpdataBankUploadInitialState = {
  setUpdataBankUploadFetch: false,
  setUpdataBankUploadParam: {},
  setUpdataBankUploadResponse: {},
  setUpdataBankUploadFailed: {
    message: '',
  },
};

// FACE COMPARE
export const setUpdataFaceCompareInitialState = {
  setUpdataFaceCompareFetch: false,
  setUpdataFaceCompareParam: {},
  setUpdataFaceCompareResponse: {},
  setUpdataFaceCompareFailed: {
    message: '',
  },
};

// FACE COMPARE
export const getUpdataValidationCheckInitialState = {
  getUpdataValidationCheckFetch: false,
  getUpdataValidationCheckParam: {},
  getUpdataValidationCheckResponse: {},
  getUpdataValidationCheckFailed: {
    message: '',
  },
};
