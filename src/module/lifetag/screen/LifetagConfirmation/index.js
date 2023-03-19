import {
  setIsComingFromScreen,
  setLoading,
  setToastMsg,
} from 'ca-bootstrap/bootstrapAction';
import {
  getLifetagProductDetail,
  setLifetagCreateOrder,
} from 'ca-module-lifetag/lifetagAction';
import {
  getAddressList,
  getAddressListClear,
} from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userData: state.auth.userData,
  width: state.bootstrap.dimensions.width,
  getAddressListFailed: state.profile.getAddressListFailed,
  lifetagAction: state.lifetag.action,
  getLifetagProductDetailResponse:
    state.lifetag.getLifetagProductDetailResponse,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  setLifetagCreateOrderFailed: state.lifetag.setLifetagCreateOrderFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  getAddressListResponse: state.profile.getAddressListResponse,
  setLifetagOrderNoResponse: state.lifetag.setLifetagOrderNoResponse,
  setLifetagCreateOrderResponse: state.lifetag.setLifetagCreateOrderResponse,
  toastMsg: state.bootstrap.toastMsg,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getAddressList: () => getAddressList(),
  getAddressListClear: () => getAddressListClear(),
  getLifetagProductDetail: (payload) => getLifetagProductDetail(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setLifetagCreateOrder: (payload) => setLifetagCreateOrder(payload),
  setToastMsg: (payload) => setToastMsg(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
