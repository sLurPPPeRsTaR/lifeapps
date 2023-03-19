import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-polis/polisConstant';
import {
  getPolicySelfDataSuccess,
  getPolicySelfDataFailed,
  getPolicyBenefitSuccess,
  getPolicyBenefitFailed,
  getPolicyClaimFailed,
  getPolicyClaimSuccess,
  getPolicyFundsSuccess,
  getPolicyFundsFailed,
  getPolicySummarySuccess,
  getPolicySummaryFailed,
  getPolicyClaimDetailSuccess,
  getPolicyClaimDetailFailed,
  getPolicyDownloadSuccess,
  getPolicyDownloadFailed,
} from 'ca-module-polis/polisAction';
import {
  getPolicyBenefitApi,
  getPolicyClaimApi,
  getPolicyClaimDetailApi,
  getPolicyDownloadApi,
  getPolicyFundsApi,
  getPolicySelfDataApi,
  getPolicySummaryApi,
} from 'ca-module-polis/polisApi';

function* getPolicySummary(params) {
  try {
    const response = yield call(getPolicySummaryApi, params.payload);
    yield put(getPolicySummarySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicySummaryFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicySummaryFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicySelfData(params) {
  try {
    const response = yield call(getPolicySelfDataApi, params.payload);
    yield put(getPolicySelfDataSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicySelfDataFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicySelfDataFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicyBenefit(params) {
  try {
    const response = yield call(getPolicyBenefitApi, params.payload);
    yield put(getPolicyBenefitSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyBenefitFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyBenefitFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicyFunds(params) {
  try {
    const response = yield call(getPolicyFundsApi, params.payload);
    yield put(getPolicyFundsSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyFundsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyFundsFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicyClaim(params) {
  try {
    const response = yield call(getPolicyClaimApi, params.payload);
    yield put(getPolicyClaimSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyClaimFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyClaimFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicyClaimDetail(params) {
  try {
    const response = yield call(getPolicyClaimDetailApi, params.payload);
    yield put(getPolicyClaimDetailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyClaimDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyClaimDetailFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPolicyDownload(params) {
  try {
    const response = yield call(getPolicyDownloadApi, params.payload);
    yield put(getPolicyDownloadSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyDownloadFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyDownloadFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.GET_POLICY_SUMMARY, getPolicySummary),
  takeLatest(CONST.GET_POLICY_SELF_DATA, getPolicySelfData),
  takeLatest(CONST.GET_POLICY_BENEFIT, getPolicyBenefit),
  takeLatest(CONST.GET_POLICY_FUNDS, getPolicyFunds),
  takeLatest(CONST.GET_POLICY_CLAIM, getPolicyClaim),
  takeLatest(CONST.GET_POLICY_CLAIM_DETAIL, getPolicyClaimDetail),
  takeLatest(CONST.GET_POLICY_DOWNLOAD, getPolicyDownload),
];
