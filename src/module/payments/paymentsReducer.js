import * as STATE from 'ca-module-payments/paymentsInitialState';
import * as CONST from 'ca-module-payments/paymentsConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';
import _ from 'lodash';

const paymentsInitialState = {
  ...STATE.getPaymentMethodInitialState,
  ...STATE.setCreateBillInitialState,
  ...STATE.getPaymentStatusInitialState,
  ...STATE.getPaymentStatusv2InitialState,
  ...STATE.getPaymentEventStatusInitialState,
  ...STATE.deletePaymentMethodInitialState,
  ...STATE.orderPaymentMethodInitialState,
  ...STATE.getAddCardStatusInitialState,
  ...STATE.getInvoiceMasterInitialState,
  action: '',
};

export const paymentsReducer = (state = paymentsInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(paymentsInitialState),
    }),
    [CONST.GET_PAYMENT_METHOD]: () => ({
      ...state,
      getPaymentMethodParam: payload,
      getPaymentMethodFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      getPaymentMethodResponse: payload,
      getPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      getPaymentMethodError: payload,
      getPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      // ...STATE.getPaymentMethodInitialState,
      getPaymentMethodResponse: paymentsInitialState.getPaymentMethodResponse,
      getPaymentMethodError: paymentsInitialState.getPaymentMethodError,
      action: type,
    }),

    [CONST.SET_CREATE_BILL]: () => ({
      ...state,
      setCreateBillParam: payload,
      setCreateBillFetch: true,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_SUCCESS]: () => ({
      ...state,
      setCreateBillResponse: payload,
      setCreateBillFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_FAILED]: () => ({
      ...state,
      setCreateBillError: payload,
      setCreateBillFetch: false,
      action: type,
    }),
    [CONST.SET_CREATE_BILL_CLEAR]: () => ({
      ...state,
      setCreateBillResponse: paymentsInitialState.setCreateBillResponse,
      setCreateBillError: paymentsInitialState.setCreateBillError,
      action: type,
    }),

    [CONST.GET_PAYMENT_STATUS]: () => ({
      ...state,
      getPaymentStatusParam: payload,
      getPaymentStatusFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_SUCCESS]: () => ({
      ...state,
      getPaymentStatusResponse: payload,
      getPaymentStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_FAILED]: () => ({
      ...state,
      getPaymentStatusError: payload,
      getPaymentStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_CLEAR]: () => ({
      ...state,
      getPaymentStatusResponse: paymentsInitialState.getPaymentStatusResponse,
      getPaymentStatusError: paymentsInitialState.getPaymentStatusError,
      action: type,
    }),

    [CONST.GET_PAYMENT_STATUS_V2]: () => ({
      ...state,
      getPaymentStatusv2Param: payload,
      getPaymentStatusv2Fetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2_SUCCESS]: () => ({
      ...state,
      getPaymentStatusv2Response: payload,
      getPaymentStatusv2Fetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2_FAILED]: () => ({
      ...state,
      getPaymentStatusv2Error: payload,
      getPaymentStatusv2Fetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_STATUS_V2_CLEAR]: () => ({
      ...state,
      getPaymentStatusv2Response:
        paymentsInitialState.getPaymentStatusv2Response,
      getPaymentStatusv2Error: paymentsInitialState.getPaymentStatusv2Error,
      action: type,
    }),

    [CONST.GET_PAYMENT_EVENT_STATUS]: () => ({
      ...state,
      getPaymentEventStatusParam: payload,
      getPaymentEventStatusFetch: true,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_SUCCESS]: () => ({
      ...state,
      getPaymentEventStatusResponse: payload,
      getPaymentEventStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_FAILED]: () => ({
      ...state,
      getPaymentEventStatusError: payload,
      getPaymentEventStatusFetch: false,
      action: type,
    }),
    [CONST.GET_PAYMENT_EVENT_STATUS_CLEAR]: () => ({
      ...state,
      getPaymentEventStatusResponse:
        paymentsInitialState.getPaymentEventStatusResponse,
      getPaymentEventStatusError:
        paymentsInitialState.getPaymentEventStatusError,
      action: type,
    }),

    [CONST.DELETE_PAYMENT_METHOD]: () => ({
      ...state,
      deletePaymentMethodParam: payload,
      deletePaymentMethodFetch: true,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      deletePaymentMethodResponse: payload,
      deletePaymentMethodFetch: false,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      deletePaymentMethodError: payload,
      deletePaymentMethodFetch: false,
      action: type,
    }),
    [CONST.DELETE_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      deletePaymentMethodResponse:
        paymentsInitialState.deletePaymentMethodResponse,
      deletePaymentMethodError: paymentsInitialState.deletePaymentMethodError,
      action: type,
    }),

    [CONST.ORDER_PAYMENT_METHOD]: () => ({
      ...state,
      orderPaymentMethodParam: payload,
      orderPaymentMethodFetch: true,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_SUCCESS]: () => ({
      ...state,
      orderPaymentMethodResponse: payload,
      orderPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_FAILED]: () => ({
      ...state,
      orderPaymentMethodError: payload,
      orderPaymentMethodFetch: false,
      action: type,
    }),
    [CONST.ORDER_PAYMENT_METHOD_CLEAR]: () => ({
      ...state,
      orderPaymentMethodResponse:
        paymentsInitialState.orderPaymentMethodResponse,
      orderPaymentMethodError: paymentsInitialState.orderPaymentMethodError,
      action: type,
    }),

    [CONST.GET_ADD_CARD_STATUS]: () => ({
      ...state,
      getAddCardStatusParam: payload,
      getAddCardStatusFetch: true,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_SUCCESS]: () => ({
      ...state,
      getAddCardStatusResponse: payload,
      getAddCardStatusFetch: false,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_FAILED]: () => ({
      ...state,
      getAddCardStatusError: payload,
      getAddCardStatusFetch: false,
      action: type,
    }),
    [CONST.GET_ADD_CARD_STATUS_CLEAR]: () => ({
      getAddCardStatusResponse: paymentsInitialState.getAddCardStatusResponse,
      getAddCardStatusError: paymentsInitialState.getAddCardStatusError,
      action: type,
    }),

    [CONST.GET_INVOICE_MASTER]: () => ({
      ...state,
      getInvoiceMasterParam: payload,
      getInvoiceMasterFetch: true,
      action: type,
    }),
    [CONST.GET_INVOICE_MASTER_SUCCESS]: () => ({
      ...state,
      getInvoiceMasterResponse: payload,
      getInvoiceMasterFetch: false,
      action: type,
    }),
    [CONST.GET_INVOICE_MASTER_FAILED]: () => ({
      ...state,
      getInvoiceMasterResponse: {},
      getInvoiceMasterError: payload,
      getInvoiceMasterFetch: false,
      action: type,
    }),
    [CONST.GET_INVOICE_MASTER_CLEAR]: () => ({
      getInvoiceMasterResponse: paymentsInitialState.getInvoiceMasterResponse,
      getInvoiceMasterError: paymentsInitialState.getInvoiceMasterError,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
