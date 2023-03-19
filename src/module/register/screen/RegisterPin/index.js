import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setCreatePin,
  setCreatePinClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setCreatePinFailed: state.profile.setCreatePinFailed,
});

const mapDispatchToProps = {
  setCreatePin: (payload) => setCreatePin(payload),
  setUserData: (payload) => setUserData(payload),
  setCreatePinClear: () => setCreatePinClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
