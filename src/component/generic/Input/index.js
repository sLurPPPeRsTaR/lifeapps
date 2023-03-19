/* eslint-disable react/require-default-props */
import React, { useState, forwardRef } from 'react';
import {
  TextInput as BTextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { TouchableHighlight } from 'react-native-gesture-handler';

function Input(props, ref) {
  const {
    label,
    secondLabel,
    prefixIcon,
    placeholder = label,
    suffixIcon,
    handleSuffixIcon,
    suffixIconDisabled = false,
    secureTextEntry = false,
    message,
    height = 40,
    onFocus,
    pressable = false,
    onInputPress,
    editable,
    disabled,
    shadow,
    maxLength,
    keyboardType,
    textAlignVertical,
    contentStyle,
    suffixContent,
    suffixIconLabel,
    prefixPhoneNumber,
    onEndEditing,
  } = props;

  const [isActive, setActive] = useState(false);
  const [isFilled, setFilled] = useState(false);

  function renderLabel() {
    return (
      label && (
        <View style={Style.container}>
          <Text
            size={Size.text.caption1.size}
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={
              isActive || isFilled
                ? Color.neutral.light.neutral90
                : Color.mediumGray.light.mediumGray
            }
            style={Style.inputLabel}>
            {label}
            {secondLabel && (
              <Text
                size={Size.text.caption1.size}
                textStyle="medium"
                line={18}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}
                style={[Style.inputLabel, Style.ms4]}>
                {' '}
                {secondLabel}
              </Text>
            )}
          </Text>
          {suffixIconLabel && Platform.OS === 'android' && (
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={suffixIconDisabled}
              onPress={handleSuffixIcon}>
              {suffixIconLabel}
            </TouchableOpacity>
          )}
          {suffixIconLabel && Platform.OS === 'ios' && (
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.6}
              disabled={suffixIconDisabled}
              onPress={handleSuffixIcon}>
              {suffixIconLabel}
            </TouchableHighlight>
          )}
        </View>
      )
    );
  }

  function renderTextInput() {
    return (
      <View
        style={[
          Style.inputContainer,
          Style.inputContainerInactive,
          isActive && Style.inputContainerActive,
          message?.success && Style.inputContainerSuccess,
          message?.warning && Style.inputContainerWarning,
          message?.error && Style.inputContainerError,
          disabled && Style.inputContainerDisabled,
          shadow && Style.inputContainershadow,
        ]}>
        {prefixIcon && <View style={Style.prefixIcon}>{prefixIcon}</View>}
        {prefixPhoneNumber && (
          <Text line={18} style={Style.prefixPhoneNumber}>
            +
          </Text>
        )}
        <BTextInput
          keyboardType={keyboardType}
          maxLength={maxLength}
          ref={ref}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          editable={disabled !== undefined ? !disabled : editable}
          {...props}
          style={[
            Style.input,
            !disabled ? Style.inputTextColor : Style.inputTextColorDisabled,
            { height: height },
            { textAlignVertical: textAlignVertical },
            contentStyle,
          ]}
          onFocus={() => {
            setActive(true);
            if (onFocus) {
              onFocus();
            }
          }}
          onEndEditing={(e) => {
            if (onEndEditing) {
              onEndEditing();
            }
            setActive(false);
            if (e.nativeEvent.text) {
              setFilled(true);
            } else {
              setFilled(false);
            }
          }}
        />
        {suffixContent && suffixContent}
        {suffixIcon && Platform.OS === 'android' && (
          <TouchableOpacity
            activeOpacity={0.6}
            disabled={suffixIconDisabled}
            onPress={handleSuffixIcon}>
            {suffixIcon}
          </TouchableOpacity>
        )}
        {suffixIcon && Platform.OS === 'ios' && (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.6}
            disabled={suffixIconDisabled}
            onPress={handleSuffixIcon}>
            {suffixIcon}
          </TouchableHighlight>
        )}
      </View>
    );
  }

  function renderMessage() {
    if (message) {
      let msg = '';
      let color = '';
      if (message.normal) {
        msg = message.normal;
        color = Color.neutral.light.neutral60;
      }
      if (message.success) {
        msg = message.success;
        color = Color.success.light.success90;
      }
      if (message.warning) {
        msg = message.warning;
        color = Color.warning.light.warning90;
      }
      if (message.error) {
        msg = message.error;
        color = Color.primary.light.primary90;
      }
      return (
        <Text
          size={Size.text.caption2.size}
          color={color}
          textStyle="medium"
          line={16.5}
          style={Style.mt6}>
          {msg}
        </Text>
      );
    }
    return null;
  }

  if (!pressable) {
    return (
      <>
        {renderLabel()}
        {renderTextInput()}
        {renderMessage()}
      </>
    );
  }

  return (
    <>
      {renderLabel()}
      {Platform.OS === 'ios' ? (
        <TouchableHighlight
          onPress={onInputPress}
          underlayColor="transparent"
          disabled={disabled}>
          {renderTextInput()}
        </TouchableHighlight>
      ) : (
        <TouchableOpacity onPress={onInputPress} disabled={disabled}>
          {renderTextInput()}
        </TouchableOpacity>
      )}
      {renderMessage()}
    </>
  );
}

export default forwardRef(Input);

Input.propTypes = {
  label: PropTypes.string,
  secondLabel: PropTypes.string,
  prefixIcon: PropTypes.element,
  placeholder: PropTypes.string,
  suffixIcon: PropTypes.element,
  handleSuffixIcon: PropTypes.func,
  suffixIconDisabled: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.any,
  height: PropTypes.number,
  pressable: PropTypes.bool,
  onFocus: PropTypes.func,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  onInputPress: PropTypes.func,
  shadow: PropTypes.bool,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  textAlignVertical: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  contentStyle: PropTypes.any,
  suffixContent: PropTypes.element,
  suffixIconLabel: PropTypes.element,
  prefixPhoneNumber: PropTypes.bool,
};

const Style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  inputLabel: {
    marginBottom: 4,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 8,
    backgroundColor: Color.main.light.white,
  },
  inputContainerActive: {
    borderColor: Color.neutral.light.neutral20,
    borderWidth: 1.5,
  },
  inputContainerInactive: {
    borderColor: Color.grayInput.light.grayInput,
    borderWidth: 1.5,
  },
  inputContainerSuccess: {
    borderColor: Color.success.light.success90,
  },
  inputContainerWarning: {
    borderColor: Color.warning.light.warning90,
  },
  inputContainerError: {
    borderColor: Color.primary.light.primary90,
  },
  inputContainerDisabled: {
    backgroundColor: Color.grayInput.light.grayInput,
    borderColor: Color.grayInput.light.grayInput,
  },
  input: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: Size.text.body2.size,
    fontFamily: Size.fontFamily.medium,
  },
  inputTextColor: {
    color: Color.neutral.light.neutral60,
  },
  inputTextColorDisabled: {
    color: Color.grayTextDisabled.light.grayTextDisabled,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  inputTextColorSuccess: { color: Color.success.light.success90 },
  // eslint-disable-next-line react-native/no-unused-styles
  inputTextColorWarning: { color: Color.warning.light.warning90 },
  // eslint-disable-next-line react-native/no-unused-styles
  inputTextColorError: { color: Color.primary.light.primary90 },
  prefixIcon: {
    marginEnd: 4,
  },
  mt6: {
    marginTop: 6,
  },
  ms4: {
    marginStart: 4,
  },
  inputContainershadow: {
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  prefixPhoneNumber: { marginEnd: -1.5 },
});
