/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Share,
  Alert,
  Animated,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import PropTypes from 'prop-types';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { Shadow } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import Text from 'ca-component-generic/Text';
import {
  ArrowDown2,
  ArrowDown2Black,
  ArrowDown2White,
  BtnBack,
  Call,
  Direction,
  EmptyCalendar,
  PinLoc,
  ShareIcon,
  SmallClock,
  Wave,
} from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import ListAccordion from 'ca-component-card/ListAccordion';
import {
  CircleAmbulance,
  Fisioterapi,
  HitByCar,
  lifeSAVERwhite,
  SportAccident,
} from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import Dash from 'react-native-dash';
import {
  NAVIGATION,
  APP,
  TYPE,
  DEEPLINK_PREFIX,
  RESPONSE_STATE,
} from 'ca-util/constant';
import {
  GET_EVENT_DETAIL_FAILED,
  GET_EVENT_DETAIL_SUCCESS,
  SET_EVENT_BUYTICKET_FAILED,
} from 'ca-module-event/eventConstant';
import {
  GET_IS_USER_ELIGIBLE_FAILED,
  SET_PERSON_ELIGIBLE_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import { formatCurrency } from 'ca-util/numbro';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GET_UPDATA_LAST_KTP_INFO_FAILED,
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
} from 'ca-module-updata/updataConstant';
import Input from 'ca-component-generic/Input';
import BottomSheet from 'ca-component-container/BottomSheet';
import LinearGradient from 'react-native-linear-gradient';
import { getIsUserEligibleApi } from 'ca-module-lifesaver/lifesaverApi';
import {
  setEventBuyTicketApi,
  setValidateAccessCodeApi,
} from 'ca-module-event/eventApi';
import _ from 'lodash';
import axios from 'axios';
import {
  AFLogEvent,
  AF_REGISTER_BUTTON,
  AF_SHARE_BUTTON,
} from 'ca-util/AppsFlyer';
import locale from './locale';
import style from './style';

function EventDetail(props) {
  const {
    navigation,
    lang,
    width,
    route: { params },
    getEventDetail,
    setEventDetailData,
    getEventDetailClear,
    getEventDetailResponse,
    eventAction,
    userData,
    lifesaverAction,
    getIsUserEligible,
    setPersonEligible,
    getIsUserEligibleClear,
    setPersonEligibleClear,
    getUpdataLastKTPInfo,
    getUpdataLastKTPInfoResponse,
    setLoading,
    updataAction,
    setIsComingFromScreen,
    isComingFromScreen,
    setEventBuyTicketFailed,
    setEventBuyTicketClear,
    getPoliciesResponse,
    getEventDetailData,
    getCurrentSubs,
    getCurrentSubsResponse,
    setEventBuyTicket,
  } = props;
  const routeNameRef = React.useRef();
  routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  moment.locale(lang);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const currentRouteName = navigationRef.current.getCurrentRoute().name;
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

  const [imgActive, setImgActive] = useState(0);
  const [isEventCodeModal, setIsEventCodeModal] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState();
  const [accessCode, setAccessCode] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
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
    li: { marginLeft: 8, marginBottom: 6 },
  };
  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setIsComingFromScreen({});
      setEventBuyTicketClear();
      getEventDetailClear();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [
    getEventDetailClear,
    navigation,
    setEventBuyTicketClear,
    setIsComingFromScreen,
  ]);
  useEffect(() => {
    if (isFocused) {
      if (
        params !== undefined ||
        Object.keys(isComingFromScreen).length > 0 ||
        !_.isEmpty(getEventDetailData)
      ) {
        if (!isEventCodeModal) {
          setLoading(true);
          getEventDetail({
            slugId:
              params?.slugId ||
              isComingFromScreen?.params?.slugId ||
              getEventDetailData?.slugId,
            eventId:
              params?.id ||
              isComingFromScreen?.params?.eventId ||
              getEventDetailData?.eventId,
            lang,
            userId: userData?.userId,
            accessCode:
              params?.accessCode ||
              isComingFromScreen?.params?.accessCode ||
              getEventDetailData?.accessCode,
          });
        }
      }
      if (userData?.userId !== '' && userData?.alreadyKYC) {
        if (!isEventCodeModal) {
          getUpdataLastKTPInfo({ category: 'reminder' });
          getCurrentSubs();
        }
      }
    }
  }, [
    getCurrentSubs,
    getEventDetail,
    getEventDetailData,
    getUpdataLastKTPInfo,
    isComingFromScreen,
    isEventCodeModal,
    isFocused,
    lang,
    params,
    setLoading,
    userData?.alreadyKYC,
    userData?.userId,
  ]);

  useEffect(() => {
    if (params !== undefined) {
      setEventDetailData({
        eventId: params?.id,
        slugId: params?.slugId,
        channel: getEventDetailResponse?.data?.eventCode,
        accessCode: params?.accessCode,
      });
    }
  }, [
    getEventDetailResponse?.data?.eventCode,
    params,
    params?.accessCode,
    params?.slugId,
    setEventDetailData,
  ]);
  useEffect(() => {
    eventDetailResult(eventAction);
  }, [eventAction, eventDetailResult]);

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverAction, lifesaverResult]);

  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  useEffect(() => {
    if (!isFocused) {
      getIsUserEligibleClear();
      setPersonEligibleClear();
    }
  }, [
    getEventDetailClear,
    getIsUserEligibleClear,
    isFocused,
    setPersonEligibleClear,
  ]);

  const eventDetailResult = useCallback(
    (act) => {
      if (act === GET_EVENT_DETAIL_SUCCESS) {
        setLoading(false);
        if (getUpdataLastKTPInfoResponse?.data && userData?.userId !== '') {
          setLoading(false);
          // getIsUserEligible();
        }
      }
      if (act === GET_EVENT_DETAIL_FAILED) {
        setLoading(false);
      }
      if (act === SET_EVENT_BUYTICKET_FAILED) {
        setLoading(false);
        if (
          setEventBuyTicketFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          if (
            setEventBuyTicketFailed?.message === RESPONSE_STATE.ALREADY_BOUGHT
          ) {
            // setIsComingFromScreen({});
          }
        }
      }
    },
    [
      getUpdataLastKTPInfoResponse?.data,
      setEventBuyTicketFailed?.message,
      setLoading,
      userData?.userId,
    ]
  );

  const lifesaverResult = useCallback(
    (act) => {
      if (act === GET_IS_USER_ELIGIBLE_FAILED) {
        setPersonEligible({
          channel: getEventDetailResponse?.data?.eventCode,
          data: [
            {
              name: getUpdataLastKTPInfoResponse?.data?.name,
              phoneNo: userData?.mobilePhoneNumber,
              email: userData?.email || null,
              dob: getUpdataLastKTPInfoResponse?.data?.dob,
            },
          ],
        });
      }
      if (act === SET_PERSON_ELIGIBLE_SUCCESS) {
        navigation.navigate(NAVIGATION.EVENT.EventSuccess);
      }
    },
    [
      getEventDetailResponse?.data?.eventCode,
      getUpdataLastKTPInfoResponse?.data?.dob,
      getUpdataLastKTPInfoResponse?.data?.name,
      navigation,
      setPersonEligible,
      userData?.email,
      userData?.mobilePhoneNumber,
    ]
  );

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        if (getEventDetailResponse?.data) {
          setLoading(false);
        }
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_FAILED) {
        setLoading(false);
      }
    },
    [getEventDetailResponse?.data, setLoading]
  );

  function openGps(lat, lng) {
    const scheme = 'https://www.google.com/maps/search/?api=1&query=';
    const url = `${scheme}${lat},${lng}`;
    Linking.openURL(url);
  }

  const getShortLink = async () => {
    const afl = {
      '':
        getEventDetailResponse?.data?.type === 'PRIVATE'
          ? 'https://life.id/event/'
          : `https://life.id/event/detail/${getEventDetailResponse?.data?.slugId}`,
      '-uat':
        getEventDetailResponse?.data?.type === 'PRIVATE'
          ? 'https://uat.life.id/event/'
          : `https://uat.life.id/event/detail/${getEventDetailResponse?.data?.slugId}`,
    };
    const bannerUrl = getEventDetailResponse?.data?.banner?.filter(
      (val) => val?.position === 1
    );

    const deepLink = {
      '': `&apn=id.lifecustomer&isi=1627986095&ibi=id.life.customer&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
      '-uat': `&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat&isi=1627986095&afl=${afl[TYPE]}&ifl=${afl[TYPE]}`,
    };
    const content = `&st=${getEventDetailResponse?.data?.name.replace(
      /&/g,
      'dan'
    )}&sd=Ayo ikut event ${getEventDetailResponse?.data?.name?.replace(
      /&/g,
      'dan'
    )} . Banyak kegiatan seru lho, jangan sampai ketinggalan!.&si=${
      bannerUrl?.[0]?.url
    }`;
    const linkPrefix = {
      '':
        encodeURIComponent(
          getEventDetailResponse?.data?.type === 'PRIVATE'
            ? 'https://life.id/eventlist/'
            : `https://life.id/event/detail/${getEventDetailResponse?.data?.slugId}`
        ) +
        deepLink[TYPE] +
        content,
      '-uat':
        encodeURIComponent(
          getEventDetailResponse?.data?.type === 'PRIVATE'
            ? 'https://uat.life.id/eventlist/'
            : `https://uat.life.id/event/detail/${getEventDetailResponse?.data?.slugId}`
        ) +
        deepLink[TYPE] +
        content,
      '-dev':
        encodeURIComponent(
          `https://dev.life.id/event/detail/${getEventDetailResponse?.data?.slugId}`
        ) +
        deepLink[TYPE] +
        content,
    };
    try {
      const bodyReq = {
        longDynamicLink: `https://qr.life.id/?link=${linkPrefix[TYPE]}`,
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
    const logs = {
      af_user_id: userData?.userId,
      af_channel: Platform.OS,
      af_event_name: getEventDetailResponse?.data?.name,
      af_prev_page: params?.prevScreen,
      af_current_page: currentRouteName,
    };
    AFLogEvent(AF_SHARE_BUTTON, logs);
    try {
      /**
       * Workaround for Linking.getInitialURL() truncating multiple query params
       * We replace '&' with its ASCII value '%26' and bypass its encoding
       */
      const shortLink = await getShortLink();
      // const shortLink = getEventDetailResponse?.data?.shortLink;
      const result = await Share.share({
        message: trans(
          locale,
          lang,
          `Ayo Ikut Event ${getEventDetailResponse?.data?.name}. Banyak kegiatan seru lho, jangan sampai ketinggalan!\n${shortLink}`
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
  const onPressVerifyCode = () => {
    const remainingQuota =
      getEventDetailResponse?.data?.quotaEvent -
        getEventDetailResponse?.data?.userRegistered || 0;
    setIsSubmit(true);
    setValidateAccessCodeApi({
      eventId: getEventDetailData?.eventId,
      accessCode: accessCode,
    })
      .then((res) => {
        if (res) {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          navigation.navigate(NAVIGATION.EVENT.EventConfirmOrder, {
            eventId: getEventDetailResponse?.data?.id,
            type: getEventDetailResponse?.data?.type,
            isEvent: true,
            accessCode: accessCode.length > 0 ? accessCode : params.accessCode,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setIsSubmit(false);
          setCodeErrorMsg({
            error: trans(locale, lang, 'kodeYangKamu'),
          });
        }
      });
    // if (_.isEmpty(getCurrentSubsResponse)) {
    //   if (remainingQuota > 0) {
    //     setEventBuyTicketApi({
    // eventId: getEventDetailData?.eventId,
    // haveLifeSaver: false,
    // accessCode: accessCode,
    //     })
    //       .then(() => {
    //         setIsSubmit(false);
    //         setIsEventCodeModal(false);
    //         setAccessCode('');
    //         setCodeErrorMsg('');
    //         // navigation.navigate(NAVIGATION.EVENT.EventSuccess);
    //         navigation.navigate(NAVIGATION.EVENT.EventConfirmPayment, {
    //           eventId: getEventDetailResponse?.data?.id,
    //         });
    //       })
    //       .catch(() => {
    //         setIsSubmit(false);
    //         setCodeErrorMsg({
    //           error: trans(locale, lang, 'kodeYangKamu'),
    //         });
    //       });
    //   }
    // } else if (remainingQuota > 0) {
    //   setEventBuyTicketApi({
    //     eventId: getEventDetailData?.eventId,
    //     haveLifeSaver: false,
    //     accessCode: accessCode,
    //   })
    //     .then(() => {
    //       setIsSubmit(false);
    //       setIsEventCodeModal(false);
    //       setAccessCode('');
    //       setCodeErrorMsg('');
    //       // navigation.navigate(NAVIGATION.EVENT.EventSuccess);
    //       navigation.navigate(NAVIGATION.EVENT.EventConfirmPayment, {
    //         eventId: getEventDetailResponse?.data?.id,
    //       });
    //     })
    //     .catch(() => {
    //       setIsSubmit(false);
    //       setCodeErrorMsg({
    //         error: trans(locale, lang, 'kodeYangKamu'),
    //       });
    //     });
    // }
  };

  const buttonTitle = useMemo(() => {
    if (!getEventDetailResponse?.data?.closed) {
      if (
        getEventDetailResponse?.data?.alreadyBought ||
        setEventBuyTicketFailed?.message === RESPONSE_STATE.ALREADY_BOUGHT
      ) {
        return trans(locale, lang, 'kamuSudahTerdaftar');
      }
    }
    if (getEventDetailResponse?.data?.closed) {
      return trans(locale, lang, 'eventTelahBerakhir');
    }
    if (getEventDetailResponse?.data?.isClosedRegister) {
      return trans(locale, lang, 'pendaftaranTelahDitutup');
    }
    if (
      getEventDetailResponse?.data?.quotaEvent -
        getEventDetailResponse?.data?.userRegistered <=
      0
    ) {
      return trans(locale, lang, 'ticketSoldout');
    }
    return trans(locale, lang, 'daftar');
  }, [
    getEventDetailResponse?.data?.alreadyBought,
    getEventDetailResponse?.data?.closed,
    getEventDetailResponse?.data?.isClosedRegister,
    getEventDetailResponse?.data?.quotaEvent,
    getEventDetailResponse?.data?.userRegistered,
    lang,
    setEventBuyTicketFailed?.message,
  ]);

  const onPressNotKyc = useCallback(() => {
    const logs = {
      af_user_id: userData?.userId,
      af_channel: Platform.OS,
      af_event_name: getEventDetailResponse?.data?.name,
      af_prev_page: params?.prevScreen,
      af_current_page: currentRouteName,
    };
    AFLogEvent(AF_REGISTER_BUTTON, logs);
    if (userData?.userId === '') {
      setIsComingFromScreen({
        screen: NAVIGATION.EVENT.EventDetail,
        params: {
          eventId: params?.id,
          channel: getEventDetailResponse?.data?.eventCode,
          accessCode: params?.accessCode,
        },
      });
      navigation.navigate(NAVIGATION.LOGIN.LoginMain);
    } else {
      setIsComingFromScreen({
        screen: NAVIGATION.EVENT.EventDetail,
        params: {
          eventId: params?.id,
          channel: getEventDetailResponse?.data?.eventCode,
          accessCode: params?.accessCode,
        },
      });
      setEventDetailData({
        ...getEventDetailData,
        screen: NAVIGATION.EVENT.EventDetail,
      });
      if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
        navigation.navigate(NAVIGATION.KYC.KycMain);
      } else if (userData?.alreadyKYC && !userData?.alreadySetPin) {
        navigation.navigate(NAVIGATION.KYC.KycCreatePin);
      } else if (getEventDetailResponse?.data?.type === 'EXTPUBLIC') {
        navigation.navigate(NAVIGATION.EVENT.EventConfirmPayment, {
          eventId: getEventDetailResponse?.data?.id,
        });
      } else if (getEventDetailResponse?.data?.type === 'SEMIPVT') {
        // Disini harusnya ke confirm payment
        setIsEventCodeModal(true);
      } else {
        setLoading(true);
        getIsUserEligibleApi()
          .then(() => {
            console.log('test');
            setLoading(false);
            // navigation.navigate(NAVIGATION.EVENT.EventSuccess);
            navigation.navigate(NAVIGATION.EVENT.EventConfirmOrder, {
              eventId: getEventDetailResponse?.data?.id,
              type: getEventDetailResponse?.data?.type,
              isEvent: true,
              accessCode:
                accessCode.length > 0 ? accessCode : params.accessCode,
            });
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  }, [
    currentRouteName,
    getEventDetailData,
    getEventDetailResponse?.data?.eventCode,
    getEventDetailResponse?.data?.id,
    getEventDetailResponse?.data?.name,
    getEventDetailResponse?.data?.type,
    navigation,
    params?.accessCode,
    params?.id,
    params?.prevScreen,
    setEventDetailData,
    setIsComingFromScreen,
    setLoading,
    userData?.alreadyKYC,
    userData?.alreadySetPin,
    userData?.userId,
  ]);

  function onSwipe(nativeEvent) {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  }

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
              setIsComingFromScreen({});
              setEventBuyTicketClear();
              getEventDetailClear();
              if (navigation.canGoBack()) {
                navigation.pop();
              } else {
                navigation.replace(NAVIGATION.EVENT.EventMain);
              }
            }}>
            <BtnBack fill={Color.main.light.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.btnHeaderCircle}
            onPress={() => {
              onShare();
              // onPressNotKyc();
            }}>
            <ShareIcon fill={Color.main.light.black} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  function renderSliderSwipper() {
    const bannerImage = getEventDetailResponse?.data?.banner;
    const remainingQuota =
      getEventDetailResponse?.data?.quotaEvent -
        getEventDetailResponse?.data?.userRegistered || 0;
    const removeBanner = getEventDetailResponse?.data?.isHighlighted
      ? [0, 1, 2, 3, 4]
      : [0, 1, 2, 3];
    const resultBanner = bannerImage?.filter((item, index) => {
      return removeBanner?.indexOf(index) === -1;
    });
    return (
      <View style={style.renderSliderSwipper.sliderSwipper.container}>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            onSwipe(nativeEvent);
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={style.renderSliderSwipper.sliderSwipper.scrollViewSize}>
          {resultBanner?.map((item) => {
            return (
              <View>
                <Image
                  key={item?.id}
                  source={{ uri: item?.url }}
                  resizeMode="cover"
                  style={style.renderSliderSwipper.sliderSwipper.imgSize}
                />
                {getEventDetailResponse?.data?.closed && (
                  <View
                    style={style.renderSliderSwipper.sliderSwipper.bgGrey}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
        <View style={style.renderSliderSwipper.sliderSwipper.floatingDot}>
          {resultBanner?.length > 1 &&
            resultBanner?.map((item, index) => {
              return (
                <Text
                  key={item?.id}
                  style={
                    imgActive === index
                      ? style.renderSliderSwipper.sliderSwipper.dotActive
                      : style.renderSliderSwipper.sliderSwipper.dotInActive
                  }>
                  ●
                </Text>
              );
            })}
        </View>
        {getEventDetailResponse?.data?.closed ? (
          <View
            style={
              style.renderSliderSwipper.sliderSwipper.floatingTicketExpired
            }>
            <Text
              color={Color.watchlistDateEnd.light.color}
              align="center"
              line={18}
              size={Size.text.caption1.size}
              textStyle="bold">
              {trans(locale, lang, 'eventBerakhir')}
            </Text>
          </View>
        ) : (
          <View>
            {getEventDetailResponse?.data?.type !== 'EXTERNAL' && (
              <View
                style={style.renderSliderSwipper.sliderSwipper.floatingTicket}>
                <Text
                  color={Color.limitedEventColor.light.color}
                  align="center"
                  line={18}
                  size={Size.text.caption1.size}
                  textStyle="bold">
                  {lang === 'id'
                    ? `${trans(locale, lang, 'tersisa')} ${
                        remainingQuota <= 0 ? 0 : remainingQuota
                      } ${trans(locale, lang, 'tiket')}`
                    : `${remainingQuota <= 0 ? 0 : remainingQuota} ${trans(
                        locale,
                        lang,
                        'tiket'
                      )}${
                        getEventDetailResponse?.data?.quotaEvent -
                          getEventDetailResponse?.data?.userRegistered >
                        1
                          ? 's'
                          : ''
                      } ${trans(locale, lang, 'tersisa')}`}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  function renderHeader() {
    const isSameDay = moment(
      getEventDetailResponse?.data?.startDateTime
    ).isSame(getEventDetailResponse?.data?.endDateTime, 'day');
    return (
      <Padder style={style.renderHeader.container}>
        <Text align="left" line={36} size={Size.text.h5.size} textStyle="semi">
          {getEventDetailResponse?.data?.name}
        </Text>
        <View style={style.renderHeader.schedule}>
          <View style={style.renderHeader.content}>
            <EmptyCalendar
              width={16}
              height={16}
              fill={
                getEventDetailResponse?.data?.closed
                  ? Color.neutral.light.neutral10
                  : Color.primary.light.primary90
              }
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={19.6}
              color={Color.neutralLifeSaver.light.neutral40}
              style={style.renderHeader.mL5}>
              {isSameDay
                ? moment(getEventDetailResponse?.data?.startDateTime).format(
                    'DD MMMM YYYY'
                  )
                : `${moment(getEventDetailResponse?.data?.startDateTime).format(
                    'DD'
                  )}-${moment(getEventDetailResponse?.data?.endDateTime).format(
                    'DD MMMM YYYY'
                  )}`}
            </Text>
          </View>
          <View style={style.renderHeader.content}>
            <SmallClock
              fill={
                getEventDetailResponse?.data?.closed
                  ? Color.neutral.light.neutral10
                  : Color.primary.light.primary90
              }
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={19.6}
              color={Color.neutralLifeSaver.light.neutral40}
              style={style.renderHeader.mL5}>
              {moment(getEventDetailResponse?.data?.startDateTime).format(
                'HH:mm'
              )}{' '}
              -{' '}
              {moment(getEventDetailResponse?.data?.endDateTime).format(
                'HH:mm'
              )}
            </Text>
          </View>
        </View>
        {!getEventDetailResponse?.data?.type?.includes('PUBLIC') ? (
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={Color.limitedEventColor.light.color}
            style={style.renderHeader.eventType}>
            {trans(locale, lang, 'limitedEvent')}
          </Text>
        ) : (
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={Color.success.light.success60}
            style={style.renderHeader.eventType}>
            {trans(locale, lang, 'publicEvent')}
          </Text>
        )}
      </Padder>
    );
  }
  function renderEventCodeModal() {
    return (
      <BottomSheet
        keyboardVerticalOffset={Size.screen.height}
        swipeable={false}
        isVisible={isEventCodeModal}
        title={trans(locale, lang, 'limitedEventModalTitle')}
        isPadder={false}
        onBackdropPress={() => {
          setCodeErrorMsg('');
          setIsEventCodeModal(false);
          setAccessCode('');
        }}
        onClosePress={() => {
          setCodeErrorMsg('');
          setIsEventCodeModal(false);
          setAccessCode('');
        }}>
        <Text
          align="center"
          textStyle="regular"
          line={20}
          letterSpacing={0.5}
          style={style.mH20}
          color={Color.neutral.light.neutral10}>
          {trans(locale, lang, 'eventIniDiperuntukan')}
        </Text>
        <View style={[style.mT30, style.mH20]}>
          <Text
            style={style.mB10}
            line={20}
            letterSpacing={0.5}
            textStyle="regular">
            {trans(locale, lang, 'masukkanKodeEvent')}
          </Text>
          <Input
            value={accessCode}
            textAlign="center"
            multiline={Size.isAndroid}
            placeholder={trans(locale, lang, 'masukkanKodeDisini')}
            height={56}
            message={codeErrorMsg}
            onChangeText={(txt) => {
              setAccessCode(txt);
            }}
          />
        </View>
        <Wave
          width="100%"
          height={150}
          style={style.renderEventCodeModal.waveImg}
          fill={Color.redHome.dark.redHome}
        />
        <View style={style.mT30}>
          <View style={[style.mH20, style.pB30]}>
            <Button
              loading={isSubmit}
              block
              disabled={isSubmit}
              onPress={() => {
                onPressVerifyCode();
              }}>
              {trans(locale, lang, 'lanjutkan')}
            </Button>
          </View>
        </View>
      </BottomSheet>
    );
  }
  function renderMain() {
    return (
      <View>
        <ListAccordion
          touchableType="opacity"
          header={
            <View>
              <Text
                textStyle="semi"
                size={Size.text.body1.size}
                line={24}
                style={style.mB8}>
                {trans(locale, lang, 'detailLokasi')}
              </Text>
              <View style={style.renderMain.ListAccordion.header.content}>
                <PinLoc
                  fill={
                    getEventDetailResponse?.data?.closed
                      ? Color.neutral.light.neutral10
                      : Color.primary.light.primary90
                  }
                />
                <Text
                  textStyle="regular"
                  size={Size.text.body2.size}
                  line={19.6}
                  color={Color.neutral.dark.neutral40}
                  style={style.renderMain.ListAccordion.header.text}>
                  {getEventDetailResponse?.data?.location?.name},{' '}
                  {getEventDetailResponse?.data?.location?.city}
                </Text>
              </View>
            </View>
          }
          suffixIcon={<ArrowDown2Black />}>
          <View
            style={
              style.renderMain.ListAccordion.listContent.content1.container
            }>
            <Text
              textStyle="regular"
              line={21}
              color={Color.neutral.light.neutral40}>
              {getEventDetailResponse?.data?.location?.address}
            </Text>
            <View
              style={
                style.renderMain.ListAccordion.listContent.content1.imgContainer
              }>
              <Shadow
                borderRadius={16}
                style={
                  style.renderMain.ListAccordion.listContent.content1
                    .shadowBorderSize
                }>
                <TouchableOpacity
                  onPress={() => {
                    openGps(
                      getEventDetailResponse?.data?.location?.latitude,
                      getEventDetailResponse?.data?.location?.longitude
                    );
                  }}>
                  <View
                    style={
                      style.renderMain.ListAccordion.listContent.content1
                        .imgText
                    }>
                    <Direction style={style.mB5} />
                    <Text
                      textStyle="semi"
                      line={18}
                      size={Size.text.caption1.size}>
                      {trans(locale, lang, 'bukaMaps')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
              <Shadow
                borderRadius={16}
                style={
                  style.renderMain.ListAccordion.listContent.content1
                    .shadowBorderSize
                }>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      // eslint-disable-next-line prefer-template
                      'tel:' +
                        getEventDetailResponse?.data?.pic[0]?.mobilePhoneNo
                    );
                  }}>
                  <View
                    style={
                      style.renderMain.ListAccordion.listContent.content1
                        .imgText
                    }>
                    <Call style={style.mB5} />
                    <Text
                      textStyle="semi"
                      line={18}
                      size={Size.text.caption1.size}>
                      {trans(locale, lang, 'hubungiKami')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Shadow>
            </View>
          </View>
        </ListAccordion>
        <Dash
          dashStyle={style.gapDash1}
          dashThickness={1}
          dashColor={Color.colorGapEvent.dark.color}
        />
        <Padder style={style.pV10}>
          <View style={style.mB20}>
            <Text
              size={Size.text.body1.size}
              textStyle="semi"
              style={style.mB20}>
              {trans(locale, lang, 'tentangAcara')}
            </Text>
            <RenderHtml
              contentWidth={Size.screen.width}
              source={{
                html: getEventDetailResponse?.data?.detail?.description,
              }}
              baseStyle={htmlBaseStyle}
              tagsStyles={htmlTagsStyles}
              systemFonts={systemFonts}
            />
          </View>
          <View>
            <Text
              size={Size.text.body1.size}
              textStyle="semi"
              style={style.mB20}>
              {trans(locale, lang, 'highlightAcara')}
            </Text>
            <RenderHtml
              contentWidth={Size.screen.width}
              source={{
                html: getEventDetailResponse?.data?.detail?.highlight,
              }}
              baseStyle={htmlBaseStyle}
              tagsStyles={htmlTagsStyles}
              systemFonts={systemFonts}
            />
          </View>
          {getEventDetailResponse?.data?.detail?.highlightImage && (
            <Image
              style={
                style.renderMain.ListAccordion.listContent.content2.mapSize
              }
              source={{
                uri: getEventDetailResponse?.data?.detail?.highlightImage,
              }}
              resizeMode="stretch"
            />
          )}
          <View>
            {!_.isEmpty(getEventDetailResponse?.data?.guestStar) && (
              <Text line={36} size={Size.text.body1.size} textStyle="semi">
                {trans(locale, lang, 'bintangTamuDan')}
              </Text>
            )}

            <ScrollView
              horizontal
              contentContainerStyle={style.mT8}
              showsHorizontalScrollIndicator={false}>
              {getEventDetailResponse?.data?.guestStar?.map((item) => {
                return (
                  <View
                    key={item?.position}
                    style={
                      style.renderMain.ListAccordion.listContent.content2
                        .container
                    }>
                    <Image
                      style={
                        style.renderMain.ListAccordion.listContent.content2
                          .roundImgSize
                      }
                      source={{
                        uri: item?.profilePhoto,
                      }}
                    />
                    <Text
                      size={Size.text.body2.size}
                      style={style.mT10}
                      align="center"
                      line={19.6}
                      textStyle="medium"
                      color={Color.neutral.light.neutral40}>
                      {item?.name}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Padder>
      </View>
    );
  }

  function renderFooter() {
    return (
      <>
        <Padder style={style.bGColor}>
          <Text
            line={24}
            size={Size.text.body1.size}
            textStyle="semi"
            style={style.mT16}>
            {trans(
              locale,
              lang,
              getEventDetailResponse?.data?.type === 'EXTPUBLIC'
                ? 'keuntungan'
                : 'gratisKeuntungan'
            )}
            {getEventDetailResponse?.data?.type !== 'EXTPUBLIC' && (
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            )}
          </Text>
        </Padder>
        <Padder style={[style.bGColor, style.pV8]}>
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
                  style={[
                    style.renderFooter.hitbyCar.mH16,
                    style.protectionImg,
                  ]}
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
                    style={[
                      style.renderFooter.ListAccordion.mH16,
                      style.protectionImg,
                    ]}
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
                    style={[
                      style.renderFooter.ListAccordion.mH16,
                      style.protectionImg,
                    ]}
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
                    style={[
                      style.renderFooter.ListAccordion.mH16,
                      style.protectionImg,
                    ]}
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
        <View>
          {getEventDetailResponse?.data?.type !== 'EXTPUBLIC' && (
            <Padder style={[style.bGColor, style.pV8]}>
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
                <Text
                  line={19}
                  size={Size.text.body2.size}
                  textStyle="regular"
                  color={Color.mediumGray.light.mediumGray}>
                  {trans(locale, lang, 'kuotaTerbatasUntuk')}
                  {getEventDetailResponse?.data?.quotaEvent}
                  {trans(locale, lang, 'orangPertama')}
                </Text>
              </Text>
              {/* <Dash
                dashStyle={style.gapDash1}
                dashThickness={1}
                dashColor={Color.colorGapEvent.dark.color}
              /> */}
            </Padder>
          )}

          {getEventDetailResponse?.data?.otherInformation?.length > 0 && (
            <Padder>
              <Text
                style={style.renderFooter.ListAccordion.mT24}
                line={36}
                size={Size.text.body1.size}
                textStyle="semi">
                {trans(locale, lang, 'informasiLainnya')}
              </Text>
            </Padder>
          )}
          <Padder style={style.pB50}>
            {getEventDetailResponse?.data?.otherInformation.map((info) => (
              <ListAccordion
                touchableType="opacity"
                headerContainerStyle={style.headerContainerStyle}
                headerContainerStyleActive={style.headerContainerStyleActive}
                header={
                  <Text
                    size={Size.text.body2.size}
                    color={Color.mediumGray.light.mediumGray}
                    line={21}
                    textStyle="bold">
                    {info.title}
                  </Text>
                }
                headerActive={
                  <LinearGradient
                    style={style.headerActive}
                    colors={[
                      Color.buttonGradient.light.buttonGradient0,
                      Color.buttonGradient.light.buttonGradient1,
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>
                    <Text
                      size={Size.text.body2.size}
                      color={Color.main.light.white}
                      line={21}
                      textStyle="bold">
                      {info.title}
                    </Text>
                  </LinearGradient>
                }
                suffixIcon={<ArrowDown2 />}
                suffixIconActive={<ArrowDown2White />}>
                <View
                  style={[
                    style.shadow,
                    style.renderFooter.ListAccordion.container,
                  ]}>
                  <RenderHtml
                    contentWidth={Size.screen.width}
                    source={{ html: info?.description }}
                    baseStyle={htmlBaseStyle}
                    tagsStyles={htmlTagsStyles}
                    systemFonts={systemFonts}
                  />
                </View>
              </ListAccordion>
            ))}
          </Padder>
        </View>
      </>
    );
  }

  function renderAmount() {
    const isHasActiveLS =
      getPoliciesResponse?.data?.filter((value) => {
        return (
          (value?.status === 'ACTIVE' && value?.productName === 'LifeSAVER') ||
          (value?.status === 'ACTIVE' && value?.productName === 'LifeSAVER+')
        );
      }).length > 0;
    const isHasGracePeriodLS = getPoliciesResponse?.data?.filter((value) => {
      return (
        (value?.status === 'GRACE PERIOD' &&
          value?.productName === 'LifeSAVER') ||
        (value?.status === 'GRACE PERIOD' &&
          value?.productName === 'LifeSAVER+')
      );
    });

    if (isHasActiveLS) {
      return `Rp${formatCurrency({
        value: getEventDetailResponse?.data?.price || 0,
        mantissa: 0,
      })},-`;
    }
    if (isHasGracePeriodLS?.length > 0) {
      return `Rp${formatCurrency({
        value: getEventDetailResponse?.data?.price || 0,
        mantissa: 0,
      })},-`;
    }
    return `Rp${formatCurrency({
      value: getEventDetailResponse?.data?.price || 0,
      mantissa: 0,
    })},-`;
  }

  function renderButton() {
    return (
      <Shadow animated borderRadius={1}>
        <Padder style={style.pB16}>
          <View style={[style.renderFooter.ListAccordion.freeContainer]}>
            {getEventDetailResponse?.data?.alreadyBought ||
            setEventBuyTicketFailed?.message ===
              RESPONSE_STATE.ALREADY_BOUGHT ? (
              <Text
                size={Size.text.body2.size}
                textStyle="semi"
                line={30.8}
                color={Color.mediumGray.light.mediumGray}>
                {' '}
              </Text>
            ) : (
              <Text
                size={Size.text.body2.size}
                textStyle="semi"
                line={30.8}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'total')}
              </Text>
            )}
            {getEventDetailResponse?.data?.alreadyBought ||
            setEventBuyTicketFailed?.message ===
              RESPONSE_STATE.ALREADY_BOUGHT ? null : (
              <Text
                textStyle="semi"
                line={29}
                style={
                  getEventDetailResponse?.data?.type === 'EXTPUBLIC' &&
                  style.mB16
                }
                size={Size.text.h6.size + 2}
                color={Color.greenActive.light.color}>
                {getEventDetailResponse?.data?.price === 0
                  ? trans(locale, lang, 'free')
                  : renderAmount()}
              </Text>
            )}
          </View>
          {getEventDetailResponse?.data?.alreadyBought ||
          getEventDetailResponse?.data?.type === 'EXTPUBLIC' ||
          setEventBuyTicketFailed?.message ===
            RESPONSE_STATE.ALREADY_BOUGHT ? null : (
            <View
              style={style.renderFooter.ListAccordion.freeLifeSAVERContainer}>
              <Text
                textStyle="medium"
                align="right"
                size={Size.text.caption1.size}
                line={18}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'kamuJugaAkan')}
                {trans(locale, lang, 'Life')}
                <Text
                  line={24}
                  size={Size.text.body2.size}
                  fontStyle="italic"
                  color={Color.mediumGray.light.mediumGray}
                  textStyle="medium">
                  {trans(locale, lang, 'SAVER')}
                </Text>
                {trans(locale, lang, 'untukSatuBulan')}
              </Text>
            </View>
          )}
          <View>
            {getEventDetailResponse?.data?.type !== 'EXTERNAL' && (
              <Button
                disabled={
                  getEventDetailResponse?.data?.alreadyBought ||
                  getEventDetailResponse?.data?.closed ||
                  getEventDetailResponse?.data?.isClosedRegister ||
                  getEventDetailResponse?.data?.quotaEvent -
                    getEventDetailResponse?.data?.userRegistered <=
                    0 ||
                  setEventBuyTicketFailed?.message ===
                    RESPONSE_STATE.ALREADY_BOUGHT
                }
                type="linear-gradient"
                onPress={() => onPressNotKyc()}>
                {buttonTitle}
              </Button>
            )}
          </View>
        </Padder>
      </Shadow>
    );
  }

  return (
    <View style={style.pageContainer}>
      {renderStatusBar()}
      {renderHeaderContainer()}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: yOffset } } }],
          {
            useNativeDriver: true,
            listener: ({ nativeEvent }) => {
              if (
                nativeEvent.contentOffset.y >
                APP.header.height + insets.top + 150
              ) {
                setIsDark(true);
              } else {
                setIsDark(false);
              }
            },
          }
        )}>
        {renderSliderSwipper()}
        {renderHeader()}
        <Dash
          dashStyle={style.gapDash1}
          dashThickness={1}
          dashColor={Color.colorGapEvent.dark.color}
        />
        {renderMain()}
        {renderFooter()}
        {renderEventCodeModal()}
      </Animated.ScrollView>

      {renderButton()}
    </View>
  );
}
export default EventDetail;

EventDetail.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  getEventDetail: PropTypes.func.isRequired,
  getEventDetailResponse: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  lifesaverAction: PropTypes.objectOf(Object).isRequired,
  getIsUserEligible: PropTypes.func.isRequired,
  setPersonEligible: PropTypes.func.isRequired,
  getIsUserEligibleClear: PropTypes.func.isRequired,
  setPersonEligibleClear: PropTypes.func.isRequired,
  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  updataAction: PropTypes.string.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicketFailed: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicketClear: PropTypes.func.isRequired,
  getEventDetailClear: PropTypes.func.isRequired,
  getPoliciesResponse: PropTypes.func.isRequired,
  setEventDetailData: PropTypes.func.isRequired,
  getEventDetailData: PropTypes.objectOf(Object).isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicket: PropTypes.func.isRequired,
};
