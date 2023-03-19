import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Share,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import Size from 'ca-config/Size';
import {
  DEEPLINK_PREFIX_LIFETAG,
  NAVIGATION,
  RESPONSE_STATE,
  TYPE,
} from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import Base15 from 'ca-component-container/Base15';
import Dash from 'react-native-dash';
import { ArrowDown2, ShareIcon } from 'ca-config/Svg';
import { formatCurrency } from 'ca-util/numbro';
import {
  GET_LIFETAG_PRODUCT_DETAIL_FAILED,
  GET_LIFETAG_PRODUCT_DETAIL_SUCCESS,
  SET_LIFETAG_ORDERNO_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import { GET_CURRENT_SUBS_SUCCESS } from 'ca-module-lifesaver/lifesaverConstant';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
import ListAccordion from 'ca-component-card/ListAccordion';
import {
  CircleAmbulance,
  Fisioterapi,
  HitByCar,
  lifeSAVERwhite,
  LifetagHookDisable,
  SportAccident,
} from 'ca-config/Image';
import axios from 'axios';
import Shadow from 'ca-component-container/Shadow';
import BottomSheet from 'ca-component-container/BottomSheet';
import { useIsFocused } from '@react-navigation/native';
import { useMount } from 'ca-util/common';
import style from './style';
import locale from './locale';
import ColorList from './ColorList';

function LifetagDetailProduct(props) {
  const {
    navigation,
    lang,
    // eslint-disable-next-line no-unused-vars
    colorScheme,
    setLoading,
    lifetagAction,
    getLifetagProductDetail,
    getLifetagProductDetailResponse,
    getLifetagProductDetailFailed,
    setLifetagTempState,
    setLifetagTempStateClear,
    lifetagTempState,
    setLifetagOrderNo,
    setIsComingFromDeepLink,
    isComingFromDeepLink,
    setIsComingFromScreen,
    userData,
    getCurrentSubs,
    getCurrentSubsResponse,
    width,
    lifesaverAction,
    getCurrentSubsClear,
  } = props;

  moment.locale(lang);

  const onViewRef = useRef((viewableItems) => {
    const { index } = viewableItems?.changed[0];
    setImgActive(index);
  });

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const [imgActive, setImgActive] = useState(0);
  const [isStockOutModal, setIsStockOutModal] = useState(false);

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

  const list = useRef(null);
  const firstUpdate = useRef(true);
  const isFocused = useIsFocused();

  const productDetail = useMemo(() => {
    return getLifetagProductDetailResponse?.data?.product;
  }, [getLifetagProductDetailResponse?.data?.product]);

  const isDisabled = useMemo(() => {
    const filterResult = productDetail?.colourList?.filter(
      (i) =>
        !lifetagTempState?.tempOrder?.some(
          (b) => b?.lifetagColorId === i?.id
        ) && i?.stock > 0
    );
    if (filterResult?.length === 0) {
      return true;
    }
  }, [lifetagTempState?.tempOrder, productDetail?.colourList]);

  const paymentTotalDiscount = useMemo(() => {
    return lifetagTempState?.tempOrder?.reduce(
      (acc, i) => acc + i.totalDiscount,
      0
    );
  }, [lifetagTempState?.tempOrder]);

  const paymentTotalPrice = useMemo(() => {
    return lifetagTempState?.tempOrder?.reduce(
      (acc, i) => acc + i.totalPrice,
      0
    );
  }, [lifetagTempState?.tempOrder]);

  useMount(() => {
    if (isComingFromDeepLink && userData?.userId === '') {
      setIsComingFromScreen({
        screen: NAVIGATION.LIFETAG.LifetagDetailProduct,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
      });
    }
  });

  useEffect(() => {
    setLoading(true);
    getLifetagProductDetail({
      id: '7771ea34-24fc-4744-aae8-6850899a1d6d',
      lang,
    });
    if (isFocused && userData?.userId !== '') {
      getCurrentSubs();
    }
  }, [
    getCurrentSubs,
    getLifetagProductDetail,
    isFocused,
    lang,
    setLoading,
    userData?.userId,
  ]);

  useEffect(() => {
    if (!isFocused && userData?.userId !== '') {
      getCurrentSubsClear();
    }
  }, [getCurrentSubsClear, isFocused, userData?.userId]);

  useEffect(() => {
    const goTo = () => {
      if (navigation.canGoBack()) {
        navigation.pop();
        setLifetagTempStateClear();
        setIsComingFromDeepLink(false);
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: NAVIGATION.TABMAIN.TabMain,
            },
          ],
        });
        setLifetagTempStateClear();
        setIsComingFromDeepLink(false);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromDeepLink, setLifetagTempStateClear]);

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  useEffect(() => {
    lifesaverResultAction(lifesaverAction);
  }, [lifesaverAction, lifesaverResultAction]);

  const lifesaverResultAction = useCallback(
    (act) => {
      if (act === GET_CURRENT_SUBS_SUCCESS) {
        if (isComingFromDeepLink && userData?.userId !== '') {
          if (
            !getCurrentSubsResponse?.isSubscribe ||
            !userData?.alreadyKYC ||
            getCurrentSubsResponse?.planName === ''
          ) {
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.LIFETAG.LifetagLanding }],
            });
          }
        }
      }
    },
    [
      getCurrentSubsResponse?.isSubscribe,
      getCurrentSubsResponse?.planName,
      isComingFromDeepLink,
      navigation,
      userData?.alreadyKYC,
      userData?.userId,
    ]
  );

  const lifetagResultAction = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PRODUCT_DETAIL_SUCCESS) {
        setLoading(false);
        if (firstUpdate.current) {
          firstUpdate.current = false;
          const res = getLifetagProductDetailResponse?.data?.product;
          const filterResult = res?.colourList?.filter((item) => {
            if (item?.stock !== 0) {
              return item;
            }
          });
          if (filterResult?.length !== 0) {
            setLifetagTempState({
              tempOrder: [
                {
                  productId: res?.id,
                  productName: res?.name,
                  lifetagColor: filterResult[0]?.codeList[0],
                  lifetagColorId: filterResult[0]?.id,
                  lifetagColorName: filterResult[0]?.name,
                  lifetagProductImg: filterResult[0]?.productImage,
                  productQty: 1,
                  totalPrice: res?.price * 1,
                  totalDiscount: res?.discount * 1,
                },
              ],
            });
          } else {
            setIsStockOutModal(true);
          }
          return;
        }
      }
      if (act === GET_LIFETAG_PRODUCT_DETAIL_FAILED) {
        setLoading(false);
        if (
          getLifetagProductDetailFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert(getLifetagProductDetailFailed?.message);
        }
      }
      if (act === SET_LIFETAG_ORDERNO_SUCCESS) {
        setLoading(false);
        navigation.navigate(NAVIGATION.LIFETAG.LifetagConfirmation, {
          data: lifetagTempState?.tempOrder,
        });
      }
    },
    [
      setLoading,
      getLifetagProductDetailResponse?.data?.product,
      setLifetagTempState,
      getLifetagProductDetailFailed?.message,
      navigation,
      lifetagTempState?.tempOrder,
    ]
  );

  const getShortLink = async () => {
    const linkPrefix = {
      '': `https://life.id/lifetagdetailproduct${
        DEEPLINK_PREFIX_LIFETAG[Platform.OS][TYPE]
      }`,
      '-uat': `https://uat.life.id/lifetagdetailproduct${
        DEEPLINK_PREFIX_LIFETAG[Platform.OS][TYPE]
      }`,
      '-dev': `https://dev.life.id/lifetagdetailproduct${
        DEEPLINK_PREFIX_LIFETAG[Platform.OS][TYPE]
      }`,
    };
    const shortPrefix = `https://lifecustomer.page.link/?link=${linkPrefix[TYPE]} `;

    const resultShortLink = `${shortPrefix}&st=${productDetail?.shortLinkTitle}&sd=${productDetail?.shortLinkDescription}&si=${productDetail?.shortLinkImage}`;

    try {
      const bodyReq = {
        longDynamicLink: `${resultShortLink}`,
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
  };

  const onShare = async () => {
    try {
      const shortLink = await getShortLink();
      const result = await Share.share({
        message: trans(locale, lang, `${shortLink}`),
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

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity style={style.pR16} onPress={onShare}>
        <ShareIcon fill={Color.main.light.black} />
      </TouchableOpacity>
    );
  }

  function renderSlider() {
    const onRender = ({ item }) => {
      return (
        <Image
          resizeMode="cover"
          source={{ uri: item?.imageUrl }}
          style={[style.renderSlider.imgSize, { width }]}
        />
      );
    };

    return (
      <View>
        <FlatList
          ref={list}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          data={productDetail?.bannerList}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          keyExtractor={(item) => item?.id}
          renderItem={onRender}
        />
        <View style={style.renderSlider.floatingWhiteBoxContainer}>
          <Text
            style={style.renderSlider.textWhiteBox}
            textStyle="semi"
            size={Size.text.caption1.size}
            line={14.63}>
            {imgActive + 1}/{productDetail?.bannerList?.length}
          </Text>
        </View>
        <View style={style.renderSlider.dotContainer}>
          {productDetail?.bannerList?.map((item, index) => {
            return (
              <Text
                key={item?.id}
                style={
                  imgActive === index
                    ? style.renderSlider.dotActive
                    : style.renderSlider.dotInActive
                }>
                ●
              </Text>
            );
          })}
        </View>
      </View>
    );
  }

  function renderPriceQty() {
    return (
      <Padder style={style.mT24}>
        <View style={style.renderPriceQty.textLifetagEmergencyContainer}>
          {productDetail?.isNew && (
            <View style={style.renderPriceQty.textNewContainer}>
              <Text
                color={Color.main.light.white}
                textStyle="medium"
                size={Size.text.caption1.size}
                line={14.63}>
                {trans(locale, lang, 'new')}
              </Text>
            </View>
          )}
        </View>
        <Text textStyle="bold" size={Size.text.h6.size} line={27}>
          {productDetail?.name}
        </Text>
        <View style={style.renderPriceQty.priceStrikeThroughContainer}>
          {productDetail?.discount === 0 ? null : (
            <Text
              color={Color.lifetagGreyText.light.color}
              textStyle="medium"
              size={Size.text.caption1.size}
              line={14.63}
              textDecorationLine="line-through"
              textDecorationStyle="solid">
              {
                // eslint-disable-next-line prefer-template
                'Rp' +
                  formatCurrency({
                    value: productDetail?.price,
                    mantissa: 0,
                  }) +
                  ',-'
              }
            </Text>
          )}
        </View>
        <View style={style.renderPriceQty.priceContainer}>
          <Text
            textStyle="semi"
            size={Size.text.h6.size + 2}
            line={21.94}
            color={Color.primary.light.primary90}>
            {
              // eslint-disable-next-line prefer-template
              'Rp' +
                formatCurrency({
                  value: productDetail?.price - (productDetail?.discount || 0),
                  mantissa: 0,
                }) +
                ',-'
            }
          </Text>
        </View>
        <View style={style.renderPriceQty.deskripsiContainer}>
          <Text style={style.mB10} textStyle="medium" line={17.07}>
            {trans(locale, lang, 'deskripsi')} :
          </Text>
          <RenderHTML
            baseStyle={htmlBaseStyle}
            systemFonts={systemFonts}
            contentWidth={Size.screen.width}
            source={{
              html: productDetail?.description,
            }}
          />
        </View>
      </Padder>
    );
  }

  function renderProductColor() {
    const currentStockList = productDetail?.colourList?.filter((i) => {
      return i?.stock > 0;
    });

    return (
      <View style={style.mB32}>
        {lifetagTempState?.tempOrder?.map((item, index) => {
          const isColorDisabled = ({ color, colorIndex }) => {
            const isColorSelected = lifetagTempState?.tempOrder?.find((i) => {
              return color?.id === i?.lifetagColorId;
            });
            const isColorSelectedNow =
              lifetagTempState?.tempOrder[colorIndex]?.lifetagColorId !==
              color?.id;
            return isColorSelected && isColorSelectedNow;
          };
          const onColorPress = ({ color, colorIndex, price, discount }) => {
            const filterResult = lifetagTempState?.tempOrder?.filter((i) => {
              return color?.id === i?.lifetagColorId;
            });
            const isIndexBanner = productDetail?.bannerList?.findIndex((b) => {
              return b?.position === color?.bannerPosition;
            });
            if (color?.stock === 0) {
              setIsStockOutModal(true);
            } else if (filterResult?.length === 0) {
              const tempArray = [...lifetagTempState?.tempOrder];
              tempArray[colorIndex] = {
                ...tempArray[colorIndex],
                lifetagColorId: color?.id,
                lifetagColor: color?.codeList?.join(' '),
                lifetagColorName: color?.name,
                lifetagProductImg: color?.productImage,
                productQty: 1,
                totalPrice: price,
                totalDiscount: discount,
              };
              list.current.scrollToIndex({
                animated: true,
                index: isIndexBanner,
              });
              setLifetagTempState({
                ...lifetagTempState,
                tempOrder: tempArray,
              });
            }
          };
          const onPlusQtyPress = ({ qty, colorIndex, price, discount }) => {
            const filterResult = productDetail?.colourList?.filter((i) => {
              return i?.id === item?.lifetagColorId;
            });
            if (item?.productQty < filterResult[0]?.stock) {
              const tempArray = [...lifetagTempState?.tempOrder];
              tempArray[colorIndex] = {
                ...tempArray[colorIndex],
                productQty: qty + 1,
                totalPrice: price * (qty + 1),
                totalDiscount: discount * (qty + 1),
              };
              setLifetagTempState({
                ...lifetagTempState,
                tempOrder: tempArray,
              });
            }
          };
          const onMinusQtyPress = ({ qty, colorIndex, price, discount }) => {
            if (qty - 1 < 1) {
              if (colorIndex !== 0) {
                const tempArray = [...lifetagTempState?.tempOrder];
                tempArray.splice(colorIndex, 1);
                setLifetagTempState({
                  ...lifetagTempState,
                  tempOrder: tempArray,
                });
                const tempArrays = [...lifetagTempState?.tempOrder];
                const findBannerPosition = productDetail?.colourList?.find(
                  (b) => {
                    return b?.id === tempArrays[colorIndex - 1].lifetagColorId;
                  }
                );
                const isIndexBanner = productDetail?.bannerList?.findIndex(
                  (c) => {
                    return c?.position === findBannerPosition?.position;
                  }
                );
                list.current.scrollToIndex({
                  animated: true,
                  index:
                    isIndexBanner < productDetail?.bannerList?.length - 1
                      ? isIndexBanner + 1
                      : isIndexBanner,
                });
              }

              return;
            }
            const tempArray = [...lifetagTempState?.tempOrder];
            tempArray[colorIndex] = {
              ...tempArray[colorIndex],
              productQty: qty - 1,
              totalPrice: price * (qty - 1),
              totalDiscount: discount * (qty - 1),
            };
            setLifetagTempState({ ...lifetagTempState, tempOrder: tempArray });
          };
          return (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              <ColorList
                index={index}
                data={productDetail}
                order={item}
                lang={lang}
                onColorPress={onColorPress}
                onPlusQtyPress={onPlusQtyPress}
                onMinusQtyPress={onMinusQtyPress}
                disabled={
                  currentStockList?.length ===
                  lifetagTempState?.tempOrder?.length
                }
                isColorDisabled={isColorDisabled}
              />
            </View>
          );
        })}
        <Padder style={style.mT24}>
          {!isDisabled && (
            <>
              <Dash
                dashGap={0}
                dashColor={Color.lifetagDetailPagesLineColor.light.color}
              />

              <Text
                disabled={isDisabled}
                onPress={() => {
                  const filterResult = productDetail?.colourList?.find(
                    (i) =>
                      !lifetagTempState?.tempOrder?.some(
                        (b) => b?.lifetagColorId === i?.id
                      ) && i?.stock > 0
                  );
                  if (filterResult?.stock !== 0) {
                    const findBannerPosition = productDetail?.colourList?.find(
                      (b) => {
                        return b?.id === filterResult?.id;
                      }
                    );

                    const isIndexBanner = productDetail?.bannerList?.findIndex(
                      (c) => {
                        return c?.position === findBannerPosition?.position;
                      }
                    );
                    const tempOrder = [...lifetagTempState?.tempOrder];
                    tempOrder.push({
                      productId: productDetail?.id,
                      productName: productDetail?.name,
                      lifetagColor: filterResult?.codeList?.join(' '),
                      lifetagColorId: filterResult?.id,
                      lifetagColorName: filterResult?.name,
                      lifetagProductImg: filterResult?.productImage,
                      productQty: 1,
                      totalPrice: productDetail?.price * 1,
                      totalDiscount: productDetail?.discount * 1,
                    });

                    list.current.scrollToIndex({
                      animated: true,
                      index:
                        isIndexBanner < productDetail?.bannerList?.length - 1
                          ? isIndexBanner + 1
                          : isIndexBanner,
                    });

                    setLifetagTempState({
                      ...lifetagTempState,
                      tempOrder,
                    });
                  } else {
                    setIsStockOutModal(true);
                  }
                }}
                style={style.pV8}
                textStyle="semi"
                line={23.8}
                align="center"
                color={Color.primary.light.primary90}>
                {trans(locale, lang, 'tambahLainnya')} +
              </Text>
              <Dash
                dashGap={0}
                dashColor={Color.lifetagDetailPagesLineColor.light.color}
              />
            </>
          )}
        </Padder>
      </View>
    );
  }

  function renderContent() {
    return (
      <Padder>
        <View>
          <Text textStyle="semi" size={Size.text.body1.size} line={17.07}>
            {trans(locale, lang, 'informasiProduk')}
          </Text>
        </View>
        <View style={style.renderContent.weightContainer}>
          <Text textStyle="medium" line={17.07}>
            {trans(locale, lang, 'weight')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={14.63}
            color={Color.lifetagGreyText.light.color}>
            {productDetail?.weight} g
          </Text>
        </View>
        <View style={style.renderContent.kompatibelContainer}>
          <Text textStyle="medium" line={17.07}>
            {trans(locale, lang, 'kompatibelDengan')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={14.63}
            color={Color.lifetagGreyText.light.color}>
            {productDetail?.compatibility}
          </Text>
        </View>
      </Padder>
    );
  }

  function renderFooter() {
    return (
      <View style={style.mB10}>
        <Padder style={[style.bGColor, style.pV8, style.mT16]}>
          <Shadow borderRadius={13}>
            <View style={style.pB10}>
              <LinearGradient
                style={style.renderFooter.lifeSAVERwhiteContainer}
                colors={[
                  Color.buttonGradient.light.buttonGradient0,
                  Color.buttonGradient.light.buttonGradient1,
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <Image
                  source={lifeSAVERwhite}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 113, height: 21 }}
                  resizeMode="contain"
                />
              </LinearGradient>
              <View
                style={[
                  style.renderFooter.hitbyCar.hitbyCarContainer,
                  style.pT10,
                ]}>
                <Image
                  style={style.renderFooter.hitbyCar.mH16}
                  source={HitByCar}
                />
                <View
                  style={{
                    width: Size.screen.width - 150,
                  }}>
                  <Text
                    style={style.mB5}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, 'proteksiMedisAkibat')}
                  </Text>
                  <Text
                    size={Size.text.body2.size}
                    textStyle="medium"
                    line={22}
                    color={Color.mediumGray.light.mediumGray}>
                    {trans(locale, lang, 'totalMaksimumBiaya')}{' '}
                    <Text
                      color={Color.primary.light.primary90}
                      size={Size.text.body2.size}
                      textStyle="semi">
                      {trans(locale, lang, 'duaRatusJuta')}
                    </Text>
                    <Text
                      textStyle="medium"
                      color={Color.mediumGray.light.mediumGray}>
                      {' '}
                      {trans(locale, lang, 'denganInnerLimit')}{' '}
                      <Text
                        fontStyle={lang === 'id' && 'italic'}
                        textStyle="medium"
                        color={Color.mediumGray.light.mediumGray}>
                        {trans(locale, lang, 'cashless')}
                      </Text>{' '}
                      <Text
                        textStyle="medium"
                        color={Color.mediumGray.light.mediumGray}>
                        {trans(locale, lang, 'atau')}
                      </Text>{' '}
                      <Text
                        fontStyle={lang === 'id' && 'italic'}
                        textStyle="medium"
                        color={Color.mediumGray.light.mediumGray}>
                        {trans(locale, lang, 'reimbursement')}
                      </Text>
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {trans(locale, lang, '*')}
                      </Text>
                      .
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <ListAccordion
              headerActiveBottom
              touchableType="opacity"
              header={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi"
                  style={style.mB8}>
                  {trans(locale, lang, 'lihatManfaatLainnya')}
                </Text>
              }
              headerActive={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi"
                  style={style.mB8}>
                  {trans(locale, lang, 'lihatLebihSedikit')}
                </Text>
              }
              suffixIcon={<ArrowDown2 />}>
              <View style={style.renderFooter.ListAccordion.pV12}>
                <Dash
                  dashGap={0}
                  dashThickness={1}
                  dashColor={Color.neutral.dark.neutral20}
                />
                <View style={style.renderFooter.ListAccordion.cardContainer}>
                  <Image
                    style={style.renderFooter.ListAccordion.mH16}
                    source={SportAccident}
                  />
                  <View style={style.fS1}>
                    <Text
                      style={style.renderFooter.ListAccordion.mB5}
                      size={Size.text.body2.size}
                      textStyle="semi">
                      {trans(locale, lang, 'proteksiMedisCedera')}
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {trans(locale, lang, '**')}
                      </Text>
                    </Text>
                    <Text
                      size={Size.text.body2.size}
                      textStyle="medium"
                      line={22}
                      color={Color.mediumGray.light.mediumGray}>
                      {lang === 'id' ? trans(locale, lang, 'sebesar') : ''}
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {trans(locale, lang, 'duaPuluhJuta')}
                      </Text>
                      , {trans(locale, lang, 'hanyaDapatDilakukan1')}{' '}
                      <Text
                        fontStyle={lang === 'id' && 'italic'}
                        textStyle="medium"
                        color={Color.mediumGray.light.mediumGray}>
                        {trans(locale, lang, 'cashless')}
                      </Text>
                    </Text>
                  </View>
                </View>
                <Dash
                  dashGap={0}
                  dashThickness={1}
                  dashColor={Color.neutral.dark.neutral20}
                />
                <View style={style.renderFooter.ListAccordion.cardContainer}>
                  <Image
                    style={style.renderFooter.ListAccordion.mH16}
                    source={Fisioterapi}
                  />
                  <View style={style.fS1}>
                    <Text
                      style={style.renderFooter.ListAccordion.mB5}
                      size={Size.text.body2.size}
                      textStyle="semi">
                      {trans(locale, lang, 'fisioterapi')}
                    </Text>
                    <Text
                      size={Size.text.body2.size}
                      textStyle="medium"
                      line={22}
                      color={Color.mediumGray.light.mediumGray}>
                      {trans(locale, lang, 'akibatCederaOlahraga')}
                      <Text
                        color={Color.primary.light.primary90}
                        size={Size.text.body2.size}
                        textStyle="semi">
                        {' '}
                        {trans(locale, lang, 'sepuluhJuta')}{' '}
                      </Text>
                      {trans(locale, lang, 'hanyaDapatDilakukan2')}{' '}
                      <Text
                        fontStyle={lang === 'id' && 'italic'}
                        textStyle="medium"
                        color={Color.mediumGray.light.mediumGray}>
                        {trans(locale, lang, 'cashless')}
                      </Text>
                    </Text>
                  </View>
                </View>
                <Dash
                  dashGap={0}
                  dashThickness={1}
                  dashColor={Color.neutral.dark.neutral20}
                />
                <View style={style.renderFooter.ListAccordion.cardContainer}>
                  <Image
                    style={style.renderFooter.ListAccordion.mH16}
                    source={CircleAmbulance}
                  />
                  <View style={style.fS1}>
                    <Text
                      style={style.renderFooter.ListAccordion.mB5}
                      size={Size.text.body2.size}
                      textStyle="semi">
                      {trans(locale, lang, 'transportasiMedis')}
                    </Text>
                    <Text
                      size={Size.text.body2.size}
                      textStyle="medium"
                      line={22}
                      color={Color.mediumGray.light.mediumGray}>
                      {trans(locale, lang, 'evakuasiCepatDengan')}
                    </Text>
                  </View>
                </View>
                <Dash
                  dashGap={0}
                  dashThickness={1}
                  dashColor={Color.neutral.dark.neutral20}
                />
              </View>
              <View style={style.pH16}>
                <Text
                  onPress={() => {
                    navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay);
                  }}
                  line={24}
                  size={Size.text.caption1.size}
                  color={Color.primary.light.primary90}
                  textDecorationLine="underline"
                  textStyle="semi"
                  style={style.mB16}>
                  {trans(locale, lang, 'lihatRingkasanInformasi')}
                </Text>
                <Text
                  line={24}
                  size={Size.text.caption2.size}
                  textStyle="regular"
                  style={style.fontStyleItalic}
                  color={Color.mediumGray.light.mediumGray}>
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.caption2.size}
                    textStyle="regular"
                    style={style.fontStyleItalic}>
                    {trans(locale, lang, '*')}
                  </Text>
                  {trans(locale, lang, 'berlakuInnerLimit')}
                </Text>
                <Text
                  line={24}
                  size={Size.text.caption2.size}
                  textStyle="regular"
                  style={[style.fontStyleItalic, style.mB16]}
                  color={Color.mediumGray.light.mediumGray}>
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.caption2.size}
                    textStyle="regular"
                    style={style.fontStyleItalic}>
                    {trans(locale, lang, '**')}
                  </Text>
                  {trans(locale, lang, 'selamaPeriodePromosi')}
                </Text>
              </View>
            </ListAccordion>
          </Shadow>
        </Padder>
      </View>
    );
  }

  function renderTotal() {
    return (
      <Padder style={style.mT32}>
        <View style={style.renderTotal.totalPayment}>
          <Text textStyle="semi" line={30.8}>
            {trans(locale, lang, 'ringkasanPembayaran')}
          </Text>
        </View>
        {lifetagTempState?.tempOrder?.map((item) => {
          return (
            <View style={style.renderTotal.productPrice}>
              <View style={style.renderTotal.summaryContainer}>
                <View style={style.flex}>
                  <Text
                    textStyle="medium"
                    line={24}
                    size={Size.text.caption2.size}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {item?.productName?.slice(0, 7)} - {item?.lifetagColorName}
                  </Text>
                </View>
                <Text
                  color={Color.lifetagGreyText.light.color}
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  line={14.63}
                  textDecorationLine="line-through"
                  textDecorationStyle="solid">
                  {
                    // eslint-disable-next-line prefer-template
                    'Rp' +
                      formatCurrency({
                        value: item?.totalPrice,
                        mantissa: 0,
                      }) +
                      ',-'
                  }{' '}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  line={24}
                  color={Color.neutralLifeSaver.light.neutral40}>
                  {
                    // eslint-disable-next-line prefer-template
                    'Rp' +
                      formatCurrency({
                        value: item?.totalPrice - item?.totalDiscount,
                        mantissa: 0,
                      }) +
                      ',-'
                  }
                </Text>
              </View>
            </View>
          );
        })}
        {paymentTotalDiscount === 0 ? null : (
          <View style={style.renderTotal.promo}>
            <Text
              textStyle="medium"
              line={24}
              size={Size.text.caption2.size}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'diskon')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption2.size}
              line={24}
              color={Color.neutralLifeSaver.light.neutral40}>
              -
              {
                // eslint-disable-next-line prefer-template
                'Rp' +
                  formatCurrency({
                    value: paymentTotalDiscount,
                    mantissa: 0,
                  }) +
                  ',-'
              }
            </Text>
          </View>
        )}
      </Padder>
    );
  }

  function renderButton() {
    let isDisable = false;

    if (productDetail?.stock < 1) {
      isDisable = true;
    }

    const onBtnPress = () => {
      if (
        !getCurrentSubsResponse?.isSubscribe ||
        !userData?.alreadyKYC ||
        getCurrentSubsResponse?.planName === ''
      ) {
        navigation.navigate(NAVIGATION.LIFETAG.LifetagLanding);
      } else {
        setLoading(true);
        setLifetagOrderNo();
      }
    };

    return (
      <Padder style={style.pB48}>
        <View style={style.renderButton.textContainer}>
          <Text
            size={Size.text.body2.size}
            textStyle="semi"
            line={30.8}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'total')}
          </Text>
          <Text
            textStyle="semi"
            line={29}
            size={Size.text.h6.size + 2}
            color={Color.greenActive.light.color}>
            {paymentTotalPrice - paymentTotalDiscount === 0
              ? trans(locale, lang, 'free')
              : // eslint-disable-next-line prefer-template
                'Rp' +
                formatCurrency({
                  value: paymentTotalPrice - paymentTotalDiscount,
                  mantissa: 0,
                }) +
                ',-'}
          </Text>
        </View>
        {paymentTotalDiscount === 0 ? null : (
          <Text
            align="right"
            style={style.mB8}
            color={Color.lifetagGreyText.light.color}
            textStyle="medium"
            size={Size.text.h6.size}
            line={29}
            textDecorationLine="line-through"
            textDecorationStyle="solid">
            {
              // eslint-disable-next-line prefer-template
              'Rp' +
                formatCurrency({
                  value: paymentTotalPrice,
                  mantissa: 0,
                }) +
                ',-'
            }{' '}
          </Text>
        )}
        <Button onPress={onBtnPress} disabled={isDisable}>
          {trans(locale, lang, 'beliSekarang')}
        </Button>
      </Padder>
    );
  }

  function renderStockOutModal() {
    return (
      <BottomSheet isVisible={isStockOutModal} swipeable={false}>
        <View style={style.renderStockOutModal.container}>
          <Image
            source={LifetagHookDisable}
            style={style.renderStockOutModal.imgSize}
          />
          <View>
            <Text
              align="center"
              textStyle="bold"
              size={Size.text.h6.size - 1}
              line={27}>
              {trans(locale, lang, 'maafStokLifeTag')}
            </Text>
            <View style={style.renderStockOutModal.textContentContainer}>
              <Text
                align="center"
                textStyle="regular"
                color={Color.neutralLifeSaver.light.neutral40}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'kamiAkanMemberi')}
              </Text>
            </View>
          </View>
          <Button
            block
            onPress={() => {
              setIsStockOutModal(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base15
      isBackground={false}
      onBackPress={() => {
        if (navigation.canGoBack()) {
          navigation.pop();
          setLifetagTempStateClear();
          setIsComingFromDeepLink(false);
        } else {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: NAVIGATION.TABMAIN.TabMain,
              },
            ],
          });
          setLifetagTempStateClear();
          setIsComingFromDeepLink(false);
        }
      }}
      title={trans(locale, lang, 'lifetag')}
      rightHeaderContent={renderRightHeaderContent()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSlider()}
        {renderPriceQty()}
        {renderProductColor()}
        {renderContent()}
        {renderFooter()}
        {renderTotal()}
      </ScrollView>
      {renderButton()}
      {renderStockOutModal()}
    </Base15>
  );
}

export default LifetagDetailProduct;

LifetagDetailProduct.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getLifetagProductDetail: PropTypes.func.isRequired,
  getLifetagProductDetailResponse: PropTypes.objectOf(Object).isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagProductDetailFailed: PropTypes.objectOf(Object).isRequired,
  setLifetagTempState: PropTypes.func.isRequired,
  setLifetagTempStateClear: PropTypes.func.isRequired,
  lifetagTempState: PropTypes.objectOf(Object).isRequired,
  setLifetagOrderNo: PropTypes.func.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  setIsComingFromDeepLink: PropTypes.func.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  getCurrentSubsClear: PropTypes.func.isRequired,
};
