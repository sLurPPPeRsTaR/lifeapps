import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, View } from 'react-native';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { regexMobile, useDefaultBackHandler } from 'ca-util/common';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_UPDATA_REQUEST_OTP_FAILED,
  SET_UPDATA_REQUEST_OTP_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { ClockOTP, BadgeTick } from 'ca-config/Image';
import locale from './locale';
import style from './style';

function UpdataPhoneEdit(props) {
  const {
    navigation,
    lang,
    colorScheme,
    updataAction,
    setUpdataRequestOtp,
    setUpdataRequestOtpClear,
    setUpdataRequestOtpFailed,
    setOtherInformation,
    otherInformation,
    getUpdataLastOtherInfoResponse,
    setLoading,
    currentScreen,
  } = props;

  useDefaultBackHandler(navigation);

  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [newNumber, setNewNumber] = useState('');
  const [isValidNewNumber, setValidNewNumber] = useState(false);
  const [newNumberMessage, setNewNumberMessage] = useState(null);

  const [isValidOtp, setIsValidOtp] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  useEffect(() => {
    if (currentScreen === 'UpdataPhoneEdit') {
      requestOtpResult(updataAction);
    }
  }, [currentScreen, requestOtpResult, updataAction]);

  const requestOtpResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setUpdataRequestOtpClear();
        navigation.navigate(NAVIGATION.UPDATA.UpdataOtp, {
          action: 'VERIFY_NEW_MOBILE_PHONE_NUMBER_POLICY',
          otpSendTo: newNumber,
          otpType: 'number',
          callbackValidOtp,
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
      newNumber,
      setLoading,
      setUpdataRequestOtpClear,
      setUpdataRequestOtpFailed?.message,
    ]
  );

  useEffect(() => {
    if (isValidOtp) {
      setIsValidOtp('');
      setOtherInformation({
        ...otherInformation,
        data: {
          ...otherInformation.data,
          phoneNumber: newNumber,
        },
      });
      setIsSuccessModal(true);
    }
  }, [
    isValidOtp,
    navigation,
    newNumber,
    otherInformation,
    setOtherInformation,
  ]);

  const callbackValidOtp = (data) => {
    setIsValidOtp(data);
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    let isValid = validateNewNumber(newNumber);
    if (isValid) {
      const formatPhoneNumber = newNumber
        .replace(/^8/, '08')
        .replace(/^0/, '62')
        .replace(/^62/, '+62')
        .trim();
      isValid = validateNewNumber(formatPhoneNumber);
    }
    setValidNewNumber(isValid);
  }, [newNumber, validateNewNumber]);

  const validateNewNumber = useCallback(
    (text) => {
      if (text.length < 1) {
        setNewNumberMessage({ error: trans(locale, lang, 'numberRequired') });
        return false;
      }
      if (!regexMobile.test(text)) {
        setNewNumberMessage({ warning: trans(locale, lang, 'numberInvalid') });
        return false;
      }
      let oldPhoneNumber =
        otherInformation?.data?.phoneNumber ||
        getUpdataLastOtherInfoResponse?.data?.phoneNumber;
      oldPhoneNumber = oldPhoneNumber
        ?.replace(/^8/, '08')
        .replace(/^0/, '62')
        .replace(/^62/, '+62')
        .trim();
      if (text === oldPhoneNumber) {
        setNewNumberMessage({
          warning: trans(locale, lang, 'numberSameWithOld'),
        });
        return false;
      }
      setNewNumberMessage(null);
      return true;
    },
    [
      getUpdataLastOtherInfoResponse?.data?.phoneNumber,
      lang,
      otherInformation?.data?.phoneNumber,
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
          {trans(locale, lang, 'pastikanNomorHP')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    const secondLabel = (
      <Text
        color={Color.primary.light.primary90}
        size={Size.text.body2.size}
        textStyle="semi">
        {trans(locale, lang, '*')}
      </Text>
    );
    return (
      <View style={style.content.container}>
        <View style={style.content.input.container}>
          <Input
            disabled
            value={
              otherInformation?.data?.phoneNumber ||
              getUpdataLastOtherInfoResponse?.data?.phoneNumber
            }
            height={56}
            label={trans(locale, lang, 'nomorHPLama')}
          />
        </View>
        <View>
          <Input
            secondLabel={secondLabel}
            height={56}
            keyboardType="phone-pad"
            label={trans(locale, lang, 'nomorHPBaru')}
            placeholder={trans(locale, lang, 'masukkanNomorBaru')}
            onChangeText={(text) => {
              setNewNumber(text);
            }}
            message={newNumberMessage}
          />
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.footer.container}>
        <Button
          disabled={!isValidNewNumber || isSubmit}
          type="linear-gradient"
          onPress={() => {
            setIsSubmit(true);
            setLoading(true);
            setUpdataRequestOtp({
              id: newNumber,
              action: 'VERIFY_NEW_MOBILE_PHONE_NUMBER_POLICY',
            });
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessModal() {
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
            style={style.modal.success.text}>
            {trans(locale, lang, 'andaBerhasilMengubah')}
          </Text>
        </View>
        <Button type="linear-gradient" onPress={onBackPress}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </BottomSheet>
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
        {renderSuccessModal()}
        {renderTooFrequentlyModal()}
      </Padder>
    </Base>
  );
}

export default UpdataPhoneEdit;

UpdataPhoneEdit.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  setUpdataRequestOtp: PropTypes.func.isRequired,
  setUpdataRequestOtpClear: PropTypes.func.isRequired,
  setUpdataRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setOtherInformation: PropTypes.func.isRequired,
  otherInformation: PropTypes.objectOf(Object).isRequired,
  getUpdataLastOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
};
