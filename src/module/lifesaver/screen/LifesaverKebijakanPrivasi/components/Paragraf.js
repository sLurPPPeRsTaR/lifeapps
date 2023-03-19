import { View } from 'react-native';
import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

function Paragraf(props) {
  const { children, no, marginDisabled } = props;

  return (
    <View>
      <Text
        style={{ marginVertical: marginDisabled ? 0 : 5, paddingBottom:0 }}
        letterSpacing={0.5}
        textStyle="regular"
        align="left"
        line={25}
        color={Color.neutralLifeSaver.light.neutral40}>
        {no ? `${no}. ` : null}
        {children}
      </Text>
    </View>
  );
}

export default Paragraf;
