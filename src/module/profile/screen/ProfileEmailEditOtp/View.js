import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import {
  ActivityIndicator,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Padder from 'ca-component-container/Padder';
import DeviceInfo from 'react-native-device-info';
import { useInterval } from 'ca-util/common';
import Text from 'ca-component-generic/Text';
import { Frame14 } from 'ca-config/Svg';
import { BadgeTick } from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import {
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_EMAIL_FAILED,
  SET_EMAIL_SUCCESS,
} from 'ca-module-profile/profileConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import style from './style';

const REMAINING_SECONDS = 120;

function ProfileEmailEditOtp(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    profileAction,
    setEmail,
    setEmailFailed,
    setEmailClear,
    setProfileRequestOtpFailed,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setLoading,
    setUserData,
    emailUser,
  } = props;

  const inputOtp = useRef(null);
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitResend, setIsSubmitResend] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  useEffect(() => {
    profileResult(profileAction);
  }, [profileResult, profileAction]);

  const profileResult = useCallback(
    (act) => {
      if (act === SET_EMAIL_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setUserData({
          userData: {
            email: params?.otpSendTo,
          },
        });
        setEmailClear();
        setIsSuccessModal(true);
      }
      if (act === SET_EMAIL_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setEmailClear();
        if (setEmailFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setEmailFailed?.message === 'WRONG_OTP') {
            setErrorMsg(true);
            return;
          }
          Alert.alert(setEmailFailed?.message);
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
      setLoading,
      setUserData,
      params?.otpSendTo,
      setEmailClear,
      setEmailFailed?.message,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
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
      setEmail({
        email: params?.otpSendTo,
        otp,
      });
    }
  }, [isSubmit, otp, params?.otpSendTo, setLoading, setEmail]);

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
          <Text color={Color.primary.light.primary90}>{params?.otpSendTo}</Text>
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

  function renderSuccessModal() {
    const title =
      params?.actionType === 'add'
        ? 'andaBerhasilMenambahkan'
        : 'andaBerhasilMengubah';
    const onBackPress = () => {
      setIsSuccessModal(false);
      setTimeout(() => {
        navigation.pop(2);
      }, 200);
    };
    return (
      <BottomSheet
        isVisible={isSuccessModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.success.container}>
          <Image source={BadgeTick} style={style.modal.success.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={params?.actionType === 'add' ? style.mb16 : style.mb24}>
            {trans(locale, lang, title)}
          </Text>
          {params?.actionType === 'add' ? (
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.mediumGray.light.mediumGray}
              style={style.mb24}>
              {trans(locale, lang, 'saatIniKamu')}
            </Text>
          ) : null}
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsSuccessModal(false);
            setTimeout(() => {
              navigation.pop(2);
            }, 200);
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
    );
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
        {renderSuccessModal()}
      </Padder>
    </Base15>
  );
}

export default ProfileEmailEditOtp;

ProfileEmailEditOtp.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  setEmailFailed: PropTypes.objectOf(Object).isRequired,
  setEmail: PropTypes.func.isRequired,
  setEmailClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  emailUser: PropTypes.string.isRequired,
};
