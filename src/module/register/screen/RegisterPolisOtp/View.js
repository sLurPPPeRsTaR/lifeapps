import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import { Frame14 } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { regexEmail, useInterval } from 'ca-util/common';
import BottomSheet from 'ca-component-container/BottomSheet';
import { NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import {
  GET_POLICY_FAILED,
  GET_POLICY_SUCCESS,
  SET_LINK_POLICY_FAILED,
  SET_LINK_POLICY_SUCCESS,
} from 'ca-module-home/homeConstant';
import { CloudBackground, BadgeTick } from 'ca-config/Image';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import locale from './locale';
import Style from './style';

const REMAINING_SECONDS = 120;

function RegisterPolisOtp(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    setLinkPolicy,
    homeAction,
    getPolicyClear,
    getPolicy,
    setLinkPolicyError,
    // userData,
    setLoading,
  } = props;

  const [otp, setOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [errorMsg, setErrorMsg] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
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
    const unsubscribe = navigation.addListener('blur', () => {
      getPolicyClear();
    });
    return unsubscribe;
  }, [getPolicyClear, navigation]);

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
      setLinkPolicy({
        otp,
        id: params?.id,
        certificateNo: params.certificateNo ? params.certificateNo : '',
      });
    }
  }, [
    isSubmitOtp,
    otp,
    params?.certificateNo,
    params?.id,
    setLinkPolicy,
    setLoading,
  ]);

  useEffect(() => {
    setLinkPolicyResult(homeAction);
  }, [homeAction, setLinkPolicyResult]);

  const setLinkPolicyResult = useCallback(
    (act) => {
      if (act === SET_LINK_POLICY_SUCCESS) {
        setLoading(false);
        setBottomSheetVisible(true);
      }
      if (act === SET_LINK_POLICY_FAILED) {
        setLoading(false);
        if (
          setLinkPolicyError?.message?.match('WRONG_OTP') ||
          setLinkPolicyError?.message?.match('INVALID_OTP')
        ) {
          setErrorMsg(true);
        } else {
          Alert.alert(
            trans(locale, lang, 'Error'),
            trans(locale, lang, setLinkPolicyError?.message)
          );
        }
      }
      setIsSubmitOtp(false);
    },
    [lang, setLinkPolicyError?.message, setLoading]
  );

  useEffect(() => {
    getPolicyResult(homeAction);
  }, [getPolicyResult, homeAction]);

  const getPolicyResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SUCCESS) {
        setLapsedTime(REMAINING_SECONDS);
        setLoading(false);
        setErrorMsg(false);
        setOtp('');
        getPolicyClear();
      }
      if (act === GET_POLICY_FAILED) {
        setLoading(false);
        getPolicyClear();
        Alert.alert('Mohon coba kembali');
      }
      setIsSubmitResendOtp(false);
    },
    [getPolicyClear, setLoading]
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
            {params?.otpSendTo}
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
            getPolicy({
              id: params?.id,
              certificateNo: params?.certificateNo,
              requestOtp: true,
              sendTo: params?.otpSendTo,
              setResendPolicyOtp: true,
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

  function renderSuccessMessage() {
    return (
      <BottomSheet isVisible={isBottomSheetVisible} swipeable={false}>
        <View style={[Style.modal.container, Style.alignItemsCenter]}>
          <Image source={BadgeTick} style={Style.modal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.text1}>
            {trans(locale, lang, 'polisBerhasilTerhubung')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.text2}>
            {trans(locale, lang, 'nikmatiKemudahanProteksi')}
          </Text>
          <Button
            shadow
            block
            onPress={() => {
              setBottomSheetVisible(false);
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
              });
            }}>
            {trans(locale, lang, 'lanjut')}
          </Button>
          {/* {!userData.alreadySetPin ? (
            <>
              <Button
                outline
                block
                style={Style.modal.button1}
                onPress={() => {
                  setBottomSheetVisible(false);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
                  });
                }}>
                {trans(locale, lang, 'skip')}
              </Button>
              <Button
                shadow
                block
                onPress={() => {
                  setBottomSheetVisible(false);
                  navigation.replace(NAVIGATION.REGISTER.RegisterPin);
                }}>
                {trans(locale, lang, 'setPin')}
              </Button>
            </>
          ) : (
            <Button
              shadow
              block
              style={Style.modal.button1}
              onPress={() => {
                setBottomSheetVisible(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
                });
              }}>
              {trans(locale, lang, 'continue')}
            </Button>
          )} */}
        </View>
      </BottomSheet>
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
      leftTitle
      onBackPress={
        navigation.canGoBack()
          ? () => navigation.pop()
          : () => navigation.replace(NAVIGATION.TABMAIN.TabMain)
      }
      title={trans(locale, lang, 'otp')}>
      <Padder>
        {renderImageContainer()}
        {renderTitleContainer()}
        {renderGroupLine()}
        {renderOtpTime()}
        {renderAlertContainer()}
        {renderSuccessMessage()}
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
      {renderFooterContainer()}
    </Base>
  );
}

export default RegisterPolisOtp;

RegisterPolisOtp.propTypes = {
  lang: PropTypes.string.isRequired,
  homeAction: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setLinkPolicy: PropTypes.func.isRequired,
  getPolicyClear: PropTypes.func.isRequired,
  getPolicy: PropTypes.func.isRequired,
  setLinkPolicyError: PropTypes.objectOf(Object).isRequired,
  // userData: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};
