import {
  setLoading,
  setIsShowModalCustomerCare,
} from 'ca-bootstrap/bootstrapAction';
import {
  getLifetagListOrder,
  getLifetagDetailOrder,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  lifetagAction: state.lifetag.action,
  getLifetagDetailOrderResponse: state.lifetag.getLifetagDetailOrderResponse,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagListOrder: (payload) => getLifetagListOrder(payload),
  getLifetagDetailOrder: (payload) => getLifetagDetailOrder(payload),
  setIsShowModalCustomerCare: (payload) => setIsShowModalCustomerCare(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
