import { connect } from 'react-redux';
import {
  setRegister,
  setRegisterClear,
  setRegisterSocial,
  setRegisterSocialClear,
  setRequestOtp,
  setRequestOtpClear,
} from 'ca-module-register/registerAction';
import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setRequestOtpParam: state.register.setRequestOtpParam,
  setResendRegisterOtp: state.register.setResendRegisterOtp,
  setRegisterFailed: state.register.setRegisterFailed,
  setRegisterSocialFailed: state.register.setRegisterSocialFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
});

const mapDispatchToProps = {
  setRegister: (payload) => setRegister(payload),
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
  setRegisterClear: () => setRegisterClear(),
  setLoading: (payload) => setLoading(payload),
  setRegisterSocial: (payload) => setRegisterSocial(payload),
  setRegisterSocialClear: () => setRegisterSocialClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
