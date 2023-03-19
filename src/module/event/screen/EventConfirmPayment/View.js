/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import { formatCurrency } from 'ca-util/numbro';
import PropTypes from 'prop-types';
import { Shadow, Base15 as Base } from 'ca-component-container/index';
import { Button, Input, Text } from 'ca-component-generic/index';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import { BtnBack, Warning, SuccessIcon, DeleteIcon } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import { LifeSaverLogo, LifeSaverLogoPlus } from 'ca-config/Image';
import { NAVIGATION, APP } from 'ca-util/constant';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import {
  GET_USER_EVENT_INVOICE_ID_FAILED,
  GET_USER_EVENT_INVOICE_ID_SUCCESS,
  SET_PAYMENT_EVENT_SUCCESS,
  SET_PAYMENT_EVENT_FAILED,
  SET_VALIDATE_VOUCHER_CODE_SUCCESS,
  SET_VALIDATE_VOUCHER_CODE_FAILED,
} from 'ca-module-event/eventConstant';
import locale from './locale';
import style from './style';
import {
  eventData,
  infoData,
  productData,
  totalSummaryData,
  userInfoData,
} from './constant';

function EventConfirmPayment(props) {
  const {
    navigation,
    lang,
    width,
    route: { params },
    setLoading,
    eventAction,
    getEventDetailResponse,
    getUserEventInvoiceIdResponse,
    getUpdataLastKTPInfoResponse,
    setPaymentEventResponse,
    userData,
    getUserEventInvoiceId,
    getUserEventInvoiceIdClear,
    setPaymentEvent,
    setPaymentEventClear,
    setValidateVoucherCode,
    setValidateVoucherCodeClear,
    setValidateVoucherCodeResponse,
    setValidateVoucherCodeFailed,
  } = props;

  moment.locale(lang);
  const isFocused = useIsFocused();
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [code, setCode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [nominalVoucher, setNominalVoucher] = useState(0);
  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setValidateVoucherCodeClear();
      setPaymentEventClear();

      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setPaymentEventClear, setValidateVoucherCodeClear]);
  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);
  const eventResult = useCallback(
    (act) => {
      if (act === GET_USER_EVENT_INVOICE_ID_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_USER_EVENT_INVOICE_ID_FAILED) {
        setLoading(false);
      }
      if (act === SET_PAYMENT_EVENT_SUCCESS) {
        setLoading(false);
        setValidateVoucherCodeClear();
        setIsError(false);
        setIsUsed(false);
        setIsSubmit(false);
        setNominalVoucher(0);
        setCode('');
        navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
          isFromEvent: true,
          url: setPaymentEventResponse?.data?.redirectUrl,
          invoiceId: getUserEventInvoiceIdResponse?.data?.id,
          reffNo: getUserEventInvoiceIdResponse?.data?.payment?.policyNumber,
          eventId: getEventDetailResponse?.data?.id,
        });
      }
      if (act === SET_PAYMENT_EVENT_FAILED) {
        setLoading(false);
        setIsSubmit(false);
      }
      if (act === SET_VALIDATE_VOUCHER_CODE_SUCCESS) {
        setLoading(false);
        setIsUsed(true);
        setNominalVoucher(setValidateVoucherCodeResponse?.data?.discount);
      }
      if (act === SET_VALIDATE_VOUCHER_CODE_FAILED) {
        setLoading(false);
        if (
          setValidateVoucherCodeFailed?.message?.includes('DATA_NOT_EXISTS')
        ) {
          setIsError(true);
          setErrMsg(trans(locale, lang, 'voucherNotFound'));
        }
      }
    },
    [
      getEventDetailResponse?.data?.id,
      getUserEventInvoiceIdResponse?.data?.id,
      getUserEventInvoiceIdResponse?.data?.payment?.policyNumber,
      lang,
      navigation,
      setLoading,
      setPaymentEventResponse?.data?.redirectUrl,
      setValidateVoucherCodeClear,
      setValidateVoucherCodeFailed?.message,
      setValidateVoucherCodeResponse?.data?.discount,
    ]
  );

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      if (params !== '' || params !== undefined) {
        getUserEventInvoiceId({
          eventId: params?.eventId,
        });
      }
    }
  }, [
    getEventDetailResponse.id,
    getUserEventInvoiceId,
    isFocused,
    params,
    params?.eventId,
    setLoading,
  ]);
  useEffect(() => {
    if (!isFocused) {
      // getUserEventInvoiceIdClear();
    }
  }, [getUserEventInvoiceIdClear, isFocused]);
  function onValidateVoucher() {
    setErrMsg('');
    setIsError(false);
    setIsUsed(false);
    setNominalVoucher(0);
    setValidateVoucherCodeClear();
    if (isError || isUsed) {
      setCode('');
    } else {
      setLoading(true);
      setValidateVoucherCode({
        voucherCode: code,
        eventId: getEventDetailResponse?.data?.id,
        invoiceId: getUserEventInvoiceIdResponse?.data?.id,
      });
    }
  }
  function onPressPayment() {
    setIsSubmit(true);
    setPaymentEvent({
      userEventInvoiceId: getUserEventInvoiceIdResponse?.data?.id,
      voucherCode: isError ? '' : code,
      referralCode: referralCode,
    });
  }
  function renderStatusBar() {
    return (
      <StatusBar
        translucent
        backgroundColor={
          isDark
            ? Color.whiteOpacity.light.whiteOpacity75
            : Color.red.light.D71920
        }
        barStyle={isDark ? 'dark-content' : 'light-content'}
      />
    );
  }
  function renderHeader() {
    return (
      <View
        style={[
          style.renderHeader.header.container,
          {
            height: APP.header.height,
            backgroundColor: isDark
              ? Color.main.light.white
              : Color.red.light.D71920,
          },
        ]}>
        <Text
          align="right"
          color={isDark ? Color.main.light.black : Color.main.light.white}
          size={Size.text.body1.size}
          line={25.6}
          textStyle="bold"
          letterSpacing={0.5}>
          {trans(locale, lang, 'konfirmasi')}
        </Text>
        <TouchableOpacity
          style={style.renderHeader.btnBack}
          onPress={() => {
            setValidateVoucherCodeClear();
            if (navigation.canGoBack()) {
              navigation.pop();
            } else {
              navigation.replace(NAVIGATION.EVENT.EventMain);
            }
          }}>
          <BtnBack
            fill={isDark ? Color.main.light.black : Color.main.light.white}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderEventInfo() {
    return (
      <View>
        {getUserEventInvoiceIdResponse?.data?.policy?.gracePeriod && (
          <View style={style.gracePeriod.warning}>
            <Warning width={16} />
            <Text
              textStyle="medium"
              line={18}
              size={Size.text.caption1.size}
              style={style.mH10}>
              {`${
                trans(locale, lang, 'agarTetapProteksi') +
                moment(
                  getUserEventInvoiceIdResponse?.data?.product?.nextBillingDate
                ).format('DD MMM YYYY')
              } pukul ${moment(
                getUserEventInvoiceIdResponse?.data?.product?.nextBillingDate
              ).format('HH:mm')} WIB`}
            </Text>
          </View>
        )}
        <View style={style.mT16}>
          {infoData(getUserEventInvoiceIdResponse?.data, lang)
            ?.filter((value) => value?.show)
            ?.map((value) => {
              return (
                <View>
                  <View style={style?.renderDetailEvent?.infoLS?.header}>
                    <Text
                      color={Color.primary.light.primary90}
                      size={Size.text.body2.size}
                      textStyle="semi">
                      {trans(locale, lang, value?.primary)}
                    </Text>
                    <Text
                      textStyle="medium"
                      line={18}
                      size={Size.text.caption1.size}>
                      {value?.title}
                    </Text>
                  </View>
                  {value?.details?.map((val) => {
                    return (
                      <View style={style?.renderDetailEvent?.infoLS?.content}>
                        <Text
                          textStyle="medium"
                          line={18}
                          size={Size.text.caption2.size}>
                          •{'  '}
                        </Text>
                        <Text
                          textStyle="medium"
                          line={18}
                          size={Size.text.caption2.size}>
                          {val?.content}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </View>
      </View>
    );
  }

  function renderDetailEvent() {
    return (
      <View style={style.renderDetailEvent.parent}>
        <Padder>
          <Shadow borderRadius={13}>
            <View style={[style.pB10]}>
              <LinearGradient
                style={style.renderDetailEvent.lifeSAVERwhiteContainer}
                colors={[
                  Color.buttonGradient.light.buttonGradient0,
                  Color.buttonGradient.light.buttonGradient1,
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <View style={style.renderDetailEvent.header}>
                  <Text
                    color={Color.main.light.white}
                    line={30}
                    size={Size.text.h6.size}
                    textStyle="bold">
                    {getEventDetailResponse?.data?.name}
                  </Text>
                  {/* Hari 1 */}
                  {/* <Text
                  color={Color.main.light.white}
                  line={21}
                  size={Size.text.body2.size}
                  textStyle="bold">
                  {totalPrice}
                </Text> */}
                </View>
              </LinearGradient>
              <View style={style.renderDetailEvent.content}>
                {eventData(
                  getUserEventInvoiceIdResponse?.data,
                  getEventDetailResponse?.data,
                  lang
                )?.map((value) => {
                  return (
                    <View
                      style={[
                        style.renderDetailEvent.info,
                        // eslint-disable-next-line react-native/no-inline-styles
                        { paddingTop: value?.title === '' ? 0 : 10 },
                      ]}>
                      <Text
                        color={Color.confirmationSummary.light.white}
                        line={21}
                        size={Size.text.caption1.size}
                        textStyle="regular">
                        {value?.title}
                      </Text>
                      <Text
                        color={Color.confirmationSummary.light.white}
                        line={21}
                        size={Size.text.caption1.size}
                        letterSpacing={0.5}
                        textAlign="right"
                        textStyle="semi">
                        {value?.data}
                      </Text>
                    </View>
                  );
                })}
                {getUserEventInvoiceIdResponse?.data?.policy?.orderType !==
                  2 && <View style={style.renderDetailEvent.viewDivider} />}
                {productData(getUserEventInvoiceIdResponse?.data, lang)?.map(
                  (value) => {
                    if (
                      getUserEventInvoiceIdResponse?.data?.policy?.orderType !==
                      2
                    ) {
                      return (
                        <View style={style.renderDetailEvent.info}>
                          {value?.title === 'product' ? (
                            <View style={style.flexRow}>
                              <Image
                                source={
                                  getUserEventInvoiceIdResponse?.data?.product
                                    ?.planCode === '02'
                                    ? LifeSaverLogo
                                    : LifeSaverLogoPlus
                                }
                                style={style.renderDetailEvent.imgLS}
                              />
                              <Text
                                color={Color.primary.light.primary90}
                                size={Size.text.body2.size}
                                textStyle="semi">
                                {trans(locale, lang, value?.primary)}
                              </Text>
                            </View>
                          ) : (
                            <View style={style.flexRow}>
                              <Text
                                color={Color.confirmationSummary.light.white}
                                line={21}
                                size={Size.text.caption1.size}
                                textStyle="regular">
                                {value?.title}
                              </Text>
                              <Text
                                color={Color.confirmationSummary.light.white}
                                size={Size.text.body2.size}
                                textStyle="semi">
                                {trans(locale, lang, value?.primary)}
                              </Text>
                            </View>
                          )}
                          <View style={style.renderDetailEvent.amountLS}>
                            <Text
                              color={Color.confirmationSummary.light.white}
                              line={21}
                              size={Size.text.caption1.size}
                              letterSpacing={0.5}
                              textStyle="semi">
                              {value?.data}
                            </Text>
                            {/* <Text
                            color={Color.greenActive.light.color}
                            line={18}
                            style={style.mL5}
                            size={Size.text.caption1.size}
                            textStyle="semi">
                            {value?.finalPrice}
                          </Text> */}
                          </View>
                        </View>
                      );
                    }
                    return null;
                  }
                )}
              </View>
            </View>
          </Shadow>
          {renderEventInfo()}
        </Padder>
        <View
          style={[
            style.viewDivider,
            { marginTop: -APP.header.height / 2 - 6 + 24 },
          ]}
        />
      </View>
    );
  }
  function renderUserInfo() {
    return (
      <View>
        <Padder>
          <View style={style.pB16}>
            <View style={style.renderUserInfo.header}>
              <Text
                color={Color.confirmationSummary.light.white}
                line={30.8}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, 'dataDiri')}
              </Text>
              <Text
                color={Color.confirmationSummary.light.white}
                line={13.2}
                style={style.mL8}
                size={Size.text.caption1.size}
                textStyle="regular">
                {trans(locale, lang, 'berdasarkanAkun')}
              </Text>
            </View>
            <Shadow borderRadius={13}>
              <View style={[style.pV16, style.pH16]}>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={30.8}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {getUpdataLastKTPInfoResponse?.data?.name}
                </Text>
                <View style={style.mT6}>
                  {userInfoData(getUpdataLastKTPInfoResponse?.data, lang)?.map(
                    (value) => {
                      return (
                        <View style={style.renderUserInfo.content}>
                          <Text
                            color={Color.confirmationSummary.light.white}
                            line={16.8}
                            size={Size.text.caption1.size}
                            textStyle="regular">
                            {value?.title}
                          </Text>
                          <Text
                            color={Color.confirmationSummary.light.white}
                            line={16.8}
                            size={Size.text.caption1.size}
                            textStyle="semi">
                            {value?.data}
                          </Text>
                        </View>
                      );
                    }
                  )}
                </View>
              </View>
            </Shadow>
          </View>
        </Padder>
        <View style={style.viewDivider} />
      </View>
    );
  }
  function renderInputVoucher() {
    return (
      <View style={style.mT8}>
        <Padder>
          <Text
            color={Color.confirmationSummary.light.white}
            line={30.8}
            size={Size.text.body2.size}
            textStyle="semi">
            {trans(locale, lang, 'punyaVoucher')}
          </Text>
          <View>
            <Input
              value={code}
              textAlign="left"
              placeholder={trans(locale, lang, 'masukkankodeVoucher')}
              // maxLength={6}
              disabled={isError || isUsed}
              height={55}
              handleSuffixIcon={() => {
                if (code?.length > 0) {
                  onValidateVoucher();
                }
              }}
              suffixIcon={
                <Button
                  disabled={code?.length < 1}
                  onPress={() => {
                    if (code?.length > 0) {
                      onValidateVoucher();
                    }
                  }}
                  height={28}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    borderRadius: 6,
                    backgroundColor:
                      code?.length < 1
                        ? Color.grayButton.light.grayButton
                        : Color.red.light.D71920,
                  }}>
                  <Text
                    color={
                      code?.length < 1
                        ? Color.main.light.black
                        : Color.main.light.white
                    }
                    size={Size.text.caption1.size}
                    line={18}>
                    {isError || isUsed
                      ? trans(locale, lang, 'hapus')
                      : trans(locale, lang, 'gunakan')}
                  </Text>
                </Button>
              }
              suffixContent={isUsed && <SuccessIcon style={style.mH5} />}
              onChangeText={(txt) => {
                setCode(txt);
                setErrMsg('');
                setIsError(false);
                setIsUsed(false);
              }}
            />
            {/* <View
            style={{
              position: 'absolute',
              right: 12,
              justifyContent: 'center',
              height: 57,
            }}>

          </View> */}
          </View>
          <Text
            color={Color.primary.light.primary60}
            size={Size.text.caption2.size}
            line={16}
            style={style.mB16}
            textStyle="semi">
            {errMsg}
          </Text>
        </Padder>
        <View style={style.viewDivider} />
      </View>
    );
  }
  function renderReferralCode() {
    return (
      <View style={style.mT16}>
        <Padder style={style.mB16}>
          <Text
            color={Color.confirmationSummary.light.white}
            line={30.8}
            size={Size.text.body2.size}
            textStyle="semi">
            {trans(locale, lang, 'punyaReferral')}
          </Text>
          <Input
            value={referralCode}
            textAlign="left"
            placeholder={trans(locale, lang, 'masukkankodeReferral')}
            maxLength={10}
            height={55}
            onChangeText={(txt) => {
              setReferralCode(txt);
            }}
          />
        </Padder>
        <View style={style.viewDivider} />
      </View>
    );
  }

  function renderSummary() {
    const conditionLine = (val) => {
      // eslint-disable-next-line no-nested-ternary
      return val?.key === 'header' ? 30.8 : val?.key === 'info' ? null : 24;
    };
    return (
      <View style={style.pT16}>
        <Padder>
          {totalSummaryData(
            getUserEventInvoiceIdResponse?.data,
            getEventDetailResponse?.data,
            setValidateVoucherCodeResponse?.data,
            lang
          )?.map((value) => {
            return (
              <View style={style.renderDetailEvent.header}>
                <View>
                  <Text
                    color={
                      value.type
                        ? Color.greenEventPrice.light.color
                        : Color.confirmationSummary.light.white
                    }
                    line={conditionLine(value)}
                    size={
                      value?.key === 'header'
                        ? Size.text.body2.size
                        : Size.text.caption1.size
                    }
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ marginTop: value?.key === 'info' ? 10 : 0 }}
                    textStyle={
                      // eslint-disable-next-line no-nested-ternary
                      value?.key === 'header'
                        ? 'semi'
                        : value?.key === 'info'
                        ? 'italic'
                        : 'regular'
                    }>
                    {value?.title}
                    {value?.title2 && (
                      <Text
                        color={Color.confirmationSummary.light.white}
                        line={24}
                        letterSpacing={0.5}
                        size={Size.text.caption1.size}
                        textStyle="italic">
                        {value?.title2}
                      </Text>
                    )}
                  </Text>
                </View>
                <Text
                  color={
                    value?.key || value.type
                      ? Color.greenEventPrice.light.color
                      : Color.confirmationSummary.light.white
                  }
                  line={24}
                  size={Size.text.caption1.size}
                  textStyle="regular">
                  {value?.data}
                </Text>
              </View>
            );
          })}
          {/* <View style={{ padding: 8 }}>
          <Text>{trans(locale, lang, 'selamat')}</Text>
        </View> */}
        </Padder>
      </View>
    );
  }
  function renderFooter() {
    const price = getUserEventInvoiceIdResponse?.data?.total - nominalVoucher;
    const totalprice = `Rp${formatCurrency({
      value: getUserEventInvoiceIdResponse?.data?.total - nominalVoucher || 0,
      mantissa: 0,
    })},-`;
    return (
      <Shadow borderRadius={1}>
        <View style={style.renderFooter.parent}>
          <View style={style.renderFooter.contentTotal}>
            <Text
              color={Color.mediumGray.light.mediumGray}
              line={30}
              size={Size.text.body2.size}
              textStyle="semi">
              {trans(locale, lang, 'Total')}
            </Text>
            <Text
              color={Color.greenActive.light.color}
              line={29}
              size={Size.text.h6.size}
              textStyle="semi">
              {totalprice}
            </Text>
          </View>
          {/* <View style={style.mb10}>
            <Text
              color={Color.confirmationSummary.light.white}
              line={16.8}
              align="right"
              size={Size.text.caption1.size}
              textStyle="regular">
              {trans(locale, lang, 'pembayaranSetiapBulan')}
            </Text> */}
          {/* <Text
              color={Color.confirmationSummary.light.white}
              line={16.8}
              align="right"
              size={Size.text.caption1.size}
              textStyle="regular">
              {trans(locale, lang, 'kamuDapatBerhenti')}
            </Text>
          </View> */}
          <Button
            loading={isSubmit}
            onPress={() => {
              onPressPayment();
            }}
            type="linear-gradient">
            {trans(locale, lang, 'bayarSekarang')}
          </Button>
        </View>
      </Shadow>
    );
  }

  const renderContent = () => {
    return (
      <View>
        {renderDetailEvent()}
        {renderUserInfo()}
        {renderReferralCode()}
        {renderInputVoucher()}
        {renderSummary()}
      </View>
    );
  };
  return (
    <View style={style.flex}>
      <Base
        width={width}
        isScroll
        animatedOnlyHeader
        onChangeHeaderToDark={(val) => setIsDark(val)}
        renderHeader={renderHeader()}
        backgroundColor={Color.greyBackround.dark.greyBackground}>
        {renderStatusBar()}
        <View
          style={[style.renderDetailEvent.additionalHeader, { width: width }]}
        />
        {renderContent()}
      </Base>
      {renderFooter()}
    </View>
  );
}
export default EventConfirmPayment;

EventConfirmPayment.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  eventAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getEventDetailResponse: PropTypes.objectOf(Object).isRequired,
  setPaymentEventResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  getUserEventInvoiceIdResponse: PropTypes.objectOf(Object).isRequired,
  setValidateVoucherCodeResponse: PropTypes.objectOf(Object).isRequired,
  setValidateVoucherCodeFailed: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getUserEventInvoiceId: PropTypes.func.isRequired,
  getUserEventInvoiceIdClear: PropTypes.func.isRequired,
  setPaymentEvent: PropTypes.func.isRequired,
  setPaymentEventClear: PropTypes.func.isRequired,
  setValidateVoucherCode: PropTypes.func.isRequired,
  setValidateVoucherCodeClear: PropTypes.func.isRequired,
};
