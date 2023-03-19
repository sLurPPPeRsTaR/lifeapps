import {
  getEventCategories,
  getEventUpcoming,
  setEventCode,
  setEventCodeClear,
} from 'ca-module-event/eventAction';
import { connect } from 'react-redux';
import View, { EventFilter } from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  userData: state.auth.userData,
  colorScheme: state.auth.colorScheme,
  getEventCategoriesResponse: state.event.getEventCategoriesResponse,
  getEventUpcomingResponse: state.event.getEventUpcomingResponse,
  eventAction: state.event.action,
  setEventCodeFailed: state.event.setEventCodeFailed,
});

const mapDispatchToProps = {
  getEventCategories: (payload) => getEventCategories(payload),
  getEventUpcoming: (payload) => getEventUpcoming(payload),
  setEventCode: (payload) => setEventCode(payload),
  setEventCodeClear: () => setEventCodeClear(),
};

export { EventFilter };
export default connect(mapStateToProps, mapDispatchToProps)(View);
