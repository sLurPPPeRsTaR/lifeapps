import { connect } from 'react-redux';
import { getPolicy, getPolicyClear } from 'ca-module-home/homeAction';
import {
  setIsShowModalCustomerCare,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicyError: state.home.getPolicyError,
  getPolicyResponse: state.home.getPolicyResponse,
  getPolicyParam: state.home.getPolicyParam,
  homeAction: state.home.action,
  setResendPolicyOtp: state.home.setResendPolicyOtp,
});

const mapDispatchToProps = {
  getPolicy: (payload) => getPolicy(payload),
  getPolicyClear: (payload) => getPolicyClear(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
