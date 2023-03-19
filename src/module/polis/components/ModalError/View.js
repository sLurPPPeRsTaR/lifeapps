import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { PolisNotLinked } from 'ca-config/Image';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import Color from 'ca-config/Color';
import locale from './locale';
import Style from './style';

function PolisModalError({
  navigation,
  isVisible,
  colorScheme,
  onClose,
  lang,
}) {
  const onBackPress = () => {
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
    });
  };
  return (
    <BottomSheet
      isVisible={isVisible}
      swipeable={false}
      onClosePress={onClose}
      onRequestClose={onBackPress}>
      <View style={Style.container}>
        <Image
          source={PolisNotLinked}
          style={Style.icon}
          resizeMode="contain"
        />
        <Text
          style={Style.title}
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'title')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'subtitle')}
        </Text>
        <Button
          block
          style={Style.button}
          onPress={() => {
            onClose();
            navigation.navigate(NAVIGATION.POLICY.PolisMain);
          }}>
          {trans(locale, lang, 'lanjutkan')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default PolisModalError;

PolisModalError.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
};
