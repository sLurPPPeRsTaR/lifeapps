import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setLifetagCreateOrder } from 'ca-module-lifetag/lifetagAction';
import { getPaymentStatusv2 } from 'ca-module-payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getPaymentStatusv2Response: state.payments.getPaymentStatusv2Response,
  getPaymentStatusv2Error: state.payments.getPaymentStatusv2Error,
  planCode: state.lifesaver.planCode,
  paymentAction: state.payments.action,
  userId: state.auth.userData.userId,
  setCreateBillParam: state.payments.setCreateBillParam,
  eventCode: state.auth.userData.eventCode,
  refferalCode: state.auth.userData.refferalCode,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentStatusv2: (payload) => getPaymentStatusv2(payload),
  setLifetagCreateOrder: (payload) => setLifetagCreateOrder(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
