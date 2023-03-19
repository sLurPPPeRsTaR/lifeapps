import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { View, Alert, Image, Keyboard } from 'react-native';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { Eye1, Eyes1Gray, SuccessIcon } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_CHANGE_PIN_FAILED,
  SET_CHANGE_PIN_SUCCESS,
} from 'ca-module-profile/profileConstant';
import Splash from 'ca-component-container/Splash';
import _ from 'lodash';
import locale from './locale';
import Style from './style';

function ProfileChangeNewPin(props) {
  const {
    navigation,
    lang,
    colorScheme,
    setChangePin,
    profileAction,
    setChangePinFailed,
    setChangePinClear,
    alreadySetMPin,
    setUserData,
    setLoading,
    isComingFromScreen,
    setIsComingFromScreen,
  } = props;

  const [oldPin, setOldPin] = useState('');
  const [pin, setPin] = useState('');
  const [pinConf, setPinConf] = useState('');

  const [oldPinMessage, setOldPinMessage] = useState(null);
  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);

  const [isValidOldPin, setValidOldPin] = useState(false);
  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const [oldPinVisibility, setOldPinVisibility] = useState(true);
  const [pinVisibility, setPinVisibility] = useState(true);
  const [pinConfVisibility, setPinConfVisibility] = useState(true);
  const [isSplashVisible, setSplashVisible] = useState(false);

  const [isSMVisible, setSMVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const iconProps = {
    fill: Color.grayIcon[colorScheme].grayIcon,
    width: 24,
    height: 24,
  };

  useEffect(() => {
    setChangePinResult(profileAction);
  }, [profileAction, setChangePinResult]);

  const setChangePinResult = useCallback(
    (act) => {
      if (act === SET_CHANGE_PIN_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        setChangePinClear();
        setSplashVisible(true);
        if (!_.isEmpty(isComingFromScreen)) {
          navigation.navigate(isComingFromScreen?.screen);
          setIsComingFromScreen({});
        } else {
          setTimeout(() => {
            setUserData({
              userData: {
                alreadySetMPin: true,
              },
            });
            navigation.pop();
            setSplashVisible(false);
          }, 3000);
        }
      }
      if (act === SET_CHANGE_PIN_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        setChangePinClear();
        if (setChangePinFailed?.message === 'OLD_PIN_NOT_MATCH') {
          setValidOldPin(false);
          setOldPinMessage({ error: trans(locale, lang, 'pinLamaSalah') });
        } else {
          Alert.alert(setChangePinFailed?.message);
        }
      }
    },
    [
      isComingFromScreen,
      lang,
      navigation,
      setChangePinClear,
      setChangePinFailed?.message,
      setIsComingFromScreen,
      setLoading,
      setUserData,
    ]
  );

  // Validate Old Pin, Pin & Pin Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidOldPin(validateOldPin(oldPin));
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(pinConf));
  }, [oldPin, pin, pinConf, validateOldPin, validatePin, validatePinConf]);

  const validateOldPin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setOldPinMessage({ error: trans(locale, lang, 'oldPinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setOldPinMessage({ error: trans(locale, lang, 'oldPinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setOldPinMessage({ warning: trans(locale, lang, 'validationOldPin') });
        return false;
      }
      if (text.length > 6) {
        setOldPinMessage({ warning: trans(locale, lang, 'oldPinLength') });
        return false;
      }
      setOldPinMessage(null);
      return true;
    },
    [lang]
  );

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'pinRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setPinMessage({ error: trans(locale, lang, 'pinIsNumber') });
        return false;
      }
      if (text.length < 6) {
        setPinMessage({ warning: trans(locale, lang, 'validationPin') });
        return false;
      }
      if (text === oldPin) {
        setPinMessage({ warning: trans(locale, lang, 'pinSameWithOld') });
        return false;
      }
      if (text.length > 6) {
        setPinMessage({ warning: trans(locale, lang, 'pinLength') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang, oldPin]
  );

  const validatePinConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confirmPinRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'pinNotSame'),
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
        size={Size.text.body2.size}
        line={27}
        letterSpacing={0.5}
        color={Color.mediumGray.light.mediumGray}
        style={Style.renderHeader.text1}>
        {!alreadySetMPin
          ? trans(locale, lang, 'aktivasimPINuntuk')
          : trans(locale, lang, 'contentTitle')}
      </Text>
    );
  }

  function renderFormInput() {
    return (
      <View>
        <View style={Style.renderFormInput.mb16}>
          <Input
            height={56}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            value={oldPin}
            maxLength={6}
            keyboardType="number-pad"
            label={trans(locale, lang, 'inputLabel1')}
            placeholder={trans(locale, lang, 'inputPlaceholder1')}
            secureTextEntry={oldPinVisibility}
            suffixIcon={
              !oldPinVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <Eyes1Gray {...iconProps} />
              )
            }
            handleSuffixIcon={() => {
              setOldPinVisibility(!oldPinVisibility);
            }}
            onChangeText={(text) => setOldPin(text.replace(/[^0-9]/g, ''))}
            message={oldPinMessage}
          />
        </View>
        <View style={Style.renderFormInput.mb16}>
          <Input
            height={56}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            value={pin}
            maxLength={6}
            keyboardType="number-pad"
            label={trans(locale, lang, 'inputLabel2')}
            placeholder={trans(locale, lang, 'inputPlaceholder2')}
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
        </View>
        <View>
          <Input
            height={56}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            value={pinConf}
            maxLength={6}
            keyboardType="number-pad"
            label={trans(locale, lang, 'inputLabel3')}
            placeholder={trans(locale, lang, 'inputPlaceholder3')}
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
      </View>
    );
  }

  function renderSuccessMessage() {
    return (
      <BottomSheet isVisible={isSMVisible} swipeable={false}>
        <View style={[Style.successModal.container, Style.alignItemsCenter]}>
          <Image source={BadgeTick} style={Style.successModal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.successModal.text1}>
            {trans(locale, lang, 'successChanged')}
          </Text>
          <Button
            block
            shadow
            onPress={() => {
              setSMVisible(false);
              setUserData({
                userData: {
                  alreadySetMPin: true,
                },
              });
              navigation.pop();
            }}>
            {trans(locale, lang, 'successBtnLabel')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderButton() {
    return (
      <View style={Style.renderButtonWrapper}>
        <Button
          loading={isSubmit}
          disabled={
            !isValidOldPin || !isValidPin || !isValidPinConf || isSubmit
          }
          onPress={() => {
            Keyboard.dismiss();
            setLoading(true);
            setIsSubmit(true);
            setChangePin({
              oldPin: oldPin,
              newPin: pin,
              newPinConfirmation: pinConf,
            });
          }}>
          {trans(locale, lang, 'btnLabel')}
        </Button>
      </View>
    );
  }

  function renderSplash() {
    return (
      <Splash
        title={
          !alreadySetMPin
            ? trans(locale, lang, 'pinBerhasildiBuat')
            : trans(locale, lang, 'successChanged')
        }
        desc=""
        isVisible={isSplashVisible}
      />
    );
  }

  return (
    <>
      <Base
        renderBottom={renderButton()}
        title={
          !alreadySetMPin
            ? trans(locale, lang, 'aktivasiMpin')
            : trans(locale, lang, 'title')
        }
        onBackPress={() => {
          navigation.pop();
          setIsComingFromScreen({});
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

export default ProfileChangeNewPin;

ProfileChangeNewPin.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setChangePin: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setChangePinFailed: PropTypes.objectOf(Object).isRequired,
  setChangePinClear: PropTypes.func.isRequired,
  mobilePhoneNumberUser: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  alreadySetMPin: PropTypes.bool.isRequired,
  setUserData: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};
