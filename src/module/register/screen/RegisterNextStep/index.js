import { connect } from 'react-redux';
import { setRequestOtp } from 'ca-module-register/registerAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  registerAction: state.register.action,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setResendRegisterOtp: state.register.setResendRegisterOtp,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setRequestOtp: (payload) => setRequestOtp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
