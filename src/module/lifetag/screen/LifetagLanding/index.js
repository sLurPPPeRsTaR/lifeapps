import {
  setIsComingFromDeepLink,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import { getCurrentSubs } from 'ca-module-lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  lifesaverAction: state.lifesaver.action,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  dimensions: state.bootstrap.dimensions,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getCurrentSubs: () => getCurrentSubs(),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
