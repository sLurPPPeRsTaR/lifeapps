import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getEventFavorite,
  setEventAddFavorite,
  setEventRmvFavorite,
} from 'ca-module-event/eventAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getEventFavoriteResponse: state.event.getEventFavoriteResponse,
  eventAction: state.event.action,
  setEventCodeFailed: state.event.setEventCodeFailed,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  getEventFavorite: (payload) => getEventFavorite(payload),
  setEventAddFavorite: (payload) => setEventAddFavorite(payload),
  setEventRmvFavorite: (payload) => setEventRmvFavorite(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
