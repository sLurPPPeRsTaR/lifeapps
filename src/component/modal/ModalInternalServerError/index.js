import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { View, StyleSheet, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import { HddError } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import locale from '../locale';

function ModalInternalServerError({
  isShow,
  onClosePress,
  colorScheme,
  lang,
  // onPressCall,
  onModalHide,
}) {
  return (
    <BottomSheet
      isVisible={isShow}
      swipeable={false}
      onRequestClose={onClosePress}>
      <View style={Style.container}>
        <Image source={HddError} style={Style.icon} />
        <Text
          style={Style.title}
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'maafKamiSedang')}
        </Text>
        <Text
          style={Style.subtitle}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'silahkanCobaBeberapa')}
        </Text>
        <Button block onPress={onClosePress} style={Style.button1}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  icon: {
    position: 'absolute',
    top: -150,
    width: 200,
    height: 200,
    marginBottom: 24,
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

ModalInternalServerError.defaultProps = {
  isShow: false,
  onClosePress: () => {},
  // onPressCall: () => {},
  colorScheme: 'light',
  lang: 'en',
};

ModalInternalServerError.propTypes = {
  isShow: PropTypes.bool,
  onClosePress: PropTypes.func,
  colorScheme: PropTypes.string,
  lang: PropTypes.string,
  // onPressCall: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  onModalHide: PropTypes.func,
};

export default ModalInternalServerError;
