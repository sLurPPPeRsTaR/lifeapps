import React, { useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import LinearGradient from 'react-native-linear-gradient';

function Button(props) {
  const {
    height,
    width,
    style,
    children,
    block,
    outline,
    color,
    borderColor,
    titleColor,
    prefixIcon,
    disabled,
    shadow,
    loading,
    rounded,
    type,
    shadowLinear,
    suffixIcon,
  } = props;
  const Main = useMemo(() => {
    const linearStyle = {
      borderRadius: rounded === 'lg' ? 16 : 16,
      height,
    };
    if (type === 'linear-gradient') {
      return (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            Color.buttonGradient.light.buttonGradient0,
            Color.buttonGradient.light.buttonGradient1,
          ]}
          style={[
            linearStyle,
            shadowLinear && Styles.shadow,
            { width: width, height: height },
          ]}>
          <TouchableOpacity
            {...props}
            activeOpacity={0.5}
            disabled={disabled}
            style={[
              {
                height: height,
                width: width,
              },
              Styles.containerGradient,
              block && Styles.block,
              outline && Styles.outline,
              color && { backgroundColor: color, borderColor: color },
              borderColor && { borderColor: borderColor },
              disabled && Styles.disabled,
              style,
            ]}>
            {prefixIcon && prefixIcon}
            {loading ? (
              <ActivityIndicator color={Color.main.light.white} />
            ) : (
              <Text
                textStyle="semi"
                size={14}
                line={23.8}
                letterSpacing={0.5}
                align="center"
                color={
                  disabled
                    ? Color.grayTitleButton.light.grayTitleButton
                    : titleColor ||
                      (outline && color
                        ? color
                        : outline
                        ? Color.primary.light.primary90
                        : Color.main.light.white)
                }>
                {children}
              </Text>
            )}
            {suffixIcon && <View style={Styles.suffixIcon}>{suffixIcon}</View>}
          </TouchableOpacity>
        </LinearGradient>
      );
    }
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.5}
        disabled={disabled}
        style={[
          {
            height: height,
            width: width,
          },
          Styles.container,
          block && Styles.block,
          outline && Styles.outline,
          color && { backgroundColor: color, borderColor: color },
          borderColor && { borderColor: borderColor },
          shadow && Styles.shadow,
          disabled && Styles.disabled,
          style,
        ]}>
        {prefixIcon && prefixIcon}
        {loading ? (
          <ActivityIndicator color={Color.main.light.white} />
        ) : (
          <Text
            textStyle="semi"
            size={14}
            line={23.8}
            letterSpacing={0.5}
            align="center"
            color={
              disabled
                ? Color.grayTitleButton.light.grayTitleButton
                : titleColor ||
                  (outline && color
                    ? color
                    : outline
                    ? Color.primary.light.primary90
                    : Color.main.light.white)
            }>
            {children}
          </Text>
        )}
        {suffixIcon && <View style={Styles.suffixIcon}>{suffixIcon}</View>}
      </TouchableOpacity>
    );
  }, [
    rounded,
    height,
    type,
    props,
    disabled,
    width,
    block,
    outline,
    color,
    borderColor,
    shadow,
    style,
    prefixIcon,
    loading,
    titleColor,
    children,
    suffixIcon,
    shadowLinear,
  ]);
  return Main;
}

const Styles = StyleSheet.create({
  containerGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    paddingHorizontal: 16,
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: Color.primary.light.primary90,
  },
  block: {
    alignSelf: 'stretch',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Color.primary.light.primary90,
    backgroundColor: Color.main.light.white,
  },
  disabled: {
    backgroundColor: Color.grayButton.light.grayButton,
    borderColor: Color.grayButton.light.grayButton,
  },
  shadow: {
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  suffixIcon: {
    marginLeft: 8,
  },
});

export default Button;

Button.defaultProps = {
  height: 48,
  width: undefined,
};

Button.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  style: PropTypes.any,
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.string,
  borderColor: PropTypes.string,
};
