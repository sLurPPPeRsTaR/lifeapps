import { Alert, View } from 'react-native';
import React from 'react';
import { trans } from 'ca-util/trans';
import { formatNumber } from 'ca-util/numbro';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import PropTypes from 'prop-types';
import { formatDate, getTimestamp } from 'ca-util/format';
import {
  APPLICATION_PAYMENT_ID,
  BILL_TYPE,
  codeLifesaver,
  PAYMENT_TYPE,
} from 'ca-util/constant';
import style from '../style';
import locale from '../locale';

function BottomTotal(props) {
  const {
    colorScheme,
    lang,
    from,
    getProduct,
    card,
    paymentMethod,
    selectedCard,
    isFill,
    inviteeUserId,
    invoice,
    policy,
    eventCode,
    discountAmount,
    dispatch,
    policyDueDate,
  } = props;

  function doPayment(isVoid, amount) {
    dispatch.getPaymentStatusClear();
    if (paymentMethod === 1) {
      // do payment with payment list
      dispatch.setLoading(true);
      dispatch.setCreateBill({
        applicationId: APPLICATION_PAYMENT_ID,
        invoiceId: invoice,
        billType: BILL_TYPE.premium,
        reffNo: policy,
        billingDate: getTimestamp(),
        paymentType: PAYMENT_TYPE.creditDebitCard,
        isSubscribe: true,
        isVoid: isVoid,
        productId: codeLifesaver.productCode,
        amount: amount,
        eventCode,
        paymentInfo: {
          paymentAccountId: selectedCard,
        },
      });
    } else if (paymentMethod === 2) {
      dispatch.setLoading(true);
      dispatch.setCreateBill({
        applicationId: APPLICATION_PAYMENT_ID,
        invoiceId: invoice,
        billType: BILL_TYPE.premium,
        reffNo: policy,
        billingDate: getTimestamp(),
        paymentType: PAYMENT_TYPE.creditDebitCard,
        isSubscribe: true,
        isVoid: isVoid,
        productId: codeLifesaver.productCode,
        amount: amount,
        eventCode,
        paymentInfo: {
          paymentLabel: card?.cardName || '',
          accountNumber: card?.accountNumber.replace(/ /g, ''),
          accountName: '',
          expMonth: card?.expDate?.split('/')[0],
          expYear: card?.expDate?.split('/')[1],
          cvn: card?.cvv,
        },
      });
    }
  }

  // Dynamic Submit Buttom
  const buttonSubmit = {
    start: {
      label: trans(locale, lang, 'startSubscribe'),
      subLabel: (
        <Text textStyle="medium" color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'pembayaranSetiapBulan')}
        </Text>
      ),
      onSubmit: () => {
        doPayment(false, parseInt(getProduct?.subsPrice, 10));
      },
    },
    downgrade: {
      label: trans(locale, lang, 'lanjut'),
      subLabel: (
        <View>
          <Text
            style={style.mw330}
            line={20}
            align="right"
            textStyle="medium"
            color={Color.neutral[colorScheme].neutral40}>
            {trans(locale, lang, 'pembayaranSetiapBulanMulai')}{' '}
          </Text>
          <Text align="right" textStyle="semi">
            {formatDate(new Date(policyDueDate), lang, true)}
          </Text>
        </View>
      ),
      onSubmit: () => {
        Alert.alert('Service downgrade blom ada cuy!!');
      },
      promo: formatNumber(getProduct?.subsPrice, lang),
    },
    upgrade: {
      label: trans(locale, lang, 'lanjut'),
      subLabel: (
        <Text
          style={style.mw330}
          line={20}
          align="right"
          textStyle="medium"
          color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'kamuAkan')}{' '}
          <Text textStyle="semi">
            {formatNumber(getProduct?.subsPrice, lang)}
          </Text>
          /{trans(locale, lang, 'bulanBerlakuMulai')}{' '}
          <Text textStyle="semi">
            {formatDate(new Date(getProduct?.dueDate), lang)}
          </Text>
        </Text>
      ),
      onSubmit: () => {
        Alert.alert('Service buat config payment belum ada cuyy!');
      },
      promo: formatNumber(82667, lang),
    },
    bajoRun: {
      label: trans(locale, lang, 'lanjut'),
      subLabel: (
        <Text
          style={style.mw330}
          line={20}
          align="right"
          textStyle="medium"
          color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'kamuAkan')}{' '}
          <Text textStyle="semi">{formatNumber(getProduct?.subsPrice)}</Text>/
          {trans(locale, lang, 'bulanBerlakuMulai')}{' '}
          <Text textStyle="semi">
            {formatDate(new Date(getProduct?.dueDate), lang)}
          </Text>
        </Text>
      ),
      promo: trans(locale, lang, 'gratis'),
      onSubmit: () => {
        doPayment(true, 0);
      },
    },
    event: {
      label:
        discountAmount === 0
          ? trans(locale, lang, 'lanjut')
          : trans(locale, lang, 'startSubscribe'),
      subLabel: (
        <Text
          style={style.mw330}
          line={20}
          align="right"
          textStyle="medium"
          color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'kamuAkan')}{' '}
          <Text textStyle="semi">
            {formatNumber(getProduct?.subsPrice, lang)}
          </Text>
          /{trans(locale, lang, 'bulanBerlakuMulai')}{' '}
          <Text textStyle="semi">
            {formatDate(new Date(getProduct?.dueDate), lang)}
          </Text>
        </Text>
      ),
      onSubmit: () => {
        if (discountAmount === 0) {
          return doPayment(true, parseInt(discountAmount, 10));
        }
        return doPayment(false, parseInt(discountAmount, 10));
      },
      promo:
        discountAmount === 0
          ? trans(locale, lang, 'gratis')
          : formatNumber(discountAmount, lang),
    },
  };
  return (
    <Padder style={style.total.container}>
      <View style={style.total.labelContainer}>
        <Text textStyle="semi" color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'total')}
        </Text>
        <View style={style.total.labelPrice}>
          <Text
            textStyle="semi"
            style={style.mb10}
            size={20}
            color={Color.greenActive[colorScheme].color}>
            {buttonSubmit[from]?.promo
              ? buttonSubmit[from]?.promo
              : formatNumber(getProduct?.subsPrice)}
          </Text>
          {buttonSubmit[from]?.subLabel}
        </View>
      </View>
      <Button
        onPress={buttonSubmit[from].onSubmit}
        rounded="lg"
        disabled={
          !(
            (selectedCard !== '' || isFill) &&
            (inviteeUserId !== '' || from === 'bajoRun')
          )
        }
        type="linear-gradient">
        <Text textStyle="semi" color="white">
          {buttonSubmit[from]?.label}
        </Text>
      </Button>
    </Padder>
  );
}

BottomTotal.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  getProduct: PropTypes.objectOf(Object).isRequired,
  card: PropTypes.objectOf(Object).isRequired,
  paymentMethod: PropTypes.string.isRequired,
  selectedCard: PropTypes.number.isRequired,
  isFill: PropTypes.bool.isRequired,
  inviteeUserId: PropTypes.string.isRequired,
  invoice: PropTypes.string.isRequired,
  policy: PropTypes.string.isRequired,
  eventCode: PropTypes.string.isRequired,
  discountAmount: PropTypes.number.isRequired,
  dispatch: PropTypes.objectOf(Object).isRequired,
  policyDueDate: PropTypes.string.isRequired,
};

export default BottomTotal;
