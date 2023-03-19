import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATE, RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-home/homeConstant';
import {
  getPolicySuccess,
  getPolicyFailed,
  setLinkPolicySuccess,
  setLinkPolicyFailed,
  getPoliciesSuccess,
  getPoliciesFailed,
  getCheckPolisSuccess,
  getCheckPolisFailed,
  getNotifCountSuccess,
  getNotifCountFailed,
  getWidgetManfaatSuccess,
  getWidgetManfaatFailed,
  getPolicyWidgetHomeSuccess,
  getPolicyWidgetHomeFailed,
  setCallTimeSuccess,
  setCallTimeFailed,
  getListRsFailed,
  getListRsSuccess,
  getPolicyProposalFailed,
  getPolicyProposalSuccess,
  getPolicyWidgetHomePublicSuccess,
  getPolicyWidgetHomePublicFailed,
} from 'ca-module-home/homeAction';
import {
  getPolicyApi,
  setLinkPolicyApi,
  getPoliciesApi,
  getCheckPolisApi,
  getNotifCountApi,
  getWidgetManfaatApi,
  getPolicyWidgetHomeApi,
  setCallTimeApi,
  getListRsApi,
  getPolicyProposalApi,
  getPolicyWidgetHomePublicApi,
} from 'ca-module-home/homeApi';

function* getPolicy(params) {
  try {
    const response = yield call(getPolicyApi, params.payload);
    yield put(getPolicySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyFailed(error?.response?.data));
    }
  }
}

function* setLinkPolicy(params) {
  try {
    const response = yield call(setLinkPolicyApi, params.payload);
    yield put(setLinkPolicySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLinkPolicyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLinkPolicyFailed(error?.response?.data));
        break;
      default:
        yield put(setLinkPolicyFailed(error?.response?.data));
    }
  }
}

function* getPolicies(params) {
  try {
    const response = yield call(getPoliciesApi, params.payload);
    yield put(getPoliciesSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPoliciesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPoliciesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(getPoliciesFailed({ message: RESPONSE_STATE.ERR_NETWORK }));
        break;
      default:
        yield put(getPoliciesFailed(error?.response?.data));
    }
  }
}

function* getCheckPolis(params) {
  try {
    const response = yield call(getCheckPolisApi, params.payload);
    yield put(getCheckPolisSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckPolisFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckPolisFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getNotifCount(params) {
  try {
    const response = yield call(getNotifCountApi, params.payload);
    yield put(getNotifCountSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getNotifCountFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getNotifCountFailed(error?.response?.data));
        break;
      default:
        yield put(getNotifCountFailed(error?.response?.data));
    }
  }
}

function* getWidgetManfaat(params) {
  try {
    const response = yield call(getWidgetManfaatApi, params.payload);
    yield put(getWidgetManfaatSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getWidgetManfaatFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getWidgetManfaatFailed(error?.response?.data));
        break;
      default:
        yield put(getWidgetManfaatFailed(error?.response?.data));
    }
  }
}

function* getPolicyWidgetHome(params) {
  try {
    const response = yield call(getPolicyWidgetHomeApi, params.payload);
    yield put(getPolicyWidgetHomeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyWidgetHomeFailed(error?.response?.data));
    }
  }
}

function* getPolicyWidgetHomePublic(params) {
  try {
    const response = yield call(getPolicyWidgetHomePublicApi, params.payload);
    yield put(getPolicyWidgetHomePublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyWidgetHomePublicFailed(error?.response?.data));
    }
  }
}

function* setCallTime(params) {
  try {
    const response = yield call(setCallTimeApi, params.payload);
    yield put(setCallTimeSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCallTimeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCallTimeFailed(error?.response?.data));
        break;
      default:
        yield put(setCallTimeFailed(error?.response?.data));
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

function* getPolicyProposal(params) {
  try {
    const response = yield call(getPolicyProposalApi, params.payload);
    yield put(getPolicyProposalSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPolicyProposalFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPolicyProposalFailed(error?.response?.data));
        break;
      default:
        yield put(getPolicyProposalFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_POLICY, getPolicy),
  takeLatest(CONST.SET_LINK_POLICY, setLinkPolicy),
  takeLatest(CONST.GET_POLICIES, getPolicies),
  takeLatest(CONST.GET_CHECK_POLIS, getCheckPolis),
  takeLatest(CONST.GET_NOTIF_COUNT, getNotifCount),
  takeLatest(CONST.GET_WIDGET_MANFAAT, getWidgetManfaat),
  takeLatest(CONST.GET_POLICY_WIDGET_HOME, getPolicyWidgetHome),
  takeLatest(CONST.SET_CALL_TIME, setCallTime),
  takeLatest(CONST.GET_LIST_RS_HOME, getListRs),
  takeLatest(CONST.GET_POLICY_PROPOSAL, getPolicyProposal),
  takeLatest(CONST.GET_POLICY_WIDGET_HOME_PUBLIC, getPolicyWidgetHomePublic),
];
