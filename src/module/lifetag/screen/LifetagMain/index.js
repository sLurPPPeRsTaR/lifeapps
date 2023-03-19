/* eslint-disable implicit-arrow-linebreak */
import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getCurrentSubs } from 'ca-module-lifesaver/lifesaverAction';
import {
  getLifetagListOtherInfo,
  getLifetagProfile,
  getLifetagProfileClear,
  getLifetagProfilePublic,
  getLifetagProfilePublicClear,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  lifetagAction: state.lifetag.action,
  getLifetagProfileFailed: state.lifetag.getLifetagProfileFailed,
  getLifetagProfilePublicFailed: state.lifetag.getLifetagProfilePublicFailed,
  getLifetagProfileResponse: state.lifetag.getLifetagProfileResponse,
  getLifetagProfilePublicResponse:
    state.lifetag.getLifetagProfilePublicResponse,
  alreadyKYC: state.auth.userData.alreadyKYC,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  lifesaverAction: state.lifesaver.action,
  width: state.bootstrap.dimensions.width,
  getLifetagListOtherInfoResponse:
    state.lifetag.getLifetagListOtherInfoResponse,
  getLifetagListOtherInfoFailed: state.lifetag.getLifetagListOtherInfoFailed,
});

const mapDispatchToProps = {
  getLifetagProfile: (payload) => getLifetagProfile(payload),
  getLifetagProfileClear: (payload) => getLifetagProfileClear(payload),
  getLifetagProfilePublic: (payload) => getLifetagProfilePublic(payload),
  getLifetagProfilePublicClear: (payload) =>
    getLifetagProfilePublicClear(payload),
  setLoading: (payload) => setLoading(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getCurrentSubs: (payload) => getCurrentSubs(payload),
  getLifetagListOtherInfo: () => getLifetagListOtherInfo(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
