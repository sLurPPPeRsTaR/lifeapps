import {
  setLoading,
  setIsComingFromScreen,
  setIsShowModalInternalServerError,
  setIsShowModalComingSoon,
} from 'ca-bootstrap/bootstrapAction';
import {
  getBills,
  getBillsClear,
  getSubscriptionDetail,
  getSubscriptionDetailClear,
  getSubscriptions,
  getSubscriptionsClear,
  setResubscribe,
} from 'ca-module-subs/subsAction';
import {
  getProduct,
  getProductClear,
  setPlanCode,
} from 'ca-module-lifesaver/lifesaverAction';
import {
  getPaymentMethod,
  getPaymentMethodClear,
  getPaymentStatusClear,
  setCreateBill,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  getSubscriptionDetailFetch: state.subs.getSubscriptionDetailFetch,
  getSubscriptionsResponse: state.subs.getSubscriptionsResponse,
  getBillsResponse: state.subs.getBillsResponse,
  getBillsFetch: state.subs.getBillsFetch,
  getProductResponse: state.lifesaver.getProductResponse,
  setCreateBillError: state.payments.setCreateBillError,
  subsAction: state.subs.action,
  paymentsAction: state.payments.action,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
});

const mapDispatchToProps = {
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  getSubscriptionDetailClear: () => getSubscriptionDetailClear(),
  getBills: (payload) => getBills(payload),
  getBillsClear: () => getBillsClear(),
  getProduct: (payload) => getProduct(payload),
  setLoading: (payload) => setLoading(payload),
  getProductClear: () => getProductClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setResubscribe: (payload) => setResubscribe(payload),
  getSubscriptions: (payload) => getSubscriptions(payload),
  getSubscriptionsClear: () => getSubscriptionsClear(),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  getPaymentStatusClear: () => getPaymentStatusClear(),
  setIsShowModalInternalServerError: (payload) =>
    setIsShowModalInternalServerError(payload),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setPlanCode: (payload) => setPlanCode(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
