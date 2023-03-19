/* eslint-disable implicit-arrow-linebreak */
import { setLoading, setToastMsg } from 'ca-bootstrap/bootstrapAction';
import { setUserData } from 'ca-module-auth/authAction';
import { setTemporaryHomeState } from 'ca-module-home/homeAction';
import {
  getUpdataLastKTPInfo,
  getUpdataLastOtherInfo,
  getUpdataLastOtherInfoClear,
  setOtherInformationClear,
  setUpdataAlterPolicies,
  setUpdataAlterPoliciesClear,
  setUpdataTempStateClear,
  setUpdataVerifyPengkinian,
  setUpdataVerifyPengkinianClear,
} from 'ca-module-updata/updataAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  updataAction: state.updata.action,
  getUpdataLastOtherInfoFailed: state.updata.getUpdataLastOtherInfoFailed,
  getUpdataLastOtherInfoFetch: state.updata.getUpdataLastOtherInfoFetch,
  isKTPSame: state.updata.isKTPSame,
  isKKSame: state.updata.isKKSame,
  getUpdataLastOtherInfoResponse: state.updata.getUpdataLastOtherInfoResponse,
  setUpdataKTPResponse: state.updata.setUpdataKTPResponse,
  setUpdataKKResponse: state.updata.setUpdataKKResponse,
  getUpdataLastKTPInfoResponse: state.updata.getUpdataLastKTPInfoResponse,
  getUpdataLastKKInfoResponse: state.updata.getUpdataLastKKInfoResponse,
  setUpdataCheckKKKTPParam: state.updata.setUpdataCheckKKKTPParam,
  otherInformation: state.updata.otherInformation,
  deviceId: state.auth.userData.deviceId,
  setUpdataAlterPoliciesResponse: state.updata.setUpdataAlterPoliciesResponse,
  setUpdataAlterPoliciesFailed: state.updata.setUpdataAlterPoliciesFailed,
  setUpdataVerifyPengkinianResponse:
    state.updata.setUpdataVerifyPengkinianResponse,
  setUpdataVerifyPengkinianFailed: state.updata.setUpdataVerifyPengkinianFailed,
  updataTempState: state.updata.tempState,
  alreadySetPin: state.auth.userData.alreadySetPin,
  getUpdataValidationCheckResponse:
    state.updata.getUpdataValidationCheckResponse,
  alreadySetMPin: state.auth.userData.alreadySetMPin,
  dimensions: state.bootstrap.dimensions,
  kkpmFlag: state.auth.userData.kkpmFlag,
});

const mapDispatchToProps = {
  getUpdataLastOtherInfo: (payload) => getUpdataLastOtherInfo(payload),
  getUpdataLastOtherInfoClear: (payload) =>
    getUpdataLastOtherInfoClear(payload),
  setLoading: (payload) => setLoading(payload),
  setUpdataAlterPolicies: (payload) => setUpdataAlterPolicies(payload),
  setUpdataAlterPoliciesClear: (payload) =>
    setUpdataAlterPoliciesClear(payload),
  setUserData: (payload) => setUserData(payload),
  setUpdataVerifyPengkinian: (payload) => setUpdataVerifyPengkinian(payload),
  setUpdataVerifyPengkinianClear: (payload) =>
    setUpdataVerifyPengkinianClear(payload),
  getUpdataLastKTPInfo: (payload) => getUpdataLastKTPInfo(payload),
  setOtherInformationClear: () => setOtherInformationClear(),
  setUpdataTempStateClear: () => setUpdataTempStateClear(),
  setTemporaryHomeState: (payload) => setTemporaryHomeState(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
