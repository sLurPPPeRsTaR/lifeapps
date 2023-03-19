import { Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Shadow from 'ca-component-container/Shadow';
import { ChevronRight, ChevronRightGray } from 'ca-config/Svg';
import { BackgrounSubscription, RusakIcon } from 'ca-config/Image';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { formatNumber } from 'ca-util/numbro';
import {
  codeLifesaver,
  NAVIGATION,
  PAYMENT_METHOD,
  POLICY_STATUS,
  PRODUCT,
} from 'ca-util/constant';
import { lifesaverLogo } from 'ca-module-subs/components/LifeSaverLogo';
import {
  GET_SUBSCRIPTIONS_FAILED,
  GET_SUBSCRIPTIONS_SUCCESS,
  SET_RESUBSCRIBE_SUCCESS,
  SET_RESUBSCRIBE_FAILED,
} from 'ca-module-subs/subsConstant';
import { ModalAgreement } from 'ca-module-lifesaver/screen/LifesaverMain/component/modal';
import PaymentsDialog from 'ca-module-payments/PaymentsDialog';
import Button from 'ca-component-generic/Button';
import ConnectionFailed from 'ca-component-lifesaver/ConnectionFailed';
import Size from 'ca-config/Size';
import moment from 'moment';
import { useDefaultBackHandler } from 'ca-util/common';
import { useIsFocused } from '@react-navigation/native';
import { ModalSuccessPayment } from './component/modal';
import style from './style';
import 'moment/locale/id';
import locale from './locale';

function SubsMain(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getSubscriptions,
    getSubscriptionsClear,
    getSubscriptionsResponse,
    setIsShowModalInternalServerError,
    setIsShowModalComingSoon,
    setLoading,
    subsAction,
    setResubscribe,
    isComingFromScreen,
    setIsComingFromScreen,
  } = props;

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [show, setShow] = useState(false);
  const [isShowModalAgreement, setIsShowModalAgreement] = useState(false);
  const [modalAgreementRef, setModalAgreementRef] = useState('');
  const [isShowModalSuccessPayment, setIsShowModalSuccessPayment] =
    useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [selectedPlanName, setSelectedPlanName] = useState('');

  moment.locale(lang);

  const isFocused = useIsFocused();

  useDefaultBackHandler(navigation);

  useEffect(() => {
    if (isFocused) {
      if (
        isComingFromScreen?.screen === NAVIGATION.PAYMENTS.PaymentsCheckTrans
      ) {
        setIsShowModalSuccessPayment(true);
        setIsComingFromScreen({});
      } else {
        getSubscriptions({
          page: 1,
          limit: 100,
        });
        setLoading(true);
      }
    }
  }, [
    navigation,
    getSubscriptions,
    setLoading,
    isComingFromScreen,
    setIsComingFromScreen,
    isFocused,
  ]);

  useEffect(() => {
    if (subsAction === GET_SUBSCRIPTIONS_SUCCESS) {
      setShow(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else if (subsAction === GET_SUBSCRIPTIONS_FAILED) {
      setConnectionFailed(true);
      getSubscriptionsClear();
    }
    if (subsAction === SET_RESUBSCRIBE_SUCCESS) {
      navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
        policyNo: selectedPolicy,
        planName: selectedPlanName,
      });
    } else if (subsAction === SET_RESUBSCRIBE_FAILED) {
      setConnectionFailed(true);
      setIsShowModalInternalServerError(true);
    }
  }, [
    subsAction,
    setLoading,
    getSubscriptionsClear,
    setIsShowModalInternalServerError,
    navigation,
    selectedPolicy,
    selectedPlanName,
  ]);

  function renderButtonForStatus(status, benefit, isSubscribe, policyNo) {
    if (status === POLICY_STATUS.active && isSubscribe === false) {
      return (
        <View>
          <View style={style.mt10}>
            <Button
              rounded="lg"
              onPress={() => {
                setSelectedPolicy(policyNo);
                setSelectedPlanName(benefit);
                setModalAgreementRef('resubscribe');
                setIsShowModalAgreement(true);
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard.light.color}>
                {trans(locale, lang, 'aktifkanProteksi')}
              </Text>
            </Button>
          </View>
        </View>
      );
    }

    if (status === POLICY_STATUS.active) {
      return (
        <View>
          <View style={style.mt10}>
            <Button
              rounded="lg"
              disabled={benefit === codeLifesaver.lifesaverplus.planName}
              onPress={() => {
                setModalAgreementRef('upgrade');
                setIsShowModalComingSoon(true);
              }}
              type="linear-gradient">
              <Text
                textStyle="semi"
                color={
                  benefit === codeLifesaver.lifesaverplus.planName
                    ? Color.neutralLifeSaver.light.neutral40
                    : Color.whiteCard.light.color
                }>
                {trans(locale, lang, 'upgradePaket')}
              </Text>
            </Button>
          </View>
        </View>
      );
    }

    if (status === POLICY_STATUS.terminate) {
      return (
        <View>
          <HorizontalLine height={1} />
          <View style={style.mt3}>
            <Button
              rounded="lg"
              onPress={() => {
                navigation.navigate(NAVIGATION.LIFESAVER.DetailProduct, {
                  product:
                    benefit === 'LifeSAVER' ? 'lifesaver' : 'lifesaverplus',
                  from: 'start',
                  recurring: status === PAYMENT_METHOD.recurring,
                });
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'aktifkanLagi')}
              </Text>
            </Button>
          </View>
        </View>
      );
    }
    return null;
  }

  function renderFlag(element) {
    if (
      element?.status === POLICY_STATUS.active &&
      element?.isSubscribe === false
    ) {
      return (
        <View style={style.flagUnsubscribe}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.neutralLifeSaver.light.neutral40}>
            {trans(locale, lang, 'unsubscribed')}
          </Text>
        </View>
      );
    }
    if (element?.status === POLICY_STATUS.gracePeriod) {
      return (
        <View style={style.flagGracePeriod}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.warning.light.warning90}>
            {trans(locale, lang, 'gracePeriod')}
          </Text>
        </View>
      );
    }
    if (element?.status === POLICY_STATUS.lapse) {
      return (
        <View style={style.flagLapse}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.neutral.light.neutral60}>
            {trans(locale, lang, 'lapse')}
          </Text>
        </View>
      );
    }
    return null;
  }

  function renderSubscription(element) {
    return (
      <Shadow key={element?.policyNo} style={style.mb16} borderRadius={30}>
        <View style={style.p16}>
          {renderFlag(element)}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
                policyNo: element?.policyNo,
              });
            }}
            style={style.product}>
            <View>{lifesaverLogo[element?.status]?.[element?.planName]}</View>
            {element?.status === POLICY_STATUS.active ||
            POLICY_STATUS.gracePeriod ? (
              <ChevronRight />
            ) : (
              <ChevronRightGray />
            )}
          </TouchableOpacity>
          <HorizontalLine height={1} />
          <View style={style.durasi}>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral60}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'durasiPerlindungan')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {element?.protectionCycleInMonth} {trans(locale, lang, 'bulan')}
            </Text>
          </View>
          <View style={style.durasi}>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral60}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'jatuhTempo')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {moment(element?.policyDueDate).format('DD MMM YYYY')}
            </Text>
          </View>
          <View
            style={
              element?.paymentMethod === PAYMENT_METHOD.recurring &&
              element?.planName === 'LifeSAVER'
                ? [style.durasi, { marginBottom: 20 }]
                : style.durasi
            }>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral60}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'harga')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {formatNumber(element?.subscriptionFee, lang)}
              {trans(locale, lang, 'perbulan')}
            </Text>
          </View>
          {renderButtonForStatus(
            element?.status,
            element?.planName,
            element?.isSubscribe,
            element?.policyNo
          )}
        </View>
      </Shadow>
    );
  }

  function renderSubsList() {
    return (
      <View style={style.subsList.container}>
        <Padder style={style.container}>
          {getSubscriptionsResponse?.getActiveSubs?.map((element) => {
            return renderSubscription(element);
          })}
          {getSubscriptionsResponse?.getInActiveSubs?.map((element) => {
            return renderSubscription(element);
          })}
        </Padder>
        <PaymentsDialog
          isVisible={isPaymentVisible}
          onClosePress={() => {
            setIsPaymentVisible(false);
          }}
          onSelected={() => {
            setIsPaymentVisible(false);
          }}
        />
      </View>
    );
  }

  function renderEmptySubscribe() {
    return (
      <View style={style.emptySubscribe.container}>
        <Image
          style={style.emptySubscribe.image}
          source={RusakIcon}
          resizeMode="contain"
        />
        <Text style={style.mt16} textStyle="bold" size={Size.text.h6.size}>
          {trans(locale, lang, 'oops')}
        </Text>
        <View style={style.emptySubscribe.desc}>
          <Text
            style={style.mt16}
            textStyle="medium"
            align="center"
            color={Color.neutralLifeSaver.light.neutral20}>
            {trans(locale, lang, 'belumMemilikiLangganan')}
          </Text>
        </View>

        <View style={style.emptySubscribe.button}>
          <Button
            onPress={() => {
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
            }}
            rounded="lg"
            type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard.light.color}>
              {trans(locale, lang, 'proteksiDiri')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  if (connectionFailed) {
    return <ConnectionFailed {...props} />;
  }

  return show ? (
    <Base
      title={trans(locale, lang, 'langgananSaya')}
      bordered
      onBackPress={() => navigation.goBack()}
      isPaddingBottom={false}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}>
      <View style={{ minHeight: Size.screen.height - 56 }}>
        {getSubscriptionsResponse?.getActiveSubs?.length > 0 ||
        getSubscriptionsResponse?.getInActiveSubs?.length > 0
          ? renderSubsList()
          : renderEmptySubscribe()}
        <View style={style.backgroundBottom}>
          <Image
            style={{ width: Size.screen.width }}
            source={BackgrounSubscription}
          />
        </View>
      </View>
      <ModalAgreement
        lang={lang}
        isVisible={isShowModalAgreement}
        onClosePress={() => setIsShowModalAgreement(false)}
        locale={locale}
        onPressTnc={() => {
          setIsShowModalAgreement(false);
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        onPressRiplay={() => {
          setIsShowModalAgreement(false);
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
            personalURL: false,
          });
        }}
        onSubs={() => {
          setIsShowModalAgreement(false);
          if (modalAgreementRef === 'upgrade') {
            navigation.navigate(NAVIGATION.LIFESAVER.LifesaverOrderPage, {
              product: PRODUCT.LIFESAVER.LIFESAVER_PLUS,
              from: 'upgrade',
              recurring: false,
            });
          } else if (modalAgreementRef === 'resubscribe') {
            setResubscribe({ policyNo: selectedPolicy });
            setLoading(true);
          }
        }}
      />
      <ModalSuccessPayment
        lang={lang}
        onClosePress={() => setIsShowModalSuccessPayment(false)}
        isVisible={isShowModalSuccessPayment}
      />
    </Base>
  ) : null;
}

SubsMain.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getSubscriptionsResponse: PropTypes.objectOf(Array).isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  getSubscriptionsClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
  subsAction: PropTypes.string.isRequired,
  setResubscribe: PropTypes.func.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};

export default SubsMain;
