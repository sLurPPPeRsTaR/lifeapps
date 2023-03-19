import {
  setIsShowModalBadRequest,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';
import { getPolicyDownload } from 'ca-module-polis/polisAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getPolicyDownloadResponse: state.polis.getPolicyDownloadResponse,
  getPolicyDownloadFailed: state.polis.getPolicyDownloadFailed,
  polisAction: state.polis.action,
  accessToken: state.auth.token.access_token,
});

const mapDispatchToProps = {
  getPolicyDownload: (payload) => getPolicyDownload(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalBadRequest: (payload) => setIsShowModalBadRequest(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
