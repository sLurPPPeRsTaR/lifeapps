import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import { XIcon } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Styles from './style';

function Badge(props) {
  const { key, value, onPress, style, disabled } = props;

  const ValueText = (
    <Text
      textStyle="medium"
      size={Size.text.body2.size}
      line={20}
      color={Color.badgeMagenta.light.badgeMagenta}
      align="center">
      {value}
    </Text>
  );

  const CloseIcon = (
    <XIcon
      width={12}
      height={12}
      fill={Color.badgeMagenta.light.badgeMagenta}
      style={Styles.closeIcon}
    />
  );

  return (
    <View key={key} style={style}>
      <TouchableOpacity key={value} onPress={onPress} disabled={disabled}>
        <View style={Styles.container}>
          {ValueText}
          {CloseIcon}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Badge;

Badge.defaultProps = {
  key: null,
  onPress: undefined,
  style: null,
  disabled: false,
};

Badge.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
};
