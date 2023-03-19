import * as CONST from './articleConstant';

export const setColorScheme = (payload) => ({
  type: CONST.SET_COLOR_SCHEME,
  payload,
});
export const setLang = (payload) => ({
  type: CONST.SET_LANG,
  payload,
});

// ARTICLE DETAIL
export const getArticleDetail = (payload) => ({
  type: CONST.GET_ARTICLE_DETAIL,
  payload,
});
export const getArticleDetailSuccess = (payload) => ({
  type: CONST.GET_ARTICLE_DETAIL_SUCCESS,
  payload,
});
export const getArticleDetailFailed = (payload) => ({
  type: CONST.GET_ARTICLE_DETAIL_FAILED,
  payload,
});
export const getArticleDetailClear = (payload) => ({
  type: CONST.GET_ARTICLE_DETAIL_CLEAR,
  payload,
});

// ARTICLE LIST
export const getArticles = (payload) => ({
  type: CONST.GET_ARTICLES,
  payload,
});
export const getArticlesSuccess = (payload) => ({
  type: CONST.GET_ARTICLES_SUCCESS,
  payload,
});
export const getArticlesFailed = (payload) => ({
  type: CONST.GET_ARTICLES_FAILED,
  payload,
});
export const getArticlesClear = (payload) => ({
  type: CONST.GET_ARTICLES_CLEAR,
  payload,
});

// ARTICLE CATEGORY
export const getArticleCategories = (payload) => ({
  type: CONST.GET_ARTICLE_CATEGORIES,
  payload,
});
export const getArticleCategoriesSuccess = (payload) => ({
  type: CONST.GET_ARTICLE_CATEGORIES_SUCCESS,
  payload,
});
export const getArticleCategoriesFailed = (payload) => ({
  type: CONST.GET_ARTICLE_CATEGORIES_FAILED,
  payload,
});
export const getArticleCategoriesClear = (payload) => ({
  type: CONST.GET_ARTICLE_CATEGORIES_CLEAR,
  payload,
});
