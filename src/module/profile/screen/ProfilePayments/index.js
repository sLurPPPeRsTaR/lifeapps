import { connect } from 'react-redux';
import {
  setLoading,
  setToastMsg,
  setIsComingFromScreen,
  setIsComingFromDeepLink,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPaymentMethod,
  getPaymentMethodClear,
  deletePaymentMethod,
  deletePaymentMethodClear,
  orderPaymentMethod,
  orderPaymentMethodClear,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  userId: state.auth.userData.userId,
  lifesaverAction: state.lifesaver.action,
  paymentAction: state.payments.action,
  alreadyKYC: state.auth.userData.alreadyKYC,
  alreadySetPin: state.auth.userData.alreadySetPin,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  deletePaymentMethod: (payload) => deletePaymentMethod(payload),
  deletePaymentMethodClear: () => deletePaymentMethodClear(),
  orderPaymentMethod: (payload) => orderPaymentMethod(payload),
  orderPaymentMethodClear: () => orderPaymentMethodClear(),
  setToastMsg: (payload) => setToastMsg(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
