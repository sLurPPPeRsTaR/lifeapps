import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from 'ca-config/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BtnBack } from 'ca-config/Svg';
import { APP } from 'ca-util/constant';
import style from './style';

function BaseContainer(props) {
  const { navigation, children, colorScheme, backgroundColor } = props;

  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const opacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const opacityInverse = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const [isDark, setIsDark] = useState(false);

  function renderStatusBar() {
    const { statusBarStyle, statusBarBackgroundColor } = props;
    return (
      <StatusBar
        translucent
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarStyle}
      />
    );
  }

  function renderHeaderContainer() {
    const { rightHeaderContent } = props;

    return (
      <Animated.View
        style={[
          isDark
            ? style.renderHeaderContainer.containerInverse
            : style.renderHeaderContainer.containerInverse,
          {
            width: width,
            opacity: isDark ? opacity : opacityInverse,
            top: insets.top,
          },
        ]}>
        <View
          style={[
            style.renderHeaderContainer.header.container,
            style.renderHeaderContainer.header.animatedContainer,
            {
              backgroundColor: isDark
                ? Color.main.light.white
                : Color.transparent.light.transparent,
              height: APP.header.height + 40,
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <BtnBack
              fill={isDark ? Color.main.light.black : Color.main.light.white}
            />
          </TouchableOpacity>
          {rightHeaderContent && rightHeaderContent}
        </View>
      </Animated.View>
    );
  }

  return (
    <View
      style={[style.container, { backgroundColor, paddingTop: insets.top }]}>
      {renderStatusBar()}
      {children}
    </View>
  );
}

export default BaseContainer;

BaseContainer.defaultProps = {
  colorScheme: 'light',
  backgroundColor: Color.whiteLifesaverBg.light.whiteLifesaverBg,
  rightHeaderContent: undefined,
  statusBarStyle: 'dark-content',
  statusBarBackgroundColor: 'transparent',
};

BaseContainer.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  children: PropTypes.node.isRequired,
  colorScheme: PropTypes.string,
  backgroundColor: PropTypes.string,
  rightHeaderContent: PropTypes.element,
  statusBarStyle: PropTypes.string,
  statusBarBackgroundColor: PropTypes.string,
};
