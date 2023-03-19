import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { getProducts } from 'ca-module-lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getProductsResponse: state.lifesaver.getProductsResponse,
  getProductsError: state.lifesaver.getProductsError,
  lifesaverAction: state.lifesaver.action,
});

const mapDispatchToProps = {
  getProducts: () => getProducts(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
