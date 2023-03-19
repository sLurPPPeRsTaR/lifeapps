import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Size, Color } from 'ca-config/index';
import { BtnBack, CloseLine } from 'ca-config/Svg';
import Text from 'ca-component-generic/Text';

export default function Header(props) {
  const {
    children,
    title,
    leftTitle,
    isLight,
    onBackPress,
    onClosePress,
    rightContent,
    rightCloseButton,
    leftCloseButton = !rightCloseButton,
    colorScheme,
    bordered,
    headerStyle,
  } = props;
  function renderLeft() {
    if (onBackPress) {
      return (
        <View style={[Styles.leftContainer, headerStyle]}>
          <TouchableNativeFeedback onPress={onBackPress}>
            <View style={[Styles.leftContent]}>
              <BtnBack
                width={24}
                height={24}
                fill={isLight ? Color.main.light.white : Color.main.dark.white}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }

    if (onClosePress && leftCloseButton) {
      return (
        <View style={[Styles.leftContainer]}>
          <TouchableNativeFeedback onPress={onClosePress}>
            <View style={Styles.leftContent}>
              <CloseLine width={24} height={24} fill={Color.main.dark.white} />
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }
    return null;
  }

  function renderRight() {
    if (onClosePress && rightCloseButton) {
      return (
        <View style={Styles.rightContainer}>
          <TouchableNativeFeedback onPress={onClosePress}>
            <View style={Styles.leftContent}>
              <CloseLine width={24} height={24} fill={Color.main.dark.white} />
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }

    if (rightContent) {
      return <View style={Styles.rightContainer}>{rightContent}</View>;
    }
    return null;
  }

  if (children) {
    return children;
  }
  if (leftTitle) {
    return (
      <View style={(Styles.containerLeft, bordered && Styles.bordered)}>
        {title ? (
          <View style={Styles.titleLeft}>
            <Text
              color={
                isLight
                  ? Color.main.light.white
                  : Color.neutral[colorScheme].neutral90
              }
              numberOfLines={1}
              size={Size.text.body1.size}
              textStyle="bold">
              {title}
            </Text>
          </View>
        ) : null}
        {renderLeft()}
        {renderRight()}
      </View>
    );
  }
  return (
    <View style={[Styles.container, bordered && Styles.bordered, headerStyle]}>
      {title ? (
        <View style={Styles.title}>
          <Text
            color={
              isLight
                ? Color.main.light.white
                : isLight
                ? Color.main.light.white
                : Color.neutral[colorScheme].neutral90
            }
            numberOfLines={1}
            size={Size.text.body1.size}
            textStyle="bold">
            {title}
          </Text>
        </View>
      ) : null}
      {renderLeft()}
      {renderRight()}
    </View>
  );
}

Header.defaultProps = {
  isLight: false,
  leftTitle: false,
  colorScheme: 'light',
  children: undefined,
  title: '',
  onBackPress: undefined,
  onClosePress: undefined,
  rightContent: undefined,
  isShadow: false,
};

Header.propTypes = {
  children: PropTypes.node,
  rightContent: PropTypes.node,
  title: PropTypes.string,
  onBackPress: PropTypes.func,
  onClosePress: PropTypes.func,
  leftTitle: PropTypes.bool,
  isLight: PropTypes.bool,
  colorScheme: PropTypes.string,
};

const Styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  titleLeft: {
    left: 50,
    justifyContent: 'center',
    height: 56,
  },
  container: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLeft: {
    position: 'relative',
    height: 56,
  },
  leftContainer: {
    height: 56,
    position: 'absolute',
    justifyContent: 'center',
    left: 6,
  },
  rightContainer: {
    height: 56,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  leftContent: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: {
    borderBottomWidth: 0.75,
    borderBottomColor: Color.grayHeader.light.grayHeader,
  },
});
