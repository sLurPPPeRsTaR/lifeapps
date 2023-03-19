import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setProfileFaq,
  setProfileFaqClear,
  setProfileNoLoginFaq,
  setProfileNoLoginFaqClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  faqAction: state.profile.action,
  setProfileFaqFailed: state.profile.setProfileFaqFailed,
  setProfileFaqResponse: state.profile.setProfileFaqResponse,
  setProfileNoLoginFaqFailed: state.profile.setProfileNoLoginFaqFailed,
  setProfileNoLoginFaqResponse: state.profile.setProfileNoLoginFaqResponse,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setProfileFaq: (payload) => setProfileFaq(payload),
  setProfileFaqClear: () => setProfileFaqClear(),
  setProfileNoLoginFaq: (payload) => setProfileNoLoginFaq(payload),
  setProfileNoLoginFaqClear: () => setProfileNoLoginFaqClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
