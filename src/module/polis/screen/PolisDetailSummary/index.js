import {
  setIsShowModalComingSoon,
  setIsShowModalBadRequest,
  setLoading,
  setIsComingFromScreen,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPaymentMethod,
  getPaymentMethodClear,
  getPaymentStatusClear,
  setCreateBill,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import { getPolicySummary } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicySummaryResponse: state.polis.getPolicySummaryResponse,
  getPolicySummaryFailed: state.polis.getPolicySummaryFailed,
  polisAction: state.polis.action,
  getBillsResponse: state.subs.getBillsResponse,
  getBillsFetch: state.subs.getBillsFetch,
  getProductResponse: state.lifesaver.getProductResponse,
  setCreateBillError: state.payments.setCreateBillError,
  paymentsAction: state.payments.action,
});

const mapDispatchToProps = {
  getPolicySummary: (payload) => getPolicySummary(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  getPaymentStatusClear: () => getPaymentStatusClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
