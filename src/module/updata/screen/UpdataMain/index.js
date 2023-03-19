import {
  setIsShowModalCustomerCare,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getUpdataValidationCheck } from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  width: state.bootstrap.dimensions.width,
  updataAction: state.updata.action,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
  getUpdataValidationCheckFailed: state.updata.getUpdataValidationCheckFailed,
});

const mapDispatchToProps = {
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
  getUpdataValidationCheck: (payload) => getUpdataValidationCheck(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
