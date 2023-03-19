import { setIsAlreadyLaunched } from 'ca-bootstrap/bootstrapAction';
import { setLang } from 'ca-module-auth/authAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  deviceId: state.auth.userData.deviceId,
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  dimensions: state.bootstrap.dimensions,
});

const mapDispatchToProps = {
  setLang: (payload) => setLang(payload),
  setIsAlreadyLaunched: (payload) => setIsAlreadyLaunched(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
