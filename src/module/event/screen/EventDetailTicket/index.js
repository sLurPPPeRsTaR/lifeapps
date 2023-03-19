import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getEventDetail } from 'ca-module-event/eventAction';
import { getCurrentSubs } from 'ca-module-lifesaver/lifesaverAction';
import { getSubscriptionDetail } from 'ca-module-subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getEventDetailResponse: state.event.getEventDetailResponse,
  userData: state.auth.userData,
  eventAction: state.event.action,
  lifesaverAction: state.lifesaver.action,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getPoliciesResponse: state.home.getPoliciesResponse,
});

const mapDispatchToProps = {
  getCurrentSubs: () => getCurrentSubs(),
  getEventDetail: (payload) => getEventDetail(payload),
  setLoading: (payload) => setLoading(payload),
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
