import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
  setProfileVerifyOtp,
  setProfileVerifyOtpClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  profileAction: state.profile.action,
  setProfileVerifyOtpFailed: state.profile.setProfileVerifyOtpFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setProfileVerifyOtp: (payload) => setProfileVerifyOtp(payload),
  setProfileVerifyOtpClear: () => setProfileVerifyOtpClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
