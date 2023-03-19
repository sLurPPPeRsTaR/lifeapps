import _ from 'lodash';
import * as CONST from 'ca-module-kyc/kycConstant';
import * as STATE from 'ca-module-kyc/kycInitialState';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';

const kycInitialState = {
  ...STATE.setKycSelfieInitialState,
  ...STATE.setKycIdCardInitialState,
  ...STATE.setKycVerifyIdCardInitialState,
  ...STATE.setKycPinInitialState,
  ...STATE.setKycVerifyDukcapilInitialState,
  ...STATE.setKycFaceCompareInitialState,
  ...STATE.setKycRatingInitialState,
  ...STATE.setAddPostalCodeKycIdCardInitialState,
  ...STATE.setKycReFaceCompareInitialState,

  action: '',
};

export const kycReducer = (state = kycInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(kycInitialState),
    }),
    // SELFIE
    [CONST.SET_KYC_SELFIE]: () => ({
      ...state,
      setKycSelfieParam: payload,
      setKycSelfieFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_SELFIE_SUCCESS]: () => ({
      ...state,
      setKycSelfieResponse: payload,
      setKycSelfieFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_SELFIE_FAILED]: () => ({
      ...state,
      setKycSelfieFailed: payload,
      setKycSelfieFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_SELFIE_CLEAR]: () => ({
      ...state,
      ...STATE.setKycSelfieInitialState,
      action: type,
    }),

    // ID CARD
    [CONST.SET_KYC_IDCARD]: () => ({
      ...state,
      setKycIdCardParam: payload,
      setKycIdCardFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_IDCARD_SUCCESS]: () => ({
      ...state,
      setKycIdCardResponse: payload,
      setKycIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_IDCARD_FAILED]: () => ({
      ...state,
      setKycIdCardFailed: payload,
      setKycIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_IDCARD_CLEAR]: () => ({
      ...state,
      ...STATE.setKycIdCardInitialState,
      action: type,
    }),

    // VERIFY ID CARD
    [CONST.SET_KYC_VERIFYIDCARD]: () => ({
      ...state,
      setKycVerifyIdCardParam: payload,
      setKycVerifyIdCardFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYIDCARD_SUCCESS]: () => ({
      ...state,
      setKycVerifyIdCardResponse: payload,
      setKycVerifyIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYIDCARD_FAILED]: () => ({
      ...state,
      setKycVerifyIdCardFailed: payload,
      setKycVerifyIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYIDCARD_CLEAR]: () => ({
      ...state,
      ...STATE.setKycVerifyIdCardInitialState,
      action: type,
    }),

    // PIN
    [CONST.SET_KYC_PIN]: () => ({
      ...state,
      setKycPinParam: payload,
      setKycPinFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_PIN_SUCCESS]: () => ({
      ...state,
      setKycPinResponse: payload,
      setKycPinFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_PIN_FAILED]: () => ({
      ...state,
      setKycPinFailed: payload,
      setKycPinFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_PIN_CLEAR]: () => ({
      ...state,
      ...STATE.setKycPinInitialState,
      action: type,
    }),

    // VERIFY DUKCAPIL
    [CONST.SET_KYC_VERIFYDUKCAPIL]: () => ({
      ...state,
      setKycVerifyDukcapilParam: payload,
      setKycVerifyDukcapilFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYDUKCAPIL_SUCCESS]: () => ({
      ...state,
      setKycVerifyDukcapilResponse: payload,
      setKycVerifyDukcapilFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYDUKCAPIL_FAILED]: () => ({
      ...state,
      setKycVerifyDukcapilFailed: payload,
      setKycVerifyDukcapilFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_VERIFYDUKCAPIL_CLEAR]: () => ({
      ...state,
      ...STATE.setKycVerifyDukcapilInitialState,
      action: type,
    }),

    // FACECOMPARE
    [CONST.SET_KYC_FACECOMPARE]: () => ({
      ...state,
      setKycFaceCompareParam: payload,
      setKycFaceCompareFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_FACECOMPARE_SUCCESS]: () => ({
      ...state,
      setKycFaceCompareResponse: payload,
      setKycFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_FACECOMPARE_FAILED]: () => ({
      ...state,
      setKycFaceCompareFailed: payload,
      setKycFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_FACECOMPARE_CLEAR]: () => ({
      ...state,
      ...STATE.setKycFaceCompareInitialState,
      action: type,
    }),

    // RATING
    [CONST.SET_KYC_RATING]: () => ({
      ...state,
      setKycRatingParam: payload,
      setKycRatingFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_RATING_SUCCESS]: () => ({
      ...state,
      setKycRatingResponse: payload,
      setKycRatingFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_RATING_FAILED]: () => ({
      ...state,
      setKycRatingFailed: payload,
      setKycRatingFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_RATING_CLEAR]: () => ({
      ...state,
      ...STATE.setKycRatingInitialState,
      action: type,
    }),

    // ADD POSTALCODE FOR ID CARD
    [CONST.SET_KYC_POSTALCODE_IDCARD]: () => ({
      ...state,
      setAddPostalCodeKycIdCardParam: payload,
      setAddPostalCodeKycIdCardFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_POSTALCODE_IDCARD_SUCCESS]: () => ({
      ...state,
      setAddPostalCodeKycIdCardResponse: payload,
      setAddPostalCodeKycIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_POSTALCODE_IDCARD_FAILED]: () => ({
      ...state,
      setAddPostalCodeKycIdCardFailed: payload,
      setAddPostalCodeKycIdCardFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_POSTALCODE_IDCARD_CLEAR]: () => ({
      ...state,
      ...STATE.setAddPostalCodeKycIdCardInitialState,
      action: type,
    }),

    // REFACECOMPARE
    [CONST.SET_KYC_REFACECOMPARE]: () => ({
      ...state,
      setKycReFaceCompareParam: payload,
      setKycReFaceCompareFetch: true,
      action: type,
    }),
    [CONST.SET_KYC_REFACECOMPARE_SUCCESS]: () => ({
      ...state,
      setKycReFaceCompareResponse: payload,
      setKycReFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_REFACECOMPARE_FAILED]: () => ({
      ...state,
      setKycReFaceCompareFailed: payload,
      setKycReFaceCompareFetch: false,
      action: type,
    }),
    [CONST.SET_KYC_REFACECOMPARE_CLEAR]: () => ({
      ...state,
      ...STATE.setKycReFaceCompareInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
