import { connect } from 'react-redux';
import {
  getArticleDetail,
  getArticleDetailClear,
} from 'ca-module-article/articleAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  width: state.bootstrap.dimensions.width,
  articleAction: state.article.action,
  getArticleDetailResponse: state.article.getArticleDetailResponse,
});

const mapDispatchToProps = {
  getArticleDetail: (payload) => getArticleDetail(payload),
  getArticleDetailClear: () => getArticleDetailClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
