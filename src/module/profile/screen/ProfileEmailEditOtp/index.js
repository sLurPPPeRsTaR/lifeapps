import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
  setEmail,
  setEmailClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  emailUser: state.auth.userData.email,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setEmailFailed: state.profile.setEmailFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setEmail: (payload) => setEmail(payload),
  setEmailClear: () => setEmailClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
