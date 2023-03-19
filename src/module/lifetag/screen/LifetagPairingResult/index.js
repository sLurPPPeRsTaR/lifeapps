import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getCurrentSubs } from 'ca-module-lifesaver/lifesaverAction';
import {
  getLifetagListOtherInfo,
  getLifetagListOtherInfoClear,
  getLifetagProfile,
  getLifetagProfileClear,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  lifetagAction: state.lifetag.action,
  getLifetagProfileFailed: state.lifetag.getLifetagProfileFailed,
  getLifetagListOtherInfoResponse:
    state.lifetag.getLifetagListOtherInfoResponse,
  getLifetagListOtherInfoFailed: state.lifetag.getLifetagListOtherInfoFailed,
  alreadyKYC: state.auth.userData.alreadyKYC,
  lifesaverAction: state.lifesaver.action,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagProfileClear: (payload) => getLifetagProfileClear(payload),
  getLifetagListOtherInfo: () => getLifetagListOtherInfo(),
  getLifetagListOtherInfoClear: () => getLifetagListOtherInfoClear(),
  getCurrentSubs: () => getCurrentSubs(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
