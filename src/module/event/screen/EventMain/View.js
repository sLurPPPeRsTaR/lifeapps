import React, { useEffect, useCallback, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
  BackHandler,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION, TOAST } from 'ca-util/constant';
import { NoTicket, FriendFrame } from 'ca-config/Image';
import Base15 from 'ca-component-container/Base15';
import {
  History,
  Love,
  TopNavbar,
  Wave,
  LilGrayCircle,
  RoundedHeart,
  RoundedHeartActive,
} from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Shadow from 'ca-component-container/Shadow';
import DeviceInfo from 'react-native-device-info';
import {
  GET_EVENT_UPCOMING_FAILED,
  GET_EVENT_UPCOMING_SUCCESS,
  GET_EVENT_USERTICKET_FAILED,
  GET_EVENT_USERTICKET_SUCCESS,
  SET_EVENT_ADDFAVORITE_FAILED,
  SET_EVENT_ADDFAVORITE_SUCCESS,
  SET_EVENT_RMVFAVORITE_FAILED,
  SET_EVENT_RMVFAVORITE_SUCCESS,
} from 'ca-module-event/eventConstant';
import moment from 'moment/min/moment-with-locales';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import Input from 'ca-component-generic/Input';
import { formatCurrency } from 'ca-util/numbro';
import { CardEvent } from 'ca-module-event/component';
import { useIsFocused } from '@react-navigation/native';
import {
  getEventDetailApi,
  getEventDetailPublicApi,
  setValidateAccessCodeApi,
} from 'ca-module-event/eventApi';
import locale from './locale';
import style from './style';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import { AFLogEvent, AF_EVENT_LIST_CLICK } from 'ca-util/AppsFlyer';

function EventMain(props) {
  const {
    navigation,
    lang,
    userData,
    getEventUpcoming,
    getEventUpcomingResponse,
    eventAction,
    setEventAddFavorite,
    setEventRmvFavorite,
    getEventUserTicket,
    getEventUserTicketResponse,
    setToastMsg,
    setLoading,
    setIsComingFromScreen,
    route,
  } = props;
  moment.locale(lang);
  const currentRouteName = navigationRef.current.getCurrentRoute().name;
  const insets = useSafeAreaInsets();
  const [isEventCodeModal, setIsEventCodeModal] = useState(false);
  const [accessCode, setAccessCode] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState();
  const [id, setId] = useState();
  const [slugId, setSlugId] = useState();

  const [isDark, setIsDark] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setIsComingFromScreen({});
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      setCodeErrorMsg('');
      getEventUpcoming({ lang, userId: userData?.userId });
      if (userData?.userId !== '') {
        getEventUserTicket({ lang });
      }
    }
  }, [
    getEventUpcoming,
    getEventUserTicket,
    isFocused,
    lang,
    setLoading,
    userData?.userId,
  ]);

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  const eventResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_EVENT_UPCOMING_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
      if (act === GET_EVENT_UPCOMING_FAILED) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
      if (act === GET_EVENT_USERTICKET_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
      if (act === GET_EVENT_USERTICKET_FAILED) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
      if (act === SET_EVENT_ADDFAVORITE_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
        getEventUpcoming({ lang, userId: userData?.userId });
        setToastMsg({
          type: TOAST.type.success,
          text1: [
            {
              label: trans(locale, lang, 'berhasilMenambahkanEvent'),
              textStyle: 'medium',
            },
          ],
        });
      }
      if (act === SET_EVENT_ADDFAVORITE_FAILED) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
      if (act === SET_EVENT_RMVFAVORITE_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
        getEventUpcoming({ lang, userId: userData?.userId });
        setToastMsg({
          type: TOAST.type.info,
          text1: [
            {
              label: trans(locale, lang, 'eventTelahDihapus'),
              textStyle: 'medium',
            },
          ],
        });
      }
      if (act === SET_EVENT_RMVFAVORITE_FAILED) {
        setTimeout(() => {
          setLoading(false);
          setIsSubmit(false);
        }, 2000);
      }
    },
    [getEventUpcoming, lang, setLoading, setToastMsg, userData?.userId]
  );

  const onPressVerifyCode = () => {
    setIsSubmit(true);
    setValidateAccessCodeApi({
      eventId: id,
      accessCode: accessCode,
    })
      .then((res) => {
        if (res) {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          navigation.navigate(NAVIGATION.EVENT.EventDetail, {
            id: id,
            slugId: slugId,
            accessCode,
            prevScreen: currentRouteName,
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
    // if (userData?.userId !== '') {
    //   getEventDetailApi({
    //     eventId: id,
    //     slugId: slugId,
    //     lang,
    //     userId: userData?.userId,
    //     accessCode,
    //   })
    //     .then(() => {
    //       setIsSubmit(false);
    //       setIsEventCodeModal(false);
    //       setAccessCode('');
    //       setCodeErrorMsg('');
    // navigation.navigate(NAVIGATION.EVENT.EventDetail, {
    //   id: id,
    //   slugId: slugId,
    //   accessCode,
    //   prevScreen: currentRouteName,
    // });
    //     })
    //     .catch(() => {
    //       setIsSubmit(false);
    //       setCodeErrorMsg({
    //         error: trans(locale, lang, 'kodeYangKamu'),
    //       });
    //     });
    // } else {
    //   getEventDetailPublicApi({
    //     eventId: id,
    //     slugId: slugId,
    //     lang,
    //     accessCode,
    //   })
    //     .then(() => {
    //       setIsSubmit(false);
    //       setIsEventCodeModal(false);
    //       setAccessCode('');
    //       setCodeErrorMsg('');
    //       navigation.navigate(NAVIGATION.EVENT.EventDetail, {
    //         id: id,
    //         slugId: slugId,
    //         accessCode,
    //         prevScreen: currentRouteName,
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

  const onPressEventList = (item) => {
    const logs = {
      af_user_id: userData?.userId,
      af_channel: Platform.OS,
      af_event_name: `event name ${item?.name}`,
    };
    AFLogEvent(AF_EVENT_LIST_CLICK, logs);
    if (item?.type === 'PRIVATE') {
      setId(item?.id);
      setSlugId(item?.slugId);
      if (item?.alreadyBought) {
        navigation.navigate(NAVIGATION.EVENT.EventDetail, {
          id: item?.id,
          slugId: item?.slugId,
          accessCode,
          prevScreen: currentRouteName,
        });
      } else {
        setIsEventCodeModal(true);
      }
    } else {
      navigation.navigate(NAVIGATION.EVENT.EventDetail, {
        id: item?.id,
        slugId: item?.slugId,
        accessCode,
        prevScreen: currentRouteName,
      });
    }
  };

  function renderBackgroundHeaderImage() {
    return (
      <View>
        <View
          style={
            // eslint-disable-next-line no-nested-ternary
            DeviceInfo.isTablet()
              ? [
                  style.renderBackgroundHeaderImage.bgHeaderImg,
                  {
                    top: -400 + insets.top,
                  },
                ]
              : Size.isIphoneX
              ? [
                  style.renderBackgroundHeaderImage.bgHeaderImg,
                  {
                    top: -330 + insets.top,
                  },
                ]
              : [
                  style.renderBackgroundHeaderImage.bgHeaderImg,
                  {
                    top: -310 + insets.top,
                  },
                ]
          }>
          <TopNavbar
            width={Size.screen.width}
            height={userData?.userId ? 470 : 500}
          />
        </View>
        <View style={style.renderBackgroundHeaderImage.containerText}>
          {userData?.name === '' ? (
            <Text
              color={Color.main.light.white}
              size={Size.text.body1.size}
              line={24}
              letterSpacing={0.5}>
              {trans(locale, lang, 'ayo')}{' '}
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsComingFromScreen({ screen: route?.name });
                  navigation.navigate(NAVIGATION.LOGIN.LoginMain);
                }}>
                <Text
                  color={Color.main.light.white}
                  size={Size.text.body1.size}
                  line={24}
                  letterSpacing={0.5}
                  textDecorationLine="underline">
                  {trans(locale, lang, 'login')}
                </Text>
              </TouchableWithoutFeedback>
              <Text
                color={Color.main.light.white}
                size={Size.text.body1.size}
                line={24}
                letterSpacing={0.5}>
                {' '}
                {trans(locale, lang, 'atau')}{' '}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsComingFromScreen({ screen: route?.name });
                  navigation.navigate(NAVIGATION.REGISTER.RegisterMain);
                }}>
                <Text
                  color={Color.main.light.white}
                  size={Size.text.body1.size}
                  line={24}
                  letterSpacing={0.5}
                  textDecorationLine="underline">
                  {trans(locale, lang, 'register')}
                </Text>
              </TouchableWithoutFeedback>
              <Text
                color={Color.main.light.white}
                size={Size.text.body1.size}
                line={24}
                letterSpacing={0.5}>
                {' '}
                {trans(locale, lang, 'untuk')}
              </Text>
            </Text>
          ) : null}
          <Text
            color={Color.main.light.white}
            textStyle="semi"
            size={Size.text.body1.size}
            line={24}
            letterSpacing={0.5}>
            {userData?.name === ''
              ? trans(locale, lang, 'mengikutiEventFav')
              : trans(locale, lang, 'temukanEventFav')}
          </Text>
        </View>
      </View>
    );
  }

  function renderRightContent() {
    return (
      <View style={style.renderRightContent.rightContentContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (userData?.userId === '') {
              setIsComingFromScreen({
                screen: NAVIGATION.EVENT.EventMain,
              });
              navigation.navigate(NAVIGATION.LOGIN.LoginMain);
            } else {
              navigation.navigate(NAVIGATION.EVENT.EventFavorite);
            }
          }}>
          <View>
            <Love
              fill={isDark ? Color.main.light.black : Color.main.light.white}
              style={style.mE15}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            if (userData?.userId === '') {
              setIsComingFromScreen({
                screen: NAVIGATION.EVENT.EventMain,
              });
              navigation.navigate(NAVIGATION.LOGIN.LoginMain);
            } else {
              navigation.navigate(NAVIGATION.EVENT.EventHistory);
            }
          }}>
          <View>
            <History
              fill={isDark ? Color.main.light.black : Color.main.light.white}
              style={style.mE15}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderTicket() {
    const userTicket = getEventUserTicketResponse?.data;
    const isAllTicketClosed = userTicket?.every((item) => item?.event?.closed);
    if (userTicket?.length <= 0 || userData?.name === '' || isAllTicketClosed) {
      return (
        <Padder>
          <Text
            style={[style.mT50, style.mB10]}
            textStyle="semi"
            size={Size.text.body1.size}
            line={24}
            letterSpacing={0.5}>
            {trans(locale, lang, 'tiketSaya')}
          </Text>
          <Shadow borderRadius={16}>
            <View style={style.renderTicket.imgText}>
              <Image
                source={NoTicket}
                style={[style.renderTicket.imgSize, style.mE15]}
              />
              <Text
                style={style.flex}
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.neutral.light.neutral10}>
                {trans(locale, lang, 'kamuBelumMemiliki')}
              </Text>
            </View>
          </Shadow>
        </Padder>
      );
    }
    return (
      <View>
        <Padder>
          <Text
            style={style.mT50}
            textStyle="semi"
            size={Size.text.body1.size}
            line={24}
            letterSpacing={0.5}>
            {trans(locale, lang, 'tiketSaya')}
          </Text>
        </Padder>
        <ScrollView
          horizontal
          contentContainerStyle={style.pH5}
          showsHorizontalScrollIndicator={false}>
          {userTicket?.map((item) => {
            if (!item?.event?.closed) {
              return (
                <CardEvent
                  key={item?.event?.id}
                  data={item}
                  isMyTicket
                  isShowTime
                  onPress={() => {
                    navigation.navigate(NAVIGATION.EVENT.EventDetailTicket, {
                      eventId: item?.event?.id,
                      isFreeLifeSaver: item?.ticket?.isFreeLifeSaver,
                      userEventId: item?.ticket?.userEventId,
                      slugId: item?.event?.slugId,
                    });
                  }}
                  width={320}
                />
              );
            }
            return null;
          })}
        </ScrollView>
      </View>
    );
  }

  function renderContent() {
    return (
      <Padder>
        <View style={style.renderContent.textEventList}>
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            letterSpacing={0.5}
            line={24}>
            {trans(locale, lang, 'daftarEvent')}
          </Text>
          {/* <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(NAVIGATION.EVENT.EventList);
            }}>
            <Text
              textStyle="regular"
              size={Size.text.caption1.size}
              line={18}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'lihatSemua')}
            </Text>
          </TouchableWithoutFeedback> */}
        </View>
      </Padder>
    );
  }

  function renderEvent() {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={style.pR5}
        showsHorizontalScrollIndicator={false}>
        {getEventUpcomingResponse?.data?.map((item, idx) => {
          const remainingQuota = item?.quotaEvent - item?.userRegistered || 0;
          const bannerUrl = {};
          item?.banner
            ?.filter((val) => val?.position === 1)
            ?.map((val) => Object.assign(bannerUrl, val));
          const isSameDay = moment(item?.startDateTime).isSame(
            item?.endDateTime,
            'day'
          );
          return (
            <View
              key={item?.id}
              style={{
                marginLeft: 16,
                marginRight:
                  getEventUpcomingResponse?.data?.length - 1 === idx ? 16 : 0,
              }}>
              <Shadow borderRadius={30} style={style.mB10}>
                <TouchableWithoutFeedback
                  key={idx}
                  onPress={() => {
                    onPressEventList(item);
                  }}>
                  <View style={style.renderEvent.containerCard}>
                    <View>
                      <>
                        <Image
                          source={{
                            uri: bannerUrl?.url,
                          }}
                          style={style.renderEvent.imgSlide}
                        />
                      </>
                      {item?.closed && (
                        <View style={style.renderEvent.bgClosed} />
                      )}
                      <View style={style.positionAbsolute}>
                        {item?.type !== 'EXTERNAL' && (
                          <View style={style.renderEvent.ticketText}>
                            {lang === 'id' ? (
                              <>
                                <Text
                                  color={Color.limitedEventColor.light.color}
                                  textStyle="semi"
                                  size={Size.text.caption1.size}
                                  letterSpacing={0.5}
                                  line={16}>
                                  {trans(locale, lang, 'tersisa')}{' '}
                                  {remainingQuota <= 0
                                    ? 0
                                    : item?.quotaEvent -
                                      item?.userRegistered}{' '}
                                </Text>
                                <Text
                                  color={Color.limitedEventColor.light.color}
                                  textStyle="semi"
                                  size={Size.text.caption1.size}
                                  letterSpacing={0.5}
                                  line={16}>
                                  {trans(locale, lang, 'tiket')}
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  color={Color.limitedEventColor.light.color}
                                  textStyle="semi"
                                  size={Size.text.caption1.size}
                                  letterSpacing={0.5}
                                  line={16}>
                                  {remainingQuota <= 0
                                    ? 0
                                    : item?.quotaEvent -
                                      item?.userRegistered}{' '}
                                  {trans(locale, lang, 'tiket')}
                                  {item?.quotaEvent - item?.userRegistered >
                                    1 && 's'}{' '}
                                </Text>
                                <Text
                                  color={Color.limitedEventColor.light.color}
                                  textStyle="semi"
                                  size={Size.text.caption1.size}
                                  letterSpacing={0.5}
                                  line={16}>
                                  {trans(locale, lang, 'tersisa')}
                                </Text>
                              </>
                            )}
                          </View>
                        )}
                      </View>
                      {userData?.userId !== '' && (
                        <Shadow
                          borderRadius={20}
                          style={style.renderEvent.btnHeart}>
                          <TouchableWithoutFeedback
                            disabled={isSubmit}
                            onPress={() => {
                              setIsSubmit(true);
                              setLoading(true);
                              if (!item?.watchlist) {
                                setEventAddFavorite({
                                  eventId: item?.id,
                                });
                              } else if (item?.watchlist) {
                                setEventRmvFavorite({
                                  eventId: item?.id,
                                });
                              }
                            }}>
                            {item?.watchlist ? (
                              <RoundedHeartActive
                                style={style.renderEvent.dateHeartImgSize}
                              />
                            ) : (
                              <View style={style.renderEvent.dateHeartBg}>
                                <RoundedHeart
                                  style={style.renderEvent.dateHeartImgSize}
                                />
                              </View>
                            )}
                          </TouchableWithoutFeedback>
                        </Shadow>
                      )}
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 10,
                      }}>
                      <View style={style.renderEvent.eventText}>
                        <Text
                          textStyle="semi"
                          size={Size.text.body2.size}
                          line={21}
                          multiline
                          numberOfLines={2}
                          letterSpacing={0.5}>
                          {item?.name}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          size={Size.text.caption1.size}
                          letterSpacing={0.5}
                          line={25}
                          textStyle="regular">
                          {isSameDay
                            ? moment(item?.startDateTime).format('DD MMMM')
                            : `${moment(item?.startDateTime).format(
                                'DD'
                              )} - ${moment(item?.endDateTime).format(
                                'DD MMMM'
                              )}`}
                        </Text>
                        <LilGrayCircle width={5} height={5} style={style.mH5} />
                        <Text
                          size={Size.text.caption1.size}
                          letterSpacing={0.5}
                          line={21}
                          textStyle="regular">
                          {item?.location?.city}
                        </Text>
                      </View>
                      <View>
                        {!item?.type?.includes('PUBLIC') ? (
                          <Text
                            color={Color.limitedEventColor.light.color}
                            align="left"
                            line={20.4}
                            letterSpacing={0.5}
                            size={Size.text.caption1.size}
                            textStyle="semi">
                            {trans(locale, lang, 'limitedEvent')}
                          </Text>
                        ) : (
                          <Text
                            color={Color.success.light.success60}
                            align="left"
                            line={20.4}
                            letterSpacing={0.5}
                            size={Size.text.caption1.size}
                            textStyle="semi">
                            {trans(locale, lang, 'publicEvent')}
                          </Text>
                        )}
                      </View>
                      {/* <View style={[style.mB10, style.mT5]}>
                        <View style={style.renderEvent.eventTextFriend}>
                          <Image source={FriendFrame} />
                          <Text
                            line={19.6}
                            letterSpacing={0.5}
                            textStyle="regular"
                            size={Size.text.caption1.size}
                            color={Color.neutral.dark.neutral40}>
                            {item?.userRegistered}
                            {item?.userRegistered > 0 ? '+ ' : ' '}
                            {trans(locale, lang, 'orangLainnya')}
                          </Text>
                        </View>
                      </View> */}
                    </View>
                    <View style={style.renderEvent.greenContainer}>
                      {item?.price === 0 ? (
                        <View style={style.renderEvent.greenContainerFree}>
                          <Text
                            size={Size.text.caption2.size}
                            align="right"
                            textStyle="semi"
                            letterSpacing={0.5}
                            line={20.4}
                            color={Color.greenEventPrice.light.color}>
                            {trans(locale, lang, 'Free')}
                          </Text>
                        </View>
                      ) : (
                        <View style={style.renderEvent.greenContainerNotFree}>
                          <Text
                            size={Size.text.caption2.size}
                            align="right"
                            textStyle="semi"
                            letterSpacing={0.5}
                            line={20.4}
                            color={Color.greenActive.light.color}>
                            Rp
                            {formatCurrency({
                              value: item?.price,
                              mantissa: 0,
                            })}
                            ,-
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Shadow>
            </View>
          );
        })}
      </ScrollView>
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

  return (
    <Base15
      isScroll
      animated
      backgroundHeaderImage={renderBackgroundHeaderImage()}
      rightHeaderContent={renderRightContent()}
      backgroundColor={Color.greyBackround.dark.greyBackground}
      onChangeHeaderToDark={(flag) => setIsDark(flag)}
      onBackPress={() => {
        setIsComingFromScreen({});
        if (navigation.canGoBack()) {
          navigation.pop();
        } else {
          navigation.replace(NAVIGATION.TABMAIN.TabMain);
        }
      }}
      title={trans(locale, lang, 'event')}>
      {renderTicket()}
      {renderContent()}
      {renderEvent()}
      {renderEventCodeModal()}
    </Base15>
  );
}

export default EventMain;

EventMain.defaultProps = {};

EventMain.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getEventUpcoming: PropTypes.func.isRequired,
  getEventUpcomingResponse: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  setEventAddFavorite: PropTypes.func.isRequired,
  setEventRmvFavorite: PropTypes.func.isRequired,
  getEventUserTicket: PropTypes.func.isRequired,
  getEventUserTicketResponse: PropTypes.objectOf(Object).isRequired,
  setToastMsg: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};
