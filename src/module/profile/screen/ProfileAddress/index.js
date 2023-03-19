import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  setAddPostalCodeKycIdCard,
  setAddPostalCodeKycIdCardClear,
} from 'ca-module-kyc/kycAction';
import {
  getAddressList,
  getAddressListClear,
  setDeleteAddress,
  setDeleteAddressClear,
  setUpdateAddress,
  setUpdateAddressClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  getAddressListResponse: state.profile.getAddressListResponse,
  getAddressListFailed: state.profile.getAddressListFailed,
  setDeleteAddressFailed: state.profile.setDeleteAddressFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  userData: state.auth.userData,
  setUpdateAddressFailed: state.profile.setUpdateAddressFailed,
  setAddPostalCodeKycIdCardFailed: state.kyc.setAddPostalCodeKycIdCardFailed,
  kycAction: state.kyc.action,
});

const mapDispatchToProps = {
  getAddressList: (payload) => getAddressList(payload),
  getAddressListClear: (payload) => getAddressListClear(payload),
  setLoading: (payload) => setLoading(payload),
  setDeleteAddress: (payload) => setDeleteAddress(payload),
  setDeleteAddressClear: () => setDeleteAddressClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setAddPostalCodeKycIdCard: (payload) => setAddPostalCodeKycIdCard(payload),
  setUpdateAddressClear: (payload) => setUpdateAddressClear(payload),
  setAddPostalCodeKycIdCardClear: () => setAddPostalCodeKycIdCardClear(),
  setUpdateAddress: (payload) => setUpdateAddress(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
