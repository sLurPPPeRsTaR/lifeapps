import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  setLifetagCreateOrderClear,
  setLifetagUpdateOrder,
} from 'ca-module-lifetag/lifetagAction';
import { setLifetagPaymentCheck } from 'ca-module-payments/paymentsAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  paymentsAction: state.payments.action,
  lifetagAction: state.lifetag.action,
  setLifetagCreateOrderResponse: state.lifetag.setLifetagCreateOrderResponse,
  setLifetagPaymentCheckResponse: state.payments.setLifetagPaymentCheckResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setLifetagPaymentCheck: (payload) => setLifetagPaymentCheck(payload),
  setLifetagUpdateOrder: (payload) => setLifetagUpdateOrder(payload),
  setLifetagCreateOrderClear: () => setLifetagCreateOrderClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
