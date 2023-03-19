import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getUpdataListBank,
  getUpdataListBankClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  updataAction: state.updata.action,
  getUpdataListBankResponse: state.updata.getUpdataListBankResponse,
  otherInformation: state.updata.otherInformation,
});

const mapDispatchToProps = {
  getUpdataListBank: (payload) => getUpdataListBank(payload),
  getUpdataListBankClear: () => getUpdataListBankClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
