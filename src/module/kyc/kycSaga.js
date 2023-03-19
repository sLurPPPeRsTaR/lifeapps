import { takeLatest, put, call, fork, delay } from 'redux-saga/effects';
import { RESPONSE_STATE, RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-kyc/kycConstant';
import {
  setKycSelfieSuccess,
  setKycSelfieFailed,
  setKycIdCardSuccess,
  setKycIdCardFailed,
  setKycVerifyIdCardSuccess,
  setKycVerifyIdCardFailed,
  setKycPinSuccess,
  setKycPinFailed,
  setKycVerifyDukcapilSuccess,
  setKycVerifyDukcapilFailed,
  setKycFaceCompareSuccess,
  setKycFaceCompareFailed,
  setKycRatingSuccess,
  setKycRatingFailed,
  setAddPostalCodeKycIdCardSuccess,
  setAddPostalCodeKycIdCardFailed,
  setKycReFaceCompareSuccess,
  setKycReFaceCompareFailed,
} from 'ca-module-kyc/kycAction';
import {
  setKycSelfieApi,
  setKycIdCardApi,
  setKycVerifyIdCardApi,
  setKycPinApi,
  setKycVerifyDukcapilApi,
  setKycFaceCompareApi,
  setKycRatingApi,
  setAddPostalCodeKycIdCardApi,
  setKycReFaceCompareApi,
} from 'ca-module-kyc/kycApi';
import { setProgressWatcher, setUploader } from 'ca-util/uploader';

// SELFIE
function* setKycSelfie(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setKycSelfieApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setKycSelfieSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycSelfieFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycSelfieFailed(error?.response?.data));
        break;
      default:
        yield put(setKycSelfieFailed(error?.response?.data));
        break;
    }
  }
}

// ID CARD
function* setKycIdCard(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setKycIdCardApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setKycIdCardSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycIdCardFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycIdCardFailed(error?.response?.data));
        break;
      default:
        yield put(setKycIdCardFailed(error?.response?.data));
        break;
    }
  }
}

// VERIFY ID CARD
function* setKycVerifyIdCard(params) {
  try {
    const response = yield call(setKycVerifyIdCardApi, params.payload);
    yield put(setKycVerifyIdCardSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycVerifyIdCardFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycVerifyIdCardFailed(error?.response?.data));
        break;
      default:
        yield put(setKycVerifyIdCardFailed(error?.response?.data));
        break;
    }
  }
}

// PIN
function* setKycPin(params) {
  try {
    const response = yield call(setKycPinApi, params.payload);
    yield put(setKycPinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycPinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycPinFailed(error?.response?.data));
        break;
      default:
        yield put(setKycPinFailed(error?.response?.data));
        break;
    }
  }
}

// VERIFY DUKCAPIL
function* setKycVerifyDukcapil(params) {
  try {
    const response = yield call(setKycVerifyDukcapilApi, params.payload);
    if (response.data.data.isVerified === true) {
      yield put(
        setKycVerifyDukcapilSuccess({
          data: { ...response.data.data, isTrimmed: false },
        })
      );
    } else {
      yield delay(5000);
      const response2 = yield call(setKycVerifyDukcapilApi, {
        ...params.payload,
        name: params.payload.name
          .substring(0, params.payload.name.indexOf(','))
          .trim(),
      });
      if (response2.data.data.isVerified === true) {
        yield put(
          setKycVerifyDukcapilSuccess({
            data: { ...response2.data.data, isTrimmed: true },
          })
        );
      } else {
        yield put(setKycVerifyDukcapilFailed({ message: 'NOT_VERIFIED' }));
      }
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycVerifyDukcapilFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycVerifyDukcapilFailed(error?.response?.data));
        break;
      default:
        yield put(setKycVerifyDukcapilFailed(error?.response?.data));
        break;
    }
  }
}

// FACECOMPARE
function* setKycFaceCompare(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setKycFaceCompareApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setKycFaceCompareSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycFaceCompareFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycFaceCompareFailed(error?.response?.data));
        break;
      default:
        yield put(setKycFaceCompareFailed(error?.response?.data));
        break;
    }
  }
}

// RATING
function* setKycRating(params) {
  try {
    const response = yield call(setKycRatingApi, params.payload);
    yield put(setKycRatingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycRatingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycRatingFailed(error?.response?.data));
        break;
      default:
        yield put(setKycRatingFailed(error?.response?.data));
        break;
    }
  }
}

// ADD POSTALCODE FOR ID CARD
function* setAddPostalCodeKycIdCard(params) {
  try {
    const response = yield call(setAddPostalCodeKycIdCardApi, params.payload);
    yield put(setAddPostalCodeKycIdCardSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setAddPostalCodeKycIdCardFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setAddPostalCodeKycIdCardFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setAddPostalCodeKycIdCardFailed({
            message: RESPONSE_STATE.ERR_NETWORK,
          })
        );
        break;
      default:
        yield put(setAddPostalCodeKycIdCardFailed(error?.response?.data));
        break;
    }
  }
}

// REFACECOMPARE
function* setKycReFaceCompare(params) {
  try {
    const response = yield call(setKycReFaceCompareApi, params.payload);
    yield put(setKycReFaceCompareSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setKycReFaceCompareFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setKycReFaceCompareFailed(error?.response?.data));
        break;
      default:
        yield put(setKycReFaceCompareFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.SET_KYC_SELFIE, setKycSelfie),
  takeLatest(CONST.SET_KYC_IDCARD, setKycIdCard),
  takeLatest(CONST.SET_KYC_VERIFYIDCARD, setKycVerifyIdCard),
  takeLatest(CONST.SET_KYC_PIN, setKycPin),
  takeLatest(CONST.SET_KYC_VERIFYDUKCAPIL, setKycVerifyDukcapil),
  takeLatest(CONST.SET_KYC_FACECOMPARE, setKycFaceCompare),
  takeLatest(CONST.SET_KYC_RATING, setKycRating),
  takeLatest(CONST.SET_KYC_POSTALCODE_IDCARD, setAddPostalCodeKycIdCard),
  takeLatest(CONST.SET_KYC_REFACECOMPARE, setKycReFaceCompare),
];
