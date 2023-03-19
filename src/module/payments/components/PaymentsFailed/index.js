import { Image, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import { TransFailed } from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { CHECK_PAYMENT_ERR_CODE, NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import style from './style';

function PaymentsFailed(props) {
  const { isVisible, onBackPress, lang, colorScheme, errorCode, navigation } =
    props;

  return (
    <BottomSheet isVisible={isVisible} swipeable={false}>
      <View style={style.mtMin40}>
        <View style={style.imageContainer}>
          <Image source={TransFailed} style={style.image} />
        </View>
        {CHECK_PAYMENT_ERR_CODE[errorCode] ? (
          <View style={style.topMin30}>
            <Text
              align="center"
              style={style.mb24}
              textStyle="bold"
              size={Size.text.h6.size}>
              {trans(locale, lang, 'maaf')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral60}
              align="center">
              {trans(locale, lang, CHECK_PAYMENT_ERR_CODE[errorCode])}
            </Text>
          </View>
        ) : (
          <View style={style.topMin30}>
            <Text
              align="center"
              style={style.mb24}
              textStyle="bold"
              size={Size.text.h6.size}>
              {trans(locale, lang, 'pembayaranGagal')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral60}
              align="center">
              {trans(locale, lang, 'silahkanCobaLagi')}
            </Text>
          </View>
        )}
        <Button
          type="linear-gradient"
          onPress={() => {
            onBackPress();
          }}>
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'kembali')}
          </Text>
        </Button>
        <View style={style.mv10}>
          <Text
            size={Size.text.caption1.size}
            align="center"
            color={Color.neutralLifeSaver[colorScheme].neutral40}
            textStyle="semi">
            {trans(locale, lang, 'butuhBantuan')}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
            }}>
            <Text
              size={Size.text.caption1.size}
              align="center"
              color={Color.primary[colorScheme].primary90}
              textStyle="semi">
              {trans(locale, lang, 'customerCare')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </BottomSheet>
  );
}

PaymentsFailed.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  colorScheme: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onBackPress: PropTypes.func.isRequired,
};

export default PaymentsFailed;
