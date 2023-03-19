import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import { Switch } from 'react-native-gesture-handler';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Input from 'ca-component-generic/Input';
import Styles from './style';

function SettingSection(props) {
  const {
    key,
    title,
    sectionRequired,
    textInputRequired,
    textInputRequired2,
    isSwitchEnabled,
    onSwitchChange,
    textInputLabel,
    textInputValue,
    textInputLabel2,
    textInputValue2,
    placeholder,
    placeholder2,
    onTextInputChange,
    onTextInputChange2,
    textInputMessage,
    textInputMessage2,
    textInputKeyboardType,
    textInputKeyboardType2,
    isTextInputDisabled,
    isTextInput2Disabled,
    style,
  } = props;

  const RequiredLabel = (
    <Text
      color={Color.primary.light.primary90}
      size={Size.text.body2.size}
      textStyle="semi">
      *
    </Text>
  );

  const LabelTitle = (
    <Text textStyle="medium" size={Size.text.body2.size}>
      {title} {sectionRequired && RequiredLabel}
    </Text>
  );

  const switchStyle =
    Platform.OS === 'ios'
      ? { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }
      : { transform: [{ scaleX: 1 }, { scaleY: 1 }] };
  const SwitchButton = onSwitchChange ? (
    <Switch
      trackColor={{
        true: Color.greenActive.light.color,
      }}
      thumbColor={Color.main.light.white}
      value={isSwitchEnabled}
      onValueChange={onSwitchChange}
      style={switchStyle}
    />
  ) : null;

  const TextInput = onTextInputChange ? (
    <View>
      <Input
        height={56}
        placeholder={placeholder}
        label={textInputLabel}
        secondLabel={textInputRequired && RequiredLabel}
        value={textInputValue}
        onChangeText={onTextInputChange}
        message={textInputMessage}
        keyboardType={textInputKeyboardType}
        disabled={isTextInputDisabled}
      />
    </View>
  ) : null;

  const TextInput2 = onTextInputChange2 ? (
    <View style={Styles.mt16}>
      <Input
        height={56}
        placeholder={placeholder2}
        label={textInputLabel2}
        secondLabel={textInputRequired2 && RequiredLabel}
        value={textInputValue2}
        onChangeText={onTextInputChange2}
        message={textInputMessage2}
        keyboardType={textInputKeyboardType2}
        disabled={isTextInput2Disabled}
      />
    </View>
  ) : null;

  return (
    <View key={key} style={style}>
      <View style={Styles.header.container}>
        {LabelTitle}
        {SwitchButton}
      </View>
      {TextInput}
      {TextInput2}
    </View>
  );
}

export default SettingSection;

SettingSection.defaultProps = {
  key: null,
  title: 'Setting Section',
  sectionRequired: false,
  textInputRequired: false,
  textInputRequired2: false,
  isSwitchEnabled: false,
  onSwitchChange: undefined,
  textInputLabel: undefined,
  textInputValue: '',
  textInputLabel2: undefined,
  textInputValue2: '',
  placeholder: 'Setting Section Input',
  placeholder2: 'Setting Section Input 2',
  onTextInputChange: undefined,
  onTextInputChange2: undefined,
  textInputMessage: undefined,
  textInputMessage2: undefined,
  style: null,
  textInputKeyboardType: undefined,
  textInputKeyboardType2: undefined,
};

SettingSection.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  sectionRequired: PropTypes.bool,
  textInputRequired: PropTypes.bool,
  textInputRequired2: PropTypes.bool,
  isSwitchEnabled: PropTypes.bool,
  onSwitchChange: PropTypes.func,
  textInputLabel: PropTypes.string,
  textInputValue: PropTypes.string,
  textInputLabel2: PropTypes.string,
  textInputValue2: PropTypes.string,
  placeholder: PropTypes.string,
  placeholder2: PropTypes.string,
  onTextInputChange: PropTypes.func,
  onTextInputChange2: PropTypes.func,
  textInputMessage: PropTypes.objectOf(Object),
  textInputMessage2: PropTypes.objectOf(Object),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textInputKeyboardType: PropTypes.string,
  textInputKeyboardType2: PropTypes.string,
  isTextInputDisabled: PropTypes.bool,
  isTextInput2Disabled: PropTypes.bool,
};
