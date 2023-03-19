import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
  setPhoneNumber,
  setPhoneNumberClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setPhoneNumberFailed: state.profile.setPhoneNumberFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setPhoneNumber: (payload) => setPhoneNumber(payload),
  setPhoneNumberClear: () => setPhoneNumberClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
