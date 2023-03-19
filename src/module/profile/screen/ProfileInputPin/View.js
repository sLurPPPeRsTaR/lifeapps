import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import { ArrowRight2Black, Handphone, Message } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import BottomSheet from 'ca-component-container/BottomSheet';
import { useMount } from 'ca-util/common';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  GET_VERIFY_PIN_FAILED,
  GET_VERIFY_PIN_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
} from 'ca-module-profile/profileConstant';
import DeviceInfo from 'react-native-device-info';
import { ClockOTP, PinSet } from 'ca-config/Image';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Shadow from 'ca-component-container/Shadow';
import { NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import Base15 from 'ca-component-container/Base15';
import locale from './locale';
import style from './style';

function ProfileInputPin(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getVerifyPin,
    getVerifyPinClear,
    profileAction,
    setLoading,
    emailUser,
    mobilePhoneNumberUser,
    setProfileRequestOtpFailed,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    getVerifyPinFailed,
    currentScreen,
  } = props;

  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);
  const [isPinBlockedModal, setIsPinBlockedModal] = useState(false);

  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [isShowForgetPin, setIsShowForgetPin] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [reqOtpSendTo, setReqOtpSendTo] = useState('');
  const [reqOtpType, setReqOtpType] = useState('');

  const inputPin = useRef(null);
  // const rnBiometrics = new ReactNativeBiometrics();

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  useMount(() => {
    ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
      const { available } = resultObject;

      if (available) {
        ReactNativeBiometrics.simplePrompt({
          promptMessage: 'Confirm fingerprint',
        })
          .then((res) => {
            const { success } = res;
            if (success) {
              if (params?.nextRoute) {
                navigation.replace(params?.nextRoute);
              }
              if (params?.callbackValidPin) {
                params?.callbackValidPin(true);
                navigation.pop();
              }
            } else {
              console.log('user cancelled biometric prompt');
            }
          })
          .catch(() => {
            console.log('biometrics failed');
          });
      }
    });
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      getVerifyPinClear();
    });
    return unsubscribe;
  }, [navigation, getVerifyPinClear]);

  useEffect(() => {
    if (currentScreen === 'ProfileInputPin') {
      profileResult(profileAction);
    }
  }, [currentScreen, profileAction, profileResult]);

  useEffect(() => {
    if (pin.length === 6) {
      inputPin.current.blur();
      setLoading(true);
      getVerifyPin({ pin });
    }
  }, [getVerifyPin, navigation, pin, setLoading]);

  const profileResult = useCallback(
    (act) => {
      if (act === GET_VERIFY_PIN_SUCCESS) {
        setLoading(false);
        if (params?.nextRoute) {
          navigation.replace(params?.nextRoute);
          return;
        }
        if (params?.callbackValidPin) {
          params?.callbackValidPin(true);
          navigation.pop();
          return;
        }
      }
      if (act === GET_VERIFY_PIN_FAILED) {
        setLoading(false);
        if (getVerifyPinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getVerifyPinFailed?.message === 'PIN_FAILED') {
            setErrorMsg(true);
            return;
          }
          if (getVerifyPinFailed?.message === 'PIN_BLOCKED') {
            setErrorMsg(true);
            setRemainingSeconds(300);
            setTimeout(
              () => {
                setIsPinBlockedModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          if (getVerifyPinFailed?.message?.match('TOO_FREQUENTLY_')) {
            setErrorMsg(true);
            setRemainingSeconds(
              Number(getVerifyPinFailed?.message?.substring(15))
            );
            setTimeout(
              () => {
                setIsPinBlockedModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          Alert.alert('Error', getVerifyPinFailed?.message);
        }
      }
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
          action: 'RESET_PIN',
          otpSendTo: reqOtpSendTo,
          otpType: reqOtpType,
          nextRoute: NAVIGATION.PROFILE.ProfileCreateNewPin,
        });
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        if (setProfileRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(
              Number(setProfileRequestOtpFailed?.message?.substring(15))
            );
            setTimeout(
              () => {
                setIsTooFrequentlyModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          Alert.alert('Error', setProfileRequestOtpFailed?.message);
        }
      }
    },
    [
      navigation,
      params,
      reqOtpSendTo,
      reqOtpType,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
      getVerifyPinFailed?.message,
    ]
  );

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (isTooFrequentlyModal) {
        setIsTooFrequentlyModal(false);
      }
      if (isPinBlockedModal) {
        setIsPinBlockedModal(false);
      }
    }
  }, [isPinBlockedModal, isTooFrequentlyModal, minutes, seconds]);

  function onPinTyped(digit) {
    setPin(digit.substring(0, 6));
  }

  useEffect(() => {
    if (inputPin && inputPin.current) {
      inputPin.current.blur();
      setTimeout(() => {
        if (inputPin && inputPin.current) {
          inputPin.current.focus();
        }
      }, 100);
    }
  }, []);

  // UI Function

  function renderCardContainer() {
    return (
      <View style={[style.card.container]}>
        <View style={style.card.image.container}>
          <Image
            source={PinSet}
            style={style.card.image.image}
            resizeMode="contain"
          />
        </View>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center"
          style={style.card.title}>
          {trans(locale, lang, 'masukkanPinKamu')}
        </Text>
        {renderGroupLine()}
        <View style={style.lupaPin.container}>
          <TouchableOpacity onPress={() => setIsShowForgetPin(true)}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={17}
              letterSpacing={0.5}
              align="center"
              textDecorationLine="underline"
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'lupaPin')}
              {' ?'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            ref={inputPin}
            style={style.hiddenInput}
            value={pin}
            keyboardType="number-pad"
            onChangeText={(text) => {
              setErrorMsg(false);
              onPinTyped(text.replace(/[^0-9]/g, ''));
            }}
          />
        </View>
      </View>
    );
  }

  function renderLine(index) {
    return (
      <View
        style={[
          DeviceInfo.isTablet() ? style.input.lineTab : style.input.line,
          // eslint-disable-next-line no-nested-ternary
          pin.length > index
            ? errorMsg && pin.length === 6
              ? [style.input.error, style.input.active]
              : [style.input.active]
            : {},
        ]}>
        <Text
          align="center"
          textStyle="semi"
          size={Size.text.h6.size}
          line={30.6}>
          {pin.charAt(index) ? '*' : ''}
        </Text>
      </View>
    );
  }

  function renderGroupLine() {
    return (
      <View style={style.input.container}>
        <TouchableOpacity
          style={style.input.grouper}
          onPress={() => {
            if (inputPin && inputPin.current) {
              inputPin.current.blur();
              setTimeout(() => {
                if (inputPin && inputPin.current) {
                  inputPin.current.focus();
                }
              }, 100);
            }
          }}>
          <View
            style={
              DeviceInfo.isTablet()
                ? style.input.innerGrouperTab
                : style.input.innerGrouper
            }>
            {renderLine(0)}
            {renderLine(1)}
            {renderLine(2)}
            {renderLine(3)}
            {renderLine(4)}
            {renderLine(5)}
          </View>
        </TouchableOpacity>
        {errorMsg ? (
          <Text
            align="left"
            textStyle="semi"
            size={Size.text.caption1.size}
            line={18}
            letterSpacing={0.5}
            color={Color.primary.light.primary90}
            style={style.input.errorMsg}>
            {trans(locale, lang, 'pinSalah')}
          </Text>
        ) : null}
      </View>
    );
  }

  function renderAlertContainer() {
    if (params?.pinType === 'email') {
      return (
        <View>
          <AlertDialogue
            title={trans(locale, lang, 'cekJugaFolder')}
            type="warning"
            leftIcon
          />
        </View>
      );
    }
    return null;
  }

  function renderForgetPin() {
    return (
      <BottomSheet
        isVisible={isShowForgetPin}
        swipeable={false}
        title={trans(locale, lang, 'lupaPin')}
        onClosePress={() => setIsShowForgetPin(false)}>
        <View>
          {emailUser ? (
            <Shadow animated borderRadius={16} style={style.mb16}>
              <TouchableOpacity
                disabled={isSubmit}
                onPress={() => {
                  setPin('');
                  setErrorMsg(false);
                  setIsSubmit(true);
                  setLoading(true);
                  setReqOtpType('email');
                  setReqOtpSendTo(emailUser);
                  setProfileRequestOtp({
                    id: emailUser,
                    action: 'RESET_PIN',
                  });
                  setIsShowForgetPin(false);
                }}>
                <Padder style={style.modal.forgetPin.card.container}>
                  <View style={style.modal.forgetPin.card.col.container}>
                    <Message style={style.modal.forgetPin.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={style.modal.forgetPin.card.col.text}>
                      {emailUser}
                    </Text>
                  </View>
                  <ArrowRight2Black />
                </Padder>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          {mobilePhoneNumberUser ? (
            <Shadow animated borderRadius={16} style={style.mb16}>
              <TouchableOpacity
                disabled={isSubmit}
                onPress={() => {
                  setPin('');
                  setErrorMsg(false);
                  setIsSubmit(true);
                  setLoading(true);
                  setReqOtpType('number');
                  setReqOtpSendTo(mobilePhoneNumberUser);
                  setProfileRequestOtp({
                    id: mobilePhoneNumberUser,
                    action: 'RESET_PIN',
                  });
                  setIsShowForgetPin(false);
                }}>
                <Padder style={style.modal.forgetPin.card.container}>
                  <View style={style.modal.forgetPin.card.col.container}>
                    <Handphone style={style.modal.forgetPin.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={style.modal.forgetPin.card.col.text}>
                      {mobilePhoneNumberUser}
                    </Text>
                  </View>
                  <ArrowRight2Black />
                </Padder>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          <AlertDialogue
            leftIcon
            type="warning"
            title={trans(locale, lang, 'pastikanEmailAtau')}
          />
        </View>
      </BottomSheet>
    );
  }

  function renderTooFrequentlyModal() {
    return (
      <BottomSheet isVisible={isTooFrequentlyModal} swipeable={false}>
        <View style={style.modal.tooFrequently.container}>
          <Image
            source={ClockOTP}
            style={style.modal.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={style.modal.tooFrequently.title}
            textStyle="bold"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'andaTerlaluSering')}
          </Text>
          <Text
            style={style.modal.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'untukSementaraWaktu')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {showRemainingTime()}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}
            style={style.modal.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderPinBlockedModal() {
    return (
      <BottomSheet
        isVisible={isPinBlockedModal}
        swipeable={false}
        onClosePress={() => setIsPinBlockedModal(false)}>
        <View style={style.modal.pinBlocked.container}>
          <Image
            source={ClockOTP}
            style={style.modal.pinBlocked.icon}
            resizeMode="contain"
          />
          <Text
            style={style.modal.pinBlocked.title}
            textStyle="bold"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'andaTerlaluSeringPin')}
          </Text>
          <Text
            style={style.modal.pinBlocked.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'untukSementaraWaktuPin')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {showRemainingTime()}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsPinBlockedModal(false);
              setTimeout(
                () => {
                  setIsShowForgetPin(true);
                },
                Size.isAndroid ? 200 : 600
              );
            }}
            style={style.modal.pinBlocked.button1}>
            {trans(locale, lang, 'lupaPin')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base15
      isScroll
      animated
      title={trans(locale, lang, 'konfirmasiPin')}
      onBackPress={() => navigation.pop()}>
      <Padder style={style.main.container}>
        {renderCardContainer()}
        {renderAlertContainer()}
        {renderForgetPin()}
        {renderTooFrequentlyModal()}
        {renderPinBlockedModal()}
      </Padder>
    </Base15>
  );
}

export default ProfileInputPin;

ProfileInputPin.defaultProps = {
  colorScheme: 'light',
};

ProfileInputPin.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getVerifyPin: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getVerifyPinClear: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
  mobilePhoneNumberUser: PropTypes.string.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  getVerifyPinFailed: PropTypes.objectOf(Object).isRequired,
  currentScreen: PropTypes.string.isRequired,
};
