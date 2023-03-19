import { connect } from 'react-redux';
import {
  setRequestOtp,
  setRequestOtpClear,
} from 'ca-module-register/registerAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
});

const mapDispatchToProps = {
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRequestOtpClear: () => setRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
