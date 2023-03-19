import {
  setIsComingFromDeepLink,
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getCurrentSubs,
  getCurrentSubsClear,
} from 'ca-module-lifesaver/lifesaverAction';
import {
  getLifetagProductDetail,
  setLifetagOrderNo,
  setLifetagTempState,
  setLifetagTempStateClear,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  lifetagAction: state.lifetag.action,
  getLifetagProductDetailResponse:
    state.lifetag.getLifetagProductDetailResponse,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  lifetagTempState: state.lifetag.lifetagTempState,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
  userData: state.auth.userData,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  width: state.bootstrap.dimensions.width,
  lifesaverAction: state.lifesaver.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagProductDetail: (payload) => getLifetagProductDetail(payload),
  setLifetagTempState: (payload) => setLifetagTempState(payload),
  setLifetagTempStateClear: () => setLifetagTempStateClear(),
  setLifetagOrderNo: () => setLifetagOrderNo(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
  getCurrentSubs: () => getCurrentSubs(),
  getCurrentSubsClear: () => getCurrentSubsClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
