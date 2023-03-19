import * as CONST from 'ca-module-article/articleConstant';
import * as STATE from 'ca-module-article/articleInitialState';

const articleInitialState = {
  ...STATE.getArticleDetailInitialState,
  ...STATE.getArticlesInitialState,
  ...STATE.getArticleCategoriesInitialState,
  action: '',
};

export const articleReducer = (state = articleInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    // ARTICLE DETAIL
    [CONST.GET_ARTICLE_DETAIL]: () => ({
      ...state,
      getArticleDetailParam: payload,
      getArticleDetailFetch: true,
      action: type,
    }),
    [CONST.GET_ARTICLE_DETAIL_SUCCESS]: () => ({
      ...state,
      getArticleDetailResponse: payload,
      getArticleDetailFetch: false,
      action: type,
    }),
    [CONST.GET_ARTICLE_DETAIL_FAILED]: () => ({
      ...state,
      getArticleDetailFailed: payload,
      getArticleDetailFetch: false,
      action: type,
    }),
    [CONST.GET_ARTICLE_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getArticleDetailInitialState,
      action: type,
    }),

    // ARTICLE LIST
    [CONST.GET_ARTICLES]: () => ({
      ...state,
      getArticlesParam: payload,
      getArticlesFetch: true,
      action: type,
    }),
    [CONST.GET_ARTICLES_SUCCESS]: () => ({
      ...state,
      getArticlesResponse: payload,
      getArticlesList: state?.getArticlesParam?.append
        ? state?.getArticlesList?.concat(payload?.data)
        : payload?.data,
      getArticlesFetch: false,
      action: type,
    }),
    [CONST.GET_ARTICLES_FAILED]: () => ({
      ...state,
      getArticlesFailed: payload,
      getArticlesFetch: false,
      action: type,
    }),
    [CONST.GET_ARTICLES_CLEAR]: () => ({
      ...state,
      ...STATE.getArticlesInitialState,
      action: type,
    }),

    // ARTICLE CATEGORIES
    [CONST.GET_ARTICLE_CATEGORIES]: () => ({
      ...state,
      getArticleCategoriesParam: payload,
      getArticleCategoriesFetch: true,
      action: type,
    }),
    [CONST.GET_ARTICLE_CATEGORIES_SUCCESS]: () => ({
      ...state,
      getArticleCategoriesResponse: payload,
      getArticleCategoriesFetch: false,
      getArticleCategoriesList: state?.getArticleCategoriesParam?.append
        ? state?.getArticleCategoriesList?.concat(payload?.data)
        : payload?.data,
      action: type,
    }),
    [CONST.GET_ARTICLE_CATEGORIES_FAILED]: () => ({
      ...state,
      getArticleCategoriesFailed: payload,
      getArticleCategoriesFetch: false,
      action: type,
    }),
    [CONST.GET_ARTICLE_CATEGORIES_CLEAR]: () => ({
      ...state,
      ...STATE.getArticleCategoriesInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
