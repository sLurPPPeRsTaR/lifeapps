import { connect } from 'react-redux';
import {
  getEventDetail,
  setCreateBillEvent,
  setCreateBillEventClear,
  setEventBuyTicket,
} from 'ca-module-event/eventAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { getUpdataLastKTPInfo } from 'ca-module-updata/updataAction';
import { setSubmission, getProduct } from 'ca-module-lifesaver/lifesaverAction';

import View from './View';
import { getPolicySummary } from 'ca-module-polis/polisAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  getEventDetailResponse: state.event.getEventDetailResponse,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  getProductResponse: state.lifesaver.getProductResponse,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  setSubmissionError: state.lifesaver.setSubmissionError,
  setCreateBillEventError: state.event.setCreateBillEventError,
  getPoliciesResponse: state.home.getPoliciesResponse,
  userData: state.auth.userData,
  eventAction: state.event.action,
  updataAction: state.updata.action,
  lifesaverAction: state.lifesaver.action,
  getPolicySummaryAction: state.polis.action,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getEventDetail: (payload) => getEventDetail(payload),
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  setSubmission: (payload) => setSubmission(payload),
  setCreateBillEvent: (payload) => setCreateBillEvent(payload),
  setCreateBillEventClear: () => setCreateBillEventClear(),
  setEventBuyTicket: (payload) => setEventBuyTicket(payload),
  getProduct: (payload) => getProduct(payload),
  getPolicySummary: (payload) => getPolicySummary(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
