import {
  setIsShowModalBadRequest,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPolicyClaim,
  getPolicyClaimClear,
} from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  polisAction: state.polis.action,
  getPolicyClaimResponse: state.polis.getPolicyClaimResponse,
  getPolicyClaimFailed: state.polis.getPolicyClaimFailed,
  getPolicyClaimFetch: state.polis.getPolicyClaimFetch,
});

const mapDispatchToProps = {
  getPolicyClaim: (payload) => getPolicyClaim(payload),
  getPolicyClaimClear: () => getPolicyClaimClear(),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
