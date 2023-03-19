import { setPhoneNumber } from 'ca-module-profile/profileAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  profileAction: state.profile.action,
  setPhoneNumberFailed: state.profile.setPhoneNumberFailed,
});

const mapDispatchToProps = {
  setPhoneNumber: (payload) => setPhoneNumber(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
