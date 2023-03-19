import * as CONST from 'ca-module-event/eventConstant';
import * as STATE from 'ca-module-event/eventInitialState';

const eventInitialState = {
  ...STATE.getEventDetailInitialState,
  ...STATE.getEventQuotaInitialState,
  ...STATE.getEventUpcomingInitialState,
  ...STATE.setEventAddFavoriteInitialState,
  ...STATE.setEventRmvFavoriteInitialState,
  ...STATE.getEventFavoriteInitialState,
  ...STATE.getEventUserTicketInitialState,
  ...STATE.setEventBuyTicketInitialState,
  ...STATE.getEventCategoriesInitialState,
  ...STATE.getUserEventInvoiceIdInitialState,
  ...STATE.setCreateBillEventInitialState,
  ...STATE.setValidateVoucherCodeInitialState,
  ...STATE.setValidateAccessCodeInitialState,
  action: '',
};

export const eventReducer = (state = eventInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    // EVENT DETAIL
    [CONST.GET_EVENT_DETAIL]: () => ({
      ...state,
      getEventDetailParam: payload,
      getEventDetailFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_DETAIL_SUCCESS]: () => ({
      ...state,
      getEventDetailResponse: payload,
      getEventDetailFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_DETAIL_FAILED]: () => ({
      ...state,
      getEventDetailFailed: payload,
      getEventDetailFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getEventDetailInitialState,
      action: type,
    }),
    [CONST.SET_EVENT_DETAIL_DATA]: () => ({
      ...state,
      getEventDetailData: payload,
      action: type,
    }),

    // EVENT QUOTA (LEFTOVER TICKET)
    [CONST.GET_EVENT_QUOTA]: () => ({
      ...state,
      getEventQuotaParam: payload,
      getEventQuotaFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_QUOTA_SUCCESS]: () => ({
      ...state,
      getEventQuotaResponse: payload,
      getEventQuotaFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_QUOTA_FAILED]: () => ({
      ...state,
      getEventQuotaFailed: payload,
      getEventQuotaFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_QUOTA_CLEAR]: () => ({
      ...state,
      ...STATE.getEventQuotaInitialState,
      action: type,
    }),

    // EVENT UPCOMING
    [CONST.GET_EVENT_UPCOMING]: () => ({
      ...state,
      getEventUpcomingParam: payload,
      getEventUpcomingFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_UPCOMING_SUCCESS]: () => ({
      ...state,
      getEventUpcomingResponse: payload,
      getEventUpcomingFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_UPCOMING_FAILED]: () => ({
      ...state,
      getEventUpcomingFailed: payload,
      getEventUpcomingFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_UPCOMING_CLEAR]: () => ({
      ...state,
      ...STATE.getEventUpcomingInitialState,
      action: type,
    }),

    // EVENT ADD FAV
    [CONST.SET_EVENT_ADDFAVORITE]: () => ({
      ...state,
      setEventAddFavoriteParam: payload,
      setEventAddFavoriteFetch: true,
      action: type,
    }),
    [CONST.SET_EVENT_ADDFAVORITE_SUCCESS]: () => ({
      ...state,
      setEventAddFavoriteResponse: payload,
      setEventAddFavoriteFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_ADDFAVORITE_FAILED]: () => ({
      ...state,
      setEventAddFavoriteFailed: payload,
      setEventAddFavoriteFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_ADDFAVORITE_CLEAR]: () => ({
      ...state,
      ...STATE.setEventAddFavoriteInitialState,
      action: type,
    }),

    // EVENT RM FAV
    [CONST.SET_EVENT_RMVFAVORITE]: () => ({
      ...state,
      setEventRmvFavoriteParam: payload,
      setEventRmvFavoriteFetch: true,
      action: type,
    }),
    [CONST.SET_EVENT_RMVFAVORITE_SUCCESS]: () => ({
      ...state,
      setEventRmvFavoriteResponse: payload,
      setEventRmvFavoriteFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_RMVFAVORITE_FAILED]: () => ({
      ...state,
      setEventRmvFavoriteFailed: payload,
      setEventRmvFavoriteFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_RMVFAVORITE_CLEAR]: () => ({
      ...state,
      ...STATE.setEventRmvFavoriteInitialState,
      action: type,
    }),

    // EVENT FAV
    [CONST.GET_EVENT_FAVORITE]: () => ({
      ...state,
      getEventFavoriteParam: payload,
      getEventFavoriteFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_FAVORITE_SUCCESS]: () => ({
      ...state,
      getEventFavoriteResponse: payload,
      getEventFavoriteFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_FAVORITE_FAILED]: () => ({
      ...state,
      getEventFavoriteFailed: payload,
      getEventFavoriteFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_FAVORITE_CLEAR]: () => ({
      ...state,
      ...STATE.getEventFavoriteInitialState,
      action: type,
    }),

    // EVENT USERTICKET
    [CONST.SET_EVENT_BUYTICKET]: () => ({
      ...state,
      getEventUserTicketParam: payload,
      getEventUserTicketFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_USERTICKET_SUCCESS]: () => ({
      ...state,
      getEventUserTicketResponse: payload,
      getEventUserTicketFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_USERTICKET_FAILED]: () => ({
      ...state,
      getEventUserTicketFailed: payload,
      getEventUserTicketFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_USERTICKET_CLEAR]: () => ({
      ...state,
      ...STATE.getEventUserTicketInitialState,
      action: type,
    }),

    // EVENT BUYTICKET
    [CONST.SET_EVENT_BUYTICKET]: () => ({
      ...state,
      setEventBuyTicketParam: payload,
      setEventBuyTicketFetch: true,
      action: type,
    }),
    [CONST.SET_EVENT_BUYTICKET_SUCCESS]: () => ({
      ...state,
      setEventBuyTicketResponse: payload,
      setEventBuyTicketFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_BUYTICKET_FAILED]: () => ({
      ...state,
      setEventBuyTicketFailed: payload,
      setEventBuyTicketFetch: false,
      action: type,
    }),
    [CONST.SET_EVENT_BUYTICKET_CLEAR]: () => ({
      ...state,
      ...STATE.setEventBuyTicketInitialState,
      action: type,
    }),

    // EVENT CATEGORIES
    [CONST.GET_EVENT_CATEGORIES]: () => ({
      ...state,
      getEventCategoriesParam: payload,
      getEventCategoriesFetch: true,
      action: type,
    }),
    [CONST.GET_EVENT_CATEGORIES_SUCCESS]: () => {
      return {
        ...state,
        getEventCategoriesResponse: payload,
        getEventCategoriesFetch: false,
        action: type,
      };
    },
    [CONST.GET_EVENT_CATEGORIES_FAILED]: () => ({
      ...state,
      getEventCategoriesFailed: payload,
      getEventCategoriesFetch: false,
      action: type,
    }),
    [CONST.GET_EVENT_CATEGORIES_CLEAR]: () => ({
      ...state,
      ...STATE.getEventCategoriesInitialState,
      action: type,
    }),

    [CONST.GET_USER_EVENT_INVOICE_ID]: () => ({
      ...state,
      getUserEventInvoiceIdParam: payload,
      getUserEventInvoiceIdFetch: true,
      action: type,
    }),
    [CONST.GET_USER_EVENT_INVOICE_ID_SUCCESS]: () => {
      return {
        ...state,
        getUserEventInvoiceIdResponse: payload,
        getUserEventInvoiceIdFetch: false,
        action: type,
      };
    },
    [CONST.GET_USER_EVENT_INVOICE_ID_FAILED]: () => ({
      ...state,
      getUserEventInvoiceIdFailed: payload,
      getUserEventInvoiceIdFetch: false,
      action: type,
    }),
    [CONST.GET_USER_EVENT_INVOICE_ID_CLEAR]: () => ({
      ...state,
      ...STATE.getUserEventInvoiceIdInitialState,
      action: type,
    }),

    [CONST.SET_PAYMENT_EVENT]: () => ({
      ...state,
      setPaymentEventParam: payload,
      setPaymentEventFetch: true,
      action: type,
    }),
    [CONST.SET_PAYMENT_EVENT_SUCCESS]: () => {
      return {
        ...state,
        setPaymentEventResponse: payload,
        setPaymentEventFetch: false,
        action: type,
      };
    },
    [CONST.SET_PAYMENT_EVENT_FAILED]: () => ({
      ...state,
      setPaymentEventFailed: payload,
      setPaymentEventFetch: false,
      action: type,
    }),
    [CONST.SET_PAYMENT_EVENT_CLEAR]: () => ({
      ...state,
      ...STATE.setPaymentEventInitialState,
      action: type,
    }),

    [CONST.SET_CREATE_BILL_EVENT]: () => ({
      ...state,
      setCreateBillEventParam: payload,
      setCreateBillEventFetch: true,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_EVENT_SUCCESS]: () => {
      return {
        ...state,
        setCreateBillEventResponse: payload,
        setCreateBillEventFetch: false,
        action: type,
      };
    },
    [CONST.SET_CREATE_BILL_EVENT_FAILED]: () => ({
      ...state,
      setCreateBillEventFailed: payload,
      setCreateBillEventFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_EVENT_CLEAR]: () => ({
      ...state,
      ...STATE.setCreateBillEventInitialState,
      action: type,
    }),

    [CONST.SET_VALIDATE_VOUCHER_CODE]: () => ({
      ...state,
      setValidateVoucherCodeParam: payload,
      setValidateVoucherCodeFetch: true,
      action: type,
    }),
    [CONST.SET_VALIDATE_VOUCHER_CODE_SUCCESS]: () => {
      return {
        ...state,
        setValidateVoucherCodeResponse: payload,
        setValidateVoucherCodeFetch: false,
        action: type,
      };
    },
    [CONST.SET_VALIDATE_VOUCHER_CODE_FAILED]: () => ({
      ...state,
      setValidateVoucherCodeFailed: payload,
      setValidateVoucherCodeFetch: false,
      action: type,
    }),
    [CONST.SET_VALIDATE_VOUCHER_CODE_CLEAR]: () => ({
      ...state,
      ...STATE.setValidateVoucherCodeInitialState,
      action: type,
    }),
    [CONST.SET_VALIDATE_ACCESS_CODE]: () => ({
      ...state,
      setValidateAccessCodeParam: payload,
      setValidateAccessCodeFetch: false,
      action: type,
    }),
    [CONST.SET_VALIDATE_ACCESS_CODE_SUCCESS]: () => ({
      ...state,
      setValidateAccessCodeResponse: payload,
      setValidateAccessCodeFetch: false,
      action: type,
    }),
    [CONST.SET_VALIDATE_ACCESS_CODE_FAILED]: () => ({
      ...state,
      setValidateAccessCodeFailed: payload,
      setValidateVoucherCodeFetch: false,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
