import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setDeleteAccount,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import { getPoliciesClear } from 'ca-module-home/homeAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  userData: state.auth.userData,
  accessToken: state.auth,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
});

const mapDispatchToProps = {
  setDeleteAccount: (payload) => setDeleteAccount(payload),
  setLoading: (payload) => setLoading(payload),
  getPoliciesClear: () => getPoliciesClear(),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
