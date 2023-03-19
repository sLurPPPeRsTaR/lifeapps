import React from 'react';
import { View } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import style from './style';
import locale from './locale';

function ModalOrder({ lang, isVisible, onCancelPress, onConfirmPress }) {
  return (
    <BottomSheet isVisible={isVisible} swipeable={false}>
      <View style={style.mt25}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={style.modal.deleteModal.title}>
          {trans(locale, lang, 'aturSebagaiUtama')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={style.modal.deleteModal.subtitle}>
          {trans(locale, lang, 'yakinGak')}
        </Text>
        <Button
          outline
          style={style.modal.deleteModal.button1}
          onPress={onCancelPress}>
          {trans(locale, lang, 'batalkan')}
        </Button>
        <Button type="linear-gradient" onPress={onConfirmPress}>
          {trans(locale, lang, 'konfirmasi')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ModalOrder;

ModalOrder.defaultProps = {
  isVisible: false,
};

ModalOrder.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  locale: PropTypes.objectOf(Object).isRequired,
  onCancelPress: PropTypes.func.isRequired,
  onConfirmPress: PropTypes.func.isRequired,
};
