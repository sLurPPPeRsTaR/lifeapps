import {
  setIsShowModalBadRequest,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicyClaimDetail } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicyClaimDetailResponse: state.polis.getPolicyClaimDetailResponse,
  getPolicyClaimDetailFailed: state.polis.getPolicyClaimDetailFailed,
  polisAction: state.polis.action,
  width: state.bootstrap.dimensions.width,
});

const mapDispatchToProps = {
  getPolicyClaimDetail: (payload) => getPolicyClaimDetail(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
