export const setRequestOtpInitialState = {
  setRequestOtpFetch: false,
  setRequestOtpParam: {},
  setRequestOtpResponse: {},
  setRequestOtpFailed: {
    message: '',
  },
  setResendRegisterOtp: false,
};

export const setRegisterInitialState = {
  setRegisterFetch: false,
  setRegisterParam: {},
  setRegisterResponse: null,
  setRegisterFailed: {
    message: '',
  },
};

export const setRegisterSocialInitialState = {
  setRegisterSocialFetch: false,
  setRegisterSocialParam: {},
  setRegisterSocialResponse: null,
  setRegisterSocialFailed: {
    message: '',
  },
};

export const getInquiryPolicyNoInitialState = {
  getInquiryPolicyNoFetch: false,
  getInquiryPolicyNoParam: {},
  getInquiryPolicyNoResponse: {
    data: '',
  },
  getInquiryPolicyNoFailed: {
    message: '',
  },
};

export const getCheckLinkPolicyNoInitialState = {
  getCheckLinkPolicyNoFetch: false,
  getCheckLinkPolicyNoParam: {},
  getCheckLinkPolicyNoResponse: {
    data: '',
  },
  getCheckLinkPolicyNoFailed: {
    message: '',
  },
};
