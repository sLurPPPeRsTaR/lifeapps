import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { LPSpeakerLock } from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import { Close } from 'ca-config/Svg';
import Style from '../ModalNotEligible/style';

function ModalSuccessRemember({
  lang,
  isVisible,
  locale,
  onPressClose,
  onRequestClose,
}) {
  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isVisible={isVisible}
      swipeable={false}>
      <TouchableHighlight
        underlayColor="white"
        style={Style.closeIcon}
        onPress={onPressClose}>
        <Close />
      </TouchableHighlight>
      <View style={Style.iconContainer}>
        <Image source={LPSpeakerLock} style={Style.icon} resizeMode="contain" />
      </View>
      <View style={Style.mt65}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={Style.title}>
          {trans(locale, lang, 'pengingatBerhasil')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.subtitle}>
          {trans(locale, lang, 'nantiAkanKamiInfokan')}
        </Text>
        <Button type="linear-gradient" onPress={onPressClose}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ModalSuccessRemember;

ModalSuccessRemember.defaultProps = {
  isVisible: false,
};

ModalSuccessRemember.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onPressClose: PropTypes.func.isRequired,
  locale: PropTypes.objectOf(Object).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
