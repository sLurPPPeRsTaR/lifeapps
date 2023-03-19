import { setCallTime } from 'ca-module-home/homeAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getCSInfoResponse: state.profile.getCSInfoResponse,
});

const mapDispatchToProps = {
  setCallTime: () => setCallTime(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
