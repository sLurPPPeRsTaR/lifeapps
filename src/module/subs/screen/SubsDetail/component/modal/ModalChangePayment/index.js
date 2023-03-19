import { View, TouchableWithoutFeedback } from 'react-native';
import Button from 'ca-component-generic/Button';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import Shadow from 'ca-component-container/Shadow';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import Input from 'ca-component-generic/Input';
import { formatedCardDate, generateCardNo } from 'ca-util/common';
import { getTimestamp } from 'ca-util/format';
import { KreditActive, KreditNotActive } from 'ca-config/Svg';
import {
  NAVIGATION,
  APPLICATION_PAYMENT_ID,
  BILL_TYPE,
  codeLifesaver,
  PAYMENT_TYPE,
} from 'ca-util/constant';
import {
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { ScrollView } from 'react-native-gesture-handler';
import Padder from 'ca-component-container/Padder';
import style from './style';
import locale from './locale';

function ModalChangePayment(props) {
  const {
    lang,
    isVisible,
    onClosePress,
    paymentMethodList,
    navigation,
    dispatch,
    onChangePayment,
    policyNo,
    billingDetail,
    getProduct,
    action,
  } = props;

  const [selectedCard, setSelectedCard] = useState('');
  const [alreadySubmit, setAlreadySubmit] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(() => {
    if (paymentMethodList?.cards?.length === 0) {
      return 2;
    }
    return 1;
  });
  const [addCardForm, setAddCardForm] = useState({
    accountNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    isFill: false,
  });
  const [cardValidation, setCardValidation] = useState(false);
  const eventCode = '';
  const { accountNumber, expDate, cvv, cardName, isFill } = addCardForm;

  const isDisabled = useMemo(() => {
    if (alreadySubmit) {
      return alreadySubmit;
    }
    if (paymentMethod === 1) {
      return !(
        (selectedCard !== '' && addCardForm?.cvv?.length === 3) ||
        isFill
      );
    }
    if (paymentMethod === 2) {
      return !(selectedCard !== '' || isFill);
    }
    return true;
  }, [
    addCardForm?.cvv?.length,
    alreadySubmit,
    isFill,
    paymentMethod,
    selectedCard,
  ]);
  // Modal Error Submission
  // const [isErrSubsVisible, setIsErrSubsVisible] = useState(false);
  // const [errSubsMessage, setErrSubsMessage] = useState('');

  useEffect(() => {
    if (
      action === SET_CREATE_BILL_SUCCESS ||
      action === SET_CREATE_BILL_FAILED
    ) {
      setAlreadySubmit(false);
    }
  }, [action]);

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

  function doPayment(isVoid, amount) {
    setAlreadySubmit(true);
    dispatch.getPaymentStatusClear();
    if (paymentMethod === 1) {
      // do payment with payment list
      dispatch.setLoading(true);
      dispatch.setCreateBill({
        applicationId: APPLICATION_PAYMENT_ID,
        invoiceId: billingDetail?.billings[0].invoiceId,
        billType: BILL_TYPE.premium,
        reffNo: policyNo,
        billingDate: getTimestamp(),
        paymentType: PAYMENT_TYPE.creditDebitCard,
        isSubscribe: true,
        isVoid: isVoid,
        productId: codeLifesaver.productCode,
        amount: billingDetail?.billings[0].amount,
        eventCode,
        paymentInfo: {
          paymentAccountId: selectedCard,
          cvn: addCardForm?.cvv,
        },
      });
    } else if (paymentMethod === 2) {
      dispatch.setLoading(true);
      dispatch.setCreateBill({
        applicationId: APPLICATION_PAYMENT_ID,
        invoiceId: billingDetail?.billings[0].invoiceId,
        billType: BILL_TYPE.premium,
        reffNo: policyNo,
        billingDate: getTimestamp(),
        paymentType: PAYMENT_TYPE.creditDebitCard,
        isSubscribe: true,
        isVoid: isVoid,
        productId: codeLifesaver.productCode,
        amount: billingDetail?.billings[0].amount,
        eventCode,
        paymentInfo: {
          paymentLabel: addCardForm?.cardName || '',
          accountNumber: addCardForm?.accountNumber.replace(/ /g, ''),
          accountName: '',
          expMonth: addCardForm?.expDate?.split('/')[0],
          expYear: addCardForm?.expDate?.split('/')[1],
          cvn: addCardForm?.cvv,
        },
      });
    }
  }

  const getCardValidation = () => {
    return (
      cardValidation === 'formatBulanTidakValid' ||
      cardValidation === 'formatTglTidakValid' ||
      cardValidation === 'cardExpired'
    );
  };

  function renderAddCard() {
    const marginBottom = getCardValidation() ? 22 : 0;
    return (
      <View style={style.my16}>
        <View style={style.mb20}>
          <Text
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            style={style.mb4}>
            {trans(locale, lang, 'nomorKartu')}
          </Text>
          <Input
            value={accountNumber}
            label={trans(locale, lang, 'nomorKartu')}
            keyboardType="number-pad"
            message={
              cardValidation === 'kartuTidakValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'nomorKartuPlaceholder')}
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
            <Text
              textStyle="semi"
              line={18}
              letterSpacing={0.5}
              color={Color.mediumGray.light.mediumGray}
              style={style.mb4}>
              {trans(locale, lang, 'masaBerlaku')}
            </Text>
            <Input
              value={expDate}
              keyboardType="number-pad"
              message={
                getCardValidation()
                  ? { error: trans(locale, lang, cardValidation) }
                  : false
              }
              placeholder={trans(locale, lang, 'masaBerlakuPlaceholder')}
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
            <Text
              textStyle="semi"
              line={18}
              letterSpacing={0.5}
              color={Color.mediumGray.light.mediumGray}
              style={style.mb4}>
              {trans(locale, lang, 'CVV')}
            </Text>
            <Input
              value={cvv}
              secureTextEntry
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
          <Text
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            style={style.mb4}>
            {trans(locale, lang, 'simpanSebagai')}
          </Text>
          <Input
            value={cardName}
            message={
              cardValidation === 'kartuTidakValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'namaKartuPlaceholder')}
            onChangeText={(value) => {
              setAddCardForm({
                ...addCardForm,
                cardName: value,
              });
            }}
          />
        </View>
        <Text textStyle="medium" color={Color.neutralLifeSaver.light.neutral40}>
          {trans(locale, lang, 'denganMenginput')}{' '}
          <Text
            textStyle="semi"
            onPress={() => {
              navigation.navigate(
                NAVIGATION.LIFESAVER.LifesaverKebijakanPrivasi
              );
            }}
            style={style.mbMin4}
            color={Color.primary.light.primary90}
            textDecorationLine="underline">
            {trans(locale, lang, 'tAndCPayment')}
          </Text>
        </Text>
        <View style={style.mt32}>
          <Button
            rounded="lg"
            type="linear-gradient"
            disabled={isDisabled}
            onPress={() => {
              doPayment(false, parseInt(getProduct?.subsPrice, 10));
            }}>
            <Text textStyle="semi" color={Color.whiteCard.light.color}>
              {trans(locale, lang, 'tambahkan')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
  function renderCardContent() {
    if (paymentMethod === 1) {
      return renderPaymentList();
    }
    if (paymentMethod === 2) {
      return renderAddCard();
    }
    return null;
  }

  function renderPaymentMethod() {
    const tabs = [
      {
        id: 1,
        label: 'kartuSaya',
      },
      {
        id: 2,
        label: 'tambahkan',
        label2: 'kreditDebit',
      },
    ];

    const isActiveTab = (id) => {
      return paymentMethod === id;
    };

    return (
      <View>
        <View style={style.paymentMethod.header}>
          {tabs?.map((element) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setPaymentMethod(element.id);
                onChangePayment(element.id);
                if (paymentMethod !== element?.id) {
                  setCardValidation(false);
                  setSelectedCard('');
                  setAddCardForm({
                    accountNumber: '',
                    expDate: '',
                    cvv: '',
                    isFill: false,
                  });
                }
              }}>
              <View style={style.paymentMethod.tabWidth}>
                <View style={style.paymentMethod.tabLabel}>
                  <Text
                    align="center"
                    color={
                      isActiveTab(element?.id)
                        ? Color.primary.light.primary90
                        : Color.neutralLifeSaver.light.neutral20
                    }
                    textStyle={
                      paymentMethod === element.id ? 'semi' : 'medium'
                    }>
                    {trans(locale, lang, element?.label)}
                  </Text>
                  {element?.label2 ? (
                    <Text
                      align="center"
                      color={
                        isActiveTab(element?.id)
                          ? Color.primary.light.primary90
                          : Color.neutralLifeSaver.light.neutral20
                      }
                      textStyle={
                        paymentMethod === element.id ? 'semi' : 'medium'
                      }>
                      {trans(locale, lang, element?.label2)}
                    </Text>
                  ) : null}
                </View>
                <View style={style.b0}>
                  <HorizontalLine
                    color={
                      paymentMethod === element.id
                        ? Color.primary.light.primary90
                        : Color.grayLine.light.color
                    }
                    height={3}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        {renderCardContent()}
      </View>
    );
  }

  function renderPaymentList() {
    const isSelectedCard = (paymentAccount) => {
      return paymentAccount === selectedCard;
    };
    if (paymentMethodList?.cards?.length > 0) {
      return (
        <View style={style.my16}>
          <Shadow borderRadius={16}>
            <ScrollView style={style.maxH}>
              {paymentMethodList?.cards?.map((element, index) => (
                <View>
                  {index === 0 ? null : (
                    <View style={style.px16}>
                      <HorizontalLine />
                    </View>
                  )}
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedCard(element?.paymentAccount);
                    }}>
                    <View style={style.paymentList.listContainer}>
                      <View style={style.paymentList.listCardDesc}>
                        {isSelectedCard(element?.paymentAccount) ? (
                          <KreditActive />
                        ) : (
                          <KreditNotActive />
                        )}
                        <View style={style.ml16}>
                          <Text
                            textStyle="medium"
                            color={
                              isSelectedCard(element?.paymentAccount)
                                ? Color.red.light.D71920
                                : 'black'
                            }>
                            {element?.accountProvider}
                          </Text>
                          <Text
                            textStyle="medium"
                            color={
                              isSelectedCard(element?.paymentAccount)
                                ? Color.red.light.D71920
                                : 'black'
                            }>
                            {/* {element?.cardNo} */}
                            {element?.cardNo?.replace(/X/g, '*')}
                          </Text>
                        </View>
                      </View>
                      {isSelectedCard(element?.paymentAccount) ? (
                        <View style={style.paymentMethod.radioContainer}>
                          <View style={style.paymentMethod.radioFill} />
                        </View>
                      ) : (
                        <View style={style.paymentMethod.radioContainerFalse} />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
            </ScrollView>
          </Shadow>

          <View style={style.mt16}>
            <Text textStyle="semi">{trans(locale, lang, 'masukanCvv')}</Text>
            <Text
              color={Color.neutralLifeSaver.light.neutral40}
              textStyle="medium"
              style={style.mb16}>
              {trans(locale, lang, 'silahkanMasukanCvv')}
            </Text>
            <View>
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
          <Text
            style={style.mt16}
            textStyle="medium"
            color={Color.neutralLifeSaver.light.neutral40}>
            {trans(locale, lang, 'denganMenginput')}{' '}
            <Text
              textStyle="semi"
              onPress={() => {
                navigation.navigate(
                  NAVIGATION.LIFESAVER.LifesaverKebijakanPrivasi
                );
              }}
              style={style.mbMin4}
              color={Color.primary.light.primary90}
              textDecorationLine="underline">
              {trans(locale, lang, 'tAndCPayment')}
            </Text>
          </Text>
          <View style={style.mt16}>
            <Button
              rounded="lg"
              type="linear-gradient"
              disabled={isDisabled}
              onPress={() => {
                doPayment(false, parseInt(getProduct?.subsPrice, 10));
              }}>
              <Text textStyle="semi" color={Color.whiteCard.light.color}>
                {trans(locale, lang, 'pilih')}
              </Text>
            </Button>
          </View>
        </View>
      );
    }
    return (
      <View style={style.paymentList.addCardContainer}>
        <Text textStyle="medium" color={Color.neutralLifeSaver.light.neutral40}>
          {trans(locale, lang, 'belumAdaKartu')}
        </Text>
        <View style={style.paymentList.addCardButton}>
          <Button
            onPress={() => {
              setPaymentMethod(2);
              onChangePayment(2);
            }}>
            <Text
              textStyle="semi"
              color={Color.whiteCard.light.color}
              align="center">
              + {trans(locale, lang, 'tambahKartu')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <BottomSheet
      swipeable={false}
      isPadder={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          isBorderBottom
          title={trans(locale, lang, 'metodePembayaran')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <Padder style={style.mv40}>{renderPaymentMethod()}</Padder>
    </BottomSheet>
  );
}

ModalChangePayment.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProduct: PropTypes.objectOf(Object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onChangePayment: PropTypes.func.isRequired,
  paymentMethodList: PropTypes.arrayOf(Array).isRequired,
  dispatch: PropTypes.objectOf(Object).isRequired,
  billingDetail: PropTypes.objectOf(Object).isRequired,
  policyNo: PropTypes.string.isRequired,
};

export default ModalChangePayment;
