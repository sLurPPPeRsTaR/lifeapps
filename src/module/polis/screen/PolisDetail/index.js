import {
  getPolicyBenefitClear,
  getPolicyClaimClear,
  getPolicyDownloadClear,
  getPolicyFundsClear,
  getPolicySelfDataClear,
  getPolicySummaryClear,
} from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  currentScreen: state.activity.currentScreen,
  width: state.bootstrap.dimensions.width,
});

const mapDispatchToProps = {
  getPolicySummaryClear: () => getPolicySummaryClear(),
  getPolicySelfDataClear: () => getPolicySelfDataClear(),
  getPolicyBenefitClear: () => getPolicyBenefitClear(),
  getPolicyFundsClear: () => getPolicyFundsClear(),
  getPolicyClaimClear: () => getPolicyClaimClear(),
  getPolicyDownloadClear: () => getPolicyDownloadClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
