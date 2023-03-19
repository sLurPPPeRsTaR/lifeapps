import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getPersonalDataCity,
  setPersonalDataCity,
  setPersonalDataCityClear,
  setPersonalDataDistrictClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  getPersonalDataCityResponse: state.profile.getPersonalDataCityResponse,
  setPersonalDataProvinceParam: state.profile.setPersonalDataProvinceParam,
  getPersonalDataResponse: state.profile.getPersonalDataResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPersonalDataCity: (payload) => getPersonalDataCity(payload),
  setPersonalDataCity: (payload) => setPersonalDataCity(payload),
  setPersonalDataDistrictClear: (payload) =>
    setPersonalDataDistrictClear(payload),
  setPersonalDataCityClear: (payload) => setPersonalDataCityClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
