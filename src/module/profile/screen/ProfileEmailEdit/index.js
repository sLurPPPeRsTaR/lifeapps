import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  emailUser: state.auth.userData.email,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  currentScreen: state.activity.currentScreen,
});

const mapDispatchToProps = {
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
