import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  // lang: state.auth.lang,
  lang: 'en',
  colorScheme: state.auth.colorScheme,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(View);
