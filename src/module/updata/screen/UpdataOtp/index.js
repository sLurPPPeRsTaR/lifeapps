import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setUpdataRequestOtp,
  setUpdataRequestOtpClear,
  setUpdataVerifyOtp,
  setUpdataVerifyOtpClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  updataAction: state.updata.action,
  setUpdataVerifyOtpFailed: state.updata.setUpdataVerifyOtpFailed,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
  dimensions: state.bootstrap.dimensions,
});

const mapDispatchToProps = {
  setUpdataVerifyOtp: (payload) => setUpdataVerifyOtp(payload),
  setUpdataVerifyOtpClear: () => setUpdataVerifyOtpClear(),
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
