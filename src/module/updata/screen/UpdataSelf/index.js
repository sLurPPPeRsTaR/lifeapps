import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getUpdataDetailEKyc,
  getUpdataDetailEKycClear,
  setIsKTPSame,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  getUpdataDetailEKycResponse: state.updata.getUpdataDetailEKycResponse,
  getUpdataDetailEKycFailed: state.updata.getUpdataDetailEKycFailed,
  getUpdataDetailEKycFetch: state.updata.getUpdataDetailEKycFetch,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getUpdataDetailEKyc: (payload) => getUpdataDetailEKyc(payload),
  getUpdataDetailEKycClear: () => getUpdataDetailEKycClear(),
  setIsKTPSame: (payload) => setIsKTPSame(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
