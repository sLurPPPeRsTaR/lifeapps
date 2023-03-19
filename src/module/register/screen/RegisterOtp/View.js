import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import { Frame14 } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { regexEmail, useInterval } from 'ca-util/common';
import { NAVIGATION } from 'ca-util/constant';
import DeviceInfo from 'react-native-device-info';
import {
  SET_REGISTER_FAILED,
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
  SET_REGISTER_SOCIAL_FAILED,
  SET_REGISTER_SOCIAL_SUCCESS,
  SET_REGISTER_SUCCESS,
} from 'ca-module-register/registerConstant';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { CloudBackground } from 'ca-config/Image';
import locale from './locale';
import Style from './style';

const REMAINING_SECONDS = 120;

function RegisterOtp(props) {
  const {
    navigation,
    lang,
    colorScheme,
    setRegister,
    registerAction,
    setRequestOtp,
    setRequestOtpFailed,
    setRequestOtpParam,
    setRequestOtpClear,
    setRegisterClear,
    setRegisterFailed,
    setResendRegisterOtp,
    route: { params },
    setLoading,
    setRegisterSocial,
    setRegisterSocialFailed,
    setRegisterSocialClear,
    isComingFromScreen,
    setIsComingFromScreen,
    isComingFromDeepLink,
  } = props;

  const [otp, setOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSubmitOtp, setIsSubmitOtp] = useState(false);
  const [isSubmitResendOtp, setIsSubmitResendOtp] = useState(false);

  const inputOtp = useRef(null);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  useEffect(() => {
    if (otp.length === 6) {
      submitOtpCallback();
    }
  }, [otp, submitOtpCallback]);

  const submitOtpCallback = useCallback(() => {
    if (!isSubmitOtp) {
      setIsSubmitOtp(true);
      setLoading(true);
      inputOtp.current.blur();
      if (params?.previousRoute === 'RegisterNextStep') {
        setRegisterSocial({ otp });
      } else {
        setRegister({ otp });
      }
    }
  }, [
    isSubmitOtp,
    otp,
    params?.previousRoute,
    setLoading,
    setRegister,
    setRegisterSocial,
  ]);

  useEffect(() => {
    setRegisterResult(registerAction);
  }, [registerAction, setRegisterResult]);

  const setRegisterResult = useCallback(
    (act) => {
      if (!setResendRegisterOtp) {
        if (act === SET_REGISTER_SUCCESS) {
          setIsSubmitOtp(false);
          setLoading(false);
          setErrorMsg(false);
          setRegisterClear();
          if (isComingFromScreen?.screen) {
            // eslint-disable-next-line max-depth
            if (isComingFromScreen?.screen === 'EventDetail') {
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.KYC.KycMain }],
              });
            } else goToSourceScreen(isComingFromScreen.screen);
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            });
          }
          if (isComingFromDeepLink) {
            // eslint-disable-next-line max-depth
            if (
              isComingFromScreen?.screen ===
              NAVIGATION.LIFETAG.LifetagDetailProduct
            ) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: isComingFromScreen?.screen,
                  },
                ],
              });
              setIsComingFromScreen({});
            }
            return;
          }
        }
        if (act === SET_REGISTER_FAILED) {
          setIsSubmitOtp(false);
          setLoading(false);
          if (setRegisterFailed?.message !== 'INTERNAL_SERVER_ERROR') {
            // eslint-disable-next-line max-depth
            if (
              setRegisterFailed?.message?.match('WRONG_OTP') ||
              setRegisterFailed?.message?.match('INVALID_OTP')
            ) {
              setErrorMsg(true);
            } else {
              Alert.alert(
                trans(locale, lang, 'error'),
                trans(locale, lang, setRegisterFailed?.message)
              );
            }
          }
        }
        if (act === SET_REGISTER_SOCIAL_SUCCESS) {
          setIsSubmitOtp(false);
          setLoading(false);
          setErrorMsg(false);
          setRegisterSocialClear();
          if (isComingFromScreen?.screen) {
            navigation.navigate(isComingFromScreen?.screen);
          } else {
            navigation.replace(NAVIGATION.TABMAIN.TabMain);
          }
          if (isComingFromDeepLink) {
            // eslint-disable-next-line max-depth
            if (
              isComingFromScreen?.screen ===
              NAVIGATION.LIFETAG.LifetagDetailProduct
            ) {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: isComingFromScreen?.screen,
                  },
                ],
              });
              setIsComingFromScreen({});
            }
            return;
          }
        }
        if (act === SET_REGISTER_SOCIAL_FAILED) {
          setIsSubmitOtp(false);
          setLoading(false);
          if (setRegisterFailed?.message !== 'INTERNAL_SERVER_ERROR') {
            // eslint-disable-next-line max-depth
            if (
              setRegisterSocialFailed?.message?.match('WRONG_OTP') ||
              setRegisterSocialFailed?.message?.match('INVALID_OTP')
            ) {
              setErrorMsg(true);
            } else {
              Alert.alert(
                trans(locale, lang, 'error'),
                trans(locale, lang, setRegisterSocialFailed?.message)
              );
            }
          }
          setRegisterClear();
          setRegisterSocialClear();
        }
      }
    },
    [
      setResendRegisterOtp,
      setLoading,
      setRegisterClear,
      isComingFromScreen.screen,
      isComingFromDeepLink,
      goToSourceScreen,
      navigation,
      setIsComingFromScreen,
      setRegisterFailed?.message,
      lang,
      setRegisterSocialClear,
      setRegisterSocialFailed?.message,
    ]
  );

  /**
   * @param {String} source the source screen name
   * Resets the navigation and navigate to source to force screens hydration
   * Clears isComingFromScreen to remove lingering effect
   */
  const goToSourceScreen = useCallback(
    (source) => {
      setIsComingFromScreen({});
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }, { name: source }],
        })
      );
    },
    [navigation, setIsComingFromScreen]
  );

  useEffect(() => {
    setRequestOtpResult(registerAction);
  }, [registerAction, setRequestOtpResult]);

  const setRequestOtpResult = useCallback(
    (act) => {
      if (act === SET_REGISTER_OTP_FAILED) {
        setIsSubmitResendOtp(false);
        setLoading(false);
        if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
          Alert.alert(
            trans(locale, lang, 'warning'),
            trans(locale, lang, setRequestOtpFailed?.message.substring(0, 15))
          );
        } else {
          Alert.alert(
            trans(locale, lang, 'warning'),
            trans(locale, lang, setRequestOtpFailed?.message)
          );
        }
        setRequestOtpClear();
      }
      if (act === SET_REGISTER_OTP_SUCCESS) {
        setLapsedTime(REMAINING_SECONDS);
        setIsSubmitResendOtp(false);
        setLoading(false);
        setErrorMsg(false);
        setOtp('');
        setRequestOtpClear();
      }
    },
    [lang, setLoading, setRequestOtpClear, setRequestOtpFailed?.message]
  );

  function onOtpTyped(digit) {
    setOtp(digit.substring(0, 6));
  }

  function renderImageContainer() {
    return (
      <View style={[Style.container]}>
        <Frame14 />
      </View>
    );
  }

  function renderOtpSendTo(otpSendTo) {
    if (otpSendTo.startsWith('+0')) {
      return otpSendTo.replace('+0', '+62');
    }
    if (otpSendTo.startsWith('0')) {
      return otpSendTo.replace('0', '+62');
    }
    return otpSendTo;
  }

  function renderTitleContainer() {
    return (
      <View style={Style.title.container}>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'masukkanKodeOtp')}
          {trans(
            locale,
            lang,
            regexEmail.test(params?.otpSendTo) ? 'email' : 'nomorHp'
          )}
          <Text textStyle="semi" color={Color.primary.light.primary90}>
            {renderOtpSendTo(params?.otpSendTo)}
          </Text>
        </Text>
      </View>
    );
  }

  function renderLine(index) {
    return (
      <View
        style={[
          DeviceInfo.isTablet() ? Style.input.lineTab : Style.input.line,
          // eslint-disable-next-line no-nested-ternary
          otp.length > index
            ? errorMsg && otp.length === 6
              ? [Style.input.error, Style.input.active]
              : [Style.input.active]
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
      <View style={Style.input.container}>
        <TouchableOpacity
          style={Style.input.grouper}
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
                ? Style.input.innerGrouperTab
                : Style.input.innerGrouper
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
            style={Style.input.errorMsg}>
            {trans(locale, lang, 'otpSalah')}
          </Text>
        ) : null}
      </View>
    );
  }

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

  function renderOtpTime() {
    return (
      <View style={Style.time.container}>
        {lapsedTime > 0 ? (
          <View style={Style.time.clock.container}>
            <ActivityIndicator
              color={Color.primary.light.primary90}
              style={Style.time.clock.loading}
            />
            <Text textStyle="semi" size={Size.text.body2.size} line={23.8}>
              {getRemainingTime()}
            </Text>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          disabled={lapsedTime > 0 || isSubmitResendOtp}
          onPress={() => {
            setIsSubmitResendOtp(true);
            setLoading(true);
            setRequestOtp({
              ...setRequestOtpParam,
              action: 'REGISTER',
              setResendRegisterOtp: true,
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

  function renderFooterContainer() {
    return (
      <ImageBackground
        source={CloudBackground}
        style={[Style.footer.container]}
      />
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      backgroundColor={Color.greyBackround.dark.greyBackground}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'otp')}
      renderBottom={renderFooterContainer()}>
      <Padder>
        {renderImageContainer()}
        {renderTitleContainer()}
        {renderGroupLine()}
        {renderOtpTime()}
        {regexEmail.test(params?.otpSendTo) ? renderAlertContainer() : null}
        <View>
          <TextInput
            ref={inputOtp}
            style={Style.hiddenInput}
            value={otp}
            keyboardType="number-pad"
            onChangeText={(text) => {
              setErrorMsg(false);
              onOtpTyped(text.replace(/[^0-9]/g, ''));
            }}
          />
        </View>
      </Padder>
    </Base>
  );
}

export default RegisterOtp;

RegisterOtp.propTypes = {
  lang: PropTypes.string.isRequired,
  registerAction: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setRegister: PropTypes.func.isRequired,
  setRequestOtp: PropTypes.func.isRequired,
  setRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setRequestOtpParam: PropTypes.objectOf(Object).isRequired,
  setRequestOtpClear: PropTypes.func.isRequired,
  setRegisterClear: PropTypes.func.isRequired,
  setResendRegisterOtp: PropTypes.bool.isRequired,
  setRegisterFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setRegisterSocial: PropTypes.func.isRequired,
  setRegisterSocialFailed: PropTypes.objectOf(Object).isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setRegisterSocialClear: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromDeepLink: PropTypes.func.isRequired,
};
