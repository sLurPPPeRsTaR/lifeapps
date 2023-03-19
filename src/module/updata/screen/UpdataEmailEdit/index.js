import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setUpdataRequestOtp,
  setOtherInformation,
  setUpdataRequestOtpClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  otherInformation: state.updata.otherInformation,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
  currentScreen: state.activity.currentScreen,
});

const mapDispatchToProps = {
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
  setOtherInformation: (payload) => setOtherInformation(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
