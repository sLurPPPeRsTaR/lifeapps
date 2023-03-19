import {
  setActivity,
  setLocation,
  setIsShowModalComingSoon,
  setIsShowModalCustomerCare,
  setLoading,
  setIsShowModalInternalServerError,
  setDimensions,
  setAppConfig,
  setIsShowModalBadRequest,
  setStatusCodePush,
} from 'ca-bootstrap/bootstrapAction';
import {
  setDeviceId,
  setColorScheme,
  getCheckIssuedPolicy,
  setUserData,
} from 'ca-module-auth/authAction';
import { getCSInfo } from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import Bootstrap from './View';

const mapStateToProps = (state) => ({
  deviceId: state.auth.userData.deviceId,
  userId: state.auth.userData.userId,
  email: state.auth.userData.email,
  mobilePhoneNumber: state.auth.userData.mobilePhoneNumber,
  alreadyKYC: state.auth.userData.alreadyKYC,
  colorScheme: state.auth.colorScheme,
  authAction: state.auth.action,
  access_token: state.auth.token.access_token,
  isShowModalComingSoon: state.bootstrap.isShowModalComingSoon,
  isShowModalCustomerCare: state.bootstrap.isShowModalCustomerCare,
  isShowModalInternalServerError:
    state.bootstrap.isShowModalInternalServerError,
  isShowModalBadRequest: state.bootstrap.isShowModalBadRequest,
  loading: state.bootstrap.loading,
  toastMsg: state.bootstrap.toastMsg,
  getCSInfoResponse: state.profile.getCSInfoResponse,
  lang: state.auth.lang,
  isProgressCodePush: state.bootstrap.isProgressCodePush,
  statusCodePush: state.bootstrap.statusCodePush,
  appConfig: state.bootstrap.appConfig,
});

const mapDispatchToProps = {
  setActivity: (payload) => setActivity(payload),
  setDeviceId: (payload) => setDeviceId(payload),
  setColorScheme: (payload) => setColorScheme(payload),
  setLocation: (payload) => setLocation(payload),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
  getCSInfo: (payload) => getCSInfo(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalInternalServerError: (payload) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    setIsShowModalInternalServerError(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
  getCheckIssuedPolicy: (payload) => getCheckIssuedPolicy(payload),
  setDimensions: (payload) => setDimensions(payload),
  setAppConfig: (payload) => setAppConfig(payload),
  setUserData: (payload) => setUserData(payload),
  setStatusCodePush: (payload) => setStatusCodePush(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(Bootstrap);
