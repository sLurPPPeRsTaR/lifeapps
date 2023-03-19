import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';
import _ from 'lodash';

// ARTICLE DETAIL
export const getArticleDetailApi = (payload) => {
  return api.get(
    `${API.ARTICLE.getArticles}filterField=[Slug]&filterValue=${payload?.slugId}`,
    payload
  );
};

// ARTICLE LIST
export const getArticlesApi = (payload) => {
  return api.get(
    `${API.ARTICLE.getArticles}page=${payload?.page || 1}&pageSize=${
      payload?.pageSize || 10
    }&filterField=[category][name]&filterValue=${
      payload?.categoryName
    }&sortField=publishedAt&sortDirection=desc`,
    payload
  );
};

// ARTICLE CATEGORIES
export const getArticleCategoriesApi = (payload) => {
  return api.get(
    `${API.ARTICLE.getArticleCategories}page=${payload?.page}&pageSize=${payload?.pageSize}&sortField=publishedAt&sortDirection=desc`,
    payload
  );
};
