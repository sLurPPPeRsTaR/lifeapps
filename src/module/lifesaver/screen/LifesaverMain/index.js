import { connect } from 'react-redux';
import {
  getListRs,
  getListRsClear,
  setSubmissionClear,
  setSubmission,
  getCurrentSubs,
  getCurrentSubsClear,
  setWaiting,
  getEligiblePos,
  getTotalClaim,
} from 'ca-module-lifesaver/lifesaverAction';
import {
  setIsComingFromScreen,
  setLoading,
  setIsShowModalComingSoon,
  setIsShowFailedModalLogin,
} from 'ca-bootstrap/bootstrapAction';
import {
  setLoginClear,
  setLoginSocial,
  setLoginSocialClear,
} from 'ca-module-login/loginAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  alreadyKYC: state.auth.userData.alreadyKYC,
  userId: state.auth.userData.userId,
  deviceId: state.auth.userData.deviceId,
  alreadySetPin: state.auth.userData.alreadySetPin,
  getListRsResponse: state.lifesaver.getListRsResponse,
  getListRsError: state.lifesaver.getListRsResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  setSubmissionError: state.lifesaver.setSubmissionError,
  lifesaverAction: state.lifesaver.action,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getCurrentSubsFetch: state.lifesaver.getCurrentSubsFetch,
  isShowModalBeforeSubmitLifesaver:
    state.bootstrap.isShowModalBeforeSubmitLifesaver,
  setWaitingError: state.lifesaver.setWaitingError,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
  loginAction: state.login.action,
  setLoginFailed: state.login.setLoginFailed,
  setLoginSocialFailed: state.login.setLoginSocialFailed,
  isShowFailedModalLogin: state.bootstrap.isShowFailedModalLogin,
  getEligiblePosResponse: state.lifesaver.getEligiblePosResponse,
  getEligiblePosFetch: state.lifesaver.getEligiblePosFetch,
  getTotalClaimResponse: state.lifesaver.getTotalClaimResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
  setSubmissionClear: () => setSubmissionClear(),
  setSubmission: (payload) => setSubmission(payload),
  getCurrentSubs: () => getCurrentSubs(),
  getCurrentSubsClear: () => getCurrentSubsClear,
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setWaiting: () => setWaiting(),
  setLoginClear: () => setLoginClear(),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setIsShowFailedModalLogin: (payload) => setIsShowFailedModalLogin(payload),
  getEligiblePos: (payload) => getEligiblePos(payload),
  getTotalClaim: (payload) => getTotalClaim(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
