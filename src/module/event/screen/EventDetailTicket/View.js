/* eslint-disable max-nested-callbacks */
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Platform,
  Share,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import {
  codeLifesaver,
  NAVIGATION,
  PRODUCT,
  STATUS_CODE,
} from 'ca-util/constant';
import Base from 'ca-component-container/Base';
import {
  ReferalBg,
  LifeSaverLogo,
  TicketFrame,
  LifeSaverLogoPlus,
  TicketHeaderFrame,
  TicketContentFrame,
} from 'ca-config/Image';

import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { Attention2, EmptyCalendar, SmallClock } from 'ca-config/Svg';
import _ from 'lodash';
import {
  GET_EVENT_DETAIL_FAILED,
  GET_EVENT_DETAIL_SUCCESS,
  SET_EVENT_BUYTICKET_SUCCESS,
} from 'ca-module-event/eventConstant';
import {
  GET_CURRENT_SUBS_FAILED,
  GET_CURRENT_SUBS_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import { useIsFocused } from '@react-navigation/native';
import { ModalAgreement } from 'ca-module-lifesaver/screen/LifesaverMain/component/modal';
import moment from 'moment';
import { QRCode } from 'ca-module-event/component';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import locale from './locale';
import style from './style';

function EventDetailTicket(props) {
  const {
    route: { params },
    navigation,
    lang,
    getCurrentSubs,
    getCurrentSubsResponse,
    getEventDetailResponse,
    getEventDetail,
    userData,
    eventAction,
    lifesaverAction,
    setLoading,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    setIsComingFromScreen,
    isComingFromScreen,
    getPoliciesResponse,
  } = props;
  const value = {
    name: `Event Ticket ${getEventDetailResponse?.data?.name}`,
    userEventId: params?.userEventId,
  };
  const [qrCodeValue] = useState(value);
  const [productQRref, setProductQRref] = useState();
  const [isTermConditionModalVisible, setisTermConditionModalVisible] =
    useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setIsComingFromScreen({});
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromScreen]);
  useLayoutEffect(() => {
    setLoading(true);
    getCurrentSubs();
    getEventDetail({
      eventId: params?.eventId,
      slugId: params?.slugId,
      lang,
      userId: userData?.userId,
    });
    getSubscriptionDetail(getCurrentSubsResponse?.policyNo);
  }, [
    getCurrentSubs,
    getCurrentSubsResponse?.policyNo,
    getEventDetail,
    getSubscriptionDetail,
    lang,
    params?.eventId,
    params.id,
    params?.slugId,
    setLoading,
    userData?.userId,
  ]);

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  useEffect(() => {
    lifesaverResult(lifesaverAction);
  }, [lifesaverAction, lifesaverResult]);

  useEffect(() => {
    if (isFocused) {
      setShowModal(isComingFromScreen);
    }
  }, [isComingFromScreen, isFocused, setShowModal]);

  const eventResult = useCallback(
    (act) => {
      if (act === GET_EVENT_DETAIL_SUCCESS) {
        if (getEventDetailResponse?.data) {
          setLoading(false);
        }
      }
      if (act === GET_EVENT_DETAIL_FAILED) {
        setLoading(false);
      }
    },
    [getEventDetailResponse?.data, setLoading]
  );

  const lifesaverResult = useCallback(
    (act) => {
      if (act === GET_CURRENT_SUBS_SUCCESS) {
        if (getCurrentSubsResponse) {
          setLoading(false);
        }
      }
      if (act === GET_CURRENT_SUBS_FAILED) {
        setLoading(false);
      }
    },
    [getCurrentSubsResponse, setLoading]
  );

  const setShowModal = useCallback((act) => {
    if (act?.params?.isShowModal) {
      setisTermConditionModalVisible(true);
    }
  }, []);

  const androidDownload = async (uri) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const dirs = `file://${RNFS.DownloadDirectoryPath}/LifeFest-QRCode.jpg`;
      RNFS.writeFile(dirs, uri, 'base64')
        .then(() => {
          ReactNativeBlobUtil.android.addCompleteDownload({
            title: 'LifeFest-QRCode.jpg',
            description: 'Download Complete',
            mime: 'image/jpg',
            path: dirs,
            showNotification: true,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  const callback = (dataURL) => {
    if (Platform.OS === 'ios') {
      Share.share({
        title: 'LifeFest-QRCode',
        url: dataURL,
      });
    } else {
      setLoading(true);
      androidDownload(dataURL);
    }
  };
  const onDownloadTicket = () => {
    productQRref.toDataURL(callback);
  };
  function renderTermConditionModal() {
    return (
      <ModalAgreement
        lang={lang}
        isVisible={isTermConditionModalVisible}
        onClosePress={() => setisTermConditionModalVisible(false)}
        locale={locale}
        onPressTnc={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.EVENT.EventDetailTicket,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        onPressRiplay={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.EVENT.EventDetailTicket,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
            personalURL: false,
          });
        }}
        onSubs={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.EVENT.EventDetailTicket,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.EVENT.EventConfirmOrder, {
            eventId: params?.eventId,
            slugId: params?.slugId,
          });
        }}
      />
    );
  }

  function renderConditionExternal() {
    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER+' &&
      getEventDetailResponse?.data?.alreadyBought
    ) {
      return (
        <View style={style.renderContentExternal.benefitContainer}>
          <Text
            textStyle="semi"
            line={19.6}
            letterSpacing={0.5}
            Size={Size.text.body2.size}>
            {trans(locale, lang, 'kamuSudahTerproteksi2')}
          </Text>
          <View>
            <View style={style.renderContentExternal.imgLogo}>
              <Image
                style={style.renderContentExternal.imgLS}
                source={LifeSaverLogoPlus}
              />
            </View>
          </View>
          <Button
            onPress={() => {
              navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                polis: {
                  policyNo: getCurrentSubsResponse?.policyNo,
                  productCode:
                    getSubscriptionDetailResponse?.planName ===
                    codeLifesaver?.lifesaver?.planName
                      ? codeLifesaver.lifesaver.planCode
                      : codeLifesaver.lifesaverplus.planCode,
                  source: codeLifesaver.productCode,
                  isDownloadSection: true,
                  statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
                },
              });
            }}
            type="linear-gradient"
            rounded>
            {trans(locale, lang, 'lihatDetailPolis1')}
          </Button>
        </View>
      );
    }
    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER' &&
      getEventDetailResponse?.data?.alreadyBought
    ) {
      return (
        <View style={style.renderContentExternal.benefitContainer}>
          <Text
            textStyle="semi"
            line={19.6}
            letterSpacing={0.5}
            Size={Size.text.body2.size}>
            {trans(locale, lang, 'kamuSudahTerproteksi2')}
          </Text>
          <View>
            <View style={style.renderContentExternal.imgLogo}>
              <Image
                style={style.renderContentExternal.imgLS}
                source={LifeSaverLogo}
              />
            </View>
          </View>

          <Button
            onPress={() => {
              navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                polis: {
                  policyNo: getCurrentSubsResponse?.policyNo,
                  productCode:
                    getSubscriptionDetailResponse?.planName ===
                    codeLifesaver?.lifesaver?.planName
                      ? codeLifesaver.lifesaver.planCode
                      : codeLifesaver.lifesaverplus.planCode,
                  source: codeLifesaver.productCode,
                  isDownloadSection: true,
                  statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
                },
              });
            }}
            type="linear-gradient"
            rounded>
            {trans(locale, lang, 'lihatDetailPolis2')}
          </Button>
        </View>
      );
    }
    return (
      <View style={style.renderContentExternal.benefitContainer}>
        <Text
          textStyle="semi"
          line={19.6}
          letterSpacing={0.5}
          Size={Size.text.body2.size}>
          {trans(locale, lang, 'polisKamuSudahAktif')}
        </Text>
        <View>
          <View style={style.renderContentExternal.imgLogo}>
            <Image
              style={style.renderContentExternal.imgLS}
              source={LifeSaverLogo}
            />
          </View>
        </View>
        <Button
          onPress={() => {
            navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
              polis: {
                policyNo: getCurrentSubsResponse?.policyNo,
                productCode:
                  getSubscriptionDetailResponse?.planName ===
                  codeLifesaver?.lifesaver?.planName
                    ? codeLifesaver.lifesaver.planCode
                    : codeLifesaver.lifesaverplus.planCode,
                source: codeLifesaver.productCode,
                isDownloadSection: true,
                statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
              },
            });
          }}
          type="linear-gradient"
          rounded>
          {trans(locale, lang, 'lihatDetailPolis2')}
        </Button>
      </View>
    );
  }

  function renderCondition() {
    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER+' &&
      getEventDetailResponse?.data?.alreadyBought
    ) {
      return (
        <View style={style.renderContent.benefitContainer}>
          <Text
            textStyle="semi"
            line={19.6}
            letterSpacing={0.5}
            Size={Size.text.body2.size}>
            {trans(locale, lang, 'kamuSudahTerproteksi1')}
          </Text>
          <View>
            <View style={style.renderContent.imgLogo}>
              <Image
                source={LifeSaverLogoPlus}
                style={style.renderContentExternal.imgLS}
              />
            </View>
            <Text
              style={style.pT24}
              textStyle="regular"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              {trans(locale, lang, 'totalMaksimumBiaya1')}{' '}
              <Text
                textStyle="semi"
                letterSpacing={0.5}
                Size={Size.text.body1.size}
                line={19.5}>
                Rp400jt
              </Text>{' '}
              {trans(locale, lang, 'dengan')}{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>inner limit.</Text>{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>Cashless</Text>{' '}
              {trans(locale, lang, 'dengan')}{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>limit</Text>{' '}
              <Text
                textStyle="semi"
                letterSpacing={0.5}
                Size={Size.text.body1.size}
                line={19.5}>
                Rp400jt
              </Text>
              .
            </Text>
          </View>

          <View style={style.pT24}>
            <Button
              onPress={() => {
                navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                  polis: {
                    policyNo: getCurrentSubsResponse?.policyNo,
                    productCode:
                      getSubscriptionDetailResponse?.planName ===
                      codeLifesaver?.lifesaver?.planName
                        ? codeLifesaver.lifesaver.planCode
                        : codeLifesaver.lifesaverplus.planCode,
                    source: codeLifesaver.productCode,
                    isDownloadSection: true,
                    statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
                  },
                });
              }}
              type="linear-gradient"
              rounded>
              {trans(locale, lang, 'lihatDetailPolis1')}
            </Button>
          </View>
          <Text
            onPress={() => {
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
              // });
              navigation.navigate(NAVIGATION.EVENT.EventMain);
            }}
            style={style.pT8}
            align="center"
            textDecorationLine="underline"
            color={Color.primary.light.primary90}
            textStyle="semi"
            letterSpacing={0.5}
            line={23.8}>
            {trans(locale, lang, 'kembaliKeDaftar1')}
          </Text>
        </View>
      );
    }
    if (
      getCurrentSubsResponse?.planName === 'LifeSAVER' &&
      getEventDetailResponse?.data?.alreadyBought
    ) {
      return (
        <View style={style.renderContent.benefitContainer}>
          <Text
            textStyle="semi"
            line={19.6}
            letterSpacing={0.5}
            Size={Size.text.body2.size}>
            {trans(locale, lang, 'kamuSudahTerproteksi2')}
          </Text>
          <View>
            <View style={style.renderContent.imgLogo}>
              <Image
                source={LifeSaverLogo}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: 95, height: 17 }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={style.pT24}
              textStyle="regular"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              {trans(locale, lang, 'totalMaksimumBiaya2')}{' '}
              <Text
                textStyle="semi"
                letterSpacing={0.5}
                Size={Size.text.body1.size}
                line={19.5}>
                Rp200jt
              </Text>{' '}
              {trans(locale, lang, 'dengan')}{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>inner limit.</Text>{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>Cashless</Text>{' '}
              {trans(locale, lang, 'dengan')}{' '}
              <Text fontStyle={lang === 'id' && 'italic'}>limit</Text>{' '}
              <Text
                textStyle="semi"
                letterSpacing={0.5}
                Size={Size.text.body1.size}
                line={19.5}>
                Rp200jt
              </Text>
              .
            </Text>
          </View>
          <View style={style.pT24}>
            <Button
              onPress={() => {
                navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                  polis: {
                    policyNo: getCurrentSubsResponse?.policyNo,
                    productCode:
                      getSubscriptionDetailResponse?.planName ===
                      codeLifesaver?.lifesaver?.planName
                        ? codeLifesaver.lifesaver.planCode
                        : codeLifesaver.lifesaverplus.planCode,
                    source: codeLifesaver.productCode,
                    isDownloadSection: true,
                    statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
                  },
                });
              }}
              type="linear-gradient"
              rounded>
              {trans(locale, lang, 'lihatDetailPolis2')}
            </Button>
          </View>
          <Text
            onPress={() => {
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
              // });
              navigation.navigate(NAVIGATION.EVENT.EventMain);
            }}
            style={style.pT8}
            align="center"
            textDecorationLine="underline"
            color={Color.primary.light.primary90}
            textStyle="semi"
            letterSpacing={0.5}
            line={23.8}>
            {trans(locale, lang, 'kembaliKeDaftar2')}
          </Text>
        </View>
      );
    }
    if (
      _.isEmpty(getCurrentSubsResponse) &&
      getEventDetailResponse?.data?.alreadyBought &&
      params?.isFreeLifeSaver
    ) {
      return (
        <View style={style.renderContent.benefitContainer}>
          <Text
            textStyle="semi"
            line={19.6}
            letterSpacing={0.5}
            Size={Size.text.body2.size}>
            {trans(locale, lang, 'selamatKamuBerpotensi')}
          </Text>
          <View style={style.renderContent.imgLogo}>
            <Image
              source={LifeSaverLogo}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 95, height: 17 }}
              resizeMode="contain"
            />
            <View style={style.renderContent.freeText}>
              <Text
                textStyle="regular"
                Size={Size.text.caption1.size}
                color={Color.main.light.white}
                letterSpacing={0.5}
                line={16.8}>
                {trans(locale, lang, 'gratis1Bulan')}
              </Text>
            </View>
          </View>
          <Text
            style={style.pT24}
            textStyle="regular"
            letterSpacing={0.5}
            Size={Size.text.body1.size}
            line={19.5}>
            {trans(locale, lang, 'totalMaksimumBiaya')}{' '}
            <Text
              textStyle="semi"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              Rp200jt
            </Text>{' '}
            {trans(locale, lang, 'dengan')}{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>inner limit.</Text>{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>Cashless</Text>{' '}
            {trans(locale, lang, 'dengan')}{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>limit</Text>{' '}
            <Text
              textStyle="semi"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              Rp200jt.
            </Text>
          </Text>
          <View style={style.pT24}>
            <Button
              onPress={() => {
                setisTermConditionModalVisible(true);
              }}
              type="linear-gradient"
              rounded>
              {trans(locale, lang, 'lanjutkan')}
            </Button>
          </View>

          <Text
            align="center"
            style={style.pT12}
            line={26.4}
            letterSpacing={0.5}
            textStyle="regular"
            color={Color.neutral.light.neutral10}>
            {trans(locale, lang, 'hanyaBulanSelanjutnya1')}
          </Text>
          <Text
            onPress={() => {
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
              // });
              navigation.navigate(NAVIGATION.EVENT.EventMain);
            }}
            style={style.pT8}
            align="center"
            textDecorationLine="underline"
            color={Color.primary.light.primary90}
            textStyle="semi"
            letterSpacing={0.5}
            line={23.8}>
            {trans(locale, lang, 'kembaliKeDaftar3')}
          </Text>
        </View>
      );
    }
    return (
      <View style={style.renderContent.benefitContainer}>
        <Text
          textStyle="semi"
          line={19.6}
          letterSpacing={0.5}
          Size={Size.text.body2.size}>
          {trans(locale, lang, 'kamuSudahTerproteksi2')}
        </Text>
        <View>
          <View style={style.renderContent.imgLogo}>
            <Image
              source={LifeSaverLogo}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 95, height: 17 }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={style.pT24}
            textStyle="regular"
            letterSpacing={0.5}
            Size={Size.text.body1.size}
            line={19.5}>
            {trans(locale, lang, 'totalMaksimumBiaya2')}{' '}
            <Text
              textStyle="semi"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              Rp200jt
            </Text>{' '}
            {trans(locale, lang, 'dengan')}{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>inner limit.</Text>{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>Cashless</Text>{' '}
            {trans(locale, lang, 'dengan')}{' '}
            <Text fontStyle={lang === 'id' && 'italic'}>limit</Text>{' '}
            <Text
              textStyle="semi"
              letterSpacing={0.5}
              Size={Size.text.body1.size}
              line={19.5}>
              Rp200jt
            </Text>
            .
          </Text>
        </View>

        <View style={style.pT24}>
          <Button
            onPress={() => {
              navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                polis: {
                  policyNo: getCurrentSubsResponse?.policyNo,
                  productCode:
                    getSubscriptionDetailResponse?.planName ===
                    codeLifesaver?.lifesaver?.planName
                      ? codeLifesaver.lifesaver.planCode
                      : codeLifesaver.lifesaverplus.planCode,
                  source: codeLifesaver.productCode,
                  isDownloadSection: true,
                  statusCode: STATUS_CODE[getCurrentSubsResponse?.status],
                },
              });
            }}
            type="linear-gradient"
            rounded>
            {trans(locale, lang, 'lihatDetailPolis2')}
          </Button>
        </View>
        <Text
          onPress={() => {
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
            // });
            navigation.navigate(NAVIGATION.EVENT.EventMain);
          }}
          style={style.pT8}
          align="center"
          textDecorationLine="underline"
          color={Color.primary.light.primary90}
          textStyle="semi"
          letterSpacing={0.5}
          line={23.8}>
          {trans(locale, lang, 'kembaliKeDaftar2')}
        </Text>
      </View>
    );
  }

  function renderItem() {
    const bannerUrl = getEventDetailResponse?.data?.banner?.filter(
      (val) => val?.position === 3
    );
    return (
      <View>
        <ImageBackground
          source={TicketFrame}
          style={style.renderContent.ticketContainer}>
          <View style={style.renderContent.ticketBanner}>
            <Image
              source={{ uri: bannerUrl?.[0]?.url }}
              style={style.renderContent.imgTicketBanner}
            />
            <View style={style.renderContent.eventTitle}>
              <Text
                textStyle="bold"
                align="center"
                line={19.5}
                letterSpacing={0.5}
                size={Size.text.body1.size}
                color={Color.neutral.light.neutral40}>
                {trans(locale, lang, 'kamuTelahTerdaftar')}{' '}
                {getEventDetailResponse?.data?.name}
              </Text>
            </View>
          </View>
          {renderCondition()}
        </ImageBackground>
      </View>
    );
  }

  function renderItemExternal() {
    const isSameDay = moment(
      getEventDetailResponse?.data?.startDateTime
    ).isSame(getEventDetailResponse?.data?.endDateTime, 'day');
    const bannerUrl = getEventDetailResponse?.data?.banner?.filter(
      (val) => val?.position === 2
    );
    return (
      <View>
        <ImageBackground
          style={style.renderContentExternal.ticketContainer}
          source={TicketHeaderFrame}>
          <View style={style.renderContentExternal.ticketBanner}>
            <Image
              source={{
                uri: bannerUrl?.[0]?.url,
              }}
              style={style.renderContentExternal.imgTicketBanner}
            />
            <View style={style.renderContentExternal.eventInfo}>
              <View style={style.renderContentExternal.eventTitle}>
                <Text
                  textStyle="bold"
                  line={21}
                  letterSpacing={-0.02}
                  size={Size.text.body2.size}
                  color={Color.neutral.light.neutral40}>
                  {/* {trans(locale, lang, 'kamuTelahTerdaftar')}{' '} */}
                  {getEventDetailResponse?.data?.name}
                </Text>
              </View>
              <View style={style.renderContentExternal.eventDate}>
                <View style={style.renderContentExternal.viewInfo}>
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
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={16.8}
                    style={style.mL5}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {isSameDay
                      ? moment(
                          getEventDetailResponse?.data?.startDateTime
                        ).format('DD MMMM YYYY')
                      : `${moment(
                          getEventDetailResponse?.data?.startDateTime
                        ).format('DD')}-${moment(
                          getEventDetailResponse?.data?.endDateTime
                        ).format('DD MMMM YYYY')}`}
                  </Text>
                </View>
                <View style={style.renderContentExternal.viewInfo}>
                  <SmallClock
                    fill={
                      getEventDetailResponse?.data?.closed
                        ? Color.neutral.light.neutral10
                        : Color.primary.light.primary90
                    }
                  />
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={16.8}
                    style={style.mL5}
                    color={Color.neutralLifeSaver.light.neutral40}>
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
            </View>
          </View>
          <View style={style.renderContentExternal.qrCodeContent}>
            <QRCode
              value={qrCodeValue?.userEventId}
              getRef={(c) => setProductQRref(c)}
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={23.8}
              align="center"
              // eslint-disable-next-line react/jsx-no-bind
              onPress={onDownloadTicket}
              style={style.mt8}
              color={Color.red.dark.red90}>
              {trans(locale, lang, 'Download Ticket')}
            </Text>
          </View>
        </ImageBackground>
        {/* <ImageBackground
          style={style.renderContentExternal.ticketProduct}
          source={TicketContentFrame}>
          {renderConditionExternal()}
        </ImageBackground> */}
      </View>
    );
  }

  function renderContent() {
    return (
      <ImageBackground
        source={ReferalBg}
        resizeMode="cover"
        imageStyle={style.renderContent.imgBGContainer}>
        {getEventDetailResponse?.data?.type === 'EXTPUBLIC'
          ? renderItemExternal()
          : renderItem()}
        <View style={[style.pT12, style.pB50]}>
          <Padder>
            {params?.isFreeLifeSaver && !getCurrentSubsResponse?.policyNo && (
              <AlertDialogue
                title={trans(locale, lang, 'menangkanLuckyDraw')}
                style={style.renderContent.alertDialogueContainer}
                textColor={Color.main.light.white}
                leftIcon={<Attention2 />}
              />
            )}
            <Text
              align="center"
              style={style.pT24}
              letterSpacing={0.5}
              line={25.2}
              textStyle="regular"
              color={Color.main.light.white}>
              {trans(locale, lang, 'bilaKesulitan')}
            </Text>
            {lang === 'id' ? (
              <Text
                align="center"
                letterSpacing={0.5}
                line={25.2}
                textStyle="semi"
                color={Color.main.light.white}>
                {trans(locale, lang, 'hubungi')}{' '}
                <Text
                  onPress={() => {
                    navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
                  }}
                  textDecorationLine="underline"
                  letterSpacing={0.5}
                  line={25.2}
                  textStyle="semi"
                  color={Color.main.light.white}>
                  {trans(locale, lang, 'customerCare')}
                </Text>{' '}
                {trans(locale, lang, 'kami')}.
              </Text>
            ) : (
              <Text
                align="center"
                letterSpacing={0.5}
                line={25.2}
                textStyle="semi"
                color={Color.main.light.white}>
                {trans(locale, lang, 'hubungi')} {trans(locale, lang, 'kami')}{' '}
                <Text
                  onPress={() => {
                    navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
                  }}
                  textDecorationLine="underline"
                  letterSpacing={0.5}
                  line={25.2}
                  textStyle="semi"
                  color={Color.main.light.white}>
                  {trans(locale, lang, 'customerCare')}
                </Text>
                .
              </Text>
            )}
          </Padder>
        </View>
      </ImageBackground>
    );
  }
  return (
    <Base
      title={trans(locale, lang, 'tiketSaya')}
      isPaddingBottom={false}
      bgImage={ReferalBg}
      isLight
      statusBarStyle="light-content"
      backgroundColor={Color.referralPage.light.darkOrange}
      onBackPress={() => {
        setIsComingFromScreen({});
        navigation.pop();
      }}>
      {renderContent()}
      {renderTermConditionModal()}
    </Base>
  );
}

export default EventDetailTicket;

EventDetailTicket.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  getEventDetailResponse: PropTypes.objectOf(Object).isRequired,
  getEventDetail: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
  getSubscriptionDetailResponse: PropTypes.arrayOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  getPoliciesResponse: PropTypes.func.isRequired,
};
