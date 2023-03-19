import { connect } from 'react-redux';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
