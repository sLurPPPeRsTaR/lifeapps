import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getLifetagCurrentSetting,
  getLifetagCurrentSettingClear,
  setLifetagSectionSetting,
  setLifetagUnlink,
  setLifetagUnlinkClear,
  setLifetagUpdate,
  setLifetagUpdateClear,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  lifetagAction: state.lifetag.action,
  getLifetagCurrentSettingResponse:
    state.lifetag.getLifetagCurrentSettingResponse,
  getLifetagCurrentSettingFailed: state.lifetag.getLifetagCurrentSettingFailed,
  setLifetagUpdateFailed: state.lifetag.setLifetagUpdateFailed,
  setLifetagUnlinkFailed: state.lifetag.setLifetagUnlinkFailed,
  width: state.bootstrap.dimensions.width,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagCurrentSetting: (payload) => getLifetagCurrentSetting(payload),
  getLifetagCurrentSettingClear: () => getLifetagCurrentSettingClear(),
  setLifetagSectionSetting: (payload) => setLifetagSectionSetting(payload),
  setLifetagUpdate: (payload) => setLifetagUpdate(payload),
  setLifetagUpdateClear: () => setLifetagUpdateClear(),
  setLifetagUnlink: (payload) => setLifetagUnlink(payload),
  setLifetagUnlinkClear: () => setLifetagUnlinkClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
