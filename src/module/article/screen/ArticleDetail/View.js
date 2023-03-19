import React, { useEffect, useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Share,
  Alert,
  RefreshControl,
} from 'react-native';
import { APP, TYPE } from 'ca-util/constant';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import { ChevronUp, Close, ShareIcon } from 'ca-config/Svg';
import { Padder } from 'ca-component-container/index';
import { useIsFocused } from '@react-navigation/native';
import {
  GET_ARTICLE_DETAIL_FAILED,
  GET_ARTICLE_DETAIL_SUCCESS,
} from 'ca-module-article/articleConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import locale from './locale';
import style from './style';

function ArticleDetail(props) {
  const {
    navigation,
    lang,
    width,
    colorScheme,
    setLoading,
    route: { params },
    getArticleDetail,
    getArticleDetailClear,
    getArticleDetailResponse,
    articleAction,
  } = props;
  moment.locale(lang);
  const scrollViewRef = useRef();
  const [showBtnUp, setShowBtnUp] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [articleDetailData, setArticleDetailData] = useState({});
  const systemFonts = [
    ...defaultSystemFonts,
    Size.fontFamily.regular,
    Size.fontFamily.medium,
    Size.fontFamily.semi,
    Size.fontFamily.bold,
  ];

  const htmlBaseStyle = {
    fontFamily: Size.fontFamily.regular,
  };
  const htmlTagsStyles = {
    ol: {
      paddingHorizontal: 20,
      margin: 0,
      fontFamily: Size.fontFamily.regular,
      fontSize: 14,
      color: Color.blackHome[colorScheme].blackHome,
    },
    li: {
      margin: 0,
      padding: 0,
      fontFamily: Size.fontFamily.regular,
      color: Color.blackHome[colorScheme].blackHome,
    },
    p: {
      margin: 0,
      padding: 0,
      fontFamily: Size.fontFamily.regular,
      fontSize: 14,
      color: Color.blackHome[colorScheme].blackHome,
    },
    span: {
      fontSize: 14,
      color: Color.blackHome[colorScheme].blackHome,
      fontFamily: Size.fontFamily.regular,
    },
    img: { width: Size.screen.width - 32, height: 200 },
  };
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const opacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const opacityInverse = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isFocused) {
      setArticleResult(articleAction);
    }
  }, [articleAction, isFocused, setArticleResult]);
  const setArticleResult = useCallback(
    (act) => {
      if (act === GET_ARTICLE_DETAIL_SUCCESS) {
        const data = {};
        getArticleDetailResponse?.data?.map((val) => Object.assign(data, val));
        setLoading(false);
        setRefreshing(false);
        setArticleDetailData(data);
      }
      if (act === GET_ARTICLE_DETAIL_FAILED) {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [getArticleDetailResponse?.data, setLoading]
  );
  const onRefresh = () => {
    setRefreshing(true);
    const payloadRequest = {
      slugId: params?.slugId,
    };
    setLoading(true);
    getArticleDetail(payloadRequest);
  };
  useEffect(() => {
    if (isFocused) {
      const payloadRequest = {
        slugId: params?.slugId,
      };
      if (params?.slugId) {
        setLoading(true);
        getArticleDetail(payloadRequest);
      } else {
        setTimeout(() => {
          navigation.goBack();
        }, 0.9);
      }
    }
  }, [getArticleDetail, isFocused, navigation, params?.slugId, setLoading]);
  const onShare = async () => {
    try {
      /**
       * Workaround for Linking.getInitialURL() truncating multiple query params
       * We replace '&' with its ASCII value '%26' and bypass its encoding
       */
      const shortLink = await getShortLink();
      const result = await Share.share({
        message: trans(
          locale,
          lang,
          `${articleDetailData?.attributes?.Title}\n${shortLink}`
        ),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const getShortLink = async () => {
    const afl = {
      '': `https://life.id/article/${articleDetailData?.attributes?.Slug}/`,
      '-uat': `https://uat.life.id/article/${articleDetailData?.attributes?.Slug}/`,
    };
    const bannerUrl = articleDetailData?.attributes?.ImageThumb;
    const deepLink = {
      '': `&apn=id.lifecustomer&isi=1627986095&ibi=id.life.customer&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
      '-uat': `&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
    };
    const content = `&st=${articleDetailData?.attributes?.Title}&sd=${articleDetailData?.attributes?.ShortArticle}&si=${bannerUrl}`;
    const linkPrefix = {
      '': `https://life.id/article/${articleDetailData?.attributes?.Slug}/${deepLink[TYPE]}${content}`,
      '-uat': `https://uat.life.id/article/${articleDetailData?.attributes?.Slug}/${deepLink[TYPE]}${content}`,
    };
    try {
      const bodyReq = {
        longDynamicLink: `https://lifecustomer.page.link/?link=${linkPrefix[TYPE]}`,
        suffix: {
          option: 'SHORT',
        },
      };
      const url =
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBuo0PQKVjM740bHQhg0XrUlmhep1EalJM';
      return await axios
        .post(url, bodyReq)
        .then((res) => {
          return res?.data?.shortLink;
        })
        .catch((err) => console.log('error', err));
    } catch (error) {
      console.log('error', error);
    }
    return null;
  };
  function renderStatusBar() {
    return (
      <StatusBar
        translucent
        backgroundColor={
          isDark ? Color.whiteOpacity.light.whiteOpacity75 : 'transparent'
        }
        barStyle={isDark ? 'dark-content' : 'light-content'}
      />
    );
  }

  function renderHeaderContainer() {
    return (
      <Animated.View
        style={[
          isDark
            ? style.renderHeaderContainer.containerInverse
            : style.renderHeaderContainer.containerInverse,
          {
            width: width,
            opacity: isDark ? opacity : opacityInverse,
            top: insets.top,
          },
        ]}>
        <View
          style={[
            style.renderHeaderContainer.header.container,
            style.renderHeaderContainer.header.animatedContainer,
            {
              backgroundColor: isDark
                ? Color.main.light.white
                : Color.transparent.light.transparent,
              height: APP.header.height + 40,
            },
          ]}>
          <TouchableOpacity
            style={style.btnHeaderCircle}
            onPress={() => {
              navigation.goBack();
              getArticleDetailClear();
            }}>
            <Close fill={Color.main.light.black} />
          </TouchableOpacity>
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={[style.btnHeaderCircle, { padding: 4.5 }]}
            onPress={() => {}}>
            <ShareIcon
              onPress={onShare}
              width={20}
              height={20}
              fill={Color.main.light.black}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function renderImageHeader() {
    return (
      <View>
        <Image
          source={{
            uri: articleDetailData?.attributes?.ImageThumb,
          }}
          style={style.renderImageHeader.imgSize}
        />
        {articleDetailData?.attributes?.category && (
          <Text
            textStyle="regular"
            size={Size.text.caption1.size}
            line={14.63}
            color={Color.primary.light.primary20}
            style={style.renderImageHeader.titleCategory}
            letterSpacing={0.5}>
            {articleDetailData?.attributes?.category?.data?.attributes?.name}
          </Text>
        )}
      </View>
    );
  }
  function renderHeaderContent() {
    return (
      <View>
        <Text
          textStyle="bold"
          size={20}
          line={30}
          color={Color.main.light.black}
          style={style.mV10}
          letterSpacing={0.5}>
          {articleDetailData?.attributes?.Title}
        </Text>
        <View style={style.renderHeaderContent.viewParent}>
          <View style={style.renderHeaderContent.viewContent}>
            <Image
              source={{
                uri: articleDetailData?.attributes?.authorImage,
              }}
              style={style.renderHeaderContent.imgAuthor}
            />
            {articleDetailData?.attributes?.author && (
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                line={18}
                color={Color.main.light.black}
                style={style.mH5}
                letterSpacing={0.5}>
                by {articleDetailData?.attributes?.author}
              </Text>
            )}
          </View>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            line={18}
            color={Color.main.light.black}
            style={style.mH5}
            letterSpacing={0.5}>
            {moment(articleDetailData?.attributes?.publishedAt).format(
              'DD MMMM YYYY'
            )}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={style.pageContainer}>
      {renderStatusBar()}
      {renderHeaderContainer()}
      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: yOffset } } }],
          {
            useNativeDriver: true,
            listener: ({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                setShowBtnUp(true);
              }
              if (
                nativeEvent.contentOffset.y >
                APP.header.height + insets.top + 150
              ) {
                setIsDark(true);
              } else {
                setIsDark(false);
                setShowBtnUp(false);
              }
            },
          }
        )}>
        {renderImageHeader()}
        <Padder>
          {renderHeaderContent()}
          <RenderHtml
            contentWidth={Size.screen.width}
            source={{
              html: articleDetailData?.attributes?.Content,
            }}
            baseStyle={htmlBaseStyle}
            tagsStyles={htmlTagsStyles}
            systemFonts={systemFonts}
          />
        </Padder>
      </Animated.ScrollView>
      {showBtnUp && (
        <TouchableOpacity
          onPress={handleScrollToTop}
          style={style.renderContent.renderBtn}>
          <ChevronUp fill={Color.main.light.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ArticleDetail;

ArticleDetail.defaultProps = {};

ArticleDetail.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getArticleDetail: PropTypes.func.isRequired,
  getArticleDetailClear: PropTypes.func.isRequired,
  getArticleDetailResponse: PropTypes.objectOf(Object).isRequired,
  articleAction: PropTypes.string.isRequired,
};
