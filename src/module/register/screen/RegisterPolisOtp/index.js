import { connect } from 'react-redux';
import {
  setLinkPolicy,
  getPolicyClear,
  getPolicy,
} from 'ca-module-home/homeAction';
import View from './View';
import { setLoading } from 'ca-bootstrap/bootstrapAction';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  homeAction: state.home.action,
  setLinkPolicyError: state.home.setLinkPolicyError,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setLinkPolicy: (payload) => setLinkPolicy(payload),
  getPolicyClear: (payload) => getPolicyClear(payload),
  getPolicy: (payload) => getPolicy(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
