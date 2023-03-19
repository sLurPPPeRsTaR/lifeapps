import {
  // setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { setLifetagCreateOrder } from 'ca-module-lifetag/lifetagAction';
import {
  getPaymentStatus,
  getAddCardStatus,
} from 'ca-module-payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getPaymentStatusResponse: state.payments.getPaymentStatusResponse,
  getPaymentStatusError: state.payments.getPaymentStatusError,
  setCreateBillParam: state.payments.setCreateBillParam,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  planCode: state.lifesaver.planCode,
  getProductParam: state.lifesaver.getProductParam,
  paymentAction: state.payments.action,
  inviteeUserId: state.lifesaver.inviteeUserId,
  userId: state.auth.userData.userId,
  eventCode: state.auth.userData.eventCode,
  refferalCode: state.auth.userData.refferalCode,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentStatus: (payload) => getPaymentStatus(payload),
  getAddCardStatus: (payload) => getAddCardStatus(payload),
  setLifetagCreateOrder: (payload) => setLifetagCreateOrder(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
