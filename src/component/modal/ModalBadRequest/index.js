import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { View, StyleSheet, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import { Icon404 } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import locale from '../locale';

function ModalBadRequest({
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
      onModalHide={onModalHide}>
      <View style={Style.container}>
        <Image source={Icon404} style={Style.icon} resizeMode="contain" />
        <Text
          style={Style.title}
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'oopsTerjadiMasalah')}
        </Text>
        <Text
          style={Style.subtitle}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'harapMenungguBeberapa')}
        </Text>
        <Button block onPress={onClosePress}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 230,
    height: 180,
    position: 'absolute',
    top: -105,
  },
  title: {
    marginHorizontal: 32,
    marginBottom: 16,
  },
  subtitle: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
});

ModalBadRequest.defaultProps = {
  isShow: false,
  onClosePress: () => {},
  onPressCall: () => {},
  colorScheme: 'light',
  lang: 'en',
};

ModalBadRequest.propTypes = {
  isShow: PropTypes.bool,
  onClosePress: PropTypes.func,
  colorScheme: PropTypes.string,
  lang: PropTypes.string,
  onPressCall: PropTypes.func,
  onModalHide: PropTypes.func,
};

export default ModalBadRequest;
