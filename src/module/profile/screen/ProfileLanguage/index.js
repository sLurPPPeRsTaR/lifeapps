import { setLang } from 'ca-module-profile/profileAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = state => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
});

const mapDispatchToProps = {
  setLang: payload => setLang(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
