import { connect } from 'react-redux';
import {
  getUserEventInvoiceId,
  getUserEventInvoiceIdClear,
  setPaymentEvent,
  setPaymentEventClear,
  setValidateVoucherCode,
  setValidateVoucherCodeClear,
} from 'ca-module-event/eventAction';
import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
  setPaymentEventResponse: state.event.setPaymentEventResponse,
  setValidateVoucherCodeResponse: state.event.setValidateVoucherCodeResponse,
  setValidateVoucherCodeFailed: state.event.setValidateVoucherCodeFailed,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  userData: state.auth.userData,
  eventAction: state.event.action,
});

const mapDispatchToProps = {
  getUserEventInvoiceId: (payload) => getUserEventInvoiceId(payload),
  getUserEventInvoiceIdClear: () => getUserEventInvoiceIdClear(),
  setPaymentEvent: (payload) => setPaymentEvent(payload),
  setPaymentEventClear: () => setPaymentEventClear(),
  setValidateVoucherCode: (payload) => setValidateVoucherCode(payload),
  setValidateVoucherCodeClear: () => setValidateVoucherCodeClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
