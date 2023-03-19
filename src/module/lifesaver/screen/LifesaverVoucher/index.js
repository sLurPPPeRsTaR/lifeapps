import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { setClearAuth } from 'ca-module-auth/authAction';
import { getIsUserEligible } from 'ca-module-home/homeAction';
import {
  getCampaign,
  setSubmission,
  setSubmissionClear,
  setIsAgreementVisible,
  getCurrentSubs,
  getEligibleSubmission,
  getEligibleSubmissionClear,
} from 'ca-module-lifesaver/lifesaverAction';
import { setLoginClear } from 'ca-module-login/loginAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  userData: state.auth.userData,
  getCampaignResponse: state.lifesaver.getCampaignResponse,
  loading: state.bootstrap.loading,
  lifesaverAction: state.lifesaver.action,
  getEligibleSubmissionFetch: state.lifesaver.getEligibleSubmissionFetch,
  // Props For LifesaverCheckEligible
  getEligibleSubmissionError: state.lifesaver.getEligibleSubmissionError,
  getEligibleSubmissionResponse: state.lifesaver.getEligibleSubmissionResponse,
  alreadyKYC: state.auth.userData.alreadyKYC,
  userId: state.auth.userData.userId,
  alreadySetPin: state.auth.userData.alreadySetPin,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setClearAuth: () => setClearAuth(),
  setLoginClear: () => setLoginClear(),
  getCampaign: (payload) => getCampaign(payload),
  getEligibleSubmission: (payload) => getEligibleSubmission(payload),
  getEligibleSubmissionClear: () => getEligibleSubmissionClear(),
  /** Props For LifesaverCheckEligible */
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
