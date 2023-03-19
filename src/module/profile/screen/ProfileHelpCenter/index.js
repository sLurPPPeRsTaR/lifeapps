import { getCSInfo } from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getCSInfoResponse: state.profile.getCSInfoResponse,
  getCSInfoFetch: state.profile.getCSInfoFetch,
});

const mapDispatchToProps = {
  getCSInfo: (payload) => getCSInfo(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
