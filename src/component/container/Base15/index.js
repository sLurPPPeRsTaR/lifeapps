import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  StatusBar,
  Animated,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { BackgroundMantap, BtnBack } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import { APP } from 'ca-util/constant';
import Color from 'ca-config/Color';
import { store } from 'ca-config/Store';
import Shadow from '../Shadow/index';
import Style from './style';

function Base15(props) {
  const {
    children,
    isScroll,
    animated,
    title,
    renderBottom,
    backgroundColor,
    onBackPress,
    isBackground,
    refreshControl,
    renderTopImageBackground,
    animatedOnlyHeader,
    renderHeader,
    onChangeHeaderToDark,
    width,
    rightHeaderContent,
    backgroundHeaderImage,
  } = props;

  const { dimensions } = store.getState().bootstrap;

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
  const [isKeyboardUp, setKeyboardUp] = useState(false);
  const [keyboardHeight, setkeyboardHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', (e) => {
        setKeyboardUp(true);
        setkeyboardHeight(e?.endCoordinates?.height);
      });

      Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardUp(false);
        setkeyboardHeight(0);
      });
    } else {
      Keyboard.addListener('keyboardDidShow', (e) => {
        setKeyboardUp(true);
        setkeyboardHeight(e?.endCoordinates?.height);
      });

      Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardUp(false);
        setkeyboardHeight(0);
      });
    }
  }, []);

  const renderContentHeader = useCallback(() => {
    if (isScroll) {
      if (animated) {
        return (
          <Animated.View
            style={[
              Style.headerContainerInverse,
              {
                height: APP.header.height,
                width: dimensions.width,
                opacity: opacityInverse,
                top: insets.top,
              },
            ]}>
            <View style={Style.headerContainerInner}>
              <Text
                align="center"
                animated
                size={Size.text.h6.size}
                color={Color.main.light.white}
                textStyle="semi">
                {title}
              </Text>
              {onBackPress && (
                <Pressable
                  style={Style.backButtonContainer}
                  onPress={onBackPress}>
                  <BtnBack fill={Color.main.light.white} />
                </Pressable>
              )}
              {rightHeaderContent && (
                <View style={Style.rightContainer}>{rightHeaderContent}</View>
              )}
            </View>
          </Animated.View>
        );
      }
      if (animatedOnlyHeader) {
        return (
          <Animated.View
            style={[
              Style.headerContainerInverse,
              {
                height: APP.header.height,
                width: dimensions.width,
                opacity: opacityInverse,
                top: insets.top,
              },
            ]}>
            {renderHeader}
          </Animated.View>
        );
      }
      return (
        <View
          style={[
            Style.headerContainerInverse,
            {
              height: APP.header.height,
              width: dimensions.width,
              opacity: opacityInverse,
              top: insets.top,
            },
          ]}>
          <View style={Style.headerContainerInner}>
            <Text
              align="center"
              animated
              size={Size.text.h6.size}
              color={Color.main.light.white}
              textStyle="semi">
              {title}
            </Text>
            {onBackPress && (
              <Pressable
                style={Style.backButtonContainer}
                onPress={onBackPress}>
                <BtnBack
                  fill={
                    isBackground
                      ? Color.main.light.white
                      : Color.main.light.black
                  }
                />
              </Pressable>
            )}
            {rightHeaderContent && (
              <View style={Style.rightContainer}>{rightHeaderContent}</View>
            )}
          </View>
        </View>
      );
    }
    return (
      <View>
        <View>
          {isBackground && backgroundHeaderImage ? backgroundHeaderImage : null}
          {isBackground && !backgroundHeaderImage ? (
            <View
              style={[
                Style.backgroundContainer,
                {
                  top: -220 + insets.top,
                },
              ]}>
              <BackgroundMantap />
            </View>
          ) : null}
          <View
            style={[
              isBackground
                ? Style.headerContainerInverse
                : Style.headerContainerWhite,
              {
                height: APP.header.height + insets.top,
                paddingTop: insets.top,
              },
            ]}>
            <View
              style={[
                Style.headerContainerInnerStatic,
                { width: dimensions.width },
                { height: APP.header.height },
              ]}>
              <Text
                align="center"
                animated
                size={Size.text.h6.size}
                color={
                  isBackground ? Color.main.light.white : Color.main.light.black
                }
                textStyle="semi">
                {title}
              </Text>
              {onBackPress && (
                <Pressable
                  style={Style.backButtonContainer}
                  onPress={onBackPress}>
                  <BtnBack
                    fill={
                      isBackground
                        ? Color.main.light.white
                        : Color.main.light.black
                    }
                  />
                </Pressable>
              )}
              {rightHeaderContent && (
                <View style={Style.rightContainer}>{rightHeaderContent}</View>
              )}
            </View>
          </View>
        </View>
        <View style={[Style.bottomBorder, { width: dimensions.width }]} />
      </View>
    );
  }, [
    isScroll,
    isBackground,
    backgroundHeaderImage,
    insets.top,
    title,
    onBackPress,
    rightHeaderContent,
    animated,
    animatedOnlyHeader,
    dimensions.width,
    opacityInverse,
    renderHeader,
  ]);

  const renderContentAnimated = useCallback(() => {
    return (
      <View style={[Style.flex1, { backgroundColor: backgroundColor }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDark ? 'dark-content' : 'light-content'}
        />
        <Animated.ScrollView
          refreshControl={refreshControl}
          contentContainerStyle={{
            paddingVertical: APP.header.height + insets.top,
          }}
          showsVerticalScrollIndicator={false}
          style={Style.scrollViewContainer}
          onEndReachedThreshold={0.2}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset } } }],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent }) => {
                if (
                  nativeEvent.contentOffset.y >
                  APP.header.height + insets.top
                ) {
                  setIsDark(true);
                  if (onChangeHeaderToDark) {
                    onChangeHeaderToDark(true);
                  }
                } else {
                  setIsDark(false);
                  if (onChangeHeaderToDark) {
                    onChangeHeaderToDark(false);
                  }
                }
              },
            }
          )}>
          {backgroundHeaderImage || (
            <View
              style={[
                Style.backgroundContainer,
                {
                  top: -220 + insets.top,
                },
              ]}>
              <BackgroundMantap />
            </View>
          )}
          {Platform.OS === 'ios' ? (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                paddingBottom:
                  Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
              }}>
              {children}
            </View>
          ) : (
            <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
          )}
        </Animated.ScrollView>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingBottom:
              Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
          }}>
          {renderBottom}
        </View>
        <View style={Style.positionAbs}>
          <Shadow
            animated
            style={{
              opacity: opacity,
              backgroundColor: Color.main.light.white,
            }}>
            <Animated.View
              style={[
                Style.headerContainer,
                {
                  opacity: opacity,
                  height: APP.header.height + insets.top,
                  paddingTop: insets.top,
                  width: dimensions.width,
                },
              ]}>
              <View style={Style.headerContainerInner}>
                <Text
                  animated
                  align="center"
                  size={Size.text.h6.size}
                  color="black"
                  textStyle="semi">
                  {title}
                </Text>
                {onBackPress && (
                  <Pressable
                    style={Style.backButtonContainer}
                    onPress={onBackPress}>
                    <BtnBack fill={Color.main.light.black} />
                  </Pressable>
                )}
                {rightHeaderContent && (
                  <View style={Style.rightContainer}>{rightHeaderContent}</View>
                )}
              </View>
            </Animated.View>
          </Shadow>
          {renderContentHeader()}
        </View>
      </View>
    );
  }, [
    backgroundColor,
    isDark,
    refreshControl,
    insets.top,
    yOffset,
    backgroundHeaderImage,
    isKeyboardUp,
    keyboardHeight,
    children,
    renderBottom,
    opacity,
    dimensions.width,
    title,
    onBackPress,
    rightHeaderContent,
    renderContentHeader,
    onChangeHeaderToDark,
  ]);

  const renderContentAnimatedOnlyHeader = useCallback(() => {
    return (
      <View style={[Style.flex1, { backgroundColor: backgroundColor }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDark ? 'dark-content' : 'light-content'}
        />
        <Animated.ScrollView
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: APP.header.height + insets.top,
          }}
          style={Style.scrollViewContainer}
          onEndReachedThreshold={0.2}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset } } }],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent }) => {
                if (
                  nativeEvent.contentOffset.y >
                  APP.header.height + insets.top
                ) {
                  setIsDark(true);
                  if (onChangeHeaderToDark) {
                    onChangeHeaderToDark(true);
                  }
                } else {
                  setIsDark(false);
                  if (onChangeHeaderToDark) {
                    onChangeHeaderToDark(false);
                  }
                }
              },
            }
          )}>
          {Platform.OS === 'ios' ? (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                paddingBottom:
                  Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
              }}>
              {children}
            </View>
          ) : (
            <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
          )}
        </Animated.ScrollView>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            paddingBottom:
              Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
          }}>
          {renderBottom}
        </View>
        <View style={Style.positionAbs}>
          <Shadow
            animated
            style={{
              opacity: opacity,
              backgroundColor: Color.main.light.white,
            }}>
            <Animated.View
              style={[
                Style.headerContainer,
                {
                  opacity: opacity,
                  height: APP.header.height + insets.top,
                  paddingTop: insets.top,
                  width: dimensions.width,
                },
              ]}>
              {renderHeader}
            </Animated.View>
          </Shadow>
          {renderContentHeader()}
        </View>
      </View>
    );
  }, [
    backgroundColor,
    isDark,
    refreshControl,
    insets.top,
    yOffset,
    children,
    renderBottom,
    opacity,
    dimensions.width,
    isKeyboardUp,
    keyboardHeight,
    renderHeader,
    renderContentHeader,
    onChangeHeaderToDark,
  ]);

  const renderContent = useCallback(() => {
    return (
      <View style={[Style.flex1, { backgroundColor: backgroundColor }]}>
        {renderTopImageBackground}
        <ScrollView
          style={[
            Style.scrollViewContainer,
            {
              backgroundColor: backgroundColor,
            },
          ]}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          scrollEventThrottle={16}>
          {Platform.OS === 'ios' ? (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                paddingBottom:
                  Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
              }}>
              {children}
            </View>
          ) : (
            <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
          )}
        </ScrollView>
        {renderBottom}
      </View>
    );
  }, [
    backgroundColor,
    children,
    isKeyboardUp,
    keyboardHeight,
    refreshControl,
    renderBottom,
    renderTopImageBackground,
  ]);

  if (isScroll) {
    if (animated) return renderContentAnimated();
    if (animatedOnlyHeader) return renderContentAnimatedOnlyHeader();
    return renderContent();
  }
  return (
    <View style={[Style.flex1, { backgroundColor: backgroundColor }]}>
      {renderContentHeader()}
      <View
        style={[
          Style.flex1,
          {
            marginTop: insets.top + APP.header.height,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

export default Base15;

Base15.defaultProps = {
  isScroll: false,
  isBackground: true,
  animated: false,
  onBackPress: undefined,
  backgroundColor: Color.whiteBackground.light.whiteBackground,
  renderBottom: undefined,
  refreshControl: undefined,
  animatedOnlyHeader: false,
  renderTopImageBackground: undefined,
  renderHeader: undefined,
  onChangeHeaderToDark: undefined,
  width: undefined,
  rightHeaderContent: undefined,
  backgroundHeaderImage: undefined,
  title: '',
};

Base15.propTypes = {
  children: PropTypes.node.isRequired,
  isScroll: PropTypes.bool,
  animated: PropTypes.bool,
  isBackground: PropTypes.bool,
  title: PropTypes.string,
  onBackPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  renderBottom: PropTypes.node,
  refreshControl: PropTypes.node,
  animatedOnlyHeader: PropTypes.bool,
  renderTopImageBackground: PropTypes.node,
  renderHeader: PropTypes.node,
  onChangeHeaderToDark: PropTypes.func,
  width: PropTypes.number,
  rightHeaderContent: PropTypes.node,
  backgroundHeaderImage: PropTypes.node,
};
