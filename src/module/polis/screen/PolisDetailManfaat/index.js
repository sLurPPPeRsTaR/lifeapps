import {
  setIsShowModalBadRequest,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicyBenefit } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicyBenefitResponse: state.polis.getPolicyBenefitResponse,
  getPolicyBenefitFailed: state.polis.getPolicyBenefitFailed,
  polisAction: state.polis.action,
});

const mapDispatchToProps = {
  getPolicyBenefit: (payload) => getPolicyBenefit(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
