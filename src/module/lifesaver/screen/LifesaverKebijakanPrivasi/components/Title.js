import { View } from 'react-native';
import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import style from '../style';

function Title(props) {
  const { children, no } = props;
  return (
    <View>
      <Text
        textStyle="semi"
        style={style.my8}
        color={Color.primary.light.primary80}
        size={Size.text.h6.size}>
        {no}. {children}
      </Text>
      <HorizontalLine />
    </View>
  );
}

export default Title;
