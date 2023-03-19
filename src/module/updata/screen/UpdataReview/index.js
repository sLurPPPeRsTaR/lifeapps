/* eslint-disable implicit-arrow-linebreak */
import { setLoading, setToastMsg } from 'ca-bootstrap/bootstrapAction';
import {
  getUpdataLastKKInfo,
  getUpdataLastKKInfoClear,
  getUpdataLastKTPInfo,
  getUpdataLastKTPInfoClear,
  setUpdataCheckKKKTP,
  setUpdataCheckKKKTPClear,
  setUpdataTempState,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  isKTPSame: state.updata.isKTPSame,
  isKKSame: state.updata.isKKSame,
  updataAction: state.updata.action,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  getUpdataLastKKInfoResponse: state.updata.getUpdataLastKKInfoResponse,
  getUpdataLastKTPInfoFailed: state.updata.getUpdataLastKTPInfoFailed,
  getUpdataLastKKInfoFailed: state.updata.getUpdataLastKKInfoFailed,
  setUpdataKTPResponse: state.updata.setUpdataKTPResponse,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  setUpdataCheckKKKTPResponse: state.updata.setUpdataCheckKKKTPResponse,
  setUpdataCheckKKKTPFailed: state.updata.setUpdataCheckKKKTPFailed,
});

const mapDispatchToProps = {
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  getUpdataLastKTPInfoClear: (payload) => getUpdataLastKTPInfoClear(payload),
  getUpdataLastKKInfo: (payload) => getUpdataLastKKInfo(payload),
  getUpdataLastKKInfoClear: (payload) => getUpdataLastKKInfoClear(payload),
  setUpdataCheckKKKTP: (payload) => setUpdataCheckKKKTP(payload),
  setUpdataCheckKKKTPClear: (payload) => setUpdataCheckKKKTPClear(payload),
  setLoading: (payload) => setLoading(payload),
  setUpdataTempState: (payload) => setUpdataTempState(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
