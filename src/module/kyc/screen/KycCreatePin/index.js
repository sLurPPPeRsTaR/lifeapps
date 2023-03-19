import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import { setEventBuyTicket } from 'ca-module-event/eventAction';
import { setKycPin, setKycPinClear } from 'ca-module-kyc/kycAction';
import {
  getIsUserEligible,
  setPersonEligible,
} from 'ca-module-lifesaver/lifesaverAction';
import { getUpdataLastKTPInfo } from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycPinFailed: state.kyc.setKycPinFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  lifesaverAction: state.lifesaver.action,
  eventAction: state.event.action,
  setEventBuyTicketFailed: state.event.setEventBuyTicketFailed,
});

const mapDispatchToProps = {
  setKycPin: (payload) => setKycPin(payload),
  setKycPinClear: () => setKycPinClear(),
  setUserData: (payload) => setUserData(payload),
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  getIsUserEligible: () => getIsUserEligible(),
  setPersonEligible: (payload) => setPersonEligible(payload),
  setEventBuyTicket: (payload) => setEventBuyTicket(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
