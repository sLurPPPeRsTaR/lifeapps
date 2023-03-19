import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { getEventUserTicket } from 'ca-module-event/eventAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getEventUserTicketResponse: state.event.getEventUserTicketResponse,
  eventAction: state.event.action,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  getEventUserTicket: (payload) => getEventUserTicket(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
