import { connect } from 'react-redux';
import {
  getPersonalDataProvince,
  setPersonalDataProvince,
  setPersonalDataProvinceClear,
  setPersonalDataCityClear,
  setPersonalDataDistrictClear,
} from 'ca-module-profile/profileAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';

import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  getPersonalDataProvinceResponse:
    state.profile.getPersonalDataProvinceResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getPersonalDataProvince: (payload) => getPersonalDataProvince(payload),
  setPersonalDataProvince: (payload) => setPersonalDataProvince(payload),
  setPersonalDataCityClear: (payload) => setPersonalDataCityClear(payload),
  setPersonalDataDistrictClear: (payload) =>
    setPersonalDataDistrictClear(payload),
  setPersonalDataProvinceClear: (payload) =>
    setPersonalDataProvinceClear(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
