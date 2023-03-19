import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPolicyDetail,
  getPolicyDetailClear,
  getCurrentSubs,
} from 'ca-module-lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import {
  getPolicySummary,
  getPolicySummaryClear,
} from 'ca-module-polis/polisAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  loading: state.bootstrap.loading,
  lifesaverAction: state.lifesaver.action,
  getPolicyDetailResponse: state.lifesaver.getPolicyDetailResponse,

  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,

  getPolicySummaryResponse: state.polis.getPolicySummaryResponse,
  getPolicySummaryFailed: state.polis.getPolicySummaryFailed,
  polisAction: state.polis.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPolicyDetail: (payload) => getPolicyDetail(payload),
  getPolicyDetailClear: () => getPolicyDetailClear(),
  getCurrentSubs: () => getCurrentSubs(),
  getPolicySummary: (payload) => getPolicySummary(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getPolicySummaryClear: () => getPolicySummaryClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
