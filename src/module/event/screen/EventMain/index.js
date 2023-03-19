import {
  setIsComingFromScreen,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';
import {
  getEventUpcoming,
  getEventUserTicket,
  setEventAddFavorite,
  setEventRmvFavorite,
} from 'ca-module-event/eventAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  getEventUpcomingResponse: state.event.getEventUpcomingResponse,
  eventAction: state.event.action,
  setEventCodeFailed: state.event.setEventCodeFailed,
  getEventUserTicketResponse: state.event.getEventUserTicketResponse,
  getEventDetailFailed: state.event.getEventDetailFailed,
});

const mapDispatchToProps = {
  getEventUpcoming: (payload) => getEventUpcoming(payload),
  setEventAddFavorite: (payload) => setEventAddFavorite(payload),
  setEventRmvFavorite: (payload) => setEventRmvFavorite(payload),
  getEventUserTicket: (payload) => getEventUserTicket(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setLoading: (payload) => setLoading(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
