import {
  setIsShowModalInternalServerError,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setKycReFaceCompare,
  setKycSelfie,
  setKycSelfieClear,
  setKycReFaceCompareClear,
  setKycFaceCompareClear,
  setKycFaceCompare,
} from 'ca-module-kyc/kycAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  kycAction: state.kyc.action,
  setKycSelfieFailed: state.kyc.setKycSelfieFailed,
  userData: state.auth.userData,
  setKycReFaceCompareFailed: state.kyc.setKycReFaceCompareFailed,
  setKycFaceCompareFailed: state.kyc.setKycFaceCompareFailed,
});

const mapDispatchToProps = {
  setKycSelfie: (payload) => setKycSelfie(payload),
  setKycSelfieClear: () => setKycSelfieClear(),
  setLoading: (payload) => setLoading(payload),
  setUserData: (payload) => setUserData(payload),
  setIsShowModalInternalServerError: (payload) => {
    setIsShowModalInternalServerError(payload);
  },
  setKycReFaceCompare: () => setKycReFaceCompare(),
  setKycReFaceCompareClear: () => setKycReFaceCompareClear(),
  setKycFaceCompare: (payload) => setKycFaceCompare(payload),
  setKycFaceCompareClear: () => setKycFaceCompareClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
