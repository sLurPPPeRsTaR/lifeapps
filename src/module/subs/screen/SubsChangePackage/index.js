import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  getProductsResponse: state.lifesaver.getProductsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
