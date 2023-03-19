import React, {
  useLayoutEffect,
  useEffect,
  useCallback,
  useState,
} from 'react';
import {
  View,
  ImageBackground,
  Image,
  BackHandler,
  Share,
  Platform,
  PermissionsAndroid,
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
import {
  GET_CURRENT_SUBS_FAILED,
  GET_CURRENT_SUBS_SUCCESS,
  GET_IS_USER_ELIGIBLE_SUCCESS,
  GET_IS_USER_ELIGIBLE_FAILED,
} from 'ca-module-lifesaver/lifesaverConstant';
import {
  GET_EVENT_DETAIL_FAILED,
  GET_EVENT_DETAIL_SUCCESS,
  GET_EVENT_QUOTA_FAILED,
  GET_EVENT_QUOTA_SUCCESS,
  SET_EVENT_BUYTICKET_FAILED,
  SET_EVENT_BUYTICKET_SUCCESS,
} from 'ca-module-event/eventConstant';
import _ from 'lodash';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import moment from 'moment';
import { ModalAgreement } from 'ca-module-lifesaver/screen/LifesaverMain/component/modal';
import { QRCode } from 'ca-module-event/component';
import RNFS from 'react-native-fs';
import locale from './locale';
import style from './style';

function EventSuccess(props) {
  const {
    route: { params },
    navigation,
    lang,
    getCurrentSubs,
    getCurrentSubsResponse,
    lifesaverAction,
    getEventQuota,
    getEventQuotaResponse,
    setEventBuyTicket,
    getEventDetailResponse,
    getEventDetail,
    eventAction,
    setLoading,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    setIsComingFromScreen,
    isComingFromScreen,
    setEventBuyTicketClear,
    getEventDetailData,
    userData,
    getPoliciesResponse,
    getUserEventInvoiceIdResponse,
    setEventBuyTicketResponse,
  } = props;
  const value = {
    name: `Event Ticket ${getEventDetailResponse?.data?.name}`,
    userEventId: setEventBuyTicketResponse?.data?.userEventId,
  };
  const [isTermConditionModalVisible, setisTermConditionModalVisible] =
    useState(false);
  const [qrCodeValue, setQrCodeValue] = useState(value);
  const [productQRref, setProductQRref] = useState();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    setLoading(true);
    getCurrentSubs();
    getEventDetail({
      eventId: getEventDetailData?.eventId,
      slugId: getEventDetailData?.slugId,
      lang,
      accessCode: getEventDetailData?.accessCode,
      userId: userData?.userId,
    });
    getEventQuota({
      eventId: getEventDetailData?.eventId,
    });
  }, [
    getCurrentSubs,
    getEventDetail,
    getEventDetailData,
    getEventDetailData?.accessCode,
    getEventDetailData?.eventId,
    getEventQuota,
    lang,
    setLoading,
    userData?.userId,
  ]);

  useEffect(() => {
    const goTo = () => {
      setIsComingFromScreen({});
      if (params?.isFromEvent) {
        navigation.navigate(NAVIGATION.EVENT.EventMain);
      } else if (navigation.canGoBack()) {
        navigation.pop();
      } else {
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
        // });
        navigation.navigate(NAVIGATION.EVENT.EventMain);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, params?.isFromEvent, setIsComingFromScreen]);

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
  const eventResult = useCallback(
    (act) => {
      if (act === GET_EVENT_DETAIL_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_EVENT_DETAIL_FAILED) {
        setLoading(false);
      }
      if (act === GET_EVENT_QUOTA_SUCCESS) {
        setLoading(false);
        if (getEventDetailResponse?.data?.type === 'EXTPUBLIC') {
          setEventBuyTicket({
            eventId: getEventDetailData?.eventId,
            haveLifeSaver: true,
            accessCode: getEventDetailData?.accessCode,
            voucherCode: '',
            invoiceId: params?.invoiceId,
          });
        } else if (_.isEmpty(getCurrentSubsResponse)) {
          if (getEventQuotaResponse?.data?.remainingQuotaEvent > 0) {
            setEventBuyTicket({
              eventId: getEventDetailData?.eventId,
              haveLifeSaver: false,
              accessCode: getEventDetailData?.accessCode,
            });
          }
        } else if (getEventQuotaResponse?.data?.remainingQuotaEvent > 0) {
          setEventBuyTicket({
            eventId: getEventDetailData?.eventId,
            haveLifeSaver: true,
            accessCode: getEventDetailData?.accessCode,
          });
        }
      }
      if (act === GET_EVENT_QUOTA_FAILED) {
        setLoading(false);
      }
      if (act === SET_EVENT_BUYTICKET_SUCCESS) {
        setQrCodeValue({
          ...qrCodeValue,
          userEventId: setEventBuyTicketResponse?.data?.userEventId,
        });
        getEventDetail({
          eventId: getEventDetailData?.eventId,
          slugId: getEventDetailData?.slugId,
          lang,
          accessCode: getEventDetailData?.accessCode,
          userId: userData?.userId,
        });
        getCurrentSubs();
        setLoading(false);
      }
      if (act === SET_EVENT_BUYTICKET_FAILED) {
        setLoading(false);
      }
    },
    [
      getCurrentSubs,
      getCurrentSubsResponse,
      getEventDetail,
      getEventDetailData?.accessCode,
      getEventDetailData?.eventId,
      getEventDetailData?.slugId,
      getEventDetailResponse?.data?.type,
      getEventQuotaResponse?.data?.remainingQuotaEvent,
      lang,
      params?.invoiceId,
      qrCodeValue,
      setEventBuyTicket,
      setEventBuyTicketResponse?.data?.userEventId,
      setLoading,
      userData?.userId,
    ]
  );
  const lifesaverResult = useCallback(
    (act) => {
      if (act === GET_CURRENT_SUBS_SUCCESS) {
        setLoading(false);
        if (!_.isEmpty(getCurrentSubsResponse)) {
          getSubscriptionDetail(getCurrentSubsResponse?.policyNo);
        }
      }
      if (act === GET_CURRENT_SUBS_FAILED) {
        setLoading(false);
      }
      if (act === GET_IS_USER_ELIGIBLE_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_IS_USER_ELIGIBLE_FAILED) {
        setLoading(false);
      }
    },
    [getCurrentSubsResponse, getSubscriptionDetail, setLoading]
  );

  const setShowModal = useCallback((act) => {
    if (act?.params?.isShowModal) {
      setisTermConditionModalVisible(true);
    }
  }, []);
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
            eventId: getEventDetailData?.eventId,
            slugId: getEventDetailData?.slugId,
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
            {trans(locale, lang, 'polisKamuSudahAktif')}
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
                style={style.renderContent.imgSize}
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
      getEventDetailResponse?.data?.alreadyBought
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
        {getUserEventInvoiceIdResponse?.data?.policy?.orderType !== 2 && (
          <ImageBackground
            style={style.renderContentExternal.ticketProduct}
            source={TicketContentFrame}>
            {renderConditionExternal()}
          </ImageBackground>
        )}
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
        setEventBuyTicketClear();
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: NAVIGATION.EVENT.EventMain }],
        // });
        navigation.navigate(NAVIGATION.EVENT.EventMain);
      }}>
      {renderContent()}
      {renderTermConditionModal()}
    </Base>
  );
}

export default EventSuccess;

EventSuccess.defaultProps = {};

EventSuccess.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getEventQuota: PropTypes.func.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  getEventQuotaResponse: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicket: PropTypes.func.isRequired,
  getEventDetailResponse: PropTypes.objectOf(Object).isRequired,
  getEventDetail: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  eventAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
  getSubscriptionDetailResponse: PropTypes.arrayOf(Object).isRequired,
  getUserEventInvoiceIdResponse: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicketClear: PropTypes.func.isRequired,
  getEventDetailData: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getPoliciesResponse: PropTypes.func.isRequired,
  setEventBuyTicketResponse: PropTypes.func.isRequired,
};
