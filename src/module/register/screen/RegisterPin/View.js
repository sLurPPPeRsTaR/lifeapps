import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { View, Alert } from 'react-native';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Input from 'ca-component-generic/Input';
import BottomSheet from 'ca-component-container/BottomSheet';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { Eye1, EyeOff1, IconSuccess, IlustratorsetPin } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import {
  SET_CREATE_PIN_FAILED,
  SET_CREATE_PIN_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { NAVIGATION } from 'ca-util/constant';
import Style from './style';
import locale from './locale';

function RegisterPin(props) {
  const {
    navigation,
    lang,
    colorScheme,
    setCreatePin,
    profileAction,
    setCreatePinFailed,
    setUserData,
    setCreatePinClear,
    setLoading,
  } = props;

  const [pin, setPin] = useState('');
  const [pinConf, setPinConf] = useState('');
  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const [pinVisibility, setPinVisibility] = useState(true);
  const [pinConfVisibility, setPinConfVisibility] = useState(true);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  useEffect(() => {
    setCreatePinResult(profileAction);
  }, [profileAction, setCreatePinResult]);

  const setCreatePinResult = useCallback(
    (act) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if (act === SET_CREATE_PIN_SUCCESS) {
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setBottomSheetVisible(true);
      }
      if (act === SET_CREATE_PIN_FAILED) {
        Alert.alert(setCreatePinFailed?.message);
      }
      setCreatePinClear();
    },
    [setCreatePinClear, setCreatePinFailed?.message, setLoading, setUserData]
  );

  // Validate Pin & Pin Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(pinConf));
  }, [pin, pinConf, validatePinConf]);

  function validatePin(text) {
    const regexNumber = /^[0-9]*$/;
    if (text.length < 1) {
      setPinMessage({ error: 'Pin wajib diisi' });
      return false;
    }
    if (!regexNumber.test(text)) {
      setPinMessage({ error: 'Pin hanya boleh angka saja' });
      return false;
    }
    if (text.length < 6) {
      setPinMessage({ warning: 'Pin harus memiliki 6 angka' });
      return false;
    }
    if (text.length > 6) {
      setPinMessage({ error: 'Pin tidak boleh lebih dari 6' });
      return false;
    }
    setPinMessage(null);
    return true;
  }

  const validatePinConf = useCallback(
    (text) => {
      if (text.length < 1) {
        setPinConfMessage({ error: 'Konfirmasi Pin wajib diisi' });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: 'Pin tidak sama',
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [pin]
  );

  function renderHeader() {
    return (
      <View>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          style={Style.renderHeader.text1}>
          {trans(locale, lang, 'contentText1')}
        </Text>
        <Text
          textStyle="medium"
          line={21}
          letterSpacing={0.5}
          color={Color.mediumDarkGray.dark.mediumDarkGray}
          style={Style.renderHeader.text2}>
          {trans(locale, lang, 'contentText2')}
        </Text>
      </View>
    );
  }

  function renderFormInput() {
    return (
      <View>
        <View style={Style.renderFormInput.mb16}>
          <Input
            value={pin}
            maxLength={6}
            keyboardType="number-pad"
            label={trans(locale, lang, 'label1')}
            placeholder={trans(locale, lang, 'placeholder1')}
            secureTextEntry={pinVisibility}
            suffixIcon={
              !pinVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            handleSuffixIcon={() => {
              setPinVisibility(!pinVisibility);
            }}
            onChangeText={(text) => setPin(text)}
            message={pinMessage}
          />
        </View>
        <View>
          <Input
            value={pinConf}
            maxLength={6}
            keyboardType="number-pad"
            label={trans(locale, lang, 'label2')}
            placeholder={trans(locale, lang, 'placeholder2')}
            secureTextEntry={pinConfVisibility}
            suffixIcon={
              !pinConfVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            handleSuffixIcon={() => {
              setPinConfVisibility(!pinConfVisibility);
            }}
            onChangeText={(text) => setPinConf(text)}
            message={pinConfMessage}
          />
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={Style.renderButtonWrapper}>
        <Button
          disabled={!isValidPin || !isValidPinConf}
          onPress={() => {
            setLoading(true);
            setCreatePin({ pin: pin, pinConfirmation: pinConf });
          }}>
          {trans(locale, lang, 'btnLabel')}
        </Button>
      </View>
    );
  }

  function renderSuccessMessage() {
    return (
      <BottomSheet isVisible={isBottomSheetVisible} swipeable={false}>
        <View style={[Style.modal.container, Style.alignItemsCenter]}>
          <IconSuccess width={146} height={146} style={Style.modal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.modal.text1}>
            {trans(locale, lang, 'successChanged')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray[colorScheme].mediumGray}
            style={Style.modal.text2}>
            {trans(locale, lang, 'successMsg')}
          </Text>
          <Button
            shadow
            block
            onPress={() => {
              setBottomSheetVisible(false);
              // navigation.replace(NAVIGATION.TABMAIN.TabMain);
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
              });
            }}>
            {trans(locale, lang, 'btnLabel')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      renderBottom={renderButton()}
      title={trans(locale, lang, 'title')}
      onBackPress={() => navigation.pop()}
      isPaddingBottom={false}>
      <IlustratorsetPin />
      <Padder style={Style.padder.container}>
        <View style={Style.padder.content}>
          {renderHeader()}
          {renderFormInput()}
          {renderSuccessMessage()}
        </View>
      </Padder>
    </Base>
  );
}

export default RegisterPin;

RegisterPin.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setCreatePin: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setCreatePinFailed: PropTypes.objectOf(Object).isRequired,
  setUserData: PropTypes.func.isRequired,
  setCreatePinClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
