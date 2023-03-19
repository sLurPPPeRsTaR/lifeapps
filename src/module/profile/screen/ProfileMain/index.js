import { connect } from 'react-redux';
import { setClearAuth } from 'ca-module-auth/authAction';
import { setLoginClear } from 'ca-module-login/loginAction';
import {
  setLoading,
  setIsShowModalComingSoon,
  setIsComingFromScreen,
} from 'ca-bootstrap/bootstrapAction';
import { getProfileReferral } from 'ca-module-profile/profileAction';
import { getProfileUserParty } from 'ca-module-profile/profileAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  accessToken: state.auth,
  appConfig: state.bootstrap.appConfig,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getPoliciesResponse: state.home.getPoliciesResponse,
  dimensions: state.bootstrap.dimensions,
  getProfileReferralResponse: state.profile.getProfileReferralResponse,
});

const mapDispatchToProps = {
  setClearAuth: (payload) => setClearAuth(payload),
  setLoginClear: (payload) => setLoginClear(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getProfileReferral: (payload) => getProfileReferral(payload),
  getProfileUserParty: () => getProfileUserParty(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
