import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import {
  getPaymentEventStatus,
  getPaymentEventStatusClear,
} from 'ca-module-payments/paymentsAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  paymentsAction: state.payments.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPaymentEventStatus: (payload) => getPaymentEventStatus(payload),
  getPaymentEventStatusClear: () => getPaymentEventStatusClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
