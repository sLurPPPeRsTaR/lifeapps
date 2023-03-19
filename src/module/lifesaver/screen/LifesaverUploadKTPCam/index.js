import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import {
  setUpdataFaceCompare,
  setUpdataKTP,
  setUpdataKTPClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  setUpdataKTPResponse: state.updata.setUpdataKTPResponse,
  setUpdataKTPFailed: state.updata.setUpdataKTPFailed,
  setUpdataFaceCompareFailed: state.updata.setUpdataFaceCompareFailed,
});

const mapDispatchToProps = {
  setUpdataKTP: (payload) => setUpdataKTP(payload),
  setUpdataKTPClear: (payload) => setUpdataKTPClear(payload),
  setLoading: (payload) => setLoading(payload),
  setUpdataFaceCompare: (payload) => setUpdataFaceCompare(payload),
  setUserData: (payload) => setUserData(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
