import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setKycVerifyIdCard,
  setKycVerifyIdCardClear,
  setKycVerifyDukcapil,
  setKycVerifyDukcapilClear,
} from 'ca-module-kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycVerifyIdCardFailed: state.kyc.setKycVerifyIdCardFailed,
  setKycIdCardResponse: state.kyc.setKycIdCardResponse,
  setKycVerifyDukcapilResponse: state.kyc.setKycVerifyDukcapilResponse,
  setKycVerifyDukcapilFailed: state.kyc.setKycVerifyDukcapilFailed,
});

const mapDispatchToProps = {
  setKycVerifyIdCard: (payload) => setKycVerifyIdCard(payload),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
  setKycVerifyDukcapil: (payload) => setKycVerifyDukcapil(payload),
  setKycVerifyIdCardClear: () => setKycVerifyIdCardClear(),
  setKycVerifyDukcapilClear: () => setKycVerifyDukcapilClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
