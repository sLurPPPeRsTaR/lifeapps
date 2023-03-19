import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  setLinkLifetag,
  setLinkLifetagClear,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
  lifetagAction: state.lifetag.action,
  setLinkLifetagResponse: state.lifetag.setLinkLifetagResponse,
  setLinkLifetagFailed: state.lifetag.setLinkLifetagFailed,
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  setLinkLifetag: (payload) => setLinkLifetag(payload),
  setLinkLifetagClear: () => setLinkLifetagClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
