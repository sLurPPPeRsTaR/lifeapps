import { View, StyleSheet } from 'react-native';
import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { ErrorIconAlert, Tick, Warn } from 'ca-config/Svg';

export default function AlertDialogue(props) {
  const { title, type, leftIcon, style, textColor, textStyle, textSize } =
    props;

  const bgColor = {
    info: Color.info.dark.info,
    warning: Color.backgroundAlertDialogue.light.color,
    success: Color.success.dark.Success100,
    error: Color.red.dark.red20,
  };
  const icon = {
    info: null,
    warning: (
      <Warn
        width={21}
        height={21}
        fill={Color.warningAlertDialogue.light.color}
      />
    ),
    success: <Tick width={20} height={20} />,
    error: <ErrorIconAlert width={28} height={28} />,
  };
  const txtColor = {
    info: Color.neutral.light.neutral90,
    warning: Color.neutral.light.neutral90,
    success: Color.neutral.light.neutral90,
    error: Color.primary.light.primary90,
  };

  return (
    <View
      style={[
        { backgroundColor: bgColor[type] },
        styles.containerAlertMsg,
        style,
      ]}>
      {leftIcon ? <View style={styles.icon}>{icon[type]}</View> : null}
      <View style={styles.flexShrink}>
        <Text
          size={textSize}
          line={21}
          textStyle={textStyle}
          color={textColor || txtColor[type]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAlertMsg: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 12,
    marginTop: 5,
  },
  icon: {
    paddingTop: 2,
    marginRight: 8,
  },
  flexShrink: {
    flexShrink: 1,
  },
});

AlertDialogue.defaultProps = {
  type: 'info',
  style: null,
  textStyle: 'medium',
  textSize: Size.text.body2.size,
  textColor: '',
};

AlertDialogue.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'success', 'error', 'info']),
  leftIcon: PropTypes.bool.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textColor: PropTypes.string,
  textStyle: PropTypes.oneOf(['regular', 'medium', 'semi', 'bold']),
  textSize: PropTypes.number,
};
