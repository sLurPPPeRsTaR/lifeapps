// ARTICLE DETAIL
export const getArticleDetailInitialState = {
  getArticleDetailFetch: false,
  getArticleDetailParam: {},
  getArticleDetailResponse: {},
  getArticleDetailFailed: {
    message: '',
  },
};

// ARTICLE LIST
export const getArticlesInitialState = {
  getArticlesFetch: false,
  getArticlesParam: {},
  getArticlesResponse: {},
  getArticlesList: [],
  getArticlesFailed: {
    message: '',
  },
};

export const getArticleCategoriesInitialState = {
  getArticleCategoriesFetch: false,
  getArticleCategoriesParam: {},
  getArticleCategoriesResponse: {},
  getArticleCategoriesList: [],
  getArticleCategoriesFailed: {
    message: '',
  },
};
