import { connect } from 'react-redux';
import {
  setRequestOtp,
  setRegisterClear,
} from 'ca-module-register/registerAction';
import { getCheckInvitee } from 'ca-module-invitation/invitationAction';
import {
  setIsComingFromScreen,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';

import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  registerAction: state.register.action,
  setRequestOtpFailed: state.register.setRequestOtpFailed,
  setResendRegisterOtp: state.register.setResendRegisterOtp,
  deviceId: state.auth.userData.deviceId,
  invitationAction: state.invitation.action,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  width: state.bootstrap.dimensions.width,
});

const mapDispatchToProps = {
  setRequestOtp: (payload) => setRequestOtp(payload),
  setRegisterClear: (payload) => setRegisterClear(payload),
  setLoading: (payload) => setLoading(payload),
  getCheckInvitee: (payload) => getCheckInvitee(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
