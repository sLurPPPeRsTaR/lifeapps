import { connect } from 'react-redux';
import {
  setIsComingFromScreen,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';
import {
  setRegisterSocial,
  setRegisterSocialClear,
} from 'ca-module-register/registerAction';
import {
  setLoginSocial,
  setLoginSocialClear,
} from 'ca-module-login/loginAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  registerAction: state.register.action,
  setRegisterSocialFailed: state.register.setRegisterSocialFailed,
  loginAction: state.login.action,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  appConfig: state.bootstrap.appConfig,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setRegisterSocial: (payload) => setRegisterSocial(payload),
  setRegisterSocialClear: (payload) => setRegisterSocialClear(payload),
  setLoginSocial: (payload) => setLoginSocial(payload),
  setLoginSocialClear: (payload) => setLoginSocialClear(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
