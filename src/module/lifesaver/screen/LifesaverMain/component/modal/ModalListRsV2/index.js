import { connect } from 'react-redux';
import { getListRs, getListRsClear } from 'ca-module-home/homeAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getListRsResponse: state.home.getListRsResponse,
  getListRsFetch: state.home.getListRsFetch,
  homeAction: state.home.action,
});

const mapDispatchToProps = {
  getListRs: (payload) => getListRs(payload),
  getListRsClear: () => getListRsClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
