import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import {
  InformationOutline,
  ChevronRight,
  CircleCeklisIcon,
  CircleChevronDown,
  ClockPending,
  ClockCircle,
  MoreIcon,
  Warning,
  KreditNotActive,
  ArrowDown2Black,
  CircleArrrowGray,
} from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import Base from 'ca-component-container/Base';
import {
  GET_PAYMENT_METHOD_FAILED,
  GET_PAYMENT_STATUS_FAILED,
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import {
  BILLING_STATUS,
  codeLifesaver,
  NAVIGATION,
  PAYMENT_METHOD,
  POLICY_STATUS,
  PRODUCT,
  CODE_PRODUCT,
  STATUS_CODE,
  APPLICATION_PAYMENT_ID_RENEWAL,
  BILL_TYPE,
  PROPOSAL_STATUS,
} from 'ca-util/constant';
import {
  GET_SUBSCRIPTION_DETAIL_FAILED,
  GET_SUBSCRIPTION_DETAIL_SUCCESS,
  GET_SUBSCRIPTIONS_FAILED,
  SET_RESUBSCRIBE_SUCCESS,
  SET_RESUBSCRIBE_FAILED,
} from 'ca-module-subs/subsConstant';
import Size from 'ca-config/Size';
import Shadow from 'ca-component-container/Shadow';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import PaymentsDialog from 'ca-module-payments/PaymentsDialog';
import ConnectionFailed from 'ca-component-lifesaver/ConnectionFailed';
import { formatDate } from 'ca-util/format';
import { formatNumber } from 'ca-util/numbro';
import { LifesaverChangePaket } from 'ca-module-lifesaver/screen';
import { diffPolicyDueDate, useMount } from 'ca-util/common';
import { lifesaverLogo } from 'ca-module-subs/components/LifeSaverLogo';
import { ModalAgreement } from 'ca-module-lifesaver/screen/LifesaverMain/component/modal';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import moment from 'moment/min/moment-with-locales';
import { ModalGracePeriod, ModalSuccessPayment } from './component/modal';
import locale from './locale';
import style from './style';

function SubsDetail(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    getSubscriptionDetailClear,
    getSubscriptions,
    getSubscriptionsClear,
    getSubscriptionsResponse,
    getPaymentMethodResponse,
    getPaymentMethod,
    getPaymentMethodClear,
    paymentsAction,
    setLoading,
    setResubscribe,
    getProduct,
    setPlanCode,
    subsAction,
    route,
    setIsComingFromScreen,
    isComingFromScreen,
    setIsShowModalInternalServerError,
    setIsShowModalComingSoon,
    setCreateBill,
    setCreateBillClear,
    getProductResponse,
    getPaymentStatusClear,
    setCreateBillError,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [paymentsVisible, setPaymentVisible] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [show, setShow] = useState(false);
  const [isDowngradeVisible, setIsDowngradeVisible] = useState(false);
  const [isGracePeriodModalVisible, setisGracePeriodModalVisible] =
    useState(false);
  const [isShowModalAgreement, setIsShowModalAgreement] = useState(false);
  const [isShowModalSuccessPayment, setIsShowModalSuccessPayment] =
    useState(false);
  const isFocused = useIsFocused();
  const [alreadySubmit, setAlreadySubmit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const policyNo = useMemo(() => {
    return route?.params?.policyNo;
  }, [route?.params?.policyNo]);

  const product = useMemo(() => {
    return CODE_PRODUCT[getSubscriptionDetailResponse?.planName];
  }, [getSubscriptionDetailResponse?.planName]);

  const isSuccessPayment = useMemo(() => {
    return route?.params?.isSuccessPayment;
  }, [route?.params?.isSuccessPayment]);

  useMount(() => {
    setShow(true);
    setLoading(true);
  });

  useEffect(() => {
    if (product) {
      getProduct({
        productCode: codeLifesaver.productCode,
        planCode: codeLifesaver[product].planCode,
      });
      setPlanCode(codeLifesaver[product].planCode);
    }
  }, [getProduct, product, setPlanCode]);

  useEffect(() => {
    if (isSuccessPayment) {
      setIsShowModalSuccessPayment(true);
    }
  }, [isSuccessPayment]);

  useEffect(() => {
    if (isFocused) {
      getPaymentMethod({});
      getSubscriptions({
        page: 1,
        limit: 100,
      });
    }
    if (isFocused && policyNo) {
      getSubscriptionDetail(policyNo);
    }

    if (isFocused && isComingFromScreen?.screen) {
      setShowModal({
        isComingFromScreen,
      });
    }
  }, [
    getSubscriptionDetail,
    getSubscriptions,
    policyNo,
    isComingFromScreen,
    setShowModal,
    isFocused,
    getPaymentMethod,
    route.params,
    isSuccessPayment,
  ]);

  useFocusEffect(() => {
    getSubsActionResult(subsAction);
  });

  useFocusEffect(() => {
    setPaymentResult(paymentsAction);
  });

  const getSubsActionResult = useCallback(
    (act) => {
      if (act === GET_SUBSCRIPTION_DETAIL_SUCCESS) {
        setShow(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (act === SET_RESUBSCRIBE_SUCCESS) {
        getSubscriptions({
          page: 1,
          limit: 100,
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (act === GET_SUBSCRIPTIONS_FAILED) {
        setConnectionFailed(true);
        getSubscriptionsClear();
      }
      if (act === GET_SUBSCRIPTION_DETAIL_FAILED) {
        setConnectionFailed(true);
        getSubscriptionDetailClear();
      }
      if (act === SET_RESUBSCRIBE_FAILED) {
        setIsShowModalInternalServerError(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    },
    [
      getSubscriptionDetailClear,
      getSubscriptions,
      getSubscriptionsClear,
      setIsShowModalInternalServerError,
      setLoading,
    ]
  );

  const setPaymentResult = useCallback(
    (act) => {
      if (act === SET_CREATE_BILL_SUCCESS) {
        setTimeout(() => {
          setAlreadySubmit(false);
          setLoading(false);
        }, 2000);
        navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
          callback: NAVIGATION.SUBS.SubsDetail,
          callbackParams: route?.params,
        });
      }
      if (act === SET_CREATE_BILL_FAILED) {
        if (setCreateBillError?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setCreateBillError?.message);
        }
        setAlreadySubmit(false);
        setCreateBillClear();
      }
      if (act === GET_PAYMENT_STATUS_FAILED) {
        getPaymentStatusClear();
      }
      if (act === GET_PAYMENT_METHOD_FAILED) {
        setConnectionFailed(true);
        getPaymentMethodClear();
      }
    },
    [
      getPaymentMethodClear,
      getPaymentStatusClear,
      navigation,
      route?.params,
      setCreateBillClear,
      setCreateBillError?.message,
      setLoading,
    ]
  );

  const setShowModal = useCallback(
    (call) => {
      if (call.isComingFromScreen?.params?.isShowModal) {
        return setIsShowModalAgreement(true);
      }
    },
    [navigation, setIsComingFromScreen]
  );

  const doPaymentV2 = useCallback(() => {
    getPaymentStatusClear();
    setLoading(true);
    setAlreadySubmit(true);
    setCreateBill({
      isRenewal: true,
      data: {
        applicationId: APPLICATION_PAYMENT_ID_RENEWAL,
        billType: BILL_TYPE.premium,
        reffNo: policyNo,
        language: lang,
      },
    });
  }, [getPaymentStatusClear, policyNo, lang, setCreateBill, setLoading]);

  const tabBar = useMemo(() => {
    if (
      getSubscriptionDetailResponse?.planName ===
      PRODUCT.LIFESAVER.LIFESAVER_PLUS
    ) {
      return [
        {
          label: trans(locale, lang, 'batalkanLangganan'),
          onClick: () => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileUnsubscribe, {
              policyNo: policyNo,
              productName:
                getSubscriptionsResponse?.getActiveSubs[0]?.productName,
              planName: getSubscriptionDetailResponse?.planName,
            });
          },
        },
        {
          label: trans(locale, lang, 'gantiPaket'),
          onClick: () => {
            setIsShowModalComingSoon(true);
          },
        },
      ];
    }
    return [
      {
        label: trans(locale, lang, 'batalkanLangganan'),
        onClick: () => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileUnsubscribe, {
            policyNo: policyNo,
            productName:
              getSubscriptionsResponse?.getActiveSubs[0]?.productName,
            planName: getSubscriptionDetailResponse?.planName,
          });
        },
      },
    ];
  }, [
    getSubscriptionDetailResponse?.planName,
    getSubscriptionsResponse?.getActiveSubs,
    lang,
    navigation,
    policyNo,
    setIsShowModalComingSoon,
  ]);

  function renderStatus(status) {
    if (
      status === POLICY_STATUS.active &&
      getSubscriptionsResponse?.getActiveSubs[0]?.isSubscribe === false
    ) {
      return (
        <View style={style.product.langgananTerminate}>
          <ClockPending />
          <Text
            textStyle="medium"
            color={Color.primary.light.primary90}
            style={style.ml8}>
            {trans(locale, lang, 'berakhir')}
            {diffPolicyDueDate(getSubscriptionDetailResponse?.policyDueDate)}
            <Text
              textStyle="medium"
              color={Color.primary.light.primary90}
              style={style.ml8}>
              {trans(locale, lang, 'hari')}
            </Text>
          </Text>
        </View>
      );
    }

    if (status === POLICY_STATUS.active) {
      return (
        <View style={style.product.langgananAktif}>
          <CircleChevronDown />
          <Text
            textStyle="medium"
            color={Color.greenActive[colorScheme].color}
            style={style.ml8}>
            {trans(locale, lang, getSubscriptionDetailResponse?.status)}
          </Text>
        </View>
      );
    }

    if (
      status === POLICY_STATUS.lapse ||
      status === POLICY_STATUS.submit ||
      status === POLICY_STATUS.terminate
    ) {
      return (
        <View style={style.product.langgananInActive}>
          <CircleArrrowGray />
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral40}
            style={style.ml8}>
            {trans(locale, lang, getSubscriptionDetailResponse?.status)}
          </Text>
        </View>
      );
    }

    if (status === POLICY_STATUS.gracePeriod) {
      return (
        <View style={style.product.langgananGracePeriod}>
          <ClockCircle />
          <Text
            textStyle="medium"
            color={Color.secondary.light.secondary90}
            style={style.ml8}>
            {trans(locale, lang, getSubscriptionDetailResponse?.status)}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderButtonForStatus(status, benefit) {
    if (
      status === POLICY_STATUS.active &&
      getSubscriptionsResponse?.getActiveSubs[0]?.isSubscribe === false
    ) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.mt10}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'aktifkan')}
          </Text>
          <View style={style.billing.warning}>
            <Warning width={16} />
            <Text
              style={style.ml10}
              textStyle="medium"
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'masihBisa')}
              <Text textStyle="bold" size={Size.text.caption1.size}>
                {formatDate(
                  new Date(
                    getSubscriptionsResponse?.getActiveSubs[0]?.policyDueDate
                  ),
                  lang
                )}
              </Text>
            </Text>
          </View>
          <View style={style.mt3}>
            <Button
              rounded="lg"
              onPress={() => {
                setIsShowModalAgreement(true);
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'aktifkanLagi')}
              </Text>
            </Button>
          </View>
          <Text
            textStyle="medium"
            style={style.mt10}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }

    if (
      status === POLICY_STATUS.active &&
      benefit === codeLifesaver.lifesaver.planName
    ) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.mt10}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'upgrade')}
          </Text>
          <View style={style.mt10}>
            {getSubscriptionDetailResponse?.isNewInvoice ? (
              <Button
                rounded="lg"
                disabled={alreadySubmit}
                onPress={() => {
                  doPaymentV2();
                }}
                type="linear-gradient">
                <Text
                  textStyle="semi"
                  color={Color.whiteCard[colorScheme].color}>
                  {trans(locale, lang, 'bayarSekarang')}
                </Text>
              </Button>
            ) : (
              <Button
                rounded="lg"
                onPress={() => {
                  // navigation.navigate(NAVIGATION.LIFESAVER.DetailProduct, {
                  //   product: 'lifesaverplus',
                  //   from: 'upgrade',
                  //   recurring:
                  //     // eslint-disable-next-line no-unneeded-ternary
                  //     getSubscriptionDetailResponse?.payment?.paymentMethod ===
                  //     'RECURRING'
                  //       ? true
                  //       : false,
                  // });
                  setIsShowModalComingSoon(true);
                }}
                type="linear-gradient">
                <Text
                  textStyle="semi"
                  color={Color.whiteCard[colorScheme].color}>
                  {trans(locale, lang, 'upgradePaket')}
                </Text>
              </Button>
            )}
          </View>
          <Text
            textStyle="medium"
            style={style.mt10}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }

    if (
      status === POLICY_STATUS.active &&
      benefit === codeLifesaver.lifesaverplus.planName
    ) {
      return (
        <View>
          {getSubscriptionDetailResponse?.isNewInvoice ? (
            <View style={style.mt10}>
              <Button
                rounded="lg"
                disabled={alreadySubmit}
                onPress={() => {
                  doPaymentV2();
                }}
                type="linear-gradient">
                <Text
                  textStyle="semi"
                  color={Color.whiteCard[colorScheme].color}>
                  {trans(locale, lang, 'bayarSekarang')}
                </Text>
              </Button>
            </View>
          ) : (
            <View>
              <Text
                textStyle="medium"
                line={18}
                style={style.mt10}
                color={Color.neutralLifeSaver[colorScheme].neutral60}
                size={Size.text.caption1.size}>
                {trans(locale, lang, 'maksimum')}
              </Text>
            </View>
          )}
          <Text textStyle="medium" line={18} size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }

    if (
      status === POLICY_STATUS.active &&
      (benefit === codeLifesaver.lifesaverpos.planName ||
        benefit === codeLifesaver.lifesaverpos.planName2)
    ) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.mt10}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'upgrade')}
          </Text>
          <View style={style.mt10}>
            {getSubscriptionDetailResponse?.isNewInvoice ? (
              <Button
                rounded="lg"
                disabled={alreadySubmit}
                onPress={() => {
                  doPaymentV2();
                }}
                type="linear-gradient">
                <Text
                  textStyle="semi"
                  color={Color.whiteCard[colorScheme].color}>
                  {trans(locale, lang, 'bayarSekarang')}
                </Text>
              </Button>
            ) : (
              <Button
                rounded="lg"
                onPress={() => {
                  // navigation.navigate(NAVIGATION.LIFESAVER.DetailProduct, {
                  //   product: 'lifesaverplus',
                  //   from: 'upgrade',
                  //   recurring:
                  //     // eslint-disable-next-line no-unneeded-ternary
                  //     getSubscriptionDetailResponse?.payment?.paymentMethod ===
                  //     'RECURRING'
                  //       ? true
                  //       : false,
                  // });
                  setIsShowModalComingSoon(true);
                }}
                type="linear-gradient">
                <Text
                  textStyle="semi"
                  color={Color.whiteCard[colorScheme].color}>
                  {trans(locale, lang, 'upgradePaket')}
                </Text>
              </Button>
            )}
          </View>
          <Text
            textStyle="medium"
            style={style.mt10}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }

    if (status === POLICY_STATUS.terminate) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.my6}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'proteksiBerakhir')}
            {moment(getSubscriptionDetailResponse?.policyDueDate).format(
              'D MMM YYYY'
            )}
          </Text>
          <View style={style.mt3}>
            <Button
              rounded="lg"
              onPress={() => {
                navigation.navigate(NAVIGATION.LIFESAVER.DetailProduct, {
                  product:
                    benefit === 'LifeSAVER' ? 'lifesaver' : 'lifesaverplus',
                  from: 'start',
                  recurring:
                    // eslint-disable-next-line no-unneeded-ternary
                    getSubscriptionDetailResponse?.payment?.paymentMethod ===
                    'RECURRING'
                      ? true
                      : false,
                });
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'langgananKembali')}
              </Text>
            </Button>
          </View>
          <Text
            textStyle="medium"
            style={style.mt10}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }

    if (status === POLICY_STATUS.lapse) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.my6}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'proteksiBerakhir')}
            {moment(getSubscriptionDetailResponse?.policyDueDate).format(
              'D MMM YYYY'
            )}
          </Text>
          <View style={style.mt3}>
            <Button
              rounded="lg"
              onPress={() => {
                navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'langgananKembali')}
              </Text>
            </Button>
          </View>
        </View>
      );
    }

    if (status === POLICY_STATUS.gracePeriod) {
      return (
        <View>
          <Text
            textStyle="medium"
            style={style.mt10}
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'polisMasaTenggang')}
          </Text>
          <View style={style.billing.warning}>
            <Warning width={16} />
            <Text
              style={style.ml10}
              textStyle="medium"
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'agarTetap')}
              <Text textStyle="bold" size={Size.text.caption1.size}>
                {moment(getSubscriptionDetailResponse?.currentGraceDate).format(
                  'D MMM YYYY'
                )}
                {trans(locale, lang, 'pukul')}
              </Text>
            </Text>
          </View>
          <View style={style.mt3}>
            <Button
              rounded="lg"
              disabled={alreadySubmit}
              onPress={() => {
                doPaymentV2();
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'bayarSekarang')}
              </Text>
            </Button>
          </View>
          <Text
            textStyle="medium"
            style={style.mt10}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'debitOtomatis')}
            <Text
              textStyle="bold"
              style={style.mt10}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'listOtomatis')}
            </Text>
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderPaymentList(status) {
    if (getPaymentMethodResponse?.cards?.length > 0) {
      return (
        <View style={style.my16}>
          <View style={style.paymentList.listHeaderContainer}>
            <Text textStyle="semi">
              {trans(locale, lang, 'metodePembayaran')}
            </Text>
            {status === POLICY_STATUS.gracePeriod ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  doPaymentV2();
                }}>
                <Text
                  size={Size.text.caption1.size}
                  textStyle="medium"
                  color={Color.primary[colorScheme].primary90}
                  style={style.mr10}>
                  {trans(locale, lang, 'ubah')}
                </Text>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <Shadow borderRadius={16}>
            <View style={style.paymentList.listCardDesc}>
              <KreditNotActive />
              <View style={style.ml16}>
                <Text textStyle="medium" color="black">
                  {getPaymentMethodResponse?.cards[0].accountProvider}
                </Text>
                <Text textStyle="medium" color="black">
                  {getPaymentMethodResponse?.cards[0].cardNo?.replace(
                    /X/g,
                    '*'
                  )}
                </Text>
              </View>
            </View>
          </Shadow>
        </View>
      );
    }
    return null;
  }

  if (!getSubscriptionsResponse?.getActiveSubs) {
    return null;
  }

  if (connectionFailed) {
    return <ConnectionFailed {...props} />;
  }
  function renderProduct() {
    return (
      <View>
        {renderStatus(getSubscriptionDetailResponse?.status)}
        <Shadow borderRadius={16}>
          <View style={style.m16}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                  polis: {
                    policyNo: policyNo,
                    productCode:
                      getSubscriptionDetailResponse?.planName ===
                      codeLifesaver?.lifesaver?.planName
                        ? codeLifesaver.lifesaver.planCode
                        : codeLifesaver.lifesaverplus.planCode,
                    source: codeLifesaver.productCode,
                    isDownloadSection: true,
                    statusCode:
                      STATUS_CODE[getSubscriptionDetailResponse?.status],
                  },
                });
              }}
              style={style.product.product}>
              <View>
                {
                  lifesaverLogo[getSubscriptionDetailResponse?.status]?.[
                    getSubscriptionDetailResponse?.planName
                  ]
                }
              </View>
              <View style={style.product.detailPolis}>
                <Text
                  size={Size.text.caption1.size}
                  textStyle="medium"
                  color={Color.primary[colorScheme].primary90}
                  style={style.mr10}>
                  {trans(locale, lang, 'detailPolis')}
                </Text>
                <ChevronRight />
              </View>
            </TouchableOpacity>
            {renderButtonForStatus(
              getSubscriptionDetailResponse.status,
              getSubscriptionDetailResponse.planName
            )}
          </View>
        </Shadow>
        {getSubscriptionDetailResponse?.status === POLICY_STATUS.gracePeriod ? (
          <View style={style.mt24}>
            <View style={style.product.durasi}>
              <View style={style.product.infoMasaTenggang}>
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'masaTenggang')}
                </Text>
                <InformationOutline
                  fill={Color.grayIcon.light.grayIcon}
                  style={style.ml5}
                  onPress={() => {
                    setisGracePeriodModalVisible(true);
                  }}
                />
              </View>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {moment(getSubscriptionDetailResponse?.endGraceDate).format(
                  'D MMM YYYY'
                )}
              </Text>
            </View>
            <View style={style.product.durasi}>
              <View style={style.product.infoMasaTenggang}>
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'jatuhTempoSebelumnya')}
                </Text>
              </View>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {moment(getSubscriptionDetailResponse?.policyDueDate).format(
                  'D MMM YYYY'
                )}
              </Text>
            </View>
          </View>
        ) : (
          <View style={style.mt24}>
            <View style={style.product.durasi}>
              <Text
                textStyle="medium"
                color={Color.neutralLifeSaver[colorScheme].neutral60}
                size={Size.text.caption1.size}>
                {trans(locale, lang, 'durasiPerlindungan')}
              </Text>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {getSubscriptionDetailResponse?.protectionCycleInMonth}{' '}
                {trans(locale, lang, 'bulan')}
              </Text>
            </View>
            <View style={style.product.durasi}>
              {getSubscriptionDetailResponse?.status === POLICY_STATUS.lapse ? (
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'jatuhTempoSebelumnya')}
                </Text>
              ) : (
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'jatuhTempo')}
                </Text>
              )}
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {moment(getSubscriptionDetailResponse?.policyDueDate).format(
                  'D MMM YYYY'
                )}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderWarning() {
    if (
      getSubscriptionDetailResponse?.payment?.paymentMethod !==
        PAYMENT_METHOD.recurring &&
      getSubscriptionsResponse?.getActiveSubs?.length > 0 &&
      getSubscriptionsResponse?.getActiveSubs[0]?.isSubscribe === true &&
      diffPolicyDueDate(getSubscriptionDetailResponse?.policyDueDate) < 5 &&
      getSubscriptionDetailResponse?.status === POLICY_STATUS.active
    ) {
      return (
        <View style={style.billing.warning}>
          <Warning width={16} />
          <Text
            style={style.ml10}
            textStyle="medium"
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'selesaikanPembayaran')}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderPaymentDetail(item) {
    if (item?.accountNo) {
      return (
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          color={Color.neutralLifeSaver[colorScheme].neutral90}>
          {item?.accountNo}
        </Text>
      );
    }
    if (item?.paymentType === 'qris' || item?.paymentType === 'va') {
      return (
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          color={Color.neutralLifeSaver[colorScheme].neutral90}>
          {item?.paymentType.toUpperCase()}
        </Text>
      );
    }
    if (item?.paymentType === 'ewallet') {
      return (
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          color={Color.neutralLifeSaver[colorScheme].neutral90}>
          {item?.paymentType.toUpperCase()}
        </Text>
      );
    }
    return (
      <Text
        textStyle="semi"
        size={Size.text.body2.size}
        color={Color.neutralLifeSaver[colorScheme].neutral90}>
        PROMO
      </Text>
    );
  }

  function renderBilling() {
    return (
      <View style={style.pb10}>
        {renderWarning()}
        <View style={style.billing.header}>
          <Text textStyle="semi">{trans(locale, lang, 'tagihan')}</Text>
        </View>
        {getSubscriptionDetailResponse?.billings?.map((element, idx) => (
          <Shadow key={element?.id} borderRadius={16} style={style.my6}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (selectedCard === idx) {
                  setSelectedCard('');
                } else {
                  setSelectedCard(idx);
                }
              }}>
              <View style={style.m16}>
                <View style={style.billing.list}>
                  <View>
                    <Text
                      textStyle="medium"
                      size={Size.text.caption1.size}
                      color={Color.neutralLifeSaver[colorScheme].neutral40}>
                      {formatDate(new Date(element?.billDueDate), lang)}
                    </Text>
                    <Text textStyle="semi" size={Size.text.caption1.size}>
                      {formatNumber(element?.amount, lang)}
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    disabled
                    onPress={() => {
                      if (
                        element?.status === BILLING_STATUS.unpaid &&
                        getSubscriptionDetailResponse?.payment
                          ?.paymentMethod === PAYMENT_METHOD.nonrecurring
                      ) {
                        setPaymentVisible(true);
                      }
                    }}>
                    <View style={style.billing.rightListContent}>
                      {element?.status === BILLING_STATUS.paid ? (
                        <CircleCeklisIcon />
                      ) : null}
                      <Text
                        textStyle="semi"
                        style={style.ml5}
                        color={
                          // eslint-disable-next-line no-nested-ternary
                          element?.status === BILLING_STATUS.paid
                            ? Color.greenActive[colorScheme].color
                            : element?.status === BILLING_STATUS.unpaid
                            ? Color.neutralLifeSaver.light.neutral60
                            : Color.red[colorScheme].D71920
                        }>
                        {
                          // eslint-disable-next-line no-nested-ternary
                          element?.status === BILLING_STATUS.unpaid
                            ? trans(locale, lang, 'belumBayar')
                            : element?.status === BILLING_STATUS.paid
                            ? trans(locale, lang, 'lunas')
                            : trans(locale, lang, 'cancel')
                        }
                      </Text>
                      {element?.paymentDetail?.paymentList ? (
                        <View
                          style={
                            selectedCard === idx
                              ? style.flipTrue
                              : style.flipFalse
                          }>
                          <ArrowDown2Black width={30} height={30} />
                        </View>
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <Text
                  // align="center"
                  // line={20}
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  Invoice : {element?.invoiceId}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {element?.paymentDetail?.paymentList && selectedCard === idx ? (
              <View style={style.billing.listSection}>
                {element?.paymentDetail?.paymentList?.map((item) => (
                  <View style={style.billing.listContainer}>
                    <View style={style.billing.dotContainer}>
                      <Text>•</Text>
                    </View>
                    <View style={style.fx1}>
                      {renderPaymentDetail(item)}
                      <Text
                        textStyle="medium"
                        size={Size.text.caption1.size}
                        color={Color.neutralLifeSaver[colorScheme].neutral90}>
                        {moment(item?.processDateTime).format('D MMM YYYY')}
                        {trans(locale, lang, 'at')}
                        {moment(item?.processDateTime).format('HH:mm')}
                      </Text>
                    </View>
                    <View>
                      <Text
                        line={25}
                        textStyle="semi"
                        style={style.ml5}
                        color={
                          item?.status === 'success' && !item?.refund
                            ? Color.greenActive[colorScheme].color
                            : Color.red[colorScheme].red90
                        }>
                        {item?.status === 'success' && !item?.refund
                          ? trans(locale, lang, 'berhasil')
                          : trans(locale, lang, 'gagal')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
          </Shadow>
        ))}
      </View>
    );
  }

  function renderCustCare() {
    return (
      <View style={style.payment.custCare}>
        <Text
          size={Size.text.caption2.size}
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          textStyle="semi">
          {trans(locale, lang, 'butuhBantuan')}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
          }}>
          <Text
            size={Size.text.caption2.size}
            color={Color.primary[colorScheme].primary90}
            textStyle="semi">
            {trans(locale, lang, 'customerCare')}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderRightHeaderContent(status) {
    if (
      status === POLICY_STATUS.gracePeriod ||
      status === POLICY_STATUS.lapse ||
      (status === POLICY_STATUS.active &&
        getSubscriptionsResponse?.getActiveSubs[0]?.isSubscribe === false)
    ) {
      return null;
    }
    return (
      <View style={style.rightHeaderContent.container}>
        {isVisible ? (
          <Shadow borderRadius={5} style={style.rightHeaderContent.box}>
            {tabBar?.map((element) => (
              <TouchableOpacity
                onPress={() => {
                  element?.onClick();
                  setIsVisible(false);
                }}
                style={style.rightHeaderContent.batalkan}>
                <Text textStyle="medium">{element?.label}</Text>
              </TouchableOpacity>
            ))}
          </Shadow>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          style={style.rightHeaderContent.more}>
          <MoreIcon />
        </TouchableOpacity>
      </View>
    );
  }

  return show ? (
    <Base
      headerStyle={style.z10}
      isPaddingBottom={false}
      bordered
      title={trans(locale, lang, 'langgananSaya')}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      onBackPress={() => {
        if (isComingFromScreen.screen === NAVIGATION.POLICY.PolisDetail) {
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        } else {
          navigation.goBack();
        }
        setIsComingFromScreen({});
      }}
      rightHeaderContent={renderRightHeaderContent(
        getSubscriptionDetailResponse?.status
      )}>
      <Padder style={style.container}>
        {renderProduct()}
        {renderBilling()}
        {renderPaymentList(getSubscriptionDetailResponse.status)}
        {renderCustCare()}
      </Padder>
      <PaymentsDialog
        onSelected={() => {
          setPaymentVisible(false);
        }}
        onClosePress={() => {
          setPaymentVisible(false);
        }}
        isVisible={paymentsVisible}
      />
      <LifesaverChangePaket
        isVisible={isDowngradeVisible}
        onSubmit={() => {
          setIsDowngradeVisible(false);
          navigation.navigate(NAVIGATION.SUBS.SubsChangePackage, {
            fromProduct: PRODUCT.LIFESAVER.LIFESAVER_PLUS,
            toProduct: PRODUCT.LIFESAVER.LIFESAVER,
            dueDate: getSubscriptionDetailResponse?.policyDueDate,
          });
        }}
        onClose={() => {
          setIsDowngradeVisible(false);
        }}
        recurring={
          getSubscriptionDetailResponse?.payment?.paymentMethod === 'RECURRING'
        }
        navigation={navigation}
        currentPaket={getSubscriptionDetailResponse?.planName}
      />
      <ModalAgreement
        lang={lang}
        isVisible={isShowModalAgreement}
        onClosePress={() => setIsShowModalAgreement(false)}
        locale={locale}
        onPressTnc={() => {
          setIsShowModalAgreement(false);
          setIsComingFromScreen({
            screen: NAVIGATION.SUBS.SubsDetail,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        onPressRiplay={() => {
          setIsShowModalAgreement(false);
          setIsComingFromScreen({
            screen: NAVIGATION.SUBS.SubsDetail,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
            personalURL: false,
          });
        }}
        onSubs={() => {
          setIsShowModalAgreement(false);
          setResubscribe({ policyNo: policyNo });
          setLoading(true);
        }}
      />
      <ModalGracePeriod
        lang={lang}
        navigation={navigation}
        isVisible={isGracePeriodModalVisible}
        onClosePress={() => setisGracePeriodModalVisible(false)}
        paymentMethodList={getPaymentMethodResponse}
      />
      <ModalSuccessPayment
        lang={lang}
        onClosePress={() => setIsShowModalSuccessPayment(false)}
        isVisible={isShowModalSuccessPayment}
      />
    </Base>
  ) : null;
}

SubsDetail.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getSubscriptionDetailResponse: PropTypes.arrayOf(Array).isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
  getSubscriptionDetailClear: PropTypes.func.isRequired,
  getBills: PropTypes.func.isRequired,
  getBillsClear: PropTypes.func.isRequired,
  getBillsResponse: PropTypes.arrayOf(Array).isRequired,
  setLoading: PropTypes.func.isRequired,
  subsAction: PropTypes.string.isRequired,
  paymentsAction: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setResubscribe: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  getSubscriptionsResponse: PropTypes.arrayOf(Array).isRequired,
  getSubscriptionsClear: PropTypes.func.isRequired,
  getPaymentMethodResponse: PropTypes.arrayOf(Array).isRequired,
  getPaymentMethod: PropTypes.func.isRequired,
  getPaymentMethodClear: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  setPlanCode: PropTypes.func.isRequired,
  setCreateBill: PropTypes.func.isRequired,
  setCreateBillClear: PropTypes.func.isRequired,
  getProductResponse: PropTypes.arrayOf(Array).isRequired,
  getPaymentStatusClear: PropTypes.func.isRequired,
  setCreateBillError: PropTypes.objectOf(Object).isRequired,
};

export default SubsDetail;
