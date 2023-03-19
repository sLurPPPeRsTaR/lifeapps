import {
  setIsShowModalBadRequest,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicySelfData } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicySelfDataResponse: state.polis.getPolicySelfDataResponse,
  getPolicySelfDataFailed: state.polis.getPolicySelfDataFailed,
  polisAction: state.polis.action,
});

const mapDispatchToProps = {
  getPolicySelfData: (payload) => getPolicySelfData(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
