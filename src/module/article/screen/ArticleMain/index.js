import { connect } from 'react-redux';
import {
  getArticleCategories,
  getArticles,
  getArticlesClear,
} from 'ca-module-article/articleAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  width: state.bootstrap.dimensions.width,
  getArticlesResponse: state.article.getArticlesResponse,
  getArticlesList: state.article.getArticlesList,
  getArticleCategoriesResponse: state.article.getArticleCategoriesResponse,
  getArticleCategoriesList: state.article.getArticleCategoriesList,
  articleAction: state.article.action,
});

const mapDispatchToProps = {
  getArticleCategories: (payload) => getArticleCategories(payload),
  getArticles: (payload) => getArticles(payload),
  getArticlesClear: () => getArticlesClear(),
  setLoading: (payload) => setLoading(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
