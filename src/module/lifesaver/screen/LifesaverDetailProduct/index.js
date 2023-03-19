import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getListRs,
  getListRsClear,
  getPersonalRiplay,
  getProduct,
  getProductClear,
} from 'ca-module-lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getProductResponse: state.lifesaver.getProductResponse,
  getProductFetch: state.lifesaver.getProductFetch,
  getProductError: state.lifesaver.getProductError,
  getProductParam: state.lifesaver.getProductParam,
  lifesaverAction: state.lifesaver.action,
  getListRsResponse: state.lifesaver.getListRsResponse,
  getListRsError: state.lifesaver.getListRsResponse,
  getPersonalRiplayResponse: state.lifesaver.getPersonalRiplayResponse,
  name: state.auth.userData.name,
  phoneNumber: state.auth.userData.mobilePhoneNumber,
});

const mapDispatchToProps = {
  getProduct: (payload) => getProduct(payload),
  setLoading: (payload) => setLoading(payload),
  getListRs: (payload) => getListRs(payload),
  getPersonalRiplay: () => getPersonalRiplay(),
  getListRsClear: () => getListRsClear(),
  getProductClear: () => getProductClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
