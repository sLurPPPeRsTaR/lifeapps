import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { ChevronRight, ChevronRightGray } from 'ca-config/Svg';
import Text from 'ca-component-generic/Text';
import { lifesaverLogo } from 'ca-module-subs/components/LifeSaverLogo';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { formatNumber } from 'ca-util/numbro';
import moment from 'moment';
import Button from 'ca-component-generic/Button';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import {
  codeLifesaver,
  NAVIGATION,
  PAYMENT_METHOD,
  POLICY_STATUS,
} from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import style from './style';
import locale from './locale';

function MySubsCard(props) {
  const { colorScheme, lang, data, navigation, dispatch } = props;

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

  function renderButtonForStatus(status, benefit, isSubscribe, policyNo) {
    if (status === POLICY_STATUS.active && isSubscribe === false) {
      return (
        <View>
          <View style={style.mt10}>
            <Button
              rounded="lg"
              onPress={() => {
                dispatch.setSelectedPolicy(policyNo);
                dispatch.setSelectedPlanName(benefit);
                dispatch.setModalAgreementRef('resubscribe');
                dispatch.setIsShowModalAgreement(true);
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
                dispatch.setModalAgreementRef('upgrade');
                dispatch.setIsShowModalComingSoon(true);
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

  return (
    <Shadow key={data?.policyNo} style={style.mb16} borderRadius={30}>
      <View style={style.p16}>
        {renderFlag(data)}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
              policyNo: data?.policyNo,
            });
          }}
          style={style.product}>
          <View>{lifesaverLogo[data?.status]?.[data?.planName]}</View>
          {data?.status === POLICY_STATUS.active ||
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
            {data?.protectionCycleInMonth} {trans(locale, lang, 'bulan')}
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
            {moment(data?.policyDueDate).format('DD MMM YYYY')}
          </Text>
        </View>
        <View
          style={
            data?.paymentMethod === PAYMENT_METHOD.recurring &&
            data?.planName === 'LifeSAVER'
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
            {formatNumber(data?.subscriptionFee, lang)}
            {trans(locale, lang, 'perbulan')}
          </Text>
        </View>
        {renderButtonForStatus(
          data?.status,
          data?.planName,
          data?.isSubscribe,
          data?.policyNo
        )}
      </View>
    </Shadow>
  );
}

export default MySubsCard;

MySubsCard.defaultProps = {
  colorScheme: 'light',
};

MySubsCard.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  data: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  dispatch: PropTypes.objectOf(Object).isRequired,
};
