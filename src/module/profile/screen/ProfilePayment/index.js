import { getPaymentMethod, setCreateBill } from 'ca-module-payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  userId: state.auth.userData.userId,
});

const mapDispatchToProps = {
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  setCreateBill: (payload) => setCreateBill(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
