import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import {
  ArrowDown,
  ArrowDown2,
  ArrowRight2,
  ChevronDown,
  CreditCard,
  DeleteIcon,
  LinkAja,
} from 'ca-config/Svg';
import { Gopay, PaymentCard2, TrashBin } from 'ca-config/Image';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import _ from 'lodash';
import { formatedCardDate, regexNumber, regexNumeric } from 'ca-util/common';
import locale from './locale';
import style from './style';
import moment from 'moment';

function ProfilePayment(props) {
  const {
    navigation,
    lang,
    getPaymentMethod,
    getPaymentMethodResponse,
    userId,
    setCreateBill,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [cardNumber, setCardNumber] = useState(null);
  const [validThru, setValidThru] = useState(null);
  const [messageDate, setMessageDate] = useState('');
  const [CVV, setCVV] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageOnlyNumber, setMessageOnlyNumber] = useState('');

  useEffect(() => {
    getPaymentMethod({
      companyId: 'ifg-life',
      accountId: userId,
    });
  }, [getPaymentMethod]);

  const validateNumber = (input) => {
    if (input.length > 1 && !regexNumber.test(input)) {
      setMessageOnlyNumber(trans(locale, lang, 'hanyaInputAngka'));
      return false;
    }
    setMessageOnlyNumber(null);
    return true;
  };

  function checkData() {
    const params = {
      companyId:"1.047",
      accountId: userId,
      invoiceId:"INV0000001001",
      productId:"03",
      billType:"premium",
      reffNo:"102022000007",
      amount: 0,
      billingDate: moment().add(1, 'h').add(1, 'm').format('YYYY-MM-DD hh:mm:ss'),
      paymentType:"credit-card",
      applicationId:"customerapps-mobile",
      eventCode: "",
      paymentInfo:{
          accountNumber: cardNumber,
          accountName: cardName,
          expMonth: validThru.substring(0,2),
          expYear:"20"+ validThru.substring(3,5),
          cvn: CVV
      },
      isSubscribe: true,
      isVoid: true
    }

    setCreateBill(params)
    console.log(params)
  }

  const PaymentCard = useCallback(({ title, children, changed, subtitle }) => {
    return (
      <View style={style.paymentCard.wrap}>
        <View style={style.paymentCard.title}>
          <View>
            <Text
              textStyle="semi"
              line={25}
              size={Size.text.body2.size}
              color={Color.neutral.light.neutral90}>
              {title}
            </Text>
            {subtitle && (
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                color={Color.neutral.light.neutral10}>
                {subtitle}
              </Text>
            )}
          </View>
          {changed && (
            <Text
              textStyle="semi"
              line={33}
              size={Size.text.body2.size}
              color={Color.red.light.red90}>
              Ubah
            </Text>
          )}
        </View>

        <View style={style.paymentCard.shadow}>
          <View style={style.paymentCard.container}>{children}</View>
        </View>
      </View>
    );
  }, []);

  const PaymentItem = useCallback(
    ({ name, subtitle, image, onPress, deleted, isPrimary }) => {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={style.paymentItem.container}>
            <View style={style.paymentItem.iconContainer}>
              <Image source={image} style={style.paymentItem.icon} />
            </View>
            <View style={style.fx1}>
              <View style={style.fdRow}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  color={Color.neutral.light.neutral90}>
                  {name}
                </Text>
                {isPrimary && (
                  <Text
                    textStyle="semi"
                    size={Size.text.caption2.size}
                    color={Color.redHome.dark.redHome}
                    style={style.paymentItem.primaryText}>
                    {trans(locale, lang, 'utama')}
                  </Text>
                )}
              </View>
              {subtitle && (
                <Text
                  textStyle="semi"
                  size={Size.text.caption1.size}
                  color={Color.neutral.light.neutral10}>
                  {subtitle}
                </Text>
              )}
            </View>
            {deleted && (
              <View style={style.paymentItem.deleteIconContainer}>
                <TouchableWithoutFeedback
                  onPress={() => setShowDeleteModal(true)}>
                  <DeleteIcon width={20} height={20} />
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    },
    []
  );

  const renderPrimaryPayment = () => {
    return (
      <View style={style.paymentItem.borderCard}>
        <PaymentCard title="Primer" changed>
          <PaymentItem
            name="Visa"
            subtitle="**** **** **** 3322"
            image={PaymentCard2}
          />
        </PaymentCard>
      </View>
    );
  };

  const renderStoredPayment = () => {
    if (_.isEmpty(getPaymentMethodResponse?.cards)) {
      return null;
    }

    return (
      <View style={style.paymentItem.borderCard}>
        <PaymentCard
          title={trans(locale, lang, 'metodePembayaran')}
          subtitle={trans(locale, lang, 'metodePembayaranUtama')}>
          {getPaymentMethodResponse?.cards.map((val, idx) => (
            <PaymentItem
              key={idx}
              name={val.paymentLabel}
              subtitle={val.cardNo}
              image={PaymentCard2}
              isPrimary={idx === 0}
              deleted
            />
          ))}
          {/* <View style={style.divider} /> */}
        </PaymentCard>
      </View>
    );
  };

  const renderAddPaymentMethod = () => {
    return (
      <PaymentCard title="Tambah Metode" subtitle="Kredit/Debit Card">
        <View style={style.paymentCard.title}>
          <PaymentItem
            name="Kartu kredit atau debit"
            subtitle="Visa, Mastercard, AMEX, and GPN"
            image={PaymentCard2}
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}>
            <View style={style.paymentItem.dropdownIconContainer}>
              {isExpanded ? (
                <ArrowDown2
                  width={16}
                  height={16}
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              ) : (
                <ArrowDown2 width={16} height={16} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {isExpanded ? renderAddPaymentForm() : null}
      </PaymentCard>
    );
  };

  const renderAddPaymentForm = () => {
    return (
      <View style={{ flex: 1, height: 'auto', marginTop: 24 }}>
        <View style={style.mb20}>
          <Input
            value={cardNumber}
            keyboardType="number-pad"
            label={trans(locale, lang, 'nomorKartu')}
            placeholder={trans(locale, lang, 'nomorKartuPlaceholder')}
            onChangeText={(num) => {
              setCardNumber(num.replace(/[^0-9]/g, ''));
            }}
          />
        </View>
        <View style={[style.fdRow, style.mb20]}>
          <View style={style.fx1}>
            <Input
              value={validThru}
              label={trans(locale, lang, 'masaBerlaku')}
              placeholder={trans(locale, lang, 'masaBerlakuPlaceholder')}
              onChangeText={(num) => {
                const expDateValue = formatedCardDate(num, validThru || '');

                if (expDateValue?.error) {
                  setMessageDate(expDateValue?.error);
                } else {
                  setMessageDate(false);
                }

                if (num == '') {
                  setMessageDate(false);
                }

                setValidThru(expDateValue.value);
              }}
              message={{ error: trans(locale, lang, messageDate) }}
            />
          </View>
          <View style={style.w14} />
          <View style={style.fx1}>
            <Input
              value={CVV}
              label={trans(locale, lang, 'CVV')}
              placeholder={trans(locale, lang, 'CVVPlaceholder')}
              secureTextEntry
              onChangeText={(num) => {
                setCVV(num);
                validateNumber(num);
              }}
              message={{ error: messageOnlyNumber }}
            />
          </View>
        </View>
        <View style={style.mb20}>
          <Input
            value={cardName}
            label={trans(locale, lang, 'namaKartu')}
            placeholder={trans(locale, lang, 'namaKartuPlaceholder')}
            onChangeText={(num) => {
              setCardName(num);
            }}
          />
        </View>
        <View style={style.mb20}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.neutral.light.neutral10}>
            {trans(locale, lang, 'denganMenginput')}{' '}
            <Text
              textStyle="semi"
              textDecorationLine="underline"
              size={Size.text.caption1.size}
              color={Color.red.light.red90}
              style={{}}>
              {trans(locale, lang, 'syaratDanKetentuan')}
            </Text>
          </Text>
        </View>
        <View style={style.mb20}>
          <Button
            disabled={
              !cardName ||
              !cardNumber ||
              !validThru ||
              !CVV ||
              messageOnlyNumber ||
              messageDate
            }
            onPress={() => checkData()}>
            {trans(locale, lang, 'tambahKartu')}
          </Button>
        </View>
      </View>
    );
  };

  function renderConfirmDeleteModal() {
    return (
      <BottomSheet isVisible={showDeleteModal} swipeable={false}>
        <View style={style.modal.deleteModal.iconContainer}>
          <Image source={TrashBin} style={style.modal.deleteModal.icon} />
        </View>
        <View style={style.mt85}>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            style={style.modal.deleteModal.title}>
            {trans(locale, lang, 'konfirmasi')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.deleteModal.subtitle}>
            {trans(locale, lang, 'yakinHapuskan')}
          </Text>
          <Button
            outline
            style={style.modal.deleteModal.button1}
            onPress={() => {
              setShowDeleteModal(false);
            }}>
            {trans(locale, lang, 'hapus')}
          </Button>
          <Button
            type="linear-gradient"
            onPress={() => {
              setShowDeleteModal(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'metodePembayaran')}>
      {renderConfirmDeleteModal()}
      <Padder>
        {/* {renderPrimaryPayment()} */}
        {renderStoredPayment()}
        {renderAddPaymentMethod()}
      </Padder>
    </Base>
  );
}

export default ProfilePayment;

ProfilePayment.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};
