import {
  setIsShowModalComingSoon,
  setLoading,
  setIsShowModalInternalServerError,
  setIsComingFromScreen,
} from 'ca-bootstrap/bootstrapAction';
import {
  getSubscriptions,
  getSubscriptionsClear,
  setResubscribe,
} from 'ca-module-subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getSubscriptionsResponse: state.subs.getSubscriptionsResponse,
  getSubscriptionsFetch: state.subs.getSubscriptionsFetch,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  subsAction: state.subs.action,
});

const mapDispatchToProps = {
  getSubscriptions: (payload) => getSubscriptions(payload),
  getSubscriptionsClear: () => getSubscriptionsClear(),
  setResubscribe: (payload) => setResubscribe(payload),
  setLoading: (payload) => setLoading(payload),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setIsShowModalInternalServerError: (payload) =>
    setIsShowModalInternalServerError(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
