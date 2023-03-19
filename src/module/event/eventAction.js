import * as CONST from './eventConstant';

export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});

// EVENT DETAIL
export const getEventDetail = (payload) => ({
  type: CONST.GET_EVENT_DETAIL,
  payload,
});
export const getEventDetailSuccess = (payload) => ({
  type: CONST.GET_EVENT_DETAIL_SUCCESS,
  payload,
});
export const getEventDetailFailed = (payload) => ({
  type: CONST.GET_EVENT_DETAIL_FAILED,
  payload,
});
export const setEventDetailData = (payload) => ({
  type: CONST.SET_EVENT_DETAIL_DATA,
  payload,
});
export const getEventDetailClear = (payload) => ({
  type: CONST.GET_EVENT_DETAIL_CLEAR,
  payload,
});

// EVENT QUOTA (LEFTOVER TICKET)
export const getEventQuota = (payload) => ({
  type: CONST.GET_EVENT_QUOTA,
  payload,
});
export const getEventQuotaSuccess = (payload) => ({
  type: CONST.GET_EVENT_QUOTA_SUCCESS,
  payload,
});
export const getEventQuotaFailed = (payload) => ({
  type: CONST.GET_EVENT_QUOTA_FAILED,
  payload,
});
export const getEventQuotaClear = (payload) => ({
  type: CONST.GET_EVENT_QUOTA_CLEAR,
  payload,
});

// EVENT UPCOMING
export const getEventUpcoming = (payload) => ({
  type: CONST.GET_EVENT_UPCOMING,
  payload,
});
export const getEventUpcomingSuccess = (payload) => ({
  type: CONST.GET_EVENT_UPCOMING_SUCCESS,
  payload,
});
export const getEventUpcomingFailed = (payload) => ({
  type: CONST.GET_EVENT_UPCOMING_FAILED,
  payload,
});
export const getEventUpcomingClear = (payload) => ({
  type: CONST.GET_EVENT_UPCOMING_CLEAR,
  payload,
});

// EVENT ADD FAV
export const setEventAddFavorite = (payload) => ({
  type: CONST.SET_EVENT_ADDFAVORITE,
  payload,
});
export const setEventAddFavoriteSuccess = (payload) => ({
  type: CONST.SET_EVENT_ADDFAVORITE_SUCCESS,
  payload,
});
export const setEventAddFavoriteFailed = (payload) => ({
  type: CONST.SET_EVENT_ADDFAVORITE_FAILED,
  payload,
});
export const setEventAddFavoriteClear = (payload) => ({
  type: CONST.SET_EVENT_ADDFAVORITE_CLEAR,
  payload,
});

// EVENT RM FAV
export const setEventRmvFavorite = (payload) => ({
  type: CONST.SET_EVENT_RMVFAVORITE,
  payload,
});
export const setEventRmvFavoriteSuccess = (payload) => ({
  type: CONST.SET_EVENT_RMVFAVORITE_SUCCESS,
  payload,
});
export const setEventRmvFavoriteFailed = (payload) => ({
  type: CONST.SET_EVENT_RMVFAVORITE_FAILED,
  payload,
});
export const setEventRmvFavoriteClear = (payload) => ({
  type: CONST.SET_EVENT_RMVFAVORITE_CLEAR,
  payload,
});

// EVENT FAV
export const getEventFavorite = (payload) => ({
  type: CONST.GET_EVENT_FAVORITE,
  payload,
});
export const getEventFavoriteSuccess = (payload) => ({
  type: CONST.GET_EVENT_FAVORITE_SUCCESS,
  payload,
});
export const getEventFavoriteFailed = (payload) => ({
  type: CONST.GET_EVENT_FAVORITE_FAILED,
  payload,
});
export const getEventFavoriteClear = (payload) => ({
  type: CONST.GET_EVENT_FAVORITE_CLEAR,
  payload,
});

// EVENT USERTICKET
export const getEventUserTicket = (payload) => ({
  type: CONST.GET_EVENT_USERTICKET,
  payload,
});
export const getEventUserTicketSuccess = (payload) => ({
  type: CONST.GET_EVENT_USERTICKET_SUCCESS,
  payload,
});
export const getEventUserTicketFailed = (payload) => ({
  type: CONST.GET_EVENT_USERTICKET_FAILED,
  payload,
});
export const getEventUserTicketClear = (payload) => ({
  type: CONST.GET_EVENT_USERTICKET_CLEAR,
  payload,
});

// EVENT BUYTICKET
export const setEventBuyTicket = (payload) => ({
  type: CONST.SET_EVENT_BUYTICKET,
  payload,
});
export const setEventBuyTicketSuccess = (payload) => ({
  type: CONST.SET_EVENT_BUYTICKET_SUCCESS,
  payload,
});
export const setEventBuyTicketFailed = (payload) => ({
  type: CONST.SET_EVENT_BUYTICKET_FAILED,
  payload,
});
export const setEventBuyTicketClear = (payload) => ({
  type: CONST.SET_EVENT_BUYTICKET_CLEAR,
  payload,
});

// EVENT CATEGORIES
export const getEventCategories = (payload) => ({
  type: CONST.GET_EVENT_CATEGORIES,
  payload,
});
export const getEventCategoriesSuccess = (payload) => ({
  type: CONST.GET_EVENT_CATEGORIES_SUCCESS,
  payload,
});
export const getEventCategoriesFailed = (payload) => ({
  type: CONST.GET_EVENT_CATEGORIES_FAILED,
  payload,
});
export const getEventCategoriesClear = (payload) => ({
  type: CONST.GET_EVENT_CATEGORIES_CLEAR,
  payload,
});

export const getUserEventInvoiceId = (payload) => ({
  type: CONST.GET_USER_EVENT_INVOICE_ID,
  payload,
});
export const getUserEventInvoiceIdSuccess = (payload) => ({
  type: CONST.GET_USER_EVENT_INVOICE_ID_SUCCESS,
  payload,
});
export const getUserEventInvoiceIdFailed = (payload) => ({
  type: CONST.GET_USER_EVENT_INVOICE_ID_FAILED,
  payload,
});
export const getUserEventInvoiceIdClear = (payload) => ({
  type: CONST.GET_USER_EVENT_INVOICE_ID_CLEAR,
  payload,
});

export const setPaymentEvent = (payload) => ({
  type: CONST.SET_PAYMENT_EVENT,
  payload,
});
export const setPaymentEventSuccess = (payload) => ({
  type: CONST.SET_PAYMENT_EVENT_SUCCESS,
  payload,
});
export const setPaymentEventFailed = (payload) => ({
  type: CONST.SET_PAYMENT_EVENT_FAILED,
  payload,
});
export const setPaymentEventClear = (payload) => ({
  type: CONST.SET_PAYMENT_EVENT_CLEAR,
  payload,
});
export const setCreateBillEvent = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT,
  payload,
});
export const setCreateBillEventSuccess = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_SUCCESS,
  payload,
});
export const setCreateBillEventFailed = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_FAILED,
  payload,
});
export const setCreateBillEventClear = (payload) => ({
  type: CONST.SET_CREATE_BILL_EVENT_CLEAR,
  payload,
});

export const setValidateVoucherCode = (payload) => ({
  type: CONST.SET_VALIDATE_VOUCHER_CODE,
  payload,
});
export const setValidateVoucherCodeSuccess = (payload) => ({
  type: CONST.SET_VALIDATE_VOUCHER_CODE_SUCCESS,
  payload,
});
export const setValidateVoucherCodeFailed = (payload) => ({
  type: CONST.SET_VALIDATE_VOUCHER_CODE_FAILED,
  payload,
});
export const setValidateVoucherCodeClear = (payload) => ({
  type: CONST.SET_VALIDATE_VOUCHER_CODE_CLEAR,
  payload,
});

export const setValidateAccessCode = (payload) => ({
  type: CONST.SET_VALIDATE_ACCESS_CODE,
  payload,
});

export const setValidateAccessCodeSuccess = (payload) => ({
  type: CONST.SET_VALIDATE_ACCESS_CODE_SUCCESS,
  payload,
});

export const setValidateAccessCodeFailed = (payload) => ({
  type: CONST.SET_VALIDATE_ACCESS_CODE_FAILED,
  payload,
});
