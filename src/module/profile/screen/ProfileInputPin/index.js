import { connect } from 'react-redux';
import {
  getVerifyPin,
  getVerifyPinClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  emailUser: state.auth.userData.email,
  mobilePhoneNumberUser: state.auth.userData.mobilePhoneNumber,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  getVerifyPinFailed: state.profile.getVerifyPinFailed,
  currentScreen: state.activity.currentScreen,
});

const mapDispatchToProps = {
  getVerifyPin: (payload) => getVerifyPin(payload),
  setLoading: (payload) => setLoading(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  getVerifyPinClear: () => getVerifyPinClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
