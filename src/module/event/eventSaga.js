import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-event/eventConstant';
import {
  getEventCategoriesAPI,
  getEventDetailApi,
  getEventDetailPublicApi,
  getEventQuotaApi,
  getEventUpcomingApi,
  getEventUpcomingPublicApi,
  getEventUserTicketApi,
  getEventFavoriteApi,
  setEventAddFavoriteApi,
  setEventBuyTicketApi,
  setEventRmvFavoriteApi,
  getUserEventInvoiceIdApi,
  setPaymentEventApi,
  setValidateVoucherCodeApi,
  setValidateAccessCodeApi,
} from 'ca-module-event/eventApi';
import { setCreateBillEventApi } from 'ca-module-payments/paymentsApi';
import {
  getEventDetailSuccess,
  getEventDetailFailed,
  getEventQuotaFailed,
  getEventQuotaSuccess,
  getEventUpcomingSuccess,
  getEventUpcomingFailed,
  setEventAddFavoriteSuccess,
  setEventAddFavoriteFailed,
  setEventRmvFavoriteSuccess,
  setEventRmvFavoriteFailed,
  getEventFavoriteSuccess,
  getEventFavoriteFailed,
  getEventUserTicketSuccess,
  getEventUserTicketFailed,
  setEventBuyTicketSuccess,
  setEventBuyTicketFailed,
  getEventCategoriesFailed,
  getEventCategoriesSuccess,
  getUserEventInvoiceIdSuccess,
  getUserEventInvoiceIdFailed,
  setPaymentEventSuccess,
  setPaymentEventFailed,
  setCreateBillEventSuccess,
  setCreateBillEventFailed,
  setValidateVoucherCodeSuccess,
  setValidateVoucherCodeFailed,
  setValidateAccessCodeSuccess,
  setValidateAccessCodeFailed,
} from './eventAction';

// EVENT DETAIL
function* getEventDetail(params) {
  try {
    if (params?.payload?.userId) {
      const response = yield call(getEventDetailApi, params.payload);
      yield put(getEventDetailSuccess(response.data));
    } else {
      const response = yield call(getEventDetailPublicApi, params.payload);
      yield put(getEventDetailSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEventDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEventDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getEventDetailFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT QUOTA (LEFTOVER TICKET)
function* getEventQuota(params) {
  try {
    const response = yield call(getEventQuotaApi, params.payload);
    yield put(getEventQuotaSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEventQuotaFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEventQuotaFailed(error?.response?.data));
        break;
      default:
        yield put(getEventQuotaFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT UPCOMING
function* getEventUpcoming(params) {
  try {
    if (params?.payload?.userId) {
      const response = yield call(getEventUpcomingApi, params.payload.lang);
      yield put(getEventUpcomingSuccess(response.data));
    } else {
      const response = yield call(
        getEventUpcomingPublicApi,
        params.payload.lang
      );
      yield put(getEventUpcomingSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEventUpcomingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEventUpcomingFailed(error?.response?.data));
        break;
      default:
        yield put(getEventUpcomingFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT ADD FAV
function* setEventAddFavorite(params) {
  try {
    const response = yield call(setEventAddFavoriteApi, params.payload);
    yield put(setEventAddFavoriteSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setEventAddFavoriteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setEventAddFavoriteFailed(error?.response?.data));
        break;
      default:
        yield put(setEventAddFavoriteFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT RM FAV
function* setEventRmvFavorite(params) {
  try {
    const response = yield call(setEventRmvFavoriteApi, params.payload);
    yield put(setEventRmvFavoriteSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setEventRmvFavoriteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setEventRmvFavoriteFailed(error?.response?.data));
        break;
      default:
        yield put(setEventRmvFavoriteFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT FAV
function* getEventFavorite(params) {
  try {
    const response = yield call(getEventFavoriteApi, params.payload);
    yield put(getEventFavoriteSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEventFavoriteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEventFavoriteFailed(error?.response?.data));
        break;
      default:
        yield put(getEventFavoriteFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT USERTICKET
function* getEventUserTicket(params) {
  try {
    const response = yield call(getEventUserTicketApi, params.payload);
    yield put(getEventUserTicketSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getEventUserTicketFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getEventUserTicketFailed(error?.response?.data));
        break;
      default:
        yield put(getEventUserTicketFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT BUYTICKET
function* setEventBuyTIcket(params) {
  try {
    const response = yield call(setEventBuyTicketApi, params.payload);
    yield put(setEventBuyTicketSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setEventBuyTicketFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setEventBuyTicketFailed(error?.response?.data));
        break;
      default:
        yield put(setEventBuyTicketFailed(error?.response?.data));
        break;
    }
  }
}

// EVENT CATEGORIES
function* getEventCategories(params) {
  try {
    const response = yield call(getEventCategoriesAPI, params.payload);
    yield put(getEventCategoriesSuccess(response.data));
  } catch (error) {
    yield put(getEventCategoriesFailed(error?.response?.data));
  }
}

// GET EVENT USER INVOICE ID
function* getUserEventInvoiceId(params) {
  try {
    const response = yield call(getUserEventInvoiceIdApi, params.payload);
    yield put(getUserEventInvoiceIdSuccess(response.data));
  } catch (error) {
    yield put(getUserEventInvoiceIdFailed(error?.response?.data));
  }
}

// SET PAYMENT EVENT
function* setPaymentEvent(params) {
  try {
    const response = yield call(setPaymentEventApi, params.payload);
    yield put(setPaymentEventSuccess(response.data));
  } catch (error) {
    yield put(setPaymentEventFailed(error?.response?.data));
  }
}
// SET CREATE BILL EVENT
function* setCreateBillEvent(params) {
  try {
    const response = yield call(setCreateBillEventApi, params.payload);
    yield put(setCreateBillEventSuccess(response.data));
  } catch (error) {
    yield put(setCreateBillEventFailed(error?.response?.data));
  }
}

// SET VOUCHER CODE
function* setValidateVoucherCode(params) {
  try {
    const response = yield call(setValidateVoucherCodeApi, params.payload);
    yield put(setValidateVoucherCodeSuccess(response.data));
  } catch (error) {
    console.log('errr', error);
    yield put(setValidateVoucherCodeFailed(error?.response?.data));
  }
}

// VALIDATE ACCESS CODE
function* setValidateAccessCode(params) {
  try {
    const response = yield call(setValidateAccessCodeApi, params.payload);
    yield put(setValidateAccessCodeSuccess(response.data));
  } catch (error) {
    yield put(setValidateAccessCodeFailed(error?.response?.data));
  }
}

export default [
  takeLatest(CONST.GET_EVENT_CATEGORIES, getEventCategories),
  takeLatest(CONST.GET_EVENT_DETAIL, getEventDetail),
  takeLatest(CONST.GET_EVENT_QUOTA, getEventQuota),
  takeLatest(CONST.GET_EVENT_UPCOMING, getEventUpcoming),
  takeLatest(CONST.SET_EVENT_ADDFAVORITE, setEventAddFavorite),
  takeLatest(CONST.SET_EVENT_RMVFAVORITE, setEventRmvFavorite),
  takeLatest(CONST.GET_EVENT_FAVORITE, getEventFavorite),
  takeLatest(CONST.GET_EVENT_USERTICKET, getEventUserTicket),
  takeLatest(CONST.SET_EVENT_BUYTICKET, setEventBuyTIcket),
  takeLatest(CONST.GET_USER_EVENT_INVOICE_ID, getUserEventInvoiceId),
  takeLatest(CONST.SET_PAYMENT_EVENT, setPaymentEvent),
  takeLatest(CONST.SET_CREATE_BILL_EVENT, setCreateBillEvent),
  takeLatest(CONST.SET_VALIDATE_VOUCHER_CODE, setValidateVoucherCode),
  takeLatest(CONST.SET_VALIDATE_ACCESS_CODE, setValidateAccessCode),
];
