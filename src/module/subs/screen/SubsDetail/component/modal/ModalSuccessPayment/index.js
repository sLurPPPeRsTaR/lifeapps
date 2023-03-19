import React, { useEffect } from 'react';
import { View } from 'react-native';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import { CheckSuccess2 } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import Size from 'ca-config/Size';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';

function ModalSuccessPayment(props) {
  const { colorScheme, lang, isVisible, onClosePress } = props;

  useEffect(() => {
    setTimeout(() => {
      onClosePress();
    }, 3000);
  });

  return (
    <BottomSheet swipeable={false} isVisible={isVisible}>
      <View style={style.container}>
        <CheckSuccess2 style={style.icon} />
        <Text
          align="center"
          textStyle="bold"
          color={Color.neutral[colorScheme].neutral60}>
          {trans(locale, lang, 'pembayaranBerhasil')}
        </Text>
        <Text
          align="center"
          textStyle="medium"
          color={Color.primary[colorScheme].neutral60}>
          {trans(locale, lang, 'metodePembayaran')}
        </Text>
      </View>
    </BottomSheet>
  );
}

export default ModalSuccessPayment;

ModalSuccessPayment.defaultProps = {
  colorScheme: 'light',
};

ModalSuccessPayment.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
};
