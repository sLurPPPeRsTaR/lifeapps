/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { formatCurrency } from 'ca-util/numbro';
import PropTypes from 'prop-types';
import { Shadow, Base15 as Base } from 'ca-component-container/index';
import { Button, Text, Input } from 'ca-component-generic/index';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import { BtnBack } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import { lifeSAVERwhite } from 'ca-config/Image';
import {
  NAVIGATION,
  APP,
  SUBS_TYPE,
  codeLifesaver,
  CODE_PRODUCT,
  APPLICATION_PAYMENT_ID,
  BILL_TYPE,
} from 'ca-util/constant';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import {
  GET_UPDATA_LAST_KTP_INFO_FAILED,
  GET_UPDATA_LAST_KTP_INFO_SUCCESS,
} from 'ca-module-updata/updataConstant';
import {
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_SUCCESS,
  SET_SUBMISSION_FAILED,
} from 'ca-module-lifesaver/lifesaverConstant';
import {
  SET_CREATE_BILL_EVENT_FAILED,
  SET_CREATE_BILL_EVENT_SUCCESS,
} from 'ca-module-event/eventConstant';
import { ModalErrorSubmission } from 'ca-module-lifesaver/screen/LifesaverOrderPage/components/Modal';
import locale from './locale';
import style from './style';
import { setSubmissionApi } from 'ca-module-lifesaver/lifesaverApi';
import {
  setEventBuyTicketApi,
  setValidateRefferalCodeApi,
} from 'ca-module-event/eventApi';
import { getPoliciesApi } from 'ca-module-home/homeApi';
import { setCreateBillEventApi } from 'ca-module-payments/paymentsApi';
import { getPolicySummaryApi } from 'ca-module-polis/polisApi';
import { GET_POLICY_SUMMARY_SUCCESS } from 'ca-module-polis/polisConstant';

function EventConfirmPayment(props) {
  const {
    navigation,
    lang,
    width,
    route: { params },
    setLoading,
    eventAction,
    updataAction,
    lifesaverAction,
    getEventDetailResponse,
    getUpdataLastKTPInfoResponse,
    getProductResponse,
    setSubmissionResponse,
    setSubmissionError,
    getUpdataLastKTPInfo,
    getEventDetail,
    setSubmission,
    getProduct,
    userData,
    setCreateBillEvent,
    setCreateBillEventClear,
    setCreateBillEventError,
    getPoliciesResponse,
    setEventBuyTicket,
    getPolicySummary,
    getPolicySummaryAction,
  } = props;

  moment.locale(lang);
  const product = CODE_PRODUCT.lifesaver;
  const isFocused = useIsFocused();
  const [isErrSubsVisible, setIsErrSubsVisible] = useState(false);
  const [errSubsMessage, setErrSubsMessage] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [errRef, setErrRef] = useState('');
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [polis, setPolis] = useState();

  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  useEffect(() => {
    if (!params.isEvent) {
      setProductResult(lifesaverAction);
    }
  }, [lifesaverAction, setProductResult]);

  useEffect(() => {
    createBillResult(eventAction);
  }, [eventAction, createBillResult]);

  const setProductResult = useCallback(
    (act) => {
      if (act === GET_PRODUCT_SUCCESS) {
        setSubmission({
          product: {
            productCode: getProductResponse?.productCode,
            planCode: getProductResponse?.planCode,
            type: SUBS_TYPE.start,
            price: parseInt(getProductResponse?.subsPrice, 10),
            eventCode: getEventDetailResponse?.data?.eventCode || '',
          },
          agreement: {
            tnc: 'yes',
            riplay: 'yes',
          },
        });
      }
      if (act === GET_PRODUCTS_FAILED) {
        // setConnectionFailed(true);
        // getProductClear();
      }
      if (act === SET_SUBMISSION_FAILED) {
        setIsErrSubsVisible(true);
        setErrSubsMessage(setSubmissionError?.message);
      }
      return null;
    },
    [
      getEventDetailResponse?.data?.eventCode,
      getProductResponse?.planCode,
      getProductResponse?.productCode,
      getProductResponse?.subsPrice,
      setSubmission,
      setSubmissionError?.message,
    ]
  );

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_LAST_KTP_INFO_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_UPDATA_LAST_KTP_INFO_FAILED) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const createBillResult = useCallback(
    (act) => {
      if (act === SET_CREATE_BILL_EVENT_SUCCESS) {
        setIsSubmit(false);
        navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
      }
      if (act === SET_CREATE_BILL_EVENT_FAILED) {
        setIsSubmit(false);
        if (setCreateBillEventError?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setCreateBillEventError?.message);
        }
        setCreateBillEventClear();
      }
    },
    [navigation, setCreateBillEventClear, setCreateBillEventError?.message]
  );

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getUpdataLastKTPInfo({ category: 'reminder' });
      getEventDetail({
        slugId: params?.slugId,
        eventId: params?.id,
        lang,
        userId: userData?.userId,
        accessCode: params?.accessCode,
      });
      getProduct({
        productCode: codeLifesaver.productCode,
        planCode: codeLifesaver.lifesaver.planCode,
      });
    }
  }, [
    getEventDetail,
    getProduct,
    getUpdataLastKTPInfo,
    isFocused,
    lang,
    params?.accessCode,
    params?.id,
    params?.slugId,
    product,
    setLoading,
    userData?.userId,
  ]);
  const doPaymentTypeFalse = useCallback(() => {
    // getPaymentStatusClear();
    // setAlreadySubmit(true);
    setCreateBillEvent({
      applicationId: APPLICATION_PAYMENT_ID,
      invoiceId: setSubmissionResponse?.transactionId,
      invoiceType: BILL_TYPE.premium,
      reffNo: setSubmissionResponse?.policyNo,
    });
  }, [
    setCreateBillEvent,
    setSubmissionResponse?.policyNo,
    setSubmissionResponse?.transactionId,
  ]);

  const buyTicket = () => {
    setEventBuyTicketApi({
      eventId: params.eventId,
      haveLifeSaver: false,
      accessCode: params.accessCode,
    })
      .then((res) => {
        if (res) {
          getPoliciesApi().then((res) => {
            setTimeout(() => {
              policiesGet();
            }, 5000);
          });
        }
      })
      .catch((err) => {
        if (err) {
          setIsSubmit(false);
        }
      });
  };

  const policiesGet = () => {
    getPoliciesApi()
      .then((res) => {
        if (res) {
          let x = res.data.data.findIndex(
            (item) =>
              item.status === 'ACTIVE' ||
              item.status === 'GRACE PERIOD' ||
              item.status === 'GRACE_PERIOD'
          );

          if (x > -1) {
            getPolicySummary({
              policyNo: res.data.data[x].policyNo,
              productCode: '02',
              source: '001',
            });
            setPolis(res.data.data[x]);
          }
        }
      })
      .catch((err) => {
        if (err) {
          setIsSubmit(false);
        }
      });
  };

  useEffect(() => {
    if (getPolicySummaryAction === GET_POLICY_SUMMARY_SUCCESS) {
      setIsSubmit(false);
      navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
        polis: polis,
        isFromEvent: true,
      });
    }
  }, [getPolicySummaryAction]);

  function onContinue() {
    setIsSubmit(true);
    if (params.isEvent) {
      if (
        getPoliciesResponse?.data.findIndex(
          (item) => item.status === 'ACTIVE'
        ) > -1 ||
        getPoliciesResponse?.data.findIndex(
          (item) => item.status === 'GRACE PERIOD'
        ) > -1 ||
        getPoliciesResponse?.data.findIndex(
          (item) => item.status === 'GRACE_PERIOD'
        ) > -1
      ) {
        buyTicket();
      } else {
        if (referralCode.length > 0) {
          setEventBuyTicketApi({
            eventId: params.eventId,
            haveLifeSaver: false,
            accessCode: params.accessCode,
          }).then((res) => {
            if (res) {
              setValidateRefferalCodeApi({
                referralCode: referralCode,
                ekycId: userData.ekycId,
                mobilePhoneNumber: userData.mobil,
              })
                .then((res) => {
                  setSubmissionApi({
                    product: {
                      productCode: getProductResponse?.productCode,
                      planCode: getProductResponse?.planCode,
                      type: SUBS_TYPE.start,
                      price: parseInt(getProductResponse?.subsPrice, 10),
                      eventCode: getEventDetailResponse?.data?.eventCode || '',
                    },
                    agreement: {
                      tnc: 'yes',
                      riplay: 'yes',
                    },
                    referralCode: res.data.data.referralCode,
                    referralType: res.data.data.referralType,
                  })
                    .then((res) => {
                      if (res) {
                        setCreateBillEventApi({
                          applicationId: APPLICATION_PAYMENT_ID,
                          invoiceId: res?.data.transactionId,
                          invoiceType: BILL_TYPE.premium,
                          reffNo: res?.data.policyNo,
                        }).then((res) => {
                          if (res) {
                            getPoliciesApi().then((res) => {
                              setTimeout(() => {
                                policiesGet();
                              }, 5000);
                            });
                          }
                        });
                      }
                    })
                    .catch((err) => {
                      if (err) {
                        setIsSubmit(false);
                      }
                    });
                })
                .catch((err) => {
                  if (err) {
                    setSubmissionApi({
                      product: {
                        productCode: getProductResponse?.productCode,
                        planCode: getProductResponse?.planCode,
                        type: SUBS_TYPE.start,
                        price: parseInt(getProductResponse?.subsPrice, 10),
                        eventCode:
                          getEventDetailResponse?.data?.eventCode || '',
                      },
                      agreement: {
                        tnc: 'yes',
                        riplay: 'yes',
                      },
                      referralCode: '',
                      referralType: '',
                    })
                      .then((res) => {
                        if (res) {
                          setCreateBillEventApi({
                            applicationId: APPLICATION_PAYMENT_ID,
                            invoiceId: res?.data.transactionId,
                            invoiceType: BILL_TYPE.premium,
                            reffNo: res?.data.policyNo,
                          }).then((res) => {
                            if (res) {
                              getPoliciesApi().then((res) => {
                                setTimeout(() => {
                                  policiesGet();
                                }, 5000);
                              });
                            }
                          });
                        }
                      })
                      .catch((err) => {
                        if (err) {
                          setIsSubmit(false);
                        }
                      });
                  }
                });
            }
          });
        } else {
          setEventBuyTicketApi({
            eventId: params.eventId,
            haveLifeSaver: false,
            accessCode: params.accessCode,
          }).then((res) => {
            if (res) {
              setSubmissionApi({
                product: {
                  productCode: getProductResponse?.productCode,
                  planCode: getProductResponse?.planCode,
                  type: SUBS_TYPE.start,
                  price: parseInt(getProductResponse?.subsPrice, 10),
                  eventCode: getEventDetailResponse?.data?.eventCode || '',
                },
                agreement: {
                  tnc: 'yes',
                  riplay: 'yes',
                },
                referralCode: '',
                referralType: '',
              })
                .then((res) => {
                  if (res) {
                    setCreateBillEventApi({
                      applicationId: APPLICATION_PAYMENT_ID,
                      invoiceId: res?.data.transactionId,
                      invoiceType: BILL_TYPE.premium,
                      reffNo: res?.data.policyNo,
                    }).then((res) => {
                      if (res) {
                        getPoliciesApi().then((res) => {
                          setTimeout(() => {
                            policiesGet();
                          }, 5000);
                        });
                      }
                    });
                  }
                })
                .catch((err) => {
                  if (err) {
                    setIsSubmit(false);
                  }
                });
            }
          });
        }
      }
    } else {
      doPaymentTypeFalse();
    }
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
              setErrRef('');
            }}
          />
          <Text
            color={Color.primary.light.primary60}
            size={Size.text.caption2.size}
            line={16}
            style={style.mB16}
            textStyle="semi">
            {errRef}
          </Text>
        </Padder>
        <View style={style.viewDivider} />
      </View>
    );
  }

  const onValidateVoucher = () => {
    setIsError(true);
    setErrMsg('*Voucher tidak valid');
  };
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
  function renderLifeSaver() {
    const productPrice = `Rp${formatCurrency({
      value: getEventDetailResponse?.data?.product?.price,
      mantissa: 0,
    })},-`;
    return (
      <View style={style.renderLifeSaver.parent}>
        <Shadow borderRadius={18}>
          <View style={[style.pB10]}>
            <LinearGradient
              style={style.renderLifeSaver.lifeSAVERwhiteContainer}
              colors={[
                Color.buttonGradient.light.buttonGradient0,
                Color.buttonGradient.light.buttonGradient1,
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}>
              <View style={style.renderLifeSaver.header}>
                <Image
                  source={lifeSAVERwhite}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 113, height: 21 }}
                  resizeMode="contain"
                />
                <View style={style.flexRow}>
                  <Text
                    color={Color.main.light.white}
                    line={21}
                    size={Size.text.body2.size}
                    textStyle="bold">
                    {productPrice}
                  </Text>
                  <Text
                    color={Color.main.light.white}
                    line={21}
                    size={Size.text.body2.size}
                    textStyle="regular">
                    {trans(locale, lang, 'perbulan')}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View style={style.renderLifeSaver.content}>
              <View style={style.renderLifeSaver.info}>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={21}
                  size={Size.text.caption1.size}
                  textStyle="regular">
                  {trans(locale, lang, 'durasiProteksi')}
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, '*')}
                  </Text>
                </Text>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={21}
                  size={Size.text.caption1.size}
                  letterSpacing={0.5}
                  textAlign="right"
                  textStyle="semi">
                  {trans(locale, lang, '1Bulan')}
                </Text>
              </View>
              <View style={style.renderLifeSaver.info}>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={21}
                  size={Size.text.caption1.size}
                  textStyle="regular">
                  {trans(locale, lang, 'jatuhTempoBerikutnya')}
                </Text>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={21}
                  size={Size.text.caption1.size}
                  letterSpacing={0.5}
                  textAlign="right"
                  textStyle="semi">
                  {moment(new Date()).add(1, 'M').format('DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderUserInfo() {
    return (
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
              style={style.renderUserInfo.headerName}
              textStyle="semi">
              {getUpdataLastKTPInfoResponse?.data?.name}
            </Text>
            <View style={style.mT6}>
              <View style={style.renderUserInfo.content}>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={16.8}
                  size={Size.text.caption1.size}
                  textStyle="regular">
                  {trans(locale, lang, 'nik')}
                </Text>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={16.8}
                  size={Size.text.caption1.size}
                  textStyle="semi">
                  {getUpdataLastKTPInfoResponse?.data?.idCardNumber}
                </Text>
              </View>
              <View style={style.renderUserInfo.content}>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={16.8}
                  size={Size.text.caption1.size}
                  textStyle="regular">
                  {trans(locale, lang, 'tglLahir')}
                </Text>
                <Text
                  color={Color.confirmationSummary.light.white}
                  line={16.8}
                  size={Size.text.caption1.size}
                  textStyle="semi">
                  {moment(
                    getUpdataLastKTPInfoResponse?.data?.dob,
                    'DD-MM-YYYY'
                  ).format('DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderSummary() {
    const productPrice = `Rp${formatCurrency({
      value: getEventDetailResponse?.data?.product?.price || 0,
      mantissa: 0,
    })},-`;
    const discounts = `Rp${formatCurrency({
      value: getEventDetailResponse?.data?.product?.discount || 0,
      mantissa: 0,
    })},-`;
    return (
      <View style={style.pT10}>
        <View style={style.renderUserInfo.header}>
          <Text
            color={Color.confirmationSummary.light.white}
            line={30.8}
            size={Size.text.body2.size}
            textStyle="semi">
            {trans(locale, lang, 'totalHarga')}
          </Text>
        </View>
        <View style={[style.pV16, style.pH10]}>
          <View style={style.mT6}>
            <View style={style.renderUserInfo.content}>
              <Text
                color={Color.confirmationSummary.light.white}
                line={16.8}
                size={Size.text.caption1.size}
                textStyle="regular">
                {trans(locale, lang, '1blnLS')}
              </Text>
              <Text
                color={Color.confirmationSummary.light.white}
                line={16.8}
                size={Size.text.caption1.size}
                textStyle="regular">
                {productPrice}
              </Text>
            </View>
            <View style={style.renderUserInfo.content}>
              <Text
                color={Color.confirmationSummary.light.white}
                line={16.8}
                size={Size.text.caption1.size}
                textStyle="regular">
                {trans(locale, lang, 'potonganHarga')}
              </Text>
              <Text
                color={Color.confirmationSummary.light.white}
                line={16.8}
                size={Size.text.caption1.size}
                textStyle="regular">
                -{discounts}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    // const productPrice = `Rp${formatCurrency({
    //   value: getEventDetailResponse?.data?.product?.price,
    //   mantissa: 0,
    // })},-`;
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
              {trans(locale, lang, 'gratis')}
            </Text>
          </View>
          {/* <View style={style.mb10}>
            <Text
              color={Color.confirmationSummary.light.white}
              line={16.8}
              align="right"
              size={Size.text.caption1.size}
              textStyle="regular">
              {trans(locale, lang, 'kamuAkan')}
              {` ${productPrice}`}
              {trans(locale, lang, 'perbulan')}
            </Text>
            <Text
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
              onContinue();
            }}
            type="linear-gradient">
            {trans(locale, lang, 'lanjut')}
          </Button>
        </View>
      </Shadow>
    );
  }

  const renderContent = () => {
    return (
      <View>
        <Padder>{renderLifeSaver()}</Padder>
        <View
          style={[style.viewDivider, { top: -APP.header.height / 2 - 6 + 24 }]}
        />
        <Padder>{renderUserInfo()}</Padder>
        <View style={style.viewDivider} />
        {params.isEvent && (
          <View>
            {renderReferralCode()}
            {renderInputVoucher()}
          </View>
        )}
        <Padder>{renderSummary()}</Padder>
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
          style={[style.renderLifeSaver.additionalHeader, { width: width }]}
        />
        {renderContent()}
      </Base>
      {renderFooter()}
      <ModalErrorSubmission
        {...props}
        onBackPress={() => {
          navigation.goBack();
        }}
        isVisible={isErrSubsVisible}
        message={errSubsMessage}
      />
    </View>
  );
}
export default EventConfirmPayment;

EventConfirmPayment.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getEventDetail: PropTypes.func.isRequired,
  setCreateBillEvent: PropTypes.func.isRequired,
  setCreateBillEventClear: PropTypes.func.isRequired,
  setCreateBillEventError: PropTypes.objectOf(Object).isRequired,
  setSubmission: PropTypes.func.isRequired,
  eventAction: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getEventDetailResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  getPoliciesResponse: PropTypes.objectOf(Object).isRequired,
  getProduct: PropTypes.func.isRequired,
  getProductResponse: PropTypes.objectOf(Object).isRequired,
  setSubmissionResponse: PropTypes.objectOf(Object).isRequired,
  setSubmissionError: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicket: PropTypes.func.isRequired,
  getPolicySummary: PropTypes.func.isRequired,
  getPolicySummaryAction: PropTypes.string.isRequired,
};
