import { connect } from 'react-redux';
import {
  getProfileDevice,
  setProfileDevice,
  getProfileDeviceClear,
  setProfileDeviceClear,
} from 'ca-module-profile/profileAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setLoginClear } from 'ca-module-login/loginAction';
import { setClearAuth } from 'ca-module-auth/authAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getProfileDeviceResponse: state.profile.getProfileDeviceResponse,
  setProfileDeviceResponse: state.profile.setProfileDeviceResponse,
  getProfileDeviceFailed: state.profile.getProfileDeviceFailed,
  token: state.auth.token,
  profileAction: state.profile.action,
  setProfileDeviceFailed: state.profile.setProfileDeviceFailed,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  getProfileDevice: (payload) => getProfileDevice(payload),
  getProfileDeviceClear: (payload) => getProfileDeviceClear(payload),
  setProfileDevice: (payload) => setProfileDevice(payload),
  setLoading: (payload) => setLoading(payload),
  setClearAuth: (payload) => setClearAuth(payload),
  setLoginClear: (payload) => setLoginClear(payload),
  setProfileDeviceClear: (payload) => setProfileDeviceClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
