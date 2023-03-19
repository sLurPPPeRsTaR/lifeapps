import { connect } from 'react-redux';
import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getEventDetail,
  getEventDetailClear,
  getEventQuota,
  setEventBuyTicket,
  setEventBuyTicketClear,
  getUserEventInvoiceId,
  setEventDetailData,
} from 'ca-module-event/eventAction';
import {
  getIsUserEligible,
  setPersonEligible,
  getIsUserEligibleClear,
  setPersonEligibleClear,
  getCurrentSubs,
} from 'ca-module-lifesaver/lifesaverAction';
import { getUpdataLastKTPInfo } from 'ca-module-updata/updataAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getEventQuotaResponse: state.event.getEventQuotaResponse,
  eventAction: state.event.action,
  userData: state.auth.userData,
  lifesaverAction: state.lifesaver.action,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  updataAction: state.updata.action,
  width: state.bootstrap.dimensions.width,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  setEventBuyTicketFailed: state.event.setEventBuyTicketFailed,
  getUserEventInvoiceIdResponse: state.event.getUserEventInvoiceIdResponse,
  getPoliciesResponse: state.home.getPoliciesResponse,
  getEventDetailData: state.event.getEventDetailData,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
});

const mapDispatchToProps = {
  getEventDetail: (payload) => getEventDetail(payload),
  setEventDetailData: (payload) => setEventDetailData(payload),
  getEventQuota: (payload) => getEventQuota(payload),
  getIsUserEligible: () => getIsUserEligible(),
  setPersonEligible: (payload) => setPersonEligible(payload),
  getIsUserEligibleClear: () => getIsUserEligibleClear(),
  setPersonEligibleClear: () => setPersonEligibleClear(),
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  setLoading: (payload) => setLoading(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setEventBuyTicket: (payload) => setEventBuyTicket(payload),
  setEventBuyTicketClear: () => setEventBuyTicketClear(),
  getEventDetailClear: () => getEventDetailClear(),
  getUserEventInvoiceId: (payload) => getUserEventInvoiceId(payload),
  getCurrentSubs: () => getCurrentSubs(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
