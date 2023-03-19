import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Image,
  Alert,
  ImageBackground,
  Pressable,
} from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Text from 'ca-component-generic/Text';
import moment from 'moment/min/moment-with-locales';
import Dash from 'react-native-dash';
import { trans } from 'ca-util/trans';
import Shadow from 'ca-component-container/Shadow';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { LogoIFGLife, LooperGroup2, PolisLogo } from 'ca-config/Image';
import {
  GET_POLICY_SUMMARY_FAILED,
  GET_POLICY_SUMMARY_SUCCESS,
} from 'ca-module-polis/polisConstant';
import {
  GET_PAYMENT_METHOD_FAILED,
  GET_PAYMENT_STATUS_FAILED,
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import {
  NAVIGATION,
  APPLICATION_PAYMENT_ID_RENEWAL,
  BILL_TYPE,
} from 'ca-util/constant';
import { formatCurrency } from 'ca-util/numbro';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ArrowRightSquare,
  ArrowRight,
  Send,
  Warning,
  InformationOutline,
  CircleCeklisIcon,
  ClockCircle,
} from 'ca-config/Svg';
import { getTimeLeft } from 'ca-util/common';
import Button from 'ca-component-generic/Button';
import { formatCapitalizeEachWord } from 'ca-util/format';
import BottomSheet from 'ca-component-container/BottomSheet';
import Padder from 'ca-component-container/Padder';
// import AlertDialogue from 'ca-component-card/AlertDialogue';
import { lifesaverLogo } from 'ca-module-subs/components/LifeSaverLogo';
import ListAccordion from 'ca-component-card/ListAccordion';
import PolisModalError from 'ca-module-polis/components/ModalError';
import { LifeCoverLogos } from 'ca-module-polis/components/Logo';
import StatusBadge from './components/StatusBadge';
import Style from './style';
import locale from './locale';

function PolisDetailSummary(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route,
    getPolicySummary,
    getPolicySummaryResponse,
    getPolicySummaryFailed,
    polisAction,
    setLoading,
    setIsShowModalComingSoon,
    setIsShowModalBadRequest,
    getPaymentMethod,
    getPaymentMethodClear,
    setCreateBill,
    setCreateBillClear,
    getPaymentStatusClear,
    setCreateBillError,
    paymentsAction,
    setIsComingFromScreen,
  } = props;

  const polis = route?.params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();

  // Modal
  const [isPhysiotherapyInfoModal, setIsPhysiotherapyInfoModal] =
    useState(false);
  const [isGracePeriodInfoModal, setIsGracePeriodInfoModal] = useState(false);

  // Time State
  const [remainingSecMedical, setRemainingSecMedical] = useState(null);
  const [remainingSecSport, setRemainingSecSport] = useState(null);

  const [remainingSecToGracePeriod, setRemainingSecToGracePeriod] =
    useState(null);
  const [timeLeftGracePeriod, setTimeLeftGracePeriod] = useState(null);
  const [timeLeftMedical, setTimeLeftMedical] = useState(null);
  const [timeLeftSport, setTimeLeftSport] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  moment.locale(lang);

  const isDigitalPolicy = useMemo(() => {
    const source = route?.params?.polis?.source;
    return source === '001' || source === '002';
  }, [route?.params?.polis?.source]);

  const policyNo = useMemo(() => {
    return route?.params?.polis?.policyNo;
  }, [route?.params?.polis?.policyNo]);

  const policyLogo = useCallback((source, res) => {
    if (source === '001') {
      return lifesaverLogo.ACTIVE?.[res?.planName];
    }
    if (source === '002') {
      return LifeCoverLogos.ACTIVE?.[res?.planName];
    }
    return null;
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPaymentMethod({});
    }
  }, [isFocused, getPaymentMethod]);

  useFocusEffect(() => {
    setPaymentResult(paymentsAction);
  });

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicySummary({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicySummary,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicySummaryResult(polisAction);
  }, [polisAction, getPolicySummaryResult, setIsShowModalBadRequest]);

  const getPolicySummaryResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SUMMARY_SUCCESS) {
        setLoading(false);
        const data = getPolicySummaryResponse?.data;
        setRemainingSecMedical(data?.progressTab?.medicalExpenses);
        setRemainingSecSport(data?.progressTab?.sportInjuries);
        setRemainingSecToGracePeriod(data?.secToGracePeriod);
      }
      if (act === GET_POLICY_SUMMARY_FAILED) {
        setLoading(false);
        if (getPolicySummaryFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicySummaryFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }
          if (getPolicySummaryFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
        }
      }
    },
    [
      getPolicySummaryFailed?.message,
      getPolicySummaryResponse?.data,
      setIsShowModalBadRequest,
      setLoading,
    ]
  );

  const setPaymentResult = useCallback(
    (act) => {
      if (act === SET_CREATE_BILL_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
          callback: NAVIGATION.SUBS.SubsDetail,
          callbackParams: route?.params?.polis,
        });
      }
      if (act === SET_CREATE_BILL_FAILED) {
        if (setCreateBillError?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setCreateBillError?.message);
        }
        setCreateBillClear();
      }
      if (act === GET_PAYMENT_STATUS_FAILED) {
        getPaymentStatusClear();
      }
      if (act === GET_PAYMENT_METHOD_FAILED) {
        getPaymentMethodClear();
      }
    },
    [
      getPaymentMethodClear,
      getPaymentStatusClear,
      navigation,
      route?.params?.polis,
      setCreateBillClear,
      setCreateBillError?.message,
      setLoading,
    ]
  );

  // Timer Grace Period
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainingSecToGracePeriod > 0) {
        const tempTimeLeft = getTimeLeft(remainingSecToGracePeriod);
        setTimeLeftGracePeriod(tempTimeLeft);
        setRemainingSecToGracePeriod((prevState) => prevState);
      }
      if (remainingSecToGracePeriod === 0) {
        const tempTimeLeft = getTimeLeft(0);
        setTimeLeftGracePeriod(tempTimeLeft);
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (remainingSecMedical > 0) {
        const tlA = getTimeLeft(remainingSecMedical - 1);
        setTimeLeftMedical(tlA);
        setRemainingSecMedical(remainingSecMedical - 1);
      }
      if (remainingSecSport > 0) {
        const tlB = getTimeLeft(remainingSecSport - 1);
        setTimeLeftSport(tlB);
        setRemainingSecSport(remainingSecSport - 1);
      }
      if (remainingSecMedical === 0) {
        const tlA = getTimeLeft(0);
        setTimeLeftMedical(tlA);
      }
      if (remainingSecSport === 0) {
        const tlB = getTimeLeft(0);
        setTimeLeftSport(tlB);
      }
      if (remainingSecMedical === 0 && remainingSecMedical === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const dateFormat = useCallback(
    (date, add) => {
      const newDate = moment(date);

      newDate.format();
      const gracePeriodDate = moment(newDate)
        .add(add, 'seconds')
        .format('DD MMM YYYY');
      const gracePeriodTime = moment(newDate)
        .add(add, 'seconds')
        .format('HH:MM');

      return `${gracePeriodDate} ${trans(
        locale,
        lang,
        'pukul'
      )} ${gracePeriodTime}`;
    },
    [lang]
  );

  const doPaymentV2 = useCallback(() => {
    getPaymentStatusClear();
    setLoading(true);
    // setAlreadySubmit(true);
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

  function formatValue(value) {
    if (!value && value !== false) {
      return '-';
    }
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('D MMMM YYYY');
    }
    return value;
  }

  function formatTime(timeLeft) {
    const dayUnit = trans(locale, lang, 'dayUnit');
    const day = timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days;
    const hour = timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours;
    const minute =
      timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes;
    const second =
      timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds;
    return `${day}${dayUnit} ${hour}:${minute}:${second}`;
  }

  function renderLifeCardWidget() {
    const summary = getPolicySummaryResponse?.data?.summary;
    const eCardLifesaver = getPolicySummaryResponse?.data?.eCardLifesaver;

    if (
      polis?.statusCode === 'active' &&
      polis?.source === '001' &&
      summary &&
      eCardLifesaver
    ) {
      return (
        <Shadow animated borderRadius={16} style={Style.mb16}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION.POLICY.PolisLifeCard, {
                planName: summary?.planName,
                eCardLink: eCardLifesaver?.link,
              });
            }}>
            <View style={Style.eCard.container}>
              <Image
                source={{ uri: eCardLifesaver?.link }}
                style={Style.eCard.dummy}
              />
              <View style={Style.eCard.content}>
                <View>
                  <Text
                    textStyle="semi"
                    size={Size.text.body2.size}
                    line={17}
                    letterSpacing={0.5}>
                    Life<Text fontStyle="italic">CARD</Text>
                  </Text>
                  <Text
                    textStyle="regular"
                    size={Size.text.caption1.size}
                    line={14}
                    letterSpacing={0.5}
                    color={Color.mediumGray.light.mediumGray}>
                    {trans(locale, lang, 'untukPembayaranTanpa')}
                  </Text>
                </View>
                <ArrowRightSquare />
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      );
    }
    return null;
  }

  function renderLifesaverProgressWidget() {
    const resProgress = getPolicySummaryResponse?.data?.progressTab;
    const resSummary = getPolicySummaryResponse?.data?.summary;

    if (
      polis?.statusCode === 'active' &&
      polis?.source === '001' &&
      resProgress &&
      resSummary?.statusName !== 'GRACE PERIOD' &&
      timeLeftMedical !== null &&
      timeLeftSport !== null
    ) {
      const activeStatus = (
        <View style={Style.progressCard.activeStatus}>
          <CircleCeklisIcon style={Style.me4} />
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.greenActive.light.color}>
            {trans(locale, lang, 'Active')}
          </Text>
        </View>
      );

      if (remainingSecMedical > 0 || remainingSecSport > 0) {
        return (
          <Shadow animated borderRadius={16} style={Style.mb16}>
            <ListAccordion
              header={
                <View style={Style.progressCard.header}>
                  <ClockCircle style={Style.me8} />
                  <Text
                    textStyle="semi"
                    size={Size.text.body1.size}
                    line={30}
                    letterSpacing={0.5}
                    color={Color.yellowDetail.light.yellowDetail}>
                    {trans(locale, lang, 'masaTunggu')}
                  </Text>
                </View>
              }>
              <View style={Style.progressCard.container}>
                <View style={Style.progressCard.row}>
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    line={15}
                    letterSpacing={0.5}
                    style={Style.flex1}>
                    {trans(locale, lang, 'biayaMedisAkibat')}
                  </Text>
                  <View>
                    {remainingSecMedical > 0 ? (
                      <Text
                        textStyle="semi"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}>
                        {formatTime(timeLeftMedical)}
                      </Text>
                    ) : (
                      activeStatus
                    )}
                  </View>
                </View>
                <Dash
                  dashGap={5}
                  dashThickness={1}
                  dashColor={Color.grayBorder.light.grayBorder}
                  style={Style.my16}
                />
                <View style={Style.progressCard.row}>
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    line={15}
                    letterSpacing={0.5}
                    style={Style.flex1}>
                    {trans(locale, lang, 'biayaMedisDanFisioterapi')}
                    <Pressable
                      onPress={() => {
                        setIsPhysiotherapyInfoModal(true);
                      }}
                      style={Style.progressCard.infoIcon.container}>
                      <InformationOutline
                        fill={Color.grayIcon.light.grayIcon}
                        style={Style.progressCard.infoIcon.icon}
                      />
                    </Pressable>
                  </Text>
                  {remainingSecSport > 0 ? (
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={21}
                      letterSpacing={0.5}>
                      {formatTime(timeLeftSport)}
                    </Text>
                  ) : (
                    activeStatus
                  )}
                </View>
              </View>
            </ListAccordion>
          </Shadow>
        );
      }
    }
    return null;
  }

  function renderGracePeriodCountDownWidget() {
    const resSummary = getPolicySummaryResponse?.data?.summary;
    if (resSummary?.statusName !== 'GRACE PERIOD') {
      return null;
    }

    return (
      <Shadow animated borderRadius={16} style={Style.mb16}>
        <View style={Style.gracePeriodWidget.container}>
          <View style={Style.gracePeriod.warning}>
            <Warning width={16} />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              style={Style.ml10}>
              {trans(locale, lang, 'agarTetapProteksi')}
              <Text textStyle="bold" size={Size.text.caption1.size} line={20}>
                {dateFormat(
                  moment(),
                  getPolicySummaryResponse?.data?.secToGracePeriod
                )}
              </Text>
            </Text>
          </View>
          <View>
            <Button
              rounded="lg"
              onPress={() => {
                setIsComingFromScreen({
                  screen: NAVIGATION.POLICY.PolisDetail,
                });
                doPaymentV2();
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'ubahMetodeBayar')}
              </Text>
            </Button>
          </View>
          <View style={[Style.mt10, Style.mb16]}>
            <Text textStyle="medium" size={Size.text.body2.size} line={20}>
              {trans(locale, lang, 'debitOtomatis')}
              <Text textStyle="bold" size={Size.text.caption1.size}>
                {trans(locale, lang, 'listOtomatis')}
              </Text>
            </Text>
          </View>
        </View>
      </Shadow>
    );
  }

  function renderCardContainer() {
    const resSummary = getPolicySummaryResponse?.data?.summary;
    if (!resSummary) {
      return null;
    }
    return (
      <Shadow animated borderRadius={16}>
        <View style={Style.card.container}>
          <View style={Style.card.header.container}>
            <Image source={PolisLogo} style={Style.card.header.image} />
            <View style={Style.flex1}>
              {isDigitalPolicy ? (
                <View>{policyLogo(polis?.source, resSummary)}</View>
              ) : (
                <Text
                  textStyle="bold"
                  size={Size.text.body1.size}
                  line={24}
                  letterSpacing={0.5}
                  style={Style.flexShrink1}>
                  {resSummary?.productName}
                </Text>
              )}
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                style={Style.flexShrink1}>
                {resSummary?.policyNo}
              </Text>

              {isDigitalPolicy && polis?.statusCode === 'active' ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
                      policyNo: polis?.policyNo,
                      planName: resSummary?.planName,
                      source: polis?.source,
                    });
                  }}
                  style={Style.flexGrow1}>
                  <View style={Style.card.header.detailBerlangganan}>
                    <Text
                      textStyle="medium"
                      size={Size.text.caption1.size}
                      line={18}
                      letterSpacing={0.5}
                      color={Color.primary.light.primary90}>
                      {trans(locale, lang, 'detailBerlangganan')}
                    </Text>
                    <ArrowRight
                      fill={Color.primary.light.primary90}
                      width={10}
                      height={10}
                    />
                  </View>
                </TouchableOpacity>
              ) : null}

              {polis?.source === '002' ||
              (polis?.source === '001' &&
                (remainingSecMedical === 0 || remainingSecSport === 0)) ? (
                // eslint-disable-next-line react/jsx-indent
                <StatusBadge
                  statusName={trans(
                    locale,
                    lang,
                    formatCapitalizeEachWord(
                      resSummary?.statusName.toLowerCase()
                    )
                  )}
                  statusCode={polis?.statusCode}
                />
              ) : null}
            </View>
          </View>
          <Dash
            dashGap={5}
            dashThickness={1}
            dashColor={Color.neutral[colorScheme].neutral20}
          />
          <View style={Style.card.content.container}>
            <View style={Style.card.content.row}>
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}
                color={Color.mediumGray[colorScheme].mediumGray}>
                {trans(locale, lang, 'masaBerlakuAsuransi')}
              </Text>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {`${formatValue(
                  resSummary?.insuranceStartDate
                )} - ${formatValue(resSummary?.insuranceEndDate)}`}
              </Text>
            </View>
            <View style={Style.card.content.row}>
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}
                color={Color.mediumGray[colorScheme].mediumGray}>
                {trans(locale, lang, 'tanggalJatuhTempo')}
              </Text>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {formatValue(resSummary?.premiDueDate)}
              </Text>
            </View>
            <View style={Style.card.content.row}>
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}
                color={Color.mediumGray[colorScheme].mediumGray}>
                {trans(locale, lang, 'hargaPremi')}
              </Text>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {formatValue(resSummary?.premi)}
              </Text>
            </View>
            {isDigitalPolicy ? (
              <View style={Style.card.content.row}>
                <Text
                  textStyle="semi"
                  size={Size.text.caption1.size}
                  line={18}
                  letterSpacing={0.5}
                  color={Color.mediumGray[colorScheme].mediumGray}>
                  {trans(locale, lang, 'paket')}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}>
                  {formatValue(resSummary?.planName)}
                </Text>
              </View>
            ) : null}
            {polis?.source === '001' && !resSummary?.isUpgrade ? (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  Color.buttonGradient.light.buttonGradient0,
                  Color.buttonGradient.light.buttonGradient1,
                ]}
                style={Style.card.content.upgradePackageButton}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setIsShowModalComingSoon(true);
                  }}>
                  <Text
                    textStyle="semi"
                    size={Size.text.caption1.size}
                    line={26}
                    letterSpacing={0.5}
                    color={Color.main.light.white}
                    align="center">
                    {trans(locale, lang, 'upgradePaket')}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : null}
            {polis?.source === '002' && (
              <View style={Style.card.content.row}>
                <Text
                  textStyle="semi"
                  size={Size.text.caption1.size}
                  line={18}
                  letterSpacing={0.5}
                  color={Color.mediumGray[colorScheme].mediumGray}>
                  {trans(locale, lang, 'jumlahPenerimaManfaat')}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}>
                  {formatValue(resSummary?.beneficiaryCount)}{' '}
                  {trans(
                    locale,
                    lang,
                    Number(resSummary?.beneficiaryCount) > 1
                      ? 'penerimaManfaats'
                      : 'penerimaManfaat'
                  )}
                </Text>
              </View>
            )}
          </View>
          {isDigitalPolicy ? (
            <View style={Style.card.footer.container}>
              <View style={Style.card.footer.imageContainer}>
                <Text
                  textStyle="semi"
                  size={Size.text.caption1.size}
                  line={18}
                  letterSpacing={0.5}
                  color={Color.mediumGray[colorScheme].mediumGray}>
                  {trans(locale, lang, 'didukungOleh')}
                </Text>
                <Image
                  source={LogoIFGLife}
                  style={Style.card.footer.insuredImage}
                />
              </View>
            </View>
          ) : null}
        </View>
      </Shadow>
    );
  }

  function renderFooterContainer() {
    const data = getPolicySummaryResponse?.data;
    if (!isDigitalPolicy || polis?.statusCode !== 'active' || !data) {
      return null;
    }

    const onPress = () => {
      if (polis?.source === '001') {
        navigation.navigate(NAVIGATION.INVITATION.InvitationMain);
        return;
      }
      if (polis?.source === '002') {
        setIsShowModalComingSoon(true);
      }
    };

    return (
      <View style={Style.footer.container}>
        <Button suffixIcon={<Send />} type="linear-gradient" onPress={onPress}>
          {trans(locale, lang, 'ajakTeman')}
        </Button>
      </View>
    );
  }

  function renderPhysiotherapyInfoModal() {
    const onClosePress = () => {
      setIsPhysiotherapyInfoModal(false);
    };
    return (
      <BottomSheet
        isVisible={isPhysiotherapyInfoModal}
        swipeable={false}
        title={trans(locale, lang, 'biayaMedisDan')}
        onClosePress={onClosePress}
        contentContainerStyle={Style.px0}>
        <Dash
          dashGap={0}
          dashColor={Color.grayBorder.light.grayBorder}
          dashThickness={0.75}
        />
        <Padder style={Style.pt24}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            color={Color.neutral.light.neutral40}
            align="center">
            {trans(locale, lang, 'akibatCederaSaat')}
          </Text>
        </Padder>
      </BottomSheet>
    );
  }

  function renderGracePeriodInfoModal() {
    const onClosePress = () => {
      setIsGracePeriodInfoModal(false);
    };
    return (
      <BottomSheet
        isVisible={isGracePeriodInfoModal}
        swipeable={false}
        title={trans(locale, lang, 'masaTenggang')}
        onClosePress={onClosePress}
        contentContainerStyle={Style.px0}>
        <Dash
          dashGap={0}
          dashColor={Color.grayBorder.light.grayBorder}
          dashThickness={0.75}
        />
        <Padder style={Style.pt24}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'masaTenggangAdalah')}
          </Text>
        </Padder>
      </BottomSheet>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Style.container}>
          {renderLifeCardWidget()}
          {renderLifesaverProgressWidget()}
          {renderGracePeriodCountDownWidget()}
          {/* {renderGracePeriodAlertDialogue()} */}
          {renderCardContainer()}
        </View>
      </ScrollView>
      {renderFooterContainer()}
      {renderPhysiotherapyInfoModal()}
      {renderGracePeriodInfoModal()}

      <PolisModalError
        navigation={navigation}
        isVisible={isVisible}
        colorScheme={colorScheme}
        onClose={() => {
          setIsVisible(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }}
        lang={lang}
      />
    </ImageBackground>
  );
}

export default PolisDetailSummary;

PolisDetailSummary.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicySummary: PropTypes.func.isRequired,
  getPolicySummaryResponse: PropTypes.objectOf(Object).isRequired,
  getPolicySummaryFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
  getPaymentMethod: PropTypes.func.isRequired,
  getPaymentMethodClear: PropTypes.func.isRequired,
  setCreateBill: PropTypes.func.isRequired,
  setCreateBillClear: PropTypes.func.isRequired,
  getPaymentStatusClear: PropTypes.func.isRequired,
  setCreateBillError: PropTypes.objectOf(Object).isRequired,
  paymentsAction: PropTypes.string.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};
