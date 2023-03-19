import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import { useInterval } from 'ca-util/common';
import { IconSuccess, Ilustrator2 } from 'ca-config/Svg';
import { NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import Style from './style';
import {
  SET_PHONE_NUMBER_FAILED,
  SET_PHONE_NUMBER_SUCCESS,
} from 'ca-module-profile/profileConstant';

const REMAINING_SECONDS = 120;

function ProfileMobileNumberOtp(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    setPhoneNumber,
    setLoading,
    profileAction,
    setPhoneNumberFailed,
  } = props;

  const [otp, setOtp] = useState('');
  const [lapsedTime, setLapsedTime] = useState(REMAINING_SECONDS);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const inputOtp = useRef(null);

  useInterval(() => {
    if (lapsedTime > 0 && lapsedTime <= REMAINING_SECONDS) {
      setLapsedTime(lapsedTime - 1);
    } else {
      setLapsedTime(0);
    }
  }, 1000);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {});
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (otp.length === 6) {
      inputOtp.current.blur();
      setIsSubmit(true);
      setLoading(true);
      setSubmit(otp);
    }
  }, [otp, setLoading, setSubmit]);

  const setSubmit = useCallback(
    (data) => {
      if (!isSubmit) {
        setPhoneNumber({ mobilePhoneNumber: params?.otpSendTo, otp: data });
      }
    },
    [isSubmit, params?.otpSendTo, setPhoneNumber]
  );

  useEffect(() => {
    setNavigation(profileAction);
  }, [profileAction, setNavigation]);

  const setNavigation = useCallback(
    (act) => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      if (act === SET_PHONE_NUMBER_SUCCESS) {
        setTimeout(() => {
          setSuccessModalVisible(true);
        }, 700);
      }
      if (act === SET_PHONE_NUMBER_FAILED) {
        Alert.alert(
          trans(locale, lang, 'warning'),
          trans(locale, lang, setPhoneNumberFailed?.message)
        );
      }
      setIsSubmit(false);
    },
    [lang, setLoading, setPhoneNumberFailed?.message]
  );

  function onOtpTyped(digit) {
    setOtp(digit.substring(0, 6));
  }

  function renderImageContainer() {
    return (
      <View style={[Style.container]}>
        <Ilustrator2 width={343} height={236} />
      </View>
    );
  }

  function renderTitleContainer() {
    return (
      <View style={Style.title.container}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          color={Color.neutral.light.neutral80}
          style={Style.title.title}>
          {trans(locale, lang, 'verificationCode')}
        </Text>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={23.8}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'subtitle1')}
          <Text color={Color.primary.light.primary90}>{params?.otpSendTo}</Text>
        </Text>
      </View>
    );
  }

  function renderLine(index) {
    return (
      <View
        style={[
          Style.input.line,
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
          <View style={Style.input.innerGrouper}>
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
            {trans(locale, lang, 'otpFalse')}
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
          onPress={() => {
            setLapsedTime(REMAINING_SECONDS);
          }}
          disabled={lapsedTime > 0}>
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
            {trans(locale, lang, 'resend')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSuccessMessage() {
    const onBackPress = () => {
      setSuccessModalVisible(false);
      navigation.pop(3);
    };
    return (
      <BottomSheet
        isVisible={isSuccessModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={[Style.modal.container, Style.alignItemsCenter]}>
          <IconSuccess width={146} height={146} style={Style.modal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.text1}>
            {trans(locale, lang, 'updateSuccess')}
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
          <Button
            shadow
            block
            onPress={() => {
              setSuccessModalVisible(false);
              navigation.pop(3);
            }}>
            {trans(locale, lang, 'continue')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'inputOtp')}>
      <Padder>
        {renderImageContainer()}
        {renderTitleContainer()}
        {renderGroupLine()}
        {renderOtpTime()}
        {renderSuccessMessage()}
        <View>
          <TextInput
            ref={inputOtp}
            style={Style.hiddenInput}
            value={otp}
            keyboardType="number-pad"
            onChangeText={(text) => {
              onOtpTyped(text);
            }}
          />
        </View>
      </Padder>
    </Base>
  );
}

export default ProfileMobileNumberOtp;

ProfileMobileNumberOtp.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setPhoneNumberFailed: PropTypes.objectOf(Object).isRequired,
};
