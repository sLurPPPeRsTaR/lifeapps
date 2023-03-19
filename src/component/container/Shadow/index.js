import React from 'react';
import { View, Animated } from 'react-native';
import Style from './style';

export default function Shadow(props) {
  const { style, borderRadius, children, animated, innerContainerStyle } =
    props;
  if (animated) {
    return (
      <Animated.View style={[Style.container, { borderRadius }, style]}>
        <Animated.View
          style={[Style.innerContainer, { borderRadius }, innerContainerStyle]}>
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
  return (
    <View style={[Style.container, { borderRadius }, style]}>
      <View
        style={[Style.innerContainer, { borderRadius }, innerContainerStyle]}>
        {children}
      </View>
    </View>
  );
}
