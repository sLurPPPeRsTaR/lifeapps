import { connect } from 'react-redux';
import {
  setIsComingFromDeepLink,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPaymentMethod,
  getPaymentMethodClear,
  deletePaymentMethod,
  deletePaymentMethodClear,
  setCreateBill,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import { setInviteeUserId } from 'ca-module-lifesaver/lifesaverAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  userId: state.auth.userData.userId,
  lifesaverAction: state.lifesaver.action,
  setSubmissionError: state.lifesaver.setSubmissionError,
  setCreateBillError: state.payments.setCreateBillError,
  getPendingInvitesResponse: state.invitation.getPendingInvitesStateResponse,
  paymentsAction: state.payments.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  deletePaymentMethod: (payload) => deletePaymentMethod(payload),
  deletePaymentMethodClear: () => deletePaymentMethodClear(),
  setInviteeUserId: (payload) => setInviteeUserId(payload),
  setCreateBill: (payload) => setCreateBill(payload),
  setCreateBillClear: () => setCreateBillClear(),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
