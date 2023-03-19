import { RESPONSE_STATE, RESPONSE_STATUS } from 'ca-util/constant';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as CONST from 'ca-module-payments/paymentsConstant';
import {
  getPaymentMethodFailed,
  getPaymentMethodSuccess,
  getPaymentStatusFailed,
  getPaymentStatusSuccess,
  setCreateBillFailed,
  setCreateBillSuccess,
  deletePaymentMethodFailed,
  deletePaymentMethodSuccess,
  orderPaymentMethodFailed,
  orderPaymentMethodSuccess,
  getAddCardStatusFailed,
  getPaymentStatusv2Success,
  getPaymentStatusv2Failed,
  getPaymentEventStatusSuccess,
  getPaymentEventStatusFailed,
  getInvoiceMasterSuccess,
  getInvoiceMasterFailed,
} from './paymentsAction';
import {
  getPaymentMethodApi,
  getPaymentStatusApi,
  setCreateBillApi,
  deletePaymentMethodApi,
  orderPaymentMethodApi,
  getAddCardStatusApi,
  getAddCardAsMainApi,
  setCreateBillEventApi,
  setCreteBillProposalApi,
  setCreateBillSinglePaymentApi,
  getPaymentStatusv2Api,
  getPaymentEventStatusApi,
  setCreateBillRenewalApi,
  setCreateBillPolicyApi,
  getInvoiceMasterApi,
} from './paymentsApi';

function* getPaymentMethod(params) {
  try {
    const response = yield call(getPaymentMethodApi, params.payload);
    yield put(getPaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentMethodFailed(error?.response?.data));
    }
  }
}

function* setCreateBill(params) {
  try {
    let response;
    if (params?.payload?.isPaymentTypeFalse) {
      response = yield call(setCreateBillEventApi, params?.payload?.data);
    } else if (params?.payload?.isProposal) {
      response = yield call(setCreteBillProposalApi, params?.payload?.data);
    } else if (params?.payload?.isSinglePayment) {
      response = yield call(
        setCreateBillSinglePaymentApi,
        params?.payload?.data
      );
    } else if (params?.payload?.isRenewal) {
      response = yield call(setCreateBillRenewalApi, params?.payload?.data);
    } else {
      response = yield call(setCreateBillApi, params.payload);
    }

    yield put(setCreateBillSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreateBillFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreateBillFailed(error?.response?.data));
        break;
      default:
        yield put(setCreateBillFailed(error?.response?.data));
    }
  }
}

function* getPaymentStatus(params) {
  try {
    let response;
    if (params?.payload?.isOnlyAddCard) {
      response = yield call(getAddCardStatusApi, params.payload.data);
    } else {
      response = yield call(getPaymentStatusApi, params.payload);
    }
    yield put(getPaymentStatusSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentStatusFailed(error?.response?.data));
    }
  }
}

function* getPaymentStatusv2(params) {
  try {
    const response = yield call(getPaymentStatusv2Api, params.payload);
    yield put(getPaymentStatusv2Success(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
        break;
      default:
        yield put(getPaymentStatusv2Failed(error?.response?.data));
    }
  }
}
function* getPaymentEventStatus(params) {
  try {
    const response = yield call(getPaymentEventStatusApi, params.payload);
    yield put(getPaymentEventStatusSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getPaymentEventStatusFailed(error?.response?.data));
    }
  }
}
function* deletePaymentMethod(params) {
  try {
    const response = yield call(deletePaymentMethodApi, params.payload);
    yield put(deletePaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(deletePaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(deletePaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(deletePaymentMethodFailed(error?.response?.data));
    }
  }
}

function* orderPaymentMethod(params) {
  try {
    const response = yield call(orderPaymentMethodApi, params.payload);
    yield put(orderPaymentMethodSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(orderPaymentMethodFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(orderPaymentMethodFailed(error?.response?.data));
        break;
      default:
        yield put(orderPaymentMethodFailed(error?.response?.data));
    }
  }
}

function* getAddCardStatus(params) {
  try {
    const response = yield call(getAddCardStatusApi, params.payload);
    yield put(getPaymentStatusSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAddCardStatusFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAddCardStatusFailed(error?.response?.data));
        break;
      default:
        yield put(getAddCardStatusFailed(error?.response?.data));
    }
  }
}

function* getInvoiceMaster(params) {
  try {
    const response = yield call(getInvoiceMasterApi, params.payload);
    yield put(getInvoiceMasterSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getInvoiceMasterFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getInvoiceMasterFailed(error?.response?.data));
        break;
      default:
        yield put(getInvoiceMasterFailed(error?.response?.data));
    }
  }
}

function* setCreateBulkBill(params) {
  try {
    const response = yield call(setCreateBulkBillApi, params.payload);
    yield put(setCreateBulkBillSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreateBulkBillFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreateBulkBillFailed(error?.response?.data));
        break;
      default:
        yield put(setCreateBulkBillFailed(error?.response?.data));
    }
  }
}

function* setCreateBulkSubmission(params) {
  try {
    const response = yield call(setCreateBulkSubmissionApi, params.payload);
    yield put(setCreateBulkSubmissionSuccess(response?.data));
    // console.log('ini response => ', response);
  } catch (error) {
    // console.log('ini error => ', error?.response);
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreateBulkSubmissionFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreateBulkSubmissionFailed(error?.response?.data));
        break;
      default:
        yield put(setCreateBulkSubmissionFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_PAYMENT_METHOD, getPaymentMethod),
  takeLatest(CONST.SET_CREATE_BILL, setCreateBill),
  takeLatest(CONST.GET_PAYMENT_STATUS, getPaymentStatus),
  takeLatest(CONST.GET_PAYMENT_STATUS_V2, getPaymentStatusv2),
  takeLatest(CONST.GET_PAYMENT_EVENT_STATUS, getPaymentEventStatus),
  takeLatest(CONST.DELETE_PAYMENT_METHOD, deletePaymentMethod),
  takeLatest(CONST.ORDER_PAYMENT_METHOD, orderPaymentMethod),
  takeLatest(CONST.GET_ADD_CARD_STATUS, getAddCardStatus),
  takeLatest(CONST.GET_INVOICE_MASTER, getInvoiceMaster),
];
