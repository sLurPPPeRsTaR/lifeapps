import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import { View, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { Logo } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import { APP, NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment/min/moment-with-locales';
import { getLocation } from 'ca-util/location';
import {
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
} from 'ca-module-register/registerConstant';
import { BackgroundInput, OTP_Request } from 'ca-config/Image';
import { getCheckPhoneEmail } from 'ca-module-register/registerApi';
import BottomSheet from 'ca-component-container/BottomSheet';
import { regexGlobalPhoneNumber, regexName } from 'ca-util/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Base15 from 'ca-component-container/Base15';
import locale from './locale';
import Style from './style';

function RegisterNextStep(props) {
  const {
    navigation,
    lang,
    deviceId,
    route: { params },
    registerAction,
    setLoading,
    setRequestOtp,
    setRequestOtpFailed,
    setResendRegisterOtp,
    width,
    height,
  } = props;

  moment.locale(lang);

  const [fullName, setFullName] = useState(params?.name);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [isValidFullName, setValidFullName] = useState(!!fullName);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitRequestOtp, setIsSubmitRequestOtp] = useState(false);
  const [isSubmitCheckPhoneEmail, setIsSubmitCheckPhoneEmail] = useState(false);
  const [seconds, setSeconds] = useState();
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  useLayoutEffect(() => {
    setValidFullName(validateFullName(fullName));
  }, [fullName, validateFullName]);

  useEffect(() => {
    if (isTermsAccepted) {
      setLoading(true);
      setIsTermsAccepted(false);
      setRequestOtpCallback();
    }
  }, [
    deviceId,
    fullName,
    isTermsAccepted,
    params,
    setLoading,
    phoneNumber,
    setRequestOtp,
    setRequestOtpCallback,
  ]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setIsTooFrequentlyModal(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const setRequestOtpCallback = useCallback(() => {
    if (!isSubmitRequestOtp) {
      getLocation().then((p) => {
        setRequestOtp({
          token: params?.token,
          mobilePhoneNumber:
            phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
          id: phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
          name: fullName,
          channelUid: params?.channelUid,
          channelType: params?.channelType,
          deviceId: deviceId,
          deviceType: DeviceInfo.getModel(),
          deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
          dob: null,
          action: 'REGISTER',
          setResendRegisterOtp: false,
        });
      });
      setIsSubmitRequestOtp(true);
    }
  }, [
    isSubmitRequestOtp,
    setRequestOtp,
    params?.token,
    params?.channelUid,
    params?.channelType,
    phoneNumber,
    fullName,
    deviceId,
  ]);

  useEffect(() => {
    if (!setResendRegisterOtp) {
      setRegisterSocialResult(registerAction);
    }
  }, [registerAction, setRegisterSocialResult, setResendRegisterOtp]);

  const setRegisterSocialResult = useCallback(
    (act) => {
      if (act === SET_REGISTER_OTP_SUCCESS) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        navigation.navigate(NAVIGATION.REGISTER.RegisterOtp, {
          otpSendTo:
            phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
          previousRoute: 'RegisterNextStep',
          ...params,
        });
      }
      if (act === SET_REGISTER_OTP_FAILED) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        if (setRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
            setSeconds(setRequestOtpFailed?.message?.substring(15));
            setIsTooFrequentlyModal(true);
          } else if (
            setRequestOtpFailed?.message?.match('ALREADY_REGISTERED')
          ) {
            setPhoneNumberMessage({
              error: trans(locale, lang, setRequestOtpFailed?.message),
            });
            setValidPhoneNumber(false);
          } else {
            Alert.alert(
              trans(locale, lang, 'warning'),
              trans(locale, lang, setRequestOtpFailed?.message)
            );
          }
        }
      }
    },
    [
      lang,
      navigation,
      params,
      phoneNumber,
      setLoading,
      setRequestOtpFailed?.message,
    ]
  );

  function returnResult(result) {
    setIsTermsAccepted(result);
  }

  const validateFullName = useCallback(
    (text) => {
      if (text?.length < 1) {
        setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
        return false;
      }
      if (!regexName.test(text)) {
        setFullNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
        return false;
      }
      if (text?.length > 100) {
        setFullNameMessage({
          error: trans(locale, lang, 'nameLengthTooLong'),
        });
        return false;
      }
      setFullNameMessage(null);
      return true;
    },
    [lang]
  );

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.h6.size}
          textStyle="bold"
          line={30.6}
          color={Color.neutral.light.neutral60}
          style={Style.headerTitle}>
          {trans(locale, lang, 'dataDiri')}
        </Text>
        <Logo width={124} height={45} />
      </View>
    );
  }

  function checkPhoneAndEmail() {
    getCheckPhoneEmail({
      id: phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
      deviceId: deviceId,
    })
      .then((res) => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res.data.data.exist) {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'ALREADY_REGISTERED'),
          });
          setValidPhoneNumber(false);
        }
        if (!res.data.data.exist) {
          navigation.navigate(NAVIGATION.REGISTER.RegisterTerms, {
            returnResult,
            ...params,
          });
        }
      })
      .catch((res) => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res?.code === 'ERR_BAD_REQUEST') {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'kodenegaratidakterdaftar'),
          });
        }
      });
  }

  function validatePhoneNumber(text) {
    if (text.length < 1) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberRequired'),
      });
      return false;
    }
    if (text.length > 15) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    if (!regexGlobalPhoneNumber.test(text)) {
      setPhoneNumberMessage({
        warning: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    setPhoneNumberMessage(null);
    return true;
  }

  function renderInputCard() {
    return (
      <View style={[Style.inputCard]}>
        <View style={Style.mb16}>
          <Input
            value={fullName}
            label={trans(locale, lang, 'namaPanggilan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi"
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, '*')}
              </Text>
            }
            placeholder={trans(locale, lang, 'namaPanggilanKamu')}
            onChangeText={(text) => setFullName(text)}
            message={fullNameMessage}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            keyboardType="number-pad"
            value={phoneNumber}
            label={trans(locale, lang, 'noHp')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            placeholder={trans(locale, lang, 'noHpKamu')}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setValidPhoneNumber(validatePhoneNumber(text));
            }}
            message={phoneNumberMessage}
            prefixPhoneNumber={phoneNumber?.charAt(0) !== '+' && true}
          />
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={Style.footerContainer}>
        <Button
          type="linear-gradient"
          shadowLinear
          disabled={
            !isValidFullName || !isValidPhoneNumber || isSubmitCheckPhoneEmail
          }
          onPress={() => {
            setLoading(true);
            setIsSubmitCheckPhoneEmail(true);
            checkPhoneAndEmail();
          }}>
          {trans(locale, lang, 'daftar')}
        </Button>
      </Padder>
    );
  }

  function renderTooFrequentlyModal() {
    return (
      <BottomSheet isVisible={isTooFrequentlyModal} swipeable={false}>
        <View style={Style.tooFrequently.container}>
          <Image
            source={OTP_Request}
            style={Style.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={Style.tooFrequently.title}
            fontWeight="700"
            textStyle="bold"
            size={Size.text.h6.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </Text>
          <Text
            fontWeight="500"
            style={Style.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'andaTelahMeminta')}
            <Text>{seconds}</Text>
            <Text
              fontWeight="500"
              textStyle="medium"
              size={Size.text.body1.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.mediumGray.light.mediumGray}>
              {trans(locale, lang, 'detik')}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}
            style={Style.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  const insets = useSafeAreaInsets();
  const additionalHeight = 413;
  function renderBackgroundHeaderImage() {
    const imageSize = { width: 375, height: 813 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + insets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    return (
      <View style={backgroundStyle}>
        <Image
          source={BackgroundInput}
          style={{ width, height: adjustedHeight }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <Base15
      isScroll
      animated
      title={trans(locale, lang, 'registrasi')}
      onBackPress={() => navigation.pop()}
      renderBottom={renderFooterContainer()}
      backgroundHeaderImage={renderBackgroundHeaderImage()}
      backgroundColor={Color.main.light.white}>
      <Padder style={[Style.baseBackground, { minHeight: height / 1.5 }]}>
        <View>
          {renderHeaderContainer()}
          {renderInputCard()}
        </View>
      </Padder>
      {renderTooFrequentlyModal()}
    </Base15>
  );
}

export default RegisterNextStep;

RegisterNextStep.propTypes = {
  lang: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  deviceId: PropTypes.string.isRequired,
  registerAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setRequestOtp: PropTypes.func.isRequired,
  setRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setResendRegisterOtp: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
