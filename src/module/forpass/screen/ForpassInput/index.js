import { connect } from 'react-redux';
import {
  setResetPassword,
  setResetPasswordClear,
} from 'ca-module-forpass/forpassAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  forpassAction: state.forpass.action,
  setResetPasswordFailed: state.forpass.setResetPasswordFailed,
  setProfileRequestOtpParam: state.profile.setProfileRequestOtpParam,
});

const mapDispatchToProps = {
  setResetPassword: (payload) => setResetPassword(payload),
  setResetPasswordClear: () => setResetPasswordClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
