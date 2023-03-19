import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setOtherInformation,
  setUpdataBankUpload,
  setUpdataTempState,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  alreadySetPin: state.auth.userData.alreadySetPin,
  otherInformation: state.updata.otherInformation,
  updataAction: state.updata.action,
  setUpdataBankUploadFailed: state.updata.setUpdataBankUploadFailed,
  updataTempState: state.updata.tempState,
});

const mapDispatchToProps = {
  setUpdataBankUpload: (payload) => setUpdataBankUpload(payload),
  setOtherInformation: (payload) => setOtherInformation(payload),
  setLoading: (payload) => setLoading(payload),
  setUpdataTempState: (payload) => setUpdataTempState(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
