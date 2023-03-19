import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUpdataKK, setUpdataKKClear } from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  setUpdataKKFailed: state.updata.setUpdataKKFailed,
});

const mapDispatchToProps = {
  setUpdataKK: (payload) => setUpdataKK(payload),
  setUpdataKKClear: (payload) => setUpdataKKClear(payload),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
