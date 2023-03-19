import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import { LilGrayCircle } from 'ca-config/Svg';
import { Base15, Padder } from 'ca-component-container/index';
import _ from 'lodash';
import { useIsFocused } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILED,
  GET_ARTICLE_CATEGORIES_SUCCESS,
  GET_ARTICLE_CATEGORIES_FAILED,
} from 'ca-module-article/articleConstant';
import locale from './locale';
import style from './style';

function ArticleMain(props) {
  const {
    navigation,
    lang,
    width,
    setLoading,
    route: { params },
    getArticleCategories,
    getArticleCategoriesResponse,
    getArticleCategoriesList,
    getArticles,
    getArticlesResponse,
    getArticlesList,
    getArticlesClear,
    articleAction,
  } = props;
  moment.locale(lang);
  const [dataArticles, setDataArticles] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [dataCategoryArticles, setDataCategoryArticles] = useState([]);
  const [imgActive, setImgActive] = useState(0);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setArticleResult(articleAction);
    }
  }, [articleAction, isFocused, setArticleResult]);
  const setArticleResult = useCallback(
    (act) => {
      if (act === GET_ARTICLES_SUCCESS) {
        setDataArticles(getArticlesList);
        setLoading(false);
        setLoadingArticle(false);
        setRefreshing(false);
      }
      if (act === GET_ARTICLES_FAILED) {
        setLoading(false);
        setLoadingArticle(false);
        setRefreshing(false);
      }
      if (act === GET_ARTICLE_CATEGORIES_SUCCESS) {
        const newObj = { id: 0, name: '', isActive: true };
        const dataCategory = getArticleCategoriesList?.map((val, idx) => {
          return {
            id: idx + 1,
            name: val?.name,
            isActive: val?.isActive || false,
          };
        });
        setDataCategoryArticles([newObj, ...dataCategory]);
        setLoading(false);
        setLoadingCategory(false);
      }
      if (act === GET_ARTICLE_CATEGORIES_FAILED) {
        setLoading(false);
        setLoadingCategory(false);
      }
    },
    [getArticleCategoriesList, getArticlesList, setLoading]
  );

  useEffect(() => {
    setLoading(true);
    const payloadArticles = {
      page: 1,
      pageSize: 10,
      categoryName: categoryName,
    };
    getArticles(payloadArticles);
  }, [categoryName, getArticles, setLoading]);
  useEffect(() => {
    setLoading(true);
    const payloadArticleCategories = {
      page: 1,
      pageSize: 10,
    };
    getArticleCategories(payloadArticleCategories);
  }, [getArticleCategories, setLoading]);

  function onChangeCategoryArticles(value) {
    setLoading(true);
    setImgActive(0);
    const payloadArticles = {
      page: 1,
      pageSize: 10,
      categoryName: value,
    };
    getArticles(payloadArticles);
  }
  function onSwipe(nativeEvent) {
    if (nativeEvent) {
      const ITEM_SIZE = width * 0.7;
      const index = Math.floor(nativeEvent.contentOffset.x / ITEM_SIZE);
      if (index !== imgActive) {
        setImgActive(index > 4 ? 4 : index);
      }
    }
  }
  const onRefresh = () => {
    setRefreshing(true);
    const payloadArticles = {
      page: 1,
      pageSize: 10,
      categoryName: categoryName,
    };
    getArticles(payloadArticles);
  };
  const reFetchArticles = ({ nativeEvent }) => {
    const paddingToBottom = 20;
    const lastData =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - paddingToBottom;
    if (lastData) {
      const { page, pageCount } = getArticlesResponse?.meta?.pagination;
      const payloadArticles = {
        page: page + 1,
        pageSize: 10,
        categoryName: categoryName,
        append: true,
      };
      if (!loadingArticle) {
        if (page < pageCount) {
          // setLoading(true);
          setLoadingArticle(true);
          getArticles(payloadArticles);
        }
      }
    }
  };
  const reFetchCategories = ({ nativeEvent }) => {
    const { page, pageCount } = getArticleCategoriesResponse?.meta?.pagination;
    const payloadArticleCategories = {
      page: page + 1,
      pageSize: 10,
      append: true,
    };
    if (!loadingCategory) {
      if (page < pageCount) {
        setLoadingCategory(true);
        getArticleCategories(payloadArticleCategories);
      }
    }
  };
  const renderFooterArticle = () => {
    if (loadingArticle) {
      return <ActivityIndicator size="large" color={Color.main.dark.black} />;
    }
    return null;
  };
  function renderArticle() {
    return (
      <View>
        <Text
          textStyle="semi"
          numberOfLines={1}
          size={Size.text.body2.size}
          style={style.mT24}
          line={21}>
          {categoryName || trans(locale, lang, 'all')}
        </Text>
        <FlatList
          contentContainerStyle={{
            paddingBottom:
              dataArticles?.length < 6 ? Size.screen.height * 0.5 : 50,
          }}
          showsVerticalScrollIndicator={false}
          data={
            dataArticles?.length < 6 ? dataArticles : dataArticles?.slice(6)
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => renderListArticle(item, index)}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderFooterArticle}
        />
      </View>
    );
  }

  function renderCategory() {
    if (getArticleCategoriesList?.length > 0) {
      return (
        <FlatList
          bounces={false}
          style={style.renderCategory.renderContent}
          showsHorizontalScrollIndicator={false}
          data={dataCategoryArticles}
          onEndReached={reFetchCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => renderListCategory(item, index)}
          horizontal
        />
      );
    }
    return null;
  }
  function renderListCategory({ item }) {
    return (
      <TouchableOpacity
        style={[
          style.renderArticle.badge,
          {
            backgroundColor: item?.isActive
              ? Color.badgePink.light.badgePink
              : undefined,
          },
        ]}
        disabled={item?.name === categoryName}
        onPress={() => {
          setCategoryName(!item?.isActive ? item?.name : '');
          onChangeCategoryArticles(item?.name);
          const dataCategory = dataCategoryArticles?.map((val) => {
            return {
              ...val,
              isActive: val?.name === item?.name,
            };
          });
          setDataCategoryArticles(dataCategory);
        }}>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={17.07}
          color={Color.badgeMagenta.light.badgeMagenta}>
          {item?.name || 'Semua'}
        </Text>
      </TouchableOpacity>
    );
  }
  function renderListArticle({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(NAVIGATION.ARTICLE.ArticleDetail, {
            slugId: item?.attributes?.Slug,
          });
        }}
        style={style.renderArticle.renderContent}>
        <View style={{ width: width * 0.65 }}>
          <Text
            textStyle="bold"
            numberOfLines={1}
            size={Size.text.body2.size}
            line={21}>
            {item?.attributes?.Title}
          </Text>
          <Text
            textStyle="regular"
            numberOfLines={2}
            size={Size.text.caption3.size}
            line={15}
            style={style.mV6}
            letterSpacing={0.5}>
            {item?.attributes?.ShortArticle}
          </Text>
          <View style={style.renderFooterContent}>
            <Text
              textStyle="regular"
              size={Size.text.caption3.size}
              line={15}
              letterSpacing={0.5}>
              {moment(item?.attributes?.publishedAt).format('YYYY, DD MMMM')}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: item?.attributes?.ImageSmall,
            }}
            style={style.renderArticle.imgBanner}
          />
          <View style={style.renderArticle.titleCategory}>
            <Text
              textStyle="regular"
              numberOfLines={1}
              size={Size.text.caption1.size}
              line={14.63}
              textAlign="center"
              color={Color.primary.light.primary20}
              letterSpacing={0.5}>
              {item?.attributes?.category?.data?.attributes?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  function renderHighlightArticle() {
    return (
      <View>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            onSwipe(nativeEvent);
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // style={style.renderArticle.scrollViewSize}
          horizontal>
          {dataArticles?.slice(0, 5)?.map((val) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate(NAVIGATION.ARTICLE.ArticleDetail, {
                    slugId: val?.attributes?.Slug,
                  });
                }}
                style={style.mT10}>
                <Image
                  source={{ uri: val?.attributes?.ImageThumb }}
                  style={style.renderArticle.imgHighlight}
                />

                <View style={style.renderArticle.bgShadow} />
                <Text
                  textStyle="regular"
                  numberOfLines={1}
                  size={Size.text.caption1.size}
                  line={14.63}
                  textAlign="center"
                  color={Color.primary.light.primary20}
                  style={style.renderArticle.categoryHighlight}
                  letterSpacing={0.5}>
                  {val?.attributes?.category?.data?.attributes?.name}
                </Text>
                <View style={style.renderArticle.viewContentHighlight}>
                  <Text
                    textStyle="semi"
                    numberOfLines={1}
                    size={Size.text.body2.size}
                    line={21}
                    textAlign="center"
                    color={Color.main.light.white}
                    letterSpacing={0.5}>
                    {val?.attributes?.Title}
                  </Text>
                  <Text
                    textStyle="regular"
                    numberOfLines={2}
                    size={Size.text.caption1.size}
                    line={18}
                    textAlign="center"
                    color={Color.main.light.white}
                    letterSpacing={0.5}>
                    {val?.attributes?.ShortArticle}
                  </Text>
                </View>
                <Text
                  textStyle="regular"
                  numberOfLines={2}
                  size={8}
                  line={18}
                  textAlign="center"
                  style={style.renderArticle.dateHighlight}
                  color={Color.main.light.white}>
                  {moment(val?.attributes?.publishedAt).format('YYYY, DD MMMM')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {renderFooterHightlight()}
      </View>
    );
  }
  function renderFooterHightlight() {
    return (
      <View style={style.renderArticle.viewDotContainer}>
        {dataArticles?.slice(0, 5)?.map((val, index) => {
          if (dataArticles?.slice(0, 5)?.length === 1) {
            return null;
          }
          return (
            <View style={style.renderArticle.dotContainer}>
              {imgActive === index ? (
                <View style={style.renderArticle.dotActive} />
              ) : (
                <Text style={style.renderArticle.dotInActive}>●</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <Base15
      isBackground={false}
      onBackPress={() => {
        getArticlesClear();
        navigation.goBack();
      }}
      title={trans(locale, lang, 'lifeArticle')}>
      <Padder>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={reFetchArticles}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          stickyHeaderIndices={[0]}>
          {renderCategory()}
          {dataArticles?.length > 5 && renderHighlightArticle()}
          {renderArticle()}
        </ScrollView>
      </Padder>
    </Base15>
  );
}

export default ArticleMain;

ArticleMain.defaultProps = {};

ArticleMain.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  getArticleCategories: PropTypes.func.isRequired,
  getArticleCategoriesResponse: PropTypes.objectOf(Object).isRequired,
  getArticleCategoriesList: PropTypes.arrayOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  getArticlesResponse: PropTypes.objectOf(Object).isRequired,
  getArticlesList: PropTypes.arrayOf(Object).isRequired,
  getArticlesClear: PropTypes.func.isRequired,
  articleAction: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};
