import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Alert, Image } from 'react-native';
import Padder from 'ca-component-container/Padder';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { ArrowRight2, Clock, Handphone, Message, Pin } from 'ca-config/Svg';
import { NAVIGATION } from 'ca-util/constant';
import {
  SET_UPDATA_REQUEST_OTP_FAILED,
  SET_UPDATA_REQUEST_OTP_SUCCESS,
} from 'ca-module-updata/updataConstant';
import Button from 'ca-component-generic/Button';
import { ClockOTP } from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import Shadow from 'ca-component-container/Shadow';
import { useIsFocused } from '@react-navigation/native';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

function UpdataPhone(props) {
  const {
    navigation,
    lang,
    setIsShowModalCustomerCare,
    updataAction,
    setUpdataRequestOtpFailed,
    getUpdataLastOtherInfoResponse,
    setUpdataRequestOtpClear,
    setUpdataRequestOtp,
    setLoading,
    otherInformation,
    alreadySetPin,
  } = props;

  useDefaultBackHandler(navigation);

  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [reqOtpSendTo, setReqOtpSendTo] = useState('');
  const [reqOtpType, setReqOtpType] = useState('');

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      requestOtpResult(updataAction);
    }
  }, [isFocused, requestOtpResult, updataAction]);

  const requestOtpResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataRequestOtpClear();
        navigation.navigate(NAVIGATION.UPDATA.UpdataOtp, {
          action: 'REQUEST_CHANGE_MOBILE_PHONE_NUMBER_POLICY',
          otpSendTo: reqOtpSendTo,
          otpType: reqOtpType,
          nextRoute: NAVIGATION.UPDATA.UpdataPhoneEdit,
        });
      }
      if (act === SET_UPDATA_REQUEST_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataRequestOtpClear();
        if (setUpdataRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setUpdataRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(
              Number(setUpdataRequestOtpFailed?.message?.substring(15))
            );
            setIsTooFrequentlyModal(true);
            return;
          }
          Alert.alert('Error', setUpdataRequestOtpFailed?.message);
        }
      }
    },
    [
      navigation,
      reqOtpSendTo,
      reqOtpType,
      setLoading,
      setUpdataRequestOtpClear,
      setUpdataRequestOtpFailed?.message,
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
      setIsTooFrequentlyModal(false);
    }
  }, [minutes, seconds]);

  function renderHeaderContainer() {
    return (
      <View style={style.header.container}>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={20}
          letterSpacing={0.5}
          color={Color.neutral.light.neutral40}>
          {trans(locale, lang, 'lakukanKonfirmasiOtp')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    const oldEmail =
      otherInformation?.data?.email ||
      getUpdataLastOtherInfoResponse?.data?.email;
    const oldPhoneNumber =
      otherInformation?.data?.phoneNumber ||
      getUpdataLastOtherInfoResponse?.data?.phoneNumber;
    return (
      <View style={style.content.container}>
        {oldEmail && (
          <Shadow borderRadius={16} style={style.mb16}>
            <TouchableOpacity
              disabled={isSubmit}
              style={style.content.card.container}
              onPress={() => {
                setIsSubmit(true);
                setLoading(true);
                setReqOtpSendTo(oldEmail);
                setReqOtpType('email');
                setUpdataRequestOtp({
                  id: oldEmail,
                  action: 'REQUEST_CHANGE_MOBILE_PHONE_NUMBER_POLICY',
                });
              }}>
              <View style={style.content.card.title}>
                <Message style={style.content.card.icon} />
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}
                  numberOfLines={1}>
                  {oldEmail}
                </Text>
              </View>
              <ArrowRight2 />
            </TouchableOpacity>
          </Shadow>
        )}
        {oldPhoneNumber && (
          <Shadow borderRadius={16} style={style.mb16}>
            <TouchableOpacity
              disabled={isSubmit}
              style={style.content.card.container}
              onPress={() => {
                setIsSubmit(true);
                setLoading(true);
                setReqOtpSendTo(oldPhoneNumber);
                setReqOtpType('number');
                setUpdataRequestOtp({
                  id: oldPhoneNumber,
                  action: 'REQUEST_CHANGE_MOBILE_PHONE_NUMBER_POLICY',
                });
              }}>
              <View style={style.content.card.title}>
                <Handphone style={style.content.card.icon} />
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}
                  numberOfLines={1}>
                  {oldPhoneNumber}
                </Text>
              </View>
              <ArrowRight2 />
            </TouchableOpacity>
          </Shadow>
        )}
        {alreadySetPin && (
          <Shadow borderRadius={16} style={style.mb16}>
            <TouchableOpacity
              disabled={isSubmit}
              style={style.content.card.container}
              onPress={() => {
                navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
                  nextRoute: NAVIGATION.UPDATA.UpdataPhoneEdit,
                });
              }}>
              <View style={style.content.card.title}>
                <Pin style={style.content.card.icon} />
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={20}
                  letterSpacing={0.5}
                  numberOfLines={1}>
                  {trans(locale, lang, 'masukkanPin')}
                </Text>
              </View>
              <ArrowRight2 />
            </TouchableOpacity>
          </Shadow>
        )}
      </View>
    );
  }

  function renderAlertContainer() {
    return (
      <View>
        <AlertDialogue
          title={trans(locale, lang, 'pastikanEmailAtau')}
          type="warning"
          leftIcon
        />
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.footer.container}>
        <Text
          textStyle="regular"
          size={Size.text.body2.size}
          line={17}
          letterSpacing={0.5}
          align="center"
          color={Color.neutral.light.neutral10}>
          {trans(locale, lang, 'jikaEmailAtau')}
          <Text
            textStyle="semi"
            color={Color.primary.light.primary90}
            textDecorationLine="underline"
            onPress={() => setIsShowModalCustomerCare(true)}>
            {trans(locale, lang, 'customerCare')}
          </Text>
          <Text color={Color.neutral.light.neutral10}>
            {trans(locale, lang, 'kami')}
          </Text>
        </Text>
      </Padder>
    );
  }

  function renderTooFrequentlyModal() {
    const onBackPress = () => setIsTooFrequentlyModal(false);
    return (
      <BottomSheet
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
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
            onPress={onBackPress}
            style={style.modal.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      bordered
      isPaddingBottom={false}
      title={trans(locale, lang, 'perbaruiNomorHP')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      renderBottom={renderFooterContainer()}
      onBackPress={() => navigation.pop()}>
      <Padder style={style.container}>
        {renderHeaderContainer()}
        {renderContentContainer()}
        {renderAlertContainer()}
        {renderTooFrequentlyModal()}
      </Padder>
    </Base>
  );
}

export default UpdataPhone;

UpdataPhone.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  updataAction: PropTypes.string.isRequired,
  setUpdataRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataRequestOtp: PropTypes.func.isRequired,
  setUpdataRequestOtpClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
};
