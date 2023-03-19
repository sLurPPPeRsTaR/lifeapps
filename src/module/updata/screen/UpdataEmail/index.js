import {
  setIsShowModalCustomerCare,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  setUpdataRequestOtp,
  setUpdataRequestOtpClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  setUpdataRequestOtpFailed: state.updata.setUpdataRequestOtpFailed,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  otherInformation: state.updata.otherInformation,
  alreadySetPin: state.auth.userData.alreadySetPin,
});

const mapDispatchToProps = {
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
  setUpdataRequestOtp: (payload) => setUpdataRequestOtp(payload),
  setUpdataRequestOtpClear: () => setUpdataRequestOtpClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
