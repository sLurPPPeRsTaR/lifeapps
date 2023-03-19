import { setUserData } from 'ca-module-auth/authAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setKycIdCard,
  setKycIdCardClear,
  setKycReFaceCompare,
  setKycReFaceCompareClear,
} from 'ca-module-kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycIdCardFailed: state.kyc.setKycIdCardFailed,
  setKycReFaceCompareFailed: state.kyc.setKycReFaceCompareFailed,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setKycIdCard: (payload) => setKycIdCard(payload),
  setLoading: (payload) => setLoading(payload),
  setKycIdCardClear: () => setKycIdCardClear(),
  setUserData: (payload) => setUserData(payload),
  setKycReFaceCompare: () => setKycReFaceCompare(),
  setKycReFaceCompareClear: () => setKycReFaceCompareClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
