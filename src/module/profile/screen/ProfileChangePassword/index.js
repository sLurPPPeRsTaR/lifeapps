import { connect } from 'react-redux';
import {
  setChangePassword,
  setChangePasswordClear,
} from 'ca-module-profile/profileAction';
import { setLogout } from 'ca-module-auth/authAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setChangePasswordFailed: state.profile.setChangePasswordFailed,
});

const mapDispatchToProps = {
  setChangePassword: (payload) => setChangePassword(payload),
  setChangePasswordClear: () => setChangePasswordClear(),
  setLogout: () => setLogout(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
