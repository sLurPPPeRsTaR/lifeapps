import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  // lang: state.auth.lang,
  lang: 'id',
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
