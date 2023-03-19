/* eslint-disable implicit-arrow-linebreak */
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getUpdataListBank,
  getUpdataListBankClear,
  setOtherInformation,
  setUpdataInquiryBankAccount,
  setUpdataInquiryBankAccountClear,
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
  setUpdataInquiryBankAccountResponse:
    state.updata.setUpdataInquiryBankAccountResponse,
  setUpdataInquiryBankAccountFailed:
    state.updata.setUpdataInquiryBankAccountFailed,
  currentScreen: state.activity.currentScreen,
  alreadySetPin: state.auth.userData.alreadySetPin,
  updataTempState: state.updata.tempState,
  isKTPSame: state.updata.isKTPSame,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  dimensions: state.bootstrap.dimensions,
});

const mapDispatchToProps = {
  getUpdataListBank: (payload) => getUpdataListBank(payload),
  getUpdataListBankClear: () => getUpdataListBankClear(),
  setUpdataInquiryBankAccount: (payload) =>
    setUpdataInquiryBankAccount(payload),
  setUpdataInquiryBankAccountClear: () => setUpdataInquiryBankAccountClear(),
  setLoading: (payload) => setLoading(payload),
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
