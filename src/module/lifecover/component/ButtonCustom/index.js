import Text from 'ca-component-generic/Text';
import React from 'react';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import style from './style';

function ButtonCustom({
  children,
  variant,
  active,
  onPress,
  textAlign,
  prefixIcon,
  suffixIcon,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.root,
        prefixIcon && style.rootHasPrefixIcon,
        suffixIcon && style.rootHasSuffixIcon,
        variant === 'selectable' && style.variantSelectable,
        variant === 'selectable' && active && style.variantSelectableActive,
      ]}>
      {prefixIcon && (
        <View style={[style.iconContainer, style.prefixIconContainer]}>
          {prefixIcon}
        </View>
      )}
      <Text
        textStyle="bold"
        size={Size.text.caption1.size}
        line={21}
        align={textAlign}
        style={[
          style.text,
          variant === 'selectable' && style.textVariantSelectable,
          variant === 'selectable' &&
            active &&
            style.textVariantSelectableActive,
        ]}>
        {children}
      </Text>
      {suffixIcon && (
        <View style={[style.iconContainer, style.suffixIconContainer]}>
          {suffixIcon}
        </View>
      )}
    </TouchableOpacity>
  );
}
ButtonCustom.defaultProps = {
  prefixIcon: null,
  suffixIcon: null,
  textAlign: 'left',
  active: false,
  variant: 'default',
  onPress: () => {},
};
ButtonCustom.propTypes = {
  children: PropTypes.node.isRequired,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  active: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'selectable']),
  onPress: PropTypes.func,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
};

export default ButtonCustom;
