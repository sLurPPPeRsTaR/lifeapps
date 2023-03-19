import { connect } from 'react-redux';
import {
  getNotif,
  getNotifClear,
  readNotif,
} from 'ca-module-notification/notificationAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getNotifResponse: state.notification.getNotifResponse,
  getNotifFetch: state.notification.getNotifFetch,
  readNotifResponse: state.notification.readNotifResponse,
  notificationAction: state.notification.action,
  userData: state.auth.userData,
  width: state.bootstrap.dimensions.width,
});

const mapDispatchToProps = {
  getNotif: (payload) => getNotif(payload),
  getNotifClear: () => getNotifClear(),
  readNotif: (payload) => readNotif(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
