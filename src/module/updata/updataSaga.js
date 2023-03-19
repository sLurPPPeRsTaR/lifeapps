import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-updata/updataConstant';
import {
  getUpdataLastKKInfoFailed,
  getUpdataLastKKInfoSuccess,
  getUpdataLastKTPInfoFailed,
  getUpdataLastKTPInfoSuccess,
  getUpdataLastOtherInfoFailed,
  getUpdataLastOtherInfoSuccess,
  getUpdataListBankFailed,
  getUpdataListBankSuccess,
  setUpdataCheckKKKTPFailed,
  setUpdataCheckKKKTPSuccess,
  setUpdataKKFailed,
  setUpdataKKSuccess,
  setUpdataKTPFailed,
  setUpdataKTPSuccess,
  setUpdataLivenessFailed,
  setUpdataLivenessSuccess,
  setUpdataVerifyPengkinianFailed,
  setUpdataVerifyPengkinianSuccess,
  setUpdataVerifyOtpFailed,
  setUpdataVerifyOtpSuccess,
  setUpdataRequestOtpSuccess,
  setUpdataRequestOtpFailed,
  getUpdataProvinceSuccess,
  getUpdataProvinceFailed,
  getUpdataCitySuccess,
  getUpdataCityFailed,
  getUpdataDistrictSuccess,
  getUpdataDistrictFailed,
  setUpdataAlterPoliciesSuccess,
  setUpdataAlterPoliciesFailed,
  getUpdataSubDistrictSuccess,
  getUpdataSubDistrictFailed,
  setUpdataInquiryBankAccountSuccess,
  setUpdataInquiryBankAccountFailed,
  getUpdataDetailEKycSuccess,
  getUpdataDetailEKycFailed,
  setUpdataBankUploadSuccess,
  setUpdataBankUploadFailed,
  setUpdataFaceCompareSuccess,
  setUpdataFaceCompareFailed,
  getUpdataValidationCheckSuccess,
  getUpdataValidationCheckFailed,
} from 'ca-module-updata/updataAction';
import {
  getUpdataLastKKInfoApi,
  getUpdataLastKTPInfoApi,
  getUpdataLastOtherInfoApi,
  getUpdataListBankApi,
  setUpdataCheckKKKTPApi,
  setUpdataKKApi,
  setUpdataKTPApi,
  setUpdataLivenessApi,
  setUpdataVerifyPengkinianApi,
  setUpdataVerifyOtpApi,
  setUpdataRequestOtpApi,
  getUpdataProvinceApi,
  getUpdataCityApi,
  getUpdataDistrictApi,
  setUpdataAlterPoliciesApi,
  getUpdataSubDistrictApi,
  setUpdataInquiryBankAccountApi,
  getUpdataDetailEKycApi,
  setUpdataBankUploadApi,
  setUpdataFaceCompareApi,
  getUpdataValidationCheckApi,
} from 'ca-module-updata/updataApi';
import { setProgressWatcher, setUploader } from 'ca-util/uploader';

// Liveness
function* setUpdataLiveness(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUpdataLivenessApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setUpdataLivenessSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataLivenessFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataLivenessFailed(error?.response?.data));
        break;
      default:
        yield put(setUpdataLivenessFailed(error?.response?.data));
        break;
    }
  }
}

// KTP
function* setUpdataKTP(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUpdataKTPApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setUpdataKTPSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataKTPFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataKTPFailed(error?.response?.data));
        break;
      default:
        yield put(setUpdataKTPFailed(error?.response?.data));
        break;
    }
  }
}
// KK
function* setUpdataKK(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUpdataKKApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setUpdataKKSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataKKFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataKKFailed(error?.response?.data));
        break;
      default:
        yield put(setUpdataKKFailed(error?.response?.data));
        break;
    }
  }
}

// Last KTP
function* getUpdataLastKTPInfo(params) {
  try {
    const response = yield call(getUpdataLastKTPInfoApi, params.payload);
    yield put(getUpdataLastKTPInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataLastKTPInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataLastKTPInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Last KK
function* getUpdataLastKKInfo(params) {
  try {
    const response = yield call(getUpdataLastKKInfoApi, params.payload);
    yield put(getUpdataLastKKInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataLastKKInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataLastKKInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Last Other Info
function* getUpdataLastOtherInfo(params) {
  try {
    const response = yield call(getUpdataLastOtherInfoApi, params.payload);
    yield put(getUpdataLastOtherInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataLastOtherInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataLastOtherInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Check KK and KTP
function* setUpdataCheckKKKTP(params) {
  try {
    const response = yield call(setUpdataCheckKKKTPApi, params.payload);
    yield put(setUpdataCheckKKKTPSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataCheckKKKTPFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataCheckKKKTPFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Verify Pengkinian
function* setUpdataVerifyPengkinian(params) {
  try {
    const response = yield call(setUpdataVerifyPengkinianApi, params.payload);
    yield put(setUpdataVerifyPengkinianSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataVerifyPengkinianFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataVerifyPengkinianFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// List Bank
function* getUpdataListBank(params) {
  try {
    const response = yield call(getUpdataListBankApi, params.payload);
    yield put(getUpdataListBankSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataListBankFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataListBankFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Request OTP
function* setUpdataRequestOtp(params) {
  try {
    const response = yield call(setUpdataRequestOtpApi, params.payload);
    yield put(setUpdataRequestOtpSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataRequestOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataRequestOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Verify OTP
function* setUpdataVerifyOtp(params) {
  try {
    const response = yield call(setUpdataVerifyOtpApi, params.payload);
    yield put(setUpdataVerifyOtpSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataVerifyOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataVerifyOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Province
function* getUpdataProvince(params) {
  try {
    const response = yield call(getUpdataProvinceApi, params.payload);
    yield put(getUpdataProvinceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataProvinceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataProvinceFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// City
function* getUpdataCity(params) {
  try {
    const response = yield call(getUpdataCityApi, params.payload);
    yield put(getUpdataCitySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataCityFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataCityFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// District
function* getUpdataDistrict(params) {
  try {
    const response = yield call(getUpdataDistrictApi, params.payload);
    yield put(getUpdataDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// SubDistrict
function* getUpdataSubDistrict(params) {
  try {
    const response = yield call(getUpdataSubDistrictApi, params.payload);
    yield put(getUpdataSubDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataSubDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataSubDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Alter Policies
function* setUpdataAlterPolicies(params) {
  try {
    const response = yield call(setUpdataAlterPoliciesApi, params.payload);
    yield put(setUpdataAlterPoliciesSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataAlterPoliciesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataAlterPoliciesFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Alter Policies
function* setUpdataInquiryBankAccount(params) {
  try {
    const response = yield call(setUpdataInquiryBankAccountApi, params.payload);
    yield put(setUpdataInquiryBankAccountSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataInquiryBankAccountFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataInquiryBankAccountFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// SubDistrict
function* getUpdataDetailEKyc(params) {
  try {
    const response = yield call(getUpdataDetailEKycApi, params.payload);
    yield put(getUpdataDetailEKycSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataDetailEKycFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataDetailEKycFailed(error?.response?.data));
        break;
      default:
        yield put(getUpdataDetailEKycFailed(error?.response?.data));
        break;
    }
  }
}

// BANK UPLOAD
function* setUpdataBankUpload(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUpdataBankUploadApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setUpdataBankUploadSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataBankUploadFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataBankUploadFailed(error?.response?.data));
        break;
      default:
        yield put(setUpdataBankUploadFailed(error?.response?.data));
        break;
    }
  }
}

// FACECOMPARE
function* setUpdataFaceCompare(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUpdataFaceCompareApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    yield put(setUpdataFaceCompareSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdataFaceCompareFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdataFaceCompareFailed(error?.response?.data));
        break;
      default:
        yield put(setUpdataFaceCompareFailed(error?.response?.data));
        break;
    }
  }
}

// FACECOMPARE
function* getUpdataValidationCheck(params) {
  try {
    const response = yield call(getUpdataValidationCheckApi, params.payload);
    yield put(getUpdataValidationCheckSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUpdataValidationCheckFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUpdataValidationCheckFailed(error?.response?.data));
        break;
      default:
        yield put(getUpdataValidationCheckFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.SET_UPDATA_LIVENESS, setUpdataLiveness),
  takeLatest(CONST.SET_UPDATA_KTP, setUpdataKTP),
  takeLatest(CONST.SET_UPDATA_KK, setUpdataKK),
  takeLatest(CONST.GET_UPDATA_LAST_KTP_INFO, getUpdataLastKTPInfo),
  takeLatest(CONST.GET_UPDATA_LAST_KK_INFO, getUpdataLastKKInfo),
  takeLatest(CONST.GET_UPDATA_LAST_OTHER_INFO, getUpdataLastOtherInfo),
  takeLatest(CONST.SET_UPDATA_CHECK_KK_KTP, setUpdataCheckKKKTP),
  takeLatest(CONST.SET_UPDATA_VERIFY_PENGKINIAN, setUpdataVerifyPengkinian),
  takeLatest(CONST.GET_UPDATA_LIST_BANK, getUpdataListBank),
  takeLatest(CONST.SET_UPDATA_REQUEST_OTP, setUpdataRequestOtp),
  takeLatest(CONST.SET_UPDATA_VERIFY_OTP, setUpdataVerifyOtp),
  takeLatest(CONST.GET_UPDATA_PROVINCE, getUpdataProvince),
  takeLatest(CONST.GET_UPDATA_CITY, getUpdataCity),
  takeLatest(CONST.GET_UPDATA_DISTRICT, getUpdataDistrict),
  takeLatest(CONST.GET_UPDATA_SUB_DISTRICT, getUpdataSubDistrict),
  takeLatest(CONST.SET_UPDATA_ALTER_POLICIES, setUpdataAlterPolicies),
  takeLatest(
    CONST.SET_UPDATA_INQUIRY_BANK_ACCOUNT,
    setUpdataInquiryBankAccount
  ),
  takeLatest(CONST.GET_UPDATA_DETAIL_EKYC, getUpdataDetailEKyc),
  takeLatest(CONST.SET_UPDATA_BANK_UPLOAD, setUpdataBankUpload),
  takeLatest(CONST.SET_UPDATA_FACECOMPARE, setUpdataFaceCompare),
  takeLatest(CONST.GET_UPDATA_VALIDATION_CHECK, getUpdataValidationCheck),
];
