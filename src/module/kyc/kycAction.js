import * as CONST from './kycConstant';

export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});

// SELFIE
export const setKycSelfie = (payload) => ({
  type: CONST.SET_KYC_SELFIE,
  payload,
});
export const setKycSelfieSuccess = (payload) => ({
  type: CONST.SET_KYC_SELFIE_SUCCESS,
  payload,
});
export const setKycSelfieFailed = (payload) => ({
  type: CONST.SET_KYC_SELFIE_FAILED,
  payload,
});
export const setKycSelfieClear = (payload) => ({
  type: CONST.SET_KYC_SELFIE_CLEAR,
  payload,
});

// ID CARD
export const setKycIdCard = (payload) => ({
  type: CONST.SET_KYC_IDCARD,
  payload,
});
export const setKycIdCardSuccess = (payload) => ({
  type: CONST.SET_KYC_IDCARD_SUCCESS,
  payload,
});
export const setKycIdCardFailed = (payload) => ({
  type: CONST.SET_KYC_IDCARD_FAILED,
  payload,
});
export const setKycIdCardClear = (payload) => ({
  type: CONST.SET_KYC_IDCARD_CLEAR,
  payload,
});

// VERIFY ID CARD
export const setKycVerifyIdCard = (payload) => ({
  type: CONST.SET_KYC_VERIFYIDCARD,
  payload,
});
export const setKycVerifyIdCardSuccess = (payload) => ({
  type: CONST.SET_KYC_VERIFYIDCARD_SUCCESS,
  payload,
});
export const setKycVerifyIdCardFailed = (payload) => ({
  type: CONST.SET_KYC_VERIFYIDCARD_FAILED,
  payload,
});
export const setKycVerifyIdCardClear = (payload) => ({
  type: CONST.SET_KYC_VERIFYIDCARD_CLEAR,
  payload,
});

// PIN
export const setKycPin = (payload) => ({
  type: CONST.SET_KYC_PIN,
  payload,
});
export const setKycPinSuccess = (payload) => ({
  type: CONST.SET_KYC_PIN_SUCCESS,
  payload,
});
export const setKycPinFailed = (payload) => ({
  type: CONST.SET_KYC_PIN_FAILED,
  payload,
});
export const setKycPinClear = (payload) => ({
  type: CONST.SET_KYC_PIN_CLEAR,
  payload,
});

// VERIFY DUKCAPIL
export const setKycVerifyDukcapil = (payload) => ({
  type: CONST.SET_KYC_VERIFYDUKCAPIL,
  payload,
});
export const setKycVerifyDukcapilSuccess = (payload) => ({
  type: CONST.SET_KYC_VERIFYDUKCAPIL_SUCCESS,
  payload,
});
export const setKycVerifyDukcapilFailed = (payload) => ({
  type: CONST.SET_KYC_VERIFYDUKCAPIL_FAILED,
  payload,
});
export const setKycVerifyDukcapilClear = (payload) => ({
  type: CONST.SET_KYC_VERIFYDUKCAPIL_CLEAR,
  payload,
});

// FACECOMPARE
export const setKycFaceCompare = (payload) => ({
  type: CONST.SET_KYC_FACECOMPARE,
  payload,
});
export const setKycFaceCompareSuccess = (payload) => ({
  type: CONST.SET_KYC_FACECOMPARE_SUCCESS,
  payload,
});
export const setKycFaceCompareFailed = (payload) => ({
  type: CONST.SET_KYC_FACECOMPARE_FAILED,
  payload,
});
export const setKycFaceCompareClear = (payload) => ({
  type: CONST.SET_KYC_FACECOMPARE_CLEAR,
  payload,
});

// RATING
export const setKycRating = (payload) => ({
  type: CONST.SET_KYC_RATING,
  payload,
});
export const setKycRatingSuccess = (payload) => ({
  type: CONST.SET_KYC_RATING_SUCCESS,
  payload,
});
export const setKycRatingFailed = (payload) => ({
  type: CONST.SET_KYC_RATING_FAILED,
  payload,
});
export const setKycRatingClear = (payload) => ({
  type: CONST.SET_KYC_RATING_CLEAR,
  payload,
});

// ADD POSTALCODE FOR ID CARD
export const setAddPostalCodeKycIdCard = (payload) => ({
  type: CONST.SET_KYC_POSTALCODE_IDCARD,
  payload,
});
export const setAddPostalCodeKycIdCardSuccess = (payload) => ({
  type: CONST.SET_KYC_POSTALCODE_IDCARD_SUCCESS,
  payload,
});
export const setAddPostalCodeKycIdCardFailed = (payload) => ({
  type: CONST.SET_KYC_POSTALCODE_IDCARD_FAILED,
  payload,
});
export const setAddPostalCodeKycIdCardClear = (payload) => ({
  type: CONST.SET_KYC_POSTALCODE_IDCARD_CLEAR,
  payload,
});

// REFACECOMPARE
export const setKycReFaceCompare = (payload) => ({
  type: CONST.SET_KYC_REFACECOMPARE,
  payload,
});
export const setKycReFaceCompareSuccess = (payload) => ({
  type: CONST.SET_KYC_REFACECOMPARE_SUCCESS,
  payload,
});
export const setKycReFaceCompareFailed = (payload) => ({
  type: CONST.SET_KYC_REFACECOMPARE_FAILED,
  payload,
});
export const setKycReFaceCompareClear = (payload) => ({
  type: CONST.SET_KYC_REFACECOMPARE_CLEAR,
  payload,
});
