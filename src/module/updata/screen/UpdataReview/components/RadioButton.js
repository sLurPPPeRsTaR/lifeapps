import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import style from '../style';

function RadioButton(props) {
  const { disabled, desc, currValue, optValue, onPress, errorType } = props;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          style.radioButton.radioButtonContainer,
          { width: (Size.screen.width - 56) / 2 },
          errorType === 'success' && {
            borderColor: Color.success.light.success90,
          },
          errorType === 'warning' && {
            borderColor: Color.warning.light.warning90,
          },
          errorType === 'error' && {
            borderColor: Color.primary.light.primary90,
          },
          disabled && {
            backgroundColor: Color.grayButton.light.grayButton,
            borderColor: Color.grayButton.light.grayButton,
          },
        ]}>
        <View style={style.radioButton.radioButtonContent}>
          {currValue === optValue ? (
            <View style={style.radioButton.radioButtonCircle} />
          ) : null}
        </View>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={
            currValue === optValue
              ? Color.neutral.light.neutral60
              : Color.grayIcon.dark.grayIcon
          }>
          {desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default RadioButton;

RadioButton.defaultProps = {
  disabled: false,
  errorType: '',
};

RadioButton.propTypes = {
  disabled: PropTypes.bool,
  desc: PropTypes.string.isRequired,
  currValue: PropTypes.string.isRequired,
  optValue: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  errorType: PropTypes.string,
};
