import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-article/articleConstant';
import {
  getArticlesApi,
  getArticleDetailApi,
  getArticleCategoriesApi,
} from 'ca-module-article/articleApi';
import {
  getArticlesSuccess,
  getArticlesFailed,
  getArticleDetailSuccess,
  getArticleDetailFailed,
  getArticleCategoriesSuccess,
  getArticleCategoriesFailed,
} from './articleAction';

// ARTICLE DETAIL
function* getArticleDetail(params) {
  try {
    const response = yield call(getArticleDetailApi, params.payload);
    yield put(getArticleDetailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getArticleDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getArticleDetailFailed(error?.response?.data));
        break;
      default:
        yield put(getArticleDetailFailed(error?.response?.data));
        break;
    }
  }
}

// ARTICLE LIST
function* getArticles(params) {
  try {
    const response = yield call(getArticlesApi, params.payload);
    yield put(getArticlesSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getArticlesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getArticlesFailed(error?.response?.data));
        break;
      default:
        yield put(getArticlesFailed(error?.response?.data));
        break;
    }
  }
}

// ARTICLE CATEGORY
function* getArticleCategories(params) {
  try {
    const response = yield call(getArticleCategoriesApi, params.payload);
    yield put(getArticleCategoriesSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getArticleCategoriesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getArticleCategoriesFailed(error?.response?.data));
        break;
      default:
        yield put(getArticleCategoriesFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.GET_ARTICLES, getArticles),
  takeLatest(CONST.GET_ARTICLE_DETAIL, getArticleDetail),
  takeLatest(CONST.GET_ARTICLE_CATEGORIES, getArticleCategories),
];
