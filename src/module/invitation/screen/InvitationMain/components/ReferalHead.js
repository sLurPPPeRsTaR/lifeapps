import React from 'react';
import { View, ImageBackground } from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { ReferalBg } from 'ca-config/Image';
import style from '../style';
import locale from '../locale';

function ReferalHead({ lang }) {
  return (
    <ImageBackground
      resizeMode="stretch"
      source={ReferalBg}
      style={style.head.container}>
      <View style={style.head.textContainer}>
        <Text
          textStyle="bold"
          line={33}
          size={Size.text.h6.size}
          align="center"
          color={Color.main.light.white}>
          {trans(locale, lang, 'ayoSalingMelindungi')}
        </Text>
        <Text
          textStyle="medium"
          letterSpacing={0.3}
          size={Size.text.body2.size}
          align="center"
          color={Color.main.light.white}>
          {trans(locale, lang, 'selainMemproteksi')}
        </Text>
      </View>
    </ImageBackground>
  );
}

export default ReferalHead;

ReferalHead.propTypes = {
  lang: PropTypes.string.isRequired,
};
