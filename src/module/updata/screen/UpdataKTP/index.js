import { setIsKTPSame } from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
});

const mapDispatchToProps = {
  setIsKTPSame: (payload) => setIsKTPSame(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
