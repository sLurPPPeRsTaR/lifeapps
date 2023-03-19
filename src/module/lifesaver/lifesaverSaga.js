import { codeLifesaver, PRODUCT, RESPONSE_STATUS } from 'ca-util/constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CONST from 'ca-module-lifesaver/lifesaverConstant';
import {
  getCampaignFailed,
  getCampaignSuccess,
  getCurrentSubsFailed,
  getCurrentSubsSuccess,
  getListRsFailed,
  getListRsSuccess,
  getPersonalRiplayFailed,
  getPersonalRiplaySuccess,
  getProductFailed,
  getProductsFailed,
  getProductsSuccess,
  getProductSuccess,
  setSubmissionFailed,
  setSubmissionSuccess,
  getPolicyDetailFailed,
  getPolicyDetailSuccess,
  setWaitingFailed,
  setWaitingSuccess,
  getEligibleSubmissionSuccess,
  getEligibleSubmissionFailed,
  getEligibleSubmissionClear,
  getIsUserEligibleSuccess,
  getIsUserEligibleFailed,
  getIsUserEligibleClear,
  setPersonEligibleFailed,
  setPersonEligibleSuccess,
  getEligiblePosSuccess,
  getEligiblePosFailed,
  getTotalClaimSuccess,
  getTotalClaimFailed,
} from './lifesaverAction';
import {
  getCampaignApi,
  getCurrentSubsApi,
  getListRsApi,
  getPersonalRiplayApi,
  getProductApi,
  setSubmissionApi,
  getPolicyDetailApi,
  setWaitingApi,
  getIsUserEligibleApi,
  setPersonEligibleApi,
  getEligiblePosApi,
  getTotalClaimApi,
} from './lifesaverApi';
import { convertArrayToObject } from 'ca-util/format';

function* getProduct(params) {
  try {
    const response = yield call(getProductApi, params.payload);
    yield put(
      getProductSuccess({
        ...response?.data?.data,
        waitingPeriodeInHours: convertArrayToObject(
          response?.data?.data?.waitingPeriodeInHours,
          'type',
          'timePeriod'
        ),
      })
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductFailed(error?.response?.data));
        break;
      default:
        yield put(getProductFailed(error?.response?.data));
    }
  }
}

function* getProducts() {
  try {
    const resLifesaver = yield call(getProductApi, {
      productCode: codeLifesaver.productCode,
      planCode: codeLifesaver.lifesaver.planCode,
    });
    const resLifesaverplus = yield call(getProductApi, {
      productCode: codeLifesaver.productCode,
      planCode: codeLifesaver.lifesaverplus.planCode,
    });
    yield put(
      getProductsSuccess({
        [PRODUCT.LIFESAVER.LIFESAVER]: {
          ...resLifesaver?.data?.data,
          coverageBenefitLimitMainObject: convertArrayToObject(
            resLifesaver?.data?.data?.coverageBenefitLimitMain,
            'code',
            'limit'
          ),
          coverageBenefitLimitInnerObject: convertArrayToObject(
            resLifesaver?.data?.data?.coverageBenefitLimitInner,
            'code',
            'limit'
          ),
        },
        [PRODUCT.LIFESAVER.LIFESAVER_PLUS]: {
          ...resLifesaverplus?.data?.data,
          coverageBenefitLimitMainObject: convertArrayToObject(
            resLifesaverplus?.data?.data?.coverageBenefitLimitMain,
            'code',
            'limit'
          ),
          coverageBenefitLimitInnerObject: convertArrayToObject(
            resLifesaverplus?.data?.data?.coverageBenefitLimitInner,
            'code',
            'limit'
          ),
        },
      })
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProductsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProductsFailed(error?.response?.data));
        break;
      default:
        yield put(getProductsFailed(error?.response?.data));
    }
  }
}

function* getListRs(params) {
  try {
    const response = yield call(getListRsApi, params.payload);
    yield put(getListRsSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getListRsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getListRsFailed(error?.response?.data));
        break;
      default:
        yield put(getListRsFailed(error?.response?.data));
    }
  }
}

function* getPersonalRiplay(params) {
  try {
    const response = yield call(getPersonalRiplayApi, params.payload);
    yield put(getPersonalRiplaySuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalRiplayFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalRiplayFailed(error?.response?.data));
        break;
      default:
        yield put(getPersonalRiplayFailed(error?.response?.data));
    }
  }
}

function* setSubmission(params) {
  try {
    const response = yield call(setSubmissionApi, params.payload);
    yield put(setSubmissionSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(setSubmissionFailed(error?.response?.data));
    }
  }
}

function* getCurrentSubs(params) {
  try {
    const response = yield call(getCurrentSubsApi, params.payload);
    yield put(getCurrentSubsSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCurrentSubsFailed(error?.response?.data));
        break;
      default:
        yield put(getCurrentSubsFailed(error?.response?.data));
    }
  }
}

function* getCampaign(params) {
  try {
    const response = yield call(getCampaignApi, params.payload);
    yield put(getCampaignSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCampaignFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCampaignFailed(error?.response?.data));
        break;
      default:
        yield put(getCampaignFailed(error?.response?.data));
    }
  }
}

function* getPolicyDetail(params) {
  try {
    const response = yield call(getPolicyDetailApi, params.payload);
    yield put(getPolicyDetailSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyDetailFailed(error?.response?.data));
    }
  }
}

function* setWaiting() {
  try {
    const response = yield call(setWaitingApi);
    yield put(setWaitingSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setWaitingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setWaitingFailed(error?.response?.data));
        break;
      default:
        yield put(setWaitingFailed(error?.response?.data));
    }
  }
}

function* getEligibleSubmission(params) {
  try {
    const getCurrentSubsResponse = yield call(getCurrentSubsApi);
    const getEligibleResponse = yield call(
      getIsUserEligibleApi,
      params.payload
    );
    yield put(
      getEligibleSubmissionSuccess({
        eligible: getEligibleResponse?.data,
        getCurrentSubs: getCurrentSubsResponse?.data?.data?.planName,
      })
    );
  } catch (error) {
    yield put(getEligibleSubmissionClear());
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(getEligibleSubmissionFailed(error?.response?.data));
    }
  }
}

function* getIsUserEligible(params) {
  try {
    const response = yield call(getIsUserEligibleApi, params.payload);
    yield put(
      getIsUserEligibleSuccess({
        data: response.data,
        status: true,
      })
    );
  } catch (error) {
    getIsUserEligibleClear();
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getIsUserEligibleFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getIsUserEligibleFailed(error?.response?.data));
        break;
      default:
        yield put(getIsUserEligibleFailed(error?.response?.data));
    }
  }
}

function* setPersonEligible(params) {
  try {
    const response = yield call(setPersonEligibleApi, params.payload);
    yield put(setPersonEligibleSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setPersonEligibleFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setPersonEligibleFailed(error?.response?.data));
        break;
      default:
        yield put(setPersonEligibleFailed(error?.response?.data));
    }
  }
}

function* getEligiblePos(params) {
  try {
    const response = yield call(getEligiblePosApi, params.payload);
    yield put(getEligiblePosSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEligiblePosFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEligiblePosFailed(error?.response?.data));
        break;
      default:
        yield put(getEligiblePosFailed(error?.response?.data));
    }
  }
}

function* getTotalClaim(params) {
  try {
    const response = yield call(getTotalClaimApi, params.payload);
    yield put(getTotalClaimSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getTotalClaimFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getTotalClaimFailed(error?.response?.data));
        break;
      default:
        yield put(getTotalClaimFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_PRODUCT, getProduct),
  takeLatest(CONST.GET_PRODUCTS, getProducts),
  takeLatest(CONST.GET_LIST_RS, getListRs),
  takeLatest(CONST.GET_PERSONAL_RIPLAY, getPersonalRiplay),
  takeLatest(CONST.SET_SUBMISSION, setSubmission),
  takeLatest(CONST.GET_CURRENT_SUBS, getCurrentSubs),
  takeLatest(CONST.GET_CAMPAIGN, getCampaign),
  takeLatest(CONST.GET_POLICY_DETAIL, getPolicyDetail),
  takeLatest(CONST.SET_WAITING, setWaiting),
  takeLatest(CONST.GET_ELIGIBLE_SUBMISSION, getEligibleSubmission),
  takeLatest(CONST.GET_IS_USER_ELIGIBLE, getIsUserEligible),
  takeLatest(CONST.SET_PERSON_ELIGIBLE, setPersonEligible),
  takeLatest(CONST.GET_ELIGIBLE_POS, getEligiblePos),
  takeLatest(CONST.GET_TOTAL_CLAIM, getTotalClaim),
];
