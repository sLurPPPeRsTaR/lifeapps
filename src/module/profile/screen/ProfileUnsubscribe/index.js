import { connect } from 'react-redux';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import { setClearAuth } from 'ca-module-auth/authAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
