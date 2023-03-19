import React from 'react';
import { View, Image } from 'react-native';
import Text from 'ca-component-generic/Text';
import { GreenTick } from 'ca-config/Image';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { store } from 'ca-config/Store';
import style from './style';

export default function Splash(props) {
  const { title, desc, isVisible } = props;
  const { dimensions } = store.getState().bootstrap;

  if (isVisible) {
    return (
      <View style={[style.splash.container, { height: dimensions.height }]}>
        <View style={style.splash.content}>
          <Image
            source={GreenTick}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
          <View style={style.pH44}>
            <Text
              style={[style.mT29, style.mB8]}
              align="center"
              color={Color.neutral.light.neutral80}
              size={Size.text.h6.size}
              textStyle="semi"
              line={27}
              letterSpacing={0.5}>
              {title}
            </Text>
            <Text
              style={style.mT5}
              align="center"
              color={Color.neutral.light.neutral10}
              size={Size.text.body1.size}
              textStyle="regular"
              line={25}
              letterSpacing={0.5}>
              {desc}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return null;
}

Splash.defaultProps = {
  title: '',
  desc: '',
};

Splash.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};
