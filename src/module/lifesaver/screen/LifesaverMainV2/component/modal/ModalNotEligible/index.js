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
import Style from './style';

function ModalNotEligible({
  lang,
  locale,
  isVisible,
  onPressClose,
  onPressRemember,
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
          {trans(locale, lang, 'maafKamuBelumBisa')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.subtitle}>
          {trans(locale, lang, 'kamuBelumBisa')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.subtitle}>
          {trans(locale, lang, 'tips')}
        </Text>
        <Button type="linear-gradient" onPress={onPressRemember}>
          {trans(locale, lang, 'ingatkan')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ModalNotEligible;

ModalNotEligible.defaultProps = {
  isVisible: false,
};

ModalNotEligible.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  locale: PropTypes.objectOf(Object).isRequired,
  onPressClose: PropTypes.func.isRequired,
  onPressRemember: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
