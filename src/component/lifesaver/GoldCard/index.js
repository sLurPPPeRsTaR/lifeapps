import { View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import style from './style';

function GoldCard(props) {
  const { children, title, subtitle, colorType, width } = props;
  if (colorType === 'red') {
    return (
      <View style={[style.productDesc, { width }]}>
        <View style={style.productDesc.borderRadius}>
          <LinearGradient
            useAngle
            angle={169}
            colors={[
              Color.tableHeader.light.activeA1,
              Color.tableHeader.light.activeA2,
            ]}
            style={style.productDesc.linearGradient}>
            <Text align="left" textStyle="semi" size={Size.text.h6.size}>
              {title}
            </Text>
            <Text align="left" textStyle="medium" size={Size.text.body2.size}>
              {subtitle}
            </Text>
          </LinearGradient>
          <View style={style.productDesc.desc}>{children}</View>
        </View>
      </View>
    );
  }
  return (
    <View style={[style.productDesc, { width }]}>
      <View style={style.productDesc.borderRadius}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: colorType === 'light' ? 1 : 2, y: 0 }}
          colors={
            colorType === 'light'
              ? [
                  Color.linearGold.light.linearGoldLightFrom,
                  Color.linearGold.light.linearGoldLightTo,
                ]
              : [
                  Color.linearGold.light.linearGoldDarkFrom,
                  Color.linearGold.light.linearGoldDarkTo,
                ]
          }
          style={style.productDesc.linearGradient}>
          <Text align="left" textStyle="semi" size={Size.text.h6.size}>
            {title}
          </Text>
          <Text align="left" textStyle="medium" size={Size.text.body2.size}>
            {subtitle}
          </Text>
        </LinearGradient>
        <View style={style.productDesc.desc}>{children}</View>
      </View>
    </View>
  );
}

GoldCard.defaultProps = {
  title: '',
  subtitle: '',
  children: undefined,
  colorType: 'dark',
};

GoldCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  colorType: PropTypes.string,
  width: PropTypes.number.isRequired,
};
export default GoldCard;
