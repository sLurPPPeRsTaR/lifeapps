import { connect } from 'react-redux';
import { getPolicies, getPoliciesClear } from 'ca-module-home/homeAction';
import {
  setIsComingFromScreen,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  getPoliciesResponse: state.home.getPoliciesResponse,
  getPoliciesFetch: state.home.getPoliciesFetch,
  alreadyKYC: state.auth.userData.alreadyKYC,
  alreadySetPin: state.auth.userData.alreadySetPin,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
  getPoliciesError: state.home.getPoliciesError,
  currentScreen: state.activity.currentScreen,
  homeAction: state.home.action,
});

const mapDispatchToProps = {
  getPolicies: (payload) => getPolicies(payload),
  getPoliciesClear: () => getPoliciesClear(),
  setLoading: (payload) => setLoading(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
