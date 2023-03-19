import { connect } from 'react-redux';
import {
  setLogin,
  setLoginClear,
  setLoginSocial,
  setLoginSocialClear,
} from 'ca-module-login/loginAction';
import {
  setIsShowModalCustomerCare,
  setLoading,
  setToastMsg,
  setIsShowFailedModalLogin,
  setIsComingFromScreen,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicy, getPolicyClear } from 'ca-module-home/homeAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  loginAction: state.login.action,
  setLoginFailed: state.login.setLoginFailed,
  setLoginSocialFailed: state.login.setLoginSocialFailed,
  homeAction: state.home.action,
  getPolicyResponse: state.home.getPolicyResponse,
  getPolicyError: state.home.getPolicyError,
  alreadyKYC: state.auth.userData.alreadyKYC,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  isShowFailedModalLogin: state.bootstrap.isShowFailedModalLogin,
  appConfig: state.bootstrap.appConfig,
  width: state.bootstrap.dimensions.width,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
});

const mapDispatchToProps = {
  setLogin: (payload) => setLogin(payload),
  setLoginClear: () => setLoginClear(),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setLoading: (payload) => setLoading(payload),
  getPolicy: (payload) => getPolicy(payload),
  getPolicyClear: () => getPolicyClear(),
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setIsShowFailedModalLogin: (payload) => setIsShowFailedModalLogin(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
