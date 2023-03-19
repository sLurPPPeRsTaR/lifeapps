import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getPersonalDataDistrict,
  setPersonalDataDistrict,
  setPersonalDataDistrictClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  getPersonalDataDistrictResponse:
    state.profile.getPersonalDataDistrictResponse,
  setPersonalDataCityParam: state.profile.setPersonalDataCityParam,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPersonalDataDistrict: (payload) => getPersonalDataDistrict(payload),
  setPersonalDataDistrict: (payload) => setPersonalDataDistrict(payload),
  setPersonalDataDistrictClear: (payload) =>
    setPersonalDataDistrictClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
