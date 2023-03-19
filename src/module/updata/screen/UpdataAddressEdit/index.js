import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getUpdataCity,
  getUpdataCityClear,
  getUpdataDistrict,
  getUpdataDistrictClear,
  getUpdataProvince,
  getUpdataProvinceClear,
  getUpdataSubDistrict,
  getUpdataSubDistrictClear,
  setOtherInformation,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  getUpdataProvinceResponse: state.updata.getUpdataProvinceResponse,
  getUpdataCityResponse: state.updata.getUpdataCityResponse,
  getUpdataDistrictResponse: state.updata.getUpdataDistrictResponse,
  getUpdataSubDistrictResponse: state.updata.getUpdataSubDistrictResponse,
  getUpdataProvinceFailed: state.updata.getUpdataProvinceFailed,
  getUpdataCityFailed: state.updata.getUpdataCityFailed,
  getUpdataDistrictFailed: state.updata.getUpdataDistrictFailed,
  getUpdataSubDistrictFailed: state.updata.getUpdataSubDistrictFailed,
  otherInformation: state.updata.otherInformation,
  dimensions: state.bootstrap.dimensions,
});

const mapDispatchToProps = {
  getUpdataProvince: (payload) => getUpdataProvince(payload),
  getUpdataCity: (payload) => getUpdataCity(payload),
  getUpdataDistrict: (payload) => getUpdataDistrict(payload),
  getUpdataSubDistrict: (payload) => getUpdataSubDistrict(payload),
  getUpdataProvinceClear: (payload) => getUpdataProvinceClear(payload),
  getUpdataCityClear: (payload) => getUpdataCityClear(payload),
  getUpdataDistrictClear: (payload) => getUpdataDistrictClear(payload),
  getUpdataSubDistrictClear: (payload) => getUpdataSubDistrictClear(payload),
  setLoading: (payload) => setLoading(payload),
  setOtherInformation: (payload) => setOtherInformation(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
