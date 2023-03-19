import { setIsComingFromScreen } from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  width: state.bootstrap.dimensions.width,
});

const mapDispatchToProps = {
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
