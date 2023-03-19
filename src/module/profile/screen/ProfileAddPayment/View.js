import { View, Alert, BackHandler } from 'react-native';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import { formatedCardDate, generateCardNo } from 'ca-util/common';
import {
  NAVIGATION,
  BILL_TYPE,
  // codeLifesaver,
  APPLICATION_PAYMENT_ID,
  PAYMENT_TYPE,
} from 'ca-util/constant';
import { getTimestamp } from 'ca-util/format';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import uuid from 'react-native-uuid';
import {
  SET_CREATE_BILL,
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import style from './style';
import locale from './locale';

function ProfileAddPayment(props) {
  const {
    navigation,
    lang,
    colorScheme,
    // userId,
    setCreateBill,
    setCreateBillClear,
    setCreateBillError,
    paymentsAction,
    setLoading,
    setIsComingFromDeepLink,
  } = props;

  const [addCardForm, setAddCardForm] = useState({
    accountNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    isFill: false,
  });

  const [cardValidation, setCardValidation] = useState(false);
  const [alreadySubmit, setAlreadySubmit] = useState(false);
  const { accountNumber, expDate, cvv, cardName, isFill } = addCardForm;

  // Memo disabled button
  const isButtonDisabled = useMemo(() => {
    if (alreadySubmit) {
      return alreadySubmit;
    }
    return !isFill;
  }, [alreadySubmit, isFill]);

  // Handle Validation Payment
  useEffect(() => {
    if (
      accountNumber?.length === 19 &&
      expDate?.length === 5 &&
      cvv?.length === 3 &&
      !cardValidation
    ) {
      setAddCardForm({
        ...addCardForm,
        isFill: true,
      });
    } else {
      setAddCardForm({
        ...addCardForm,
        isFill: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNumber, expDate, cvv, cardValidation]);

  // On Focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCreateBillClear();
    });
    return unsubscribe;
  }, [navigation, setCreateBillClear]);

  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setIsComingFromDeepLink(false);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromDeepLink]);

  useEffect(() => {
    setPaymentResult(paymentsAction);
  }, [setPaymentResult, paymentsAction]);

  const setPaymentResult = useCallback(
    (act) => {
      if (act === SET_CREATE_BILL) {
        setLoading(true);
      }
      if (act === SET_CREATE_BILL_SUCCESS) {
        setLoading(false);
        setAlreadySubmit(false);
        navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
          isOnlyAddCard: true,
          callback: NAVIGATION.PROFILE.ProfilePayments,
        });
      }
      if (act === SET_CREATE_BILL_FAILED) {
        setAlreadySubmit(false);
        Alert.alert('Warning', setCreateBillError?.message);
        setCreateBillClear();
      }
    },
    [navigation, setCreateBillClear, setCreateBillError?.message, setLoading]
  );
  const getCardValidation = () => {
    return (
      cardValidation === 'textInvalidMonth' ||
      cardValidation === 'textInvalidDate' ||
      cardValidation === 'cardExpired'
    );
  };

  function renderAddCard() {
    const marginBottom = getCardValidation() ? 22 : 0;
    return (
      <View style={style.my10}>
        <View style={style.mb20}>
          <Input
            value={accountNumber}
            label={trans(locale, lang, 'CardNumber')}
            keyboardType="number-pad"
            message={
              cardValidation === 'textCardNotValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'CardNumberPlaceholder')}
            onChangeText={(num) => {
              let value = generateCardNo(num, accountNumber);
              if (num?.length > 19) {
                value = accountNumber;
              }
              setAddCardForm({
                ...addCardForm,
                accountNumber: value,
              });
            }}
          />
        </View>
        <View style={style.addCard.expAndCVV}>
          <View style={style.addCard.expWidth}>
            <Input
              value={expDate}
              keyboardType="number-pad"
              message={
                getCardValidation()
                  ? { error: trans(locale, lang, cardValidation) }
                  : false
              }
              label={trans(locale, lang, 'validityPeriod')}
              placeholder={trans(locale, lang, 'validityPeriodPlaceholder')}
              onChangeText={(num) => {
                const expDateValue = formatedCardDate(
                  num,
                  addCardForm?.expDate
                );
                setAddCardForm({
                  ...addCardForm,
                  expDate: expDateValue.value,
                });
                setCardValidation(expDateValue.error);
              }}
            />
          </View>
          <View style={[style.addCard.expWidth, { marginBottom }]}>
            <Input
              value={cvv}
              secureTextEntry
              label={trans(locale, lang, 'CVV')}
              keyboardType="number-pad"
              placeholder={trans(locale, lang, 'CVVPlaceholder')}
              onChangeText={(num) => {
                if (num?.length < 4) {
                  setAddCardForm({
                    ...addCardForm,
                    cvv: num,
                  });
                }
              }}
            />
          </View>
        </View>
        <View style={style.mb10}>
          <Input
            value={cardName}
            label={trans(locale, lang, 'textSaveAs')}
            message={
              cardValidation === 'textCardNotValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'cardNamePlaceholder')}
            onChangeText={(value) => {
              setAddCardForm({
                ...addCardForm,
                cardName: value,
              });
            }}
          />
        </View>
        <Text
          textStyle="medium"
          color={Color.neutralLifeSaver.light.neutral40}
          style={style.my10}>
          <Text color={Color.primary.light.primary90}>* </Text>
          {trans(locale, lang, 'intructionsDebitAutomatics')}
        </Text>
        <Text
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}>
          {trans(locale, lang, 'textByInputting')}{' '}
          <Text
            textStyle="semi"
            onPress={() => {
              navigation.navigate(
                NAVIGATION.LIFESAVER.LifesaverKebijakanPrivasi
              );
            }}
            style={style.mbMin4}
            color={Color.primary[colorScheme].primary90}
            textDecorationLine="underline">
            {trans(locale, lang, 'tAndCPayment')}
          </Text>
        </Text>
      </View>
    );
  }

  const onAddPayment = () => {
    setCreateBill({
      invoiceId: uuid.v4(),
      productId: '01',
      billType: BILL_TYPE.premium,
      reffNo: 0,
      amount: 0,
      billingDate: getTimestamp(),
      paymentType: PAYMENT_TYPE.creditDebitCard,
      applicationId: APPLICATION_PAYMENT_ID,
      eventCode: '',
      paymentInfo: {
        paymentLabel: addCardForm?.cardName || '',
        accountNumber: addCardForm?.accountNumber.replace(/ /g, ''),
        accountName: '',
        expMonth: addCardForm?.expDate?.split('/')[0],
        expYear: addCardForm?.expDate?.split('/')[1],
        cvn: addCardForm?.cvv,
      },
      isSubscribe: true,
      isVoid: true,
    });
  };

  return (
    <Base
      title={trans(locale, lang, 'textAddMethod')}
      staticView
      statusBarStyle="light-content"
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      onBackPress={() => {
        navigation.goBack();
        setIsComingFromDeepLink(false);
      }}>
      <ScrollView>
        <Padder>
          <View style={style.mt10}>{renderAddCard()}</View>
        </Padder>
      </ScrollView>
      <View style={style.m15}>
        <Button
          disabled={isButtonDisabled}
          onPress={() => {
            setAlreadySubmit(true);
            onAddPayment();
          }}
          type="linear-gradient">
          {trans(locale, lang, 'textAdd')}
        </Button>
      </View>
    </Base>
  );
}

ProfileAddPayment.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setCreateBillClear: PropTypes.func.isRequired,
  setCreateBill: PropTypes.func.isRequired,
  paymentsAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setCreateBillError: PropTypes.objectOf(Object).isRequired,
  setIsComingFromDeepLink: PropTypes.func.isRequired,
  // userId: PropTypes.string.isRequired,
};

export default ProfileAddPayment;
