import React, { useCallback } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  // Gopay,
  // Bridirectdebit,
  // Linkaja,
  // Mandiri,
  Mastercard,
  // Oneklik,
  Ovo,
  Visa,
} from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import { NAVIGATION } from 'ca-util/constant';
import { Close, ArrowRight2Black, InfoGrey } from 'ca-config/Svg';
import style from './style';
import locale from './locale';

function PaymentsDialog({
  lang,
  isVisible,
  navigation,
  onClosePress,
  onSelected,
}) {
  const onAddNewCard = () => {
    navigation.navigate(NAVIGATION.PAYMENTS.NewCreditCard);
    onClosePress();
  };

  const Header = useCallback(() => {
    return (
      <>
        <View style={style.header.container}>
          <View style={style.fx1}>
            <TouchableWithoutFeedback onPress={onClosePress}>
              <View style={style.header.closeBtnContainer}>
                <Close width={27} height={27} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={style.fx1}>
            <Text
              textStyle="bold"
              line={33}
              size={Size.text.body2.size}
              align="center">
              {trans(locale, lang, 'headerTitle')}
            </Text>
          </View>
          <View style={style.fx1} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

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

  const PaymentOtomatisInfo = useCallback(() => {
    return (
      <View style={style.paymentCard.wrap}>
        <Text
          textStyle="semi"
          line={33}
          size={Size.text.body2.size}
          color={Color.neutral.light.neutral40}>
          {trans(locale, lang, 'pembayaranOtomatis')}
        </Text>

        <View style={style.paymentOtomatisInfo.container}>
          <View style={style.paymentOtomatisInfo.iconContainer}>
            <InfoGrey
              width={25}
              height={25}
              fill={Color.mediumGray.light.mediumGray}
            />
          </View>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.mediumGray.light.mediumGray}
            style={style.paymentOtomatisInfo.text}>
            {trans(locale, lang, 'MetodeBerikutMendukung')}
          </Text>
        </View>
      </View>
    );
  }, [lang]);

  return (
    <BottomSheet
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <ScrollView
        style={style.scrollview.root}
        contentContainerStyle={style.scrollview.content}
        showsVerticalScrollIndicator={false}>
        <PaymentCard title="Dompet Elektronik">
          {/* <PaymentItem
            name="GoPay"
            image={Gopay}
            onPress={() => onSelected()}
          />
          <View style={style.divider} /> */}
          <PaymentItem name="OVO" image={Ovo} onPress={() => onSelected()} />
          {/* <View style={style.divider} />
          <PaymentItem name="LinkAja" image={Linkaja} /> */}
        </PaymentCard>

        {/* <PaymentCard title="Bank Transfer">
          <PaymentItem name="VA BCA" image={Oneklik} />
          <View style={style.divider} />
          <PaymentItem name="VA Mandiri" image={Mandiri} />
          <View style={style.divider} />
          <PaymentItem name="VA BRI" image={Bridirectdebit} />
        </PaymentCard> */}

        <PaymentOtomatisInfo />

        {/* <PaymentCard title="Debit Instant">
          <PaymentItem name="BCA OneKlik" image={Oneklik} />
          <View style={style.divider} />
          <PaymentItem name="Mandiri Direct Debit" image={Mandiri} />
          <View style={style.divider} />
          <PaymentItem name="BRI Direct Debit" image={Bridirectdebit} />
        </PaymentCard> */}

        <PaymentCard title="Kartu Kredit">
          <PaymentItem name="Mastercard" subtitle="Halo" image={Mastercard} />
          <View style={style.divider} />
          <PaymentItem name="Visa" subtitle="Halo" image={Visa} />
          <View style={style.divider} />
          <PaymentItemAdd onPress={onAddNewCard} />
        </PaymentCard>
      </ScrollView>
    </BottomSheet>
  );
}

export default PaymentsDialog;

PaymentsDialog.defaultProps = {
  isVisible: false,
};

PaymentsDialog.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClosePress: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  onSelected: PropTypes.func.isRequired,
};
