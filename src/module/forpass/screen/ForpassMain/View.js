import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Image, ImageBackground, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import { Account, Terkirim } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import BottomSheet from 'ca-component-container/BottomSheet';
import { NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import { regexEmail, regexMobile } from 'ca-util/common';
import { CloudBackground, ForgetPasswordKey } from 'ca-config/Image';
import {
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
} from 'ca-module-profile/profileConstant';
import ModalTooFrequentlyOtp from 'ca-component-modal/ModalTooFrequentlyOtp';
import Style from './style';
import locale from './locale';

function ForpassMain(props) {
  const {
    navigation,
    lang,
    colorScheme,
    profileAction,
    setLoading,
    setProfileRequestOtpFailed,
    setProfileRequestOtpClear,
    setProfileRequestOtp,
  } = props;

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const [emailNo, setEmailNo] = useState('');
  const [isSMVisible, setSMVisible] = useState(false);
  // const [isFMVisible, setFMVisible] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const [emailMessage, setEmailMessage] = useState(null);

  const [isValidEmail, setValidEmail] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // TOO FREQUENTLY ERROR
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [reqOtpSendTo, setReqOtpSendTo] = useState('');

  const goBack = useCallback(() => {
    return true;
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [goBack]);

  // TOO FREQUENTLY HANDLING
  useEffect(() => {
    if (isUserBlocked) {
      setEmailMessage({
        error: `${trans(locale, lang, 'silakanMenunggu')} ${seconds} ${trans(
          locale,
          lang,
          'detik'
        )}`,
      });
    }
  }, [isUserBlocked, lang, seconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Clear User Block
  useEffect(() => {
    if (seconds === 0) {
      setIsUserBlocked(false);
      setEmailMessage(null);
    }
  }, [seconds]);

  useEffect(() => {
    setProfileSecurityResult(profileAction);
  }, [profileAction, setProfileSecurityResult]);

  const setProfileSecurityResult = useCallback(
    (action) => {
      if (action === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setSMVisible(true);
        setProfileRequestOtpClear();
      }
      if (action === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        const message = setProfileRequestOtpFailed?.message;
        if (message !== 'INTERNAL_SERVER_ERROR') {
          if (message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(Number(message?.substring(15)));
            setTimeout(
              () => {
                setIsTooFrequentlyModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          if (message === 'NOT_REGISTERED') {
            setEmailMessage({ error: trans(locale, lang, 'maafEmailAtau') });
            return;
          }
          Alert.alert('Error setProfileRequestOtpFailed', message);
        }
      }
    },
    [
      lang,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
    ]
  );

  const validateEmail = useCallback(
    (text) => {
      if (text.length < 1) {
        setEmailMessage({ error: trans(locale, lang, 'emailRequired') });
        return false;
      }
      if (!regexEmail.test(text) && !regexMobile.test(text)) {
        setEmailMessage({ error: trans(locale, lang, 'emailInvalid') });
        return false;
      }
      setEmailMessage(null);
      return true;
    },
    [lang]
  );

  function renderHeaderContainer() {
    return (
      <View>
        <View style={Style.header.logoContainer}>
          <Image source={ForgetPasswordKey} style={Style.header.logo} />
        </View>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={23.8}
          letterSpacing={0.5}
          color={Color.mediumGray[colorScheme].mediumGray}
          style={Style.header.subtitle}>
          {trans(locale, lang, 'subtitle')}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View style={[Style.inputCard, Style.mb28]}>
        <Input
          value={emailNo}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          label={trans(locale, lang, 'emailLabel')}
          prefixIcon={<Account {...iconProps} />}
          placeholder={trans(locale, lang, 'emailPlaceholder')}
          message={emailMessage}
          onChangeText={(text) => {
            setEmailNo(text);
            setValidEmail(validateEmail(text));
          }}
        />
      </View>
    );
  }

  function renderButton() {
    const buttonStyle = {
      position: 'absolute',
      bottom: isFocus ? 16 : 50,
      width: Size.screen.width - 32,
    };
    return (
      <Padder style={Style.pb80}>
        <Button
          style={buttonStyle}
          shadow
          loading={isSubmit}
          disabled={!isValidEmail || isSubmit || isUserBlocked}
          onPress={() => {
            setIsSubmit(true);
            setReqOtpSendTo(emailNo);
            setProfileRequestOtp({
              isNoLogin: true,
              data: {
                id: emailNo,
                action: 'VERIFY_RESET_PASSWORD',
              },
            });
          }}>
          {trans(locale, lang, 'confirm')}
        </Button>
      </Padder>
    );
  }

  function renderSuccessMessage() {
    return (
      <BottomSheet
        isVisible={isSMVisible}
        swipeable={false}
        onClosePress={() => setSMVisible(false)}
        onRequestClose={() => {
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            setSMVisible(false)
          );
          return () => backHandler.remove();
        }}>
        <View style={[Style.modal.container]}>
          <Terkirim style={Style.modal.icon} />
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            color={Color.mediumGray[colorScheme].mediumGray}
            align="center"
            style={Style.modal.text2}>
            {`${trans(locale, lang, 'successMsg1')} ${trans(
              locale,
              lang,
              regexEmail.test(emailNo) ? 'email' : 'nomorHP'
            )} `}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={23.8}
              color={Color.primary[colorScheme].primary90}>
              {emailNo}
            </Text>
            {regexEmail.test(emailNo)
              ? trans(locale, lang, 'successMsg2')
              : trans(locale, lang, 'successMsgPhone')}
          </Text>
          <Button
            shadow
            block
            onPress={() => {
              setSMVisible(false);
              setTimeout(() => {
                setEmailNo('');
                navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
                  isNoLogin: true,
                  action: 'VERIFY_RESET_PASSWORD',
                  otpSendTo: reqOtpSendTo,
                  nextRoute: NAVIGATION.FORPASS.ForpassInput,
                });
              }, 200);
            }}>
            {trans(locale, lang, 'confirm')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderBackgroundImage() {
    return (
      <ImageBackground source={CloudBackground} style={Style.backgroundImage} />
    );
  }

  return (
    <Base
      onBackPress={() => {
        navigation.pop();
      }}
      title={trans(locale, lang, 'forpass')}
      renderBottom={renderButton()}>
      <Padder>
        {renderHeaderContainer()}
        {renderInputCard()}
      </Padder>
      {renderSuccessMessage()}
      {renderBackgroundImage()}
      <ModalTooFrequentlyOtp
        lang={lang}
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onTryAgainPress={() => {
          setIsTooFrequentlyModal(false);
        }}
        remainingSeconds={remainingSeconds}
      />
    </Base>
  );
}

export default ForpassMain;

ForpassMain.defaultProps = {
  colorScheme: 'light',
};

ForpassMain.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  profileAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
};
