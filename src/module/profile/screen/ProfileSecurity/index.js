import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setPersonalDataClear,
  getPersonalData,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  profileAction: state.profile.action,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  alreadyKYC: state.auth.userData.alreadyKYC,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  setProfileRequestOtpParam: state.profile.setProfileRequestOtpParam,
});

const mapDispatchToProps = {
  getPersonalData: (payload) => getPersonalData(payload),
  setPersonalDataClear: (payload) => setPersonalDataClear(payload),
  setLoading: (payload) => setLoading(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
