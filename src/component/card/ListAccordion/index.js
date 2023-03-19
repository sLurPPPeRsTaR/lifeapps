/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown2Black } from 'ca-config/Svg';
import {
  View,
  TouchableNativeFeedback,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Style from './style';

export default function ListAccordion(props) {
  const {
    header,
    headerActive = header,
    children,
    suffixIcon = <ArrowDown2Black />,
    suffixIconActive = suffixIcon,
    headerContainerStyle,
    headerContainerStyleActive = headerContainerStyle,
    contentContainerStyle,
    initialExpanded = false,
    touchableType = 'native',
    style,
    headerActiveBottom,
  } = props;

  const [expanded, setExpanded] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (initialExpanded) {
      onHeaderPress(true);
    }
  }, [initialExpanded, onHeaderPress]);

  const onHeaderPress = useCallback(
    (isExpand) => {
      setClicked(true);
      setExpanded(isExpand);
      Animated.timing(spinValue, {
        toValue: isExpand ? 1 : 0,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    },
    [spinValue]
  );

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange:
      initialExpanded && !isClicked ? ['180deg', '0deg'] : ['0deg', '180deg'],
  });
  if (headerActiveBottom) {
    return (
      <View style={style}>
        {touchableType === 'native' && (
          <TouchableNativeFeedback onPress={() => onHeaderPress(!expanded)}>
            <View
              style={[
                Style.list.card.title,
                Style.py16,
                Style.px16,
                !expanded ? headerContainerStyle : headerContainerStyleActive,
              ]}>
              <View style={Style.list.card.header}>
                {!expanded ? header : headerActive}
              </View>
              <Animated.View
                style={[
                  Style.list.card.icon,
                  { transform: [{ rotate: spin }] },
                ]}>
                {!expanded ? suffixIcon : suffixIconActive}
              </Animated.View>
            </View>
          </TouchableNativeFeedback>
        )}
        {expanded ? (
          <View style={contentContainerStyle}>{children}</View>
        ) : null}
        {touchableType === 'opacity' && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onHeaderPress(!expanded)}>
            <View
              style={[
                Style.list.card.title,
                Style.py16,
                Style.px16,
                !expanded ? headerContainerStyle : headerContainerStyleActive,
              ]}>
              <View style={Style.list.card.header}>
                {!expanded ? header : headerActive}
              </View>
              <Animated.View
                style={[
                  Style.list.card.icon,
                  { transform: [{ rotate: spin }] },
                ]}>
                {!expanded ? suffixIcon : suffixIconActive}
              </Animated.View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View style={style}>
      {touchableType === 'native' && (
        <TouchableNativeFeedback onPress={() => onHeaderPress(!expanded)}>
          <View
            style={[
              Style.list.card.title,
              Style.py16,
              Style.px16,
              !expanded ? headerContainerStyle : headerContainerStyleActive,
            ]}>
            <View style={Style.list.card.header}>
              {!expanded ? header : headerActive}
            </View>
            <Animated.View
              style={[Style.list.card.icon, { transform: [{ rotate: spin }] }]}>
              {!expanded ? suffixIcon : suffixIconActive}
            </Animated.View>
          </View>
        </TouchableNativeFeedback>
      )}
      {touchableType === 'opacity' && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => onHeaderPress(!expanded)}>
          <View
            style={[
              Style.list.card.title,
              Style.py16,
              Style.px16,
              !expanded ? headerContainerStyle : headerContainerStyleActive,
            ]}>
            <View style={Style.list.card.header}>
              {!expanded ? header : headerActive}
            </View>
            <Animated.View
              style={[Style.list.card.icon, { transform: [{ rotate: spin }] }]}>
              {!expanded ? suffixIcon : suffixIconActive}
            </Animated.View>
          </View>
        </TouchableOpacity>
      )}
      {expanded ? <View style={contentContainerStyle}>{children}</View> : null}
    </View>
  );
}
