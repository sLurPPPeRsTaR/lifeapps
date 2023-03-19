import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { View, StyleSheet, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import { RusakIcon1 } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import locale from '../locale';

function ModalComingSoon({
  isShow,
  onClosePress,
  colorScheme,
  lang,
  onPressCall,
  onModalHide,
}) {
  return (
    <BottomSheet
      isVisible={isShow}
      swipeable={false}
      onRequestClose={onClosePress}
      onModalHide={onModalHide}
      onClosePress={onClosePress}>
      <View style={Style.container}>
        <Image source={RusakIcon1} style={Style.icon} resizeMode="contain" />
        <Text
          style={Style.title}
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'maafUntukSekarang')}
        </Text>
        <Text
          style={Style.subtitle}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'silahkanHubungiCustomer')}
        </Text>
        <Button block outline onPress={onClosePress} style={Style.button1}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button block onPress={onPressCall}>
          {trans(locale, lang, 'hubungiCS')}
        </Button>
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    width: 229,
    height: 180,
    top: -180,
  },
  title: {
    marginHorizontal: 32,
    marginBottom: 8,
  },
  subtitle: {
    marginHorizontal: 32,
    marginBottom: 16,
  },
  button1: {
    marginBottom: 16,
  },
});

ModalComingSoon.defaultProps = {
  isShow: false,
  onClosePress: () => {},
  onPressCall: () => {},
  colorScheme: 'light',
  lang: 'en',
};

ModalComingSoon.propTypes = {
  isShow: PropTypes.bool,
  onClosePress: PropTypes.func,
  colorScheme: PropTypes.string,
  lang: PropTypes.string,
  onPressCall: PropTypes.func,
  onModalHide: PropTypes.func,
};

export default ModalComingSoon;
