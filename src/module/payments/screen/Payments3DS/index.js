import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setPlanCode } from 'ca-module-lifesaver/lifesaverAction';
import {
  setCreateBill,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  setCreateBillResponse: state.payments.setCreateBillResponse,
  setCreateBillParam: state.payments.setCreateBillParam,
});

const mapDispatchToProps = {
  setCreateBillClear: () => setCreateBillClear(),
  setCreateBill: (payload) => setCreateBill(payload),
  setLoading: (payload) => setLoading(payload),
  setPlanCode: (payload) => setPlanCode(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
