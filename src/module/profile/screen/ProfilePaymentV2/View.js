import React, { useCallback } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import {
  Gopay,
  Bridirectdebit,
  // Linkaja,
  Mandiri,
  Mastercard,
  Oneklik,
  // Ovo,
  Visa,
} from 'ca-config/Image';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import { NAVIGATION } from 'ca-util/constant';
import { ArrowRight2Black } from 'ca-config/Svg';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import style from './style';
import locale from './locale';

function ProfilePaymentV2({ lang, navigation, onSelected }) {
  const onAddNewCard = () => {
    navigation.navigate(NAVIGATION.PAYMENTS.NewCreditCard);
    // onClosePress();
  };

  const PaymentCard = useCallback(({ title, children }) => {
    return (
      <View style={style.paymentCard.wrap}>
        <Text
          textStyle="semi"
          line={33}
          size={Size.text.body2.size}
          color={Color.neutral.light.neutral40}>
          {title}
        </Text>

        <View style={style.paymentCard.shadow}>
          <View style={style.paymentCard.container}>{children}</View>
        </View>
      </View>
    );
  }, []);

  const PaymentItem = useCallback(({ name, subtitle, image, onPress }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={style.paymentItem.container}>
          <View style={style.paymentItem.iconContainer}>
            <Image source={image} style={style.paymentItem.icon} />
          </View>
          <View style={style.fx1}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              color={Color.neutral.light.neutral90}>
              {name}
            </Text>
            {subtitle && (
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                color={Color.neutral.light.neutral40}>
                {name}
              </Text>
            )}
          </View>
          <ArrowRight2Black width={25} height={25} />
        </View>
      </TouchableWithoutFeedback>
    );
  }, []);

  const PaymentItemAdd = useCallback(
    ({ onPress }) => {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={style.paymentItemAdd.container}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'TambahkanKartu')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [lang]
  );

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'Pembayaran')}>
      <Padder>
        <PaymentCard title="Dompet Elektronik">
          <PaymentItem
            name="GoPay"
            image={Gopay}
            onPress={() => onSelected()}
          />
        </PaymentCard>

        <PaymentCard title="Bank Transfer">
          <PaymentItem name="VA BCA" image={Oneklik} />
          <View style={style.divider} />
          <PaymentItem name="VA Mandiri" image={Mandiri} />
          <View style={style.divider} />
          <PaymentItem name="VA BRI" image={Bridirectdebit} />
        </PaymentCard>

        <PaymentCard title="Kartu Kredit">
          <PaymentItem name="Mastercard" subtitle="Halo" image={Mastercard} />
          <View style={style.divider} />
          <PaymentItem name="Visa" subtitle="Halo" image={Visa} />
          <View style={style.divider} />
          <PaymentItemAdd onPress={onAddNewCard} />
        </PaymentCard>
      </Padder>
    </Base>
  );
}

export default ProfilePaymentV2;

ProfilePaymentV2.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  onSelected: PropTypes.func.isRequired,
};
