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
import { regexGlobalPhoneNumber } from 'ca-util/common';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  GET_PERSONAL_DATA_FAILED,
  GET_PERSONAL_DATA_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { ClockOTP, BadgeTick } from 'ca-config/Image';
import locale from './locale';
import style from './style';

function ProfilePhoneEdit(props) {
  const {
    navigation,
    lang,
    colorScheme,
    profileAction,
    mobilePhoneNumberUser,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setProfileRequestOtpFailed,
    getPersonalDataResponse,
    setLoading,
    currentScreen,
  } = props;

  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const oldNumber =
    getPersonalDataResponse?.mobilePhoneNumber || mobilePhoneNumberUser;
  const actionType = oldNumber ? 'edit' : 'add';
  const [newNumber, setNewNumber] = useState('');
  const [isValidNewNumber, setValidNewNumber] = useState(false);
  const [newNumberMessage, setNewNumberMessage] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  useEffect(() => {
    if (currentScreen === 'ProfilePhoneEdit') {
      requestOtpResult(profileAction);
    }
  }, [currentScreen, requestOtpResult, profileAction]);

  const requestOtpResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        navigation.navigate(NAVIGATION.PROFILE.ProfilePhoneEditOtp, {
          action: 'CHANGE_MOBILE_PHONE_NUMBER',
          otpSendTo: newNumber?.charAt(0) !== '+' ? `+${newNumber}` : newNumber,
          otpType: 'number',
          actionType: actionType,
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
            setIsTooFrequentlyModal(true);
            return;
          }
          if (setProfileRequestOtpFailed?.message === 'ALREADY_REGISTERED') {
            setNewNumberMessage({
              error: trans(locale, lang, 'alreadyRegistered'),
            });
            return;
          }
          if (setProfileRequestOtpFailed?.message === 'BAD_REQUEST') {
            setNewNumberMessage({
              error: trans(locale, lang, 'kodeNegaraTidakTerdaftar'),
            });
            return;
          }
          Alert.alert('Error', setProfileRequestOtpFailed?.message);
        }
      }
    },
    [
      setLoading,
      setProfileRequestOtpClear,
      navigation,
      newNumber,
      actionType,
      setProfileRequestOtpFailed?.message,
      lang,
    ]
  );

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidNewNumber(validateNewNumber(newNumber));
  }, [newNumber, validateNewNumber]);

  const validateNewNumber = useCallback(
    (text) => {
      if (text.length < 1) {
        setNewNumberMessage({ error: trans(locale, lang, 'numberRequired') });
        return false;
      }
      if (!regexGlobalPhoneNumber.test(text)) {
        setNewNumberMessage({ warning: trans(locale, lang, 'numberInvalid') });
        return false;
      }
      const newNumberTemp = text.charAt(0) !== '+' ? `+${text}` : text;
      if (newNumberTemp === oldNumber) {
        setNewNumberMessage({
          warning: trans(locale, lang, 'numberSameWithOld'),
        });
        return false;
      }
      if (text.length > 15) {
        setNewNumberMessage({
          error: trans(locale, lang, 'numberInvalid'),
        });
        return false;
      }
      setNewNumberMessage(null);
      return true;
    },
    [lang, oldNumber]
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
        {oldNumber ? (
          <View style={style.content.input.container}>
            <Input
              disabled
              value={oldNumber}
              height={56}
              label={trans(locale, lang, 'nomorHPLama')}
            />
          </View>
        ) : null}
        <View>
          <Input
            keyboardType="phone-pad"
            secondLabel={secondLabel}
            height={56}
            label={trans(locale, lang, 'nomorHPBaru')}
            placeholder={trans(locale, lang, 'masukkanNomorBaru')}
            onChangeText={(text) => {
              setNewNumber(text);
            }}
            message={newNumberMessage}
            prefixPhoneNumber={newNumber?.charAt(0) !== '+' && true}
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
            setProfileRequestOtp({
              id: newNumber?.charAt(0) !== '+' ? `+${newNumber}` : newNumber,
              action: 'CHANGE_MOBILE_PHONE_NUMBER',
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

  return (
    <Base
      bordered
      isPaddingBottom={false}
      title={
        actionType === 'add'
          ? trans(locale, lang, 'tambahNomorHP')
          : trans(locale, lang, 'perbaruiNomorHP')
      }
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

export default ProfilePhoneEdit;

ProfilePhoneEdit.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  profileAction: PropTypes.string.isRequired,
  mobilePhoneNumberUser: PropTypes.string.isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
};
