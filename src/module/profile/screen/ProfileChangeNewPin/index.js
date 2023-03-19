import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setChangePin,
  setChangePinClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setChangePinFailed: state.profile.setChangePinFailed,
  mobilePhoneNumberUser: state.auth.userData.mobilePhoneNumber,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
});

const mapDispatchToProps = {
  setChangePin: (payload) => setChangePin(payload),
  setChangePinClear: () => setChangePinClear(),
  setLoading: (payload) => setLoading(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setUserData: (payload) => setUserData(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
