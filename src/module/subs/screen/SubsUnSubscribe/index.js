import {
  getSubscriptionDetail,
  setUnsubscribe,
} from 'ca-module-subs/subsAction';
import { 
  setIsShowModalInternalServerError,
  setLoading, 
} from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  subsAction: state.subs.action,
});

const mapDispatchToProps = {
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  setUnsubscribe: (payload) => setUnsubscribe(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalInternalServerError: (payload) => setIsShowModalInternalServerError(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
