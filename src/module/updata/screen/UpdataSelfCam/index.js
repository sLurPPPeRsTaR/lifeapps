/* eslint-disable implicit-arrow-linebreak */
import {
  setIsShowModalInternalServerError,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  setKycFaceCompare,
  setKycFaceCompareClear,
} from 'ca-module-kyc/kycAction';
import {
  setIsKTPSame,
  setUpdataLiveness,
  setUpdataLivenessClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  setUpdataLivenessFailed: state.updata.setUpdataLivenessFailed,
  setUpdataLivenessResponse: state.updata.setUpdataLivenessResponse,
  kycAction: state.kyc.action,
  setKycFaceCompareFailed: state.kyc.setKycFaceCompareFailed,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
});

const mapDispatchToProps = {
  setUpdataLiveness: (payload) => setUpdataLiveness(payload),
  setUpdataLivenessClear: () => setUpdataLivenessClear(),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalInternalServerError: (payload) =>
    setIsShowModalInternalServerError(payload),
  setIsKTPSame: (payload) => setIsKTPSame(payload),
  setKycFaceCompare: (payload) => setKycFaceCompare(payload),
  setKycFaceCompareClear: () => setKycFaceCompareClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
