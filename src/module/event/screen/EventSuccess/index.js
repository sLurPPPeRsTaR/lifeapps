import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getEventDetail,
  getEventQuota,
  setEventBuyTicket,
  setEventBuyTicketClear,
} from 'ca-module-event/eventAction';
import { getCurrentSubs } from 'ca-module-lifesaver/lifesaverAction';
import { getSubscriptionDetail } from 'ca-module-subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
  userData: state.auth.userData,
  lifesaverAction: state.lifesaver.action,
  getEventQuotaResponse: state.event.getEventQuotaResponse,
  getEventDetailResponse: state.event.getEventDetailResponse,
  eventAction: state.event.action,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getEventDetailData: state.event.getEventDetailData,
  getPoliciesResponse: state.home.getPoliciesResponse,
  setEventBuyTicketResponse: state.event.setEventBuyTicketResponse,
});

const mapDispatchToProps = {
  getCurrentSubs: () => getCurrentSubs(),
  getEventQuota: (payload) => getEventQuota(payload),
  setEventBuyTicket: (payload) => setEventBuyTicket(payload),
  getEventDetail: (payload) => getEventDetail(payload),
  setLoading: (payload) => setLoading(payload),
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setEventBuyTicketClear: () => setEventBuyTicketClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
