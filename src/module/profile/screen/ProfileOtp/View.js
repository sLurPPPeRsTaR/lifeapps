import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Padder from 'ca-component-container/Padder';
import DeviceInfo from 'react-native-device-info';
import { useInterval } from 'ca-util/common';
import Text from 'ca-component-generic/Text';
import { Frame14 } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import {
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_VERIFY_OTP_FAILED,
  SET_PROFILE_VERIFY_OTP_SUCCESS,
} from 'ca-module-profile/profileConstant';
import locale from './locale';
import style from './style';

const REMAINING_SECONDS = 120;

function ProfileOtp(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    userData,
    profileAction,
    setProfileVerifyOtp,
    setProfileVerifyOtpFailed,
    setProfileVerifyOtpClear,
    setProfileRequestOtpFailed,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setLoading,
    setUserData,
  } = props;

  const inputOtp = useRef(null);
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitResend, setIsSubmitResend] = useState(false);

  useEffect(() => {
    setProfileVerifyOtpResult(profileAction);
  }, [setProfileVerifyOtpResult, profileAction]);

  const setProfileVerifyOtpResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_VERIFY_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setProfileVerifyOtpClear();
        if (params?.nextRoute) {
          if (params?.action === 'RESET_PIN') {
            setUserData({
              userData: {
                alreadySetPin: false,
              },
            });
          }
          navigation.replace(params?.nextRoute, {
            otpSendTo: params?.otpSendTo,
            isVerifyOtp: true,
          });
        } else {
          params?.callbackValidOtp(true);
          navigation.pop();
        }
      }
      if (act === SET_PROFILE_VERIFY_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setProfileVerifyOtpClear();
        if (setProfileVerifyOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileVerifyOtpFailed?.message === 'WRONG_OTP') {
            setErrorMsg(true);
            return;
          }
          Alert.alert(setProfileVerifyOtpFailed?.message);
        }
      }
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmitResend(false);
        setLoading(false);
        setProfileRequestOtpClear();
        setLapsedTime(REMAINING_SECONDS);
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmitResend(false);
        setLoading(false);
        setProfileRequestOtpClear();
        if (setProfileRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert(setProfileRequestOtpFailed?.message);
        }
      }
    },
    [
      navigation,
      params,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
      setProfileVerifyOtpClear,
      setProfileVerifyOtpFailed?.message,
      setUserData,
    ]
  );

  useEffect(() => {
    if (otp.length === 6) {
      submitOtpCallback();
    }
  }, [otp, submitOtpCallback]);

  const submitOtpCallback = useCallback(() => {
    if (!isSubmit) {
      inputOtp.current.blur();
      setIsSubmit(true);
      setLoading(true);
      setProfileVerifyOtp({
        isNoLogin: params?.isNoLogin,
        data: {
          id: params?.otpSendTo,
          action: params?.action,
          otp,
          deviceId: userData?.deviceId,
        },
      });
    }
  }, [
    isSubmit,
    otp,
    params?.action,
    params?.isNoLogin,
    params?.otpSendTo,
    setLoading,
    setProfileVerifyOtp,
    userData?.deviceId,
  ]);

  function onOtpTyped(digit) {
    setOtp(digit.substring(0, 6));
  }

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  function getRemainingTime() {
    let minutes = Math.floor(lapsedTime / 60);
    let seconds = `${lapsedTime - minutes * 60}`;
    minutes = `${minutes}`;
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${minutes} : ${seconds}`;
  }

  // UI Function

  function renderCardContainer() {
    return (
      <View style={[style.card.container]}>
        <View style={style.card.image}>
          <Frame14 />
        </View>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={19.6}
          letterSpacing={0.5}
          align="center"
          color={Color.neutral.light.neutral10}
          style={style.card.text}>
          {trans(locale, lang, 'masukkan6Kode')}
          {trans(
            locale,
            lang,
            params?.otpType === 'email' ? 'email' : 'nomorHp'
          )}
          <Text color={Color.primary.light.primary90}>
            {renderOtpSendTo(params?.otpSendTo)}
          </Text>
        </Text>
        {renderGroupLine()}
        <View>
          <TextInput
            ref={inputOtp}
            style={style.hiddenInput}
            value={otp}
            keyboardType="number-pad"
            onChangeText={(text) => {
              setErrorMsg(false);
              onOtpTyped(text.replace(/[^0-9]/g, ''));
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
          otp.length > index
            ? errorMsg && otp.length === 6
              ? [style.input.error, style.input.active]
              : [style.input.active]
            : {},
        ]}>
        <Text
          align="center"
          textStyle="semi"
          size={Size.text.h6.size}
          line={30.6}>
          {otp.charAt(index).toUpperCase()}
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
            if (inputOtp && inputOtp.current) {
              inputOtp.current.blur();
              setTimeout(() => {
                if (inputOtp && inputOtp.current) {
                  inputOtp.current.focus();
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
            {trans(locale, lang, 'otpSalah')}
          </Text>
        ) : null}
      </View>
    );
  }

  function renderOtpTime() {
    return (
      <View style={style.time.container}>
        {lapsedTime > 0 ? (
          <View style={style.time.clock.container}>
            <ActivityIndicator
              color={Color.primary.light.primary90}
              style={style.time.clock.loading}
            />
            <Text textStyle="semi" size={Size.text.body2.size} line={23.8}>
              {getRemainingTime()}
            </Text>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          disabled={lapsedTime > 0 || isSubmitResend}
          onPress={() => {
            setIsSubmitResend(true);
            setLoading(true);
            setProfileRequestOtp({
              id: params?.otpSendTo,
              action: params?.action,
            });
          }}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            color={
              lapsedTime > 0
                ? Color.mediumLightGray[colorScheme].mediumLightGray
                : Color.primary.light.primary90
            }
            textDecorationLine="underline">
            {trans(locale, lang, 'kirimUlangOtp')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAlertContainer() {
    if (params?.otpType === 'email') {
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

  function isNumeric(string) {
    if (typeof string !== 'string') return false;
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(string) && !isNaN(parseFloat(string));
  }

  function renderOtpSendTo(otpSendTo) {
    if (isNumeric(otpSendTo === true)) {
      if (otpSendTo.startsWith('+0')) {
        return otpSendTo.replace('+0', '+62');
      }
      if (otpSendTo.startsWith('0')) {
        return otpSendTo.replace('0', '+62');
      }
    }
    return otpSendTo;
  }

  return (
    <Base15
      backgroundColor={Color.greyBackround.dark.greyBackground}
      isScroll
      animated
      title={trans(locale, lang, 'konfirmasiOtp')}
      onBackPress={() => navigation.pop()}>
      <Padder style={style.main.container}>
        {renderCardContainer()}
        {renderOtpTime()}
        {renderAlertContainer()}
      </Padder>
    </Base15>
  );
}

export default ProfileOtp;

ProfileOtp.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  setProfileVerifyOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileVerifyOtp: PropTypes.func.isRequired,
  setProfileVerifyOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
};
