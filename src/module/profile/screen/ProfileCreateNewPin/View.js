import React, {
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { View, Alert, Image, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Input from 'ca-component-generic/Input';
import { Eye1, Eyes1Gray, SuccessIcon } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import {
  SET_CREATE_PIN_FAILED,
  SET_CREATE_PIN_SUCCESS,
} from 'ca-module-profile/profileConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Splash from 'ca-component-container/Splash';
import locale from './locale';
import Style from './style';

function ProfileCreateNewPin(props) {
  const {
    navigation,
    lang,
    setCreatePin,
    profileAction,
    setCreatePinFailed,
    setUserData,
    setCreatePinClear,
    isComingFromScreen,
    setIsComingFromScreen,
    setLoading,
  } = props;

  const [pin, setPin] = useState(null);
  const [pinConf, setPinConf] = useState(null);

  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);

  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const [pinVisibility, setPinVisibility] = useState(true);
  const [pinConfVisibility, setPinConfVisibility] = useState(true);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isSuccModal, setSuccModal] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(false);

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    stroke: 'transparent',
    width: 24,
    height: 24,
  };

  useEffect(() => {
    setCreatePinResult(profileAction);
  }, [profileAction, setCreatePinResult]);

  const setCreatePinResult = useCallback(
    (act) => {
      if (act === SET_CREATE_PIN_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        setSplashVisible(true);
        setTimeout(() => {
          if (isComingFromScreen?.screen) {
            navigation.navigate(isComingFromScreen?.screen);
            setIsComingFromScreen({});
          } else {
            navigation.pop();
          }
          setSplashVisible(false);
        }, 3000);
        setCreatePinClear();
      }
      if (act === SET_CREATE_PIN_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        Alert.alert(setCreatePinFailed?.message);
        setCreatePinClear();
      }
    },
    [
      isComingFromScreen?.screen,
      navigation,
      setCreatePinClear,
      setCreatePinFailed?.message,
      setIsComingFromScreen,
      setLoading,
      setUserData,
    ]
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
  }, [pin, pinConf, validatePin, validatePinConf]);

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'newPINRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text.length < 6) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text.length > 6) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang]
  );

  const validatePinConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confPINRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'confPINInvalid'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin]
  );

  function renderHeader() {
    return (
      <Text
        textStyle="medium"
        line={21}
        letterSpacing={0.5}
        color={Color.mediumDarkGray.dark.mediumDarkGray}
        style={Style.renderHeader.text2}>
        {trans(locale, lang, 'contentText2')}
      </Text>
    );
  }

  function renderFormInput() {
    return (
      <View>
        <Input
          value={pin}
          height={56}
          maxLength={6}
          keyboardType="number-pad"
          label={trans(locale, lang, 'label1')}
          placeholder={trans(locale, lang, 'placeholder1')}
          secureTextEntry={pinVisibility}
          suffixIcon={
            !pinVisibility ? (
              <Eye1 {...iconProps} />
            ) : (
              <Eyes1Gray {...iconProps} />
            )
          }
          handleSuffixIcon={() => {
            setPinVisibility(!pinVisibility);
          }}
          onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ''))}
          message={pinMessage}
          suffixContent={
            pin && !pinMessage ? <SuccessIcon style={Style.me12} /> : null
          }
        />
        <View style={Style.renderFormInput.mb16} />
        <Input
          value={pinConf}
          height={56}
          maxLength={6}
          keyboardType="number-pad"
          label={trans(locale, lang, 'label2')}
          placeholder={trans(locale, lang, 'placeholder2')}
          secureTextEntry={pinConfVisibility}
          suffixIcon={
            !pinConfVisibility ? (
              <Eye1 {...iconProps} />
            ) : (
              <Eyes1Gray {...iconProps} />
            )
          }
          handleSuffixIcon={() => {
            setPinConfVisibility(!pinConfVisibility);
          }}
          onChangeText={(text) => setPinConf(text.replace(/[^0-9]/g, ''))}
          message={pinConfMessage}
          suffixContent={
            pinConf && !pinConfMessage && !pinMessage ? (
              <SuccessIcon style={Style.me12} />
            ) : null
          }
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={Style.renderButtonWrapper}>
        <Button
          loading={isSubmit}
          disabled={!isValidPin || !isValidPinConf || isSubmit}
          onPress={() => {
            Keyboard.dismiss();
            setLoading(true);
            setIsSubmit(true);
            setCreatePin({ pin: pin, pinConfirmation: pinConf });
          }}>
          {trans(locale, lang, 'btnLabel')}
        </Button>
      </View>
    );
  }

  function renderSuccessMessage() {
    return (
      <BottomSheet isVisible={isSuccModal} swipeable={false}>
        <View style={[Style.modal.container, Style.alignItemsCenter]}>
          <Image source={BadgeTick} style={Style.modal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.text1}>
            {trans(locale, lang, 'successChanged')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.text2}>
            {trans(locale, lang, 'successMsg')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setSuccModal(false);
            if (isComingFromScreen?.screen) {
              navigation.navigate(isComingFromScreen?.screen);
              setIsComingFromScreen({});
            } else {
              navigation.pop();
            }
          }}>
          {trans(locale, lang, 'successBtnLabel')}
        </Button>
      </BottomSheet>
    );
  }

  function renderSplash() {
    return (
      <Splash
        title={trans(locale, lang, 'pinBerhasildiBuat')}
        desc=""
        isVisible={isSplashVisible}
      />
    );
  }

  return (
    <>
      <Base
        renderBottom={renderButton()}
        title={trans(locale, lang, 'title')}
        onBackPress={() => {
          navigation.pop();
        }}>
        <Padder style={Style.padder.container}>
          <View style={Style.padder.content}>
            {renderHeader()}
            {renderFormInput()}
            {renderSuccessMessage()}
          </View>
        </Padder>
      </Base>
      {renderSplash()}
    </>
  );
}

export default ProfileCreateNewPin;

ProfileCreateNewPin.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setCreatePin: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setCreatePinFailed: PropTypes.objectOf(Object).isRequired,
  setUserData: PropTypes.func.isRequired,
  setCreatePinClear: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
