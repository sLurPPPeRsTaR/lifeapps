import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setSaveAddress,
  setSaveAddressClear,
  setUpdateAddress,
  setUpdateAddressClear,
  getProfileCity,
  getProfileDistrict,
  getProfileProvince,
  getProfileSubDistrict,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  getProfileProvinceResponse: state.profile.getProfileProvinceResponse,
  getProfileCityResponse: state.profile.getProfileCityResponse,
  getProfileDistrictResponse: state.profile.getProfileDistrictResponse,
  getProfileSubDistrictResponse: state.profile.getProfileSubDistrictResponse,
  getProfileProvinceFailed: state.profile.getProfileProvinceFailed,
  getProfileCityFailed: state.profile.getProfileCityFailed,
  getProfileDistrictFailed: state.profile.getProfileDistrictFailed,
  getProfileSubDistrictFailed: state.profile.getProfileSubDistrictFailed,
  setSaveAddressFailed: state.profile.setSaveAddressFailed,
  setUpdateAddressFailed: state.profile.setUpdateAddressFailed,
});

const mapDispatchToProps = {
  getProfileProvince: (payload) => getProfileProvince(payload),
  getProfileCity: (payload) => getProfileCity(payload),
  getProfileDistrict: (payload) => getProfileDistrict(payload),
  getProfileSubDistrict: (payload) => getProfileSubDistrict(payload),
  setLoading: (payload) => setLoading(payload),
  setSaveAddress: (payload) => setSaveAddress(payload),
  setSaveAddressClear: (payload) => setSaveAddressClear(payload),
  setUpdateAddress: (payload) => setUpdateAddress(payload),
  setUpdateAddressClear: (payload) => setUpdateAddressClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
