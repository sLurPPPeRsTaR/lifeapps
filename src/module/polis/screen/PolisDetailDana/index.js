import {
  setIsShowModalBadRequest,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicyFunds } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicyFundsResponse: state.polis.getPolicyFundsResponse,
  getPolicyFundsFailed: state.polis.getPolicyFundsFailed,
  polisAction: state.polis.action,
});

const mapDispatchToProps = {
  getPolicyFunds: (payload) => getPolicyFunds(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
