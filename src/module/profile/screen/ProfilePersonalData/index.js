import { connect } from 'react-redux';
import {
  setPersonalData,
  setPersonalDataClear,
  getPersonalData,
  setUploadProfile,
  setDeleteFotoProfile,
  getUserIDCardInfo,
  getUserIDCardInfoClear,
  setProfileRequestOtp,
  setProfileRequestOtpClear,
} from 'ca-module-profile/profileAction';
import {
  setIsShowModalComingSoon,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  profileAction: state.profile.action,
  setPersonalDataFailed: state.profile.setPersonalDataFailed,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
  getPersonalDataFailed: state.profile.getPersonalDataFailed,
  accessToken: state.auth,
  getUserIDCardInfoResponse: state.profile.getUserIDCardInfoResponse,
  getUserIDCardInfoFailed: state.profile.getUserIDCardInfoFailed,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  currentScreen: state.activity.currentScreen,
  alreadyKYC: state.auth.userData.alreadyKYC,
});

const mapDispatchToProps = {
  setPersonalData: (payload) => setPersonalData(payload),
  setPersonalDataClear: () => setPersonalDataClear(),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  getPersonalData: (payload) => getPersonalData(payload),
  setLoading: (payload) => setLoading(payload),
  setUploadProfile: (payload) => setUploadProfile(payload),
  setDeleteFotoProfile: (payload) => setDeleteFotoProfile(payload),
  getUserIDCardInfo: (payload) => getUserIDCardInfo(payload),
  getUserIDCardInfoClear: (payload) => getUserIDCardInfoClear(payload),
  setProfileRequestOtp: (payload) => setProfileRequestOtp(payload),
  setProfileRequestOtpClear: () => setProfileRequestOtpClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
