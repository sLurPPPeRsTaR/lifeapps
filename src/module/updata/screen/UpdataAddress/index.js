import { setOtherInformation } from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  otherInformation: state.updata.otherInformation,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  updataTempState: state.updata.tempState,
  isKTPSame: state.updata.isKTPSame,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
});

const mapDispatchToProps = {
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
