import { getBills, getBillsClear } from 'ca-module-subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getBillsResponse: state.subs.getBillsResponse,
  getBillsFetch: state.subs.getBillsFetch,
  subsAction: state.subs.action,
});

const mapDispatchToProps = {
  getBills: (payload) => getBills(payload),
  getBillsClear: () => getBillsClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
